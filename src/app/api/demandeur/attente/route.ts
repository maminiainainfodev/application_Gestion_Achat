import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import {  } from "@/lib/types";
import {
  canonicalizeRole,
  getRoleDisplayName,
  getRoleVariants,
} from "@/lib/workflowNotifications";

type Scope = "mine" | "to_validate" | "all";

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const scopeParam = (searchParams.get("scope") || "").toLowerCase();
    const scope: Scope =
      scopeParam === "mine"
        ? "mine"
        : scopeParam === "to_validate" || scopeParam === "to-validate"
          ? "to_validate"
          : "all";

    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule },
      include: {
        collaborateurRoles: {
          include: {
            role: true,
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
    const isChefDeService = canonicalRoles.includes(
      canonicalizeRole("ChefService")
    );
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

    const pendingStatuses: ("EN_ATTENTE" | "EN_MAGASIN")[] = [
      "EN_ATTENTE",
      "EN_MAGASIN",
    ];

    const demandeInclude: any = {
      auteur: {
        select: {
          matricule: true,
          nom: true,
          prenom: true,
          prenomUsuelle: true,
          serviceAbbrev: true,
        },
      },
      fournisseur: {
        select: {
          nom: true,
        },
      },
      historique: {
        include: {
          valideur: {
            select: {
              matricule: true,
              nom: true,
              prenom: true,
            },
          },
        },
        orderBy: { dateValidation: "desc" },
      },
    };

    let demandes =
      scope === "mine"
        ? await prisma.demandeur.findMany({
          where: {
            statut: { in: pendingStatuses },
            auteurMatricule: matricule,
          },
          include: demandeInclude,
          orderBy: { dateDepot: "desc" },
        })
        : role === "Administrateur"
          ? await prisma.demandeur.findMany({
            where: {
              statut: { in: pendingStatuses },
            },
            include: demandeInclude,
            orderBy: { dateDepot: "desc" },
          })
          : await fetchValidatorDemandes({
            matricule,
            scope,
            validationStepsByType,
            serviceAbbrevs,
            chefTypes,
            pendingStatuses,
            include: demandeInclude,
          });

    if (!demandes || demandes.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          meta: { scope, total: 0, self: 0, others: 0 },
        },
        { status: 200 }
      );
    }

    const uniqueTypes = Array.from(new Set(demandes.map((d) => d.type)));

    const workflowEntries = uniqueTypes.length
      ? await prisma.workflowEtapes.findMany({
        where: {
          type: {
            in: uniqueTypes as any,
          },
        },
        orderBy: {
          etape: "asc",
        },
      })
      : [];

    const workflowByType = new Map<
      string,
      Map<number, { roleRequis: string | null }>
    >();
    workflowEntries.forEach((entry) => {
      if (!workflowByType.has(entry.type)) {
        workflowByType.set(entry.type, new Map());
      }
      workflowByType
        .get(entry.type)!
        .set(entry.etape, { roleRequis: entry.roleRequis });
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
      const nextRole =
        workflowMap?.get(demande.etapeActuelle + 1)?.roleRequis ?? null;

      return {
        ...demande,
        currentRole,
        currentRoleDisplay: currentRole
          ? getRoleDisplayName(currentRole)
          : null,
        nextRole,
        nextRoleDisplay: nextRole ? getRoleDisplayName(nextRole) : null,
        isAuteur,
        isCurrentValidator,
      };
    });

    const filtered =
      scope === "to_validate" && role !== "Administrateur"
        ? enriched.filter((item) => item.isCurrentValidator)
        : enriched;

    const sorted =
      scope === "to_validate"
        ? [...filtered].sort((a, b) => {
          if (a.isAuteur === b.isAuteur) return 0;
          return a.isAuteur ? 1 : -1;
        })
        : filtered;

    const selfCount = sorted.filter((item) => item.isAuteur).length;
    const othersCount = sorted.length - selfCount;

    return NextResponse.json(
      {
        success: true,
        data: sorted,
        meta: {
          scope,
          total: sorted.length,
          self: selfCount,
          others: othersCount,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la récupération des demandes en attente:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la récupération des demandes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function fetchValidatorDemandes({
  matricule,
  scope,
  validationStepsByType,
  serviceAbbrevs,
  chefTypes,
  pendingStatuses,
  include,
}: {
  matricule: string;
  scope: Scope;
  validationStepsByType: Map<string, Set<number>>;
  serviceAbbrevs: string[];
  chefTypes: Set<string>;
  pendingStatuses: ("EN_ATTENTE" | "EN_MAGASIN")[];
  include: any;
}) {
  const orConditions: any[] = [];

  if (scope !== "to_validate") {
    orConditions.push({ auteurMatricule: matricule });
  }

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

  if (orConditions.length === 0) {
    return [];
  }

  return prisma.demandeur.findMany({
    where: {
      statut: { in: pendingStatuses },
      OR: orConditions,
    },
    include,
    orderBy: { dateDepot: "desc" },
  });
}
