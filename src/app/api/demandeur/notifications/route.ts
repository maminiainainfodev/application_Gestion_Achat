import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import {
  canonicalizeRole,
  getRoleDisplayName,
  getRoleVariants,
  formatNavetteType,
} from "@/lib/workflowNotifications";

type Scope = "mine" | "validators" | "all";

const NOTIFICATION_LIMIT = 20;
const PENDING_STATUSES: ("EN_ATTENTE" | "EN_MAGASIN")[] = ["EN_ATTENTE", "EN_MAGASIN"];

export async function GET() {
  try {
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule },
      include: {
        collaborateurRoles: {
          include: { role: true },
        },
        service: {
          select: {
            id: true,
            abreviation: true,
            chefServiceMatricule: true,
          },
        },
      },
    });

    if (!collaborateur) {
      return NextResponse.json(
        { success: false, message: "Collaborateur introuvable" },
        { status: 404 }
      );
    }

    const userRoleNames = Array.from(
      new Set(collaborateur.collaborateurRoles.map((cr) => cr.role.nomRole))
    );

    const canonicalRoles = Array.from(
      new Set(userRoleNames.map((r) => canonicalizeRole(r)))
    );
    const isChefDeService = canonicalRoles.includes(canonicalizeRole("ChefService"));
    const chefRoleVariants = getRoleVariants("ChefService");

    const standardRolesVariants = userRoleNames.flatMap((name) => {
      const canonical = canonicalizeRole(name);
      if (canonical === "ChefService") {
        return [];
      }
      return getRoleVariants(name);
    });

    const standardValidationSteps =
      standardRolesVariants.length > 0
        ? await prisma.workflowEtapes.findMany({
            where: {
              roleRequis: {
                in: Array.from(new Set(standardRolesVariants)),
              },
            },
          })
        : [];

    const validationStepsByType = new Map<string, Set<number>>();
    standardValidationSteps.forEach((step) => {
      if (!validationStepsByType.has(step.type)) {
        validationStepsByType.set(step.type, new Set());
      }
      validationStepsByType.get(step.type)!.add(step.etape);
    });

    const servicesChef = isChefDeService
      ? await prisma.service.findMany({
          where: {
            chefServiceMatricule: matricule,
          },
          select: {
            id: true,
            abreviation: true,
          },
        })
      : [];

    const serviceAbbrevs = servicesChef
      .map((service) => service.abreviation)
      .filter((value): value is string => Boolean(value));

    const chefWorkflowTypes = isChefDeService
      ? await prisma.workflowEtapes.findMany({
          where: {
            etape: 1,
            roleRequis: {
              in: chefRoleVariants,
            },
          },
          select: {
            type: true,
          },
        })
      : [];

    const chefTypes = new Set(chefWorkflowTypes.map((item) => item.type));

    const orConditions: any[] = [];

    if (validationStepsByType.size > 0) {
      orConditions.push({
        OR: Array.from(validationStepsByType.entries()).map(([type, steps]) => ({
          type: type as any,
          etapeActuelle: { in: Array.from(steps) },
        })),
      });
    }

    if (chefTypes.size > 0 && serviceAbbrevs.length > 0) {
      orConditions.push({
        AND: [
          { etapeActuelle: 1 },
          { type: { in: Array.from(chefTypes) as any[] } },
          {
            auteur: {
              serviceAbbrev: {
                in: serviceAbbrevs,
              },
            },
          },
        ],
      });
    }

    const whereClause =
      role === "Administrateur"
        ? { statut: { in: PENDING_STATUSES } }
        : {
            statut: { in: PENDING_STATUSES },
            OR: orConditions.length > 0 ? orConditions : undefined,
          };

    const demandes = await prisma.demandeur.findMany({
      where: whereClause,
      include: {
        auteur: {
          select: {
            matricule: true,
            nom: true,
            prenom: true,
            serviceAbbrev: true,
          },
        },
      },
      orderBy: { dateDepot: "desc" },
      take: NOTIFICATION_LIMIT,
    });

    if (!demandes.length) {
      return NextResponse.json(
        { success: true, data: [], meta: { total: 0 } },
        { status: 200 }
      );
    }

    const uniqueTypes = Array.from(new Set(demandes.map((d) => d.type)));

    const workflowEntries = await prisma.workflowEtapes.findMany({
      where: {
        type: {
          in: uniqueTypes as any,
        },
      },
      orderBy: {
        etape: "asc",
      },
    });

    const workflowByType = new Map<
      string,
      Map<
        number,
        {
          roleRequis: string | null;
        }
      >
    >();
    workflowEntries.forEach((entry) => {
      if (!workflowByType.has(entry.type)) {
        workflowByType.set(entry.type, new Map());
      }
      workflowByType.get(entry.type)!.set(entry.etape, { roleRequis: entry.roleRequis });
    });

    const isCurrentValidatorFor = (demande: (typeof demandes)[number]) => {
      if (role === "Administrateur") return true;
      const set = validationStepsByType.get(demande.type);
      if (set && set.has(demande.etapeActuelle)) {
        return true;
      }
      if (!isChefDeService) return false;
      if (!chefTypes.has(demande.type)) return false;
      if (demande.etapeActuelle !== 1) return false;
      const auteurService = demande.auteur?.serviceAbbrev;
      if (!auteurService) return false;
      return serviceAbbrevs.includes(auteurService);
    };

    const enriched = demandes.map((demande) => {
      const isAuteur = demande.auteurMatricule === matricule;
      const isCurrentValidator = isCurrentValidatorFor(demande);
      const workflowMap = workflowByType.get(demande.type);
      const currentRole = workflowMap?.get(demande.etapeActuelle)?.roleRequis ?? null;

      return {
        id: demande.id,
        type: demande.type,
        typeLabel: formatNavetteType(demande.type),
        numero: demande.numero,
        objet: demande.objet,
        statut: demande.statut,
        dateDepot: demande.dateDepot,
        auteur: demande.auteur
          ? {
              matricule: demande.auteur.matricule,
              nom: demande.auteur.nom,
              prenom: demande.auteur.prenom,
            }
          : null,
        isAuteur,
        isCurrentValidator,
        roleAttendu: currentRole ? getRoleDisplayName(currentRole) : null,
      };
    });

    const actionable = enriched.filter((item) => item.isCurrentValidator);

    return NextResponse.json(
      {
        success: true,
        data: actionable,
        meta: { total: actionable.length },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur notifications demandes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Impossible de récupérer les notifications",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

