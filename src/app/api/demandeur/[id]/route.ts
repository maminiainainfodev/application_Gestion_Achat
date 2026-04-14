import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

// Normalization helper: accents -> ascii, remove spaces/special chars
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

// Mapping pour aligner les noms de rôles Frontend/DB/Token
const ROLE_ALIASES: Record<string, string> = {
  'chargedesaachats': 'chargeeachat',
  'chargedeschats': 'chargeeachat',
  'chargeeachat': 'chargeeachat',
  'chargeachat': 'chargeeachat',
  'acheteur': 'chargeeachat',
  'responsablefinancier': 'responsablefinancier',
  'responsablefinance': 'responsablefinancier',
  'responsableadministratifetfinancier': 'responsablefinancier',
  'controleurgestion': 'controleurgestion',
  'controleurdegestion': 'controleurgestion',
  'chefservice': 'chefservice',
  'chefdeservice': 'chefservice',
  'assistantelogistique': 'assistantelogistique',
};

const getCanonicalRole = (r: string) => {
  if (!r) return "";
  const n = normalize(r);
  return ROLE_ALIASES[n] || n;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const demandeId = parseInt(id);
    if (isNaN(demandeId)) {
      return NextResponse.json(
        { success: false, message: "ID de demande invalide" },
        { status: 400 }
      );
    }

    // Récupérer la demande avec toutes ses informations
    const demande = await prisma.demandeur.findUnique({
      where: { id: demandeId },
      include: {
        auteur: {
          include: {
            fonction: {
              select: {
                nomFonction: true,
              },
            },
            service: {
              select: {
                nomService: true,
              },
            },
            collaborateurRoles: {
              include: {
                role: {
                  select: {
                    nomRole: true,
                  },
                },
              },
            },
          },
        },
        fournisseur: true,
        budget: {
          include: {
            service: {
              select: {
                nomService: true,
              },
            },
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
          orderBy: { dateValidation: "asc" },
        },
      },
    });

    if (!demande) {
      return NextResponse.json(
        { success: false, message: "Demande introuvable" },
        { status: 404 }
      );
    }

    // Récupérer l'étape actuelle du workflow
    const etapeActuelle = await prisma.workflowEtapes.findFirst({
      where: {
        type: demande.type,
        etape: demande.etapeActuelle,
      },
    });

    // Récupérer les rôles de l'utilisateur
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

    const userRoles = collaborateur.collaborateurRoles.map(
      (cr) => cr.role.nomRole
    );

    // Déterminer les permissions
    const isDemandeur = demande.auteurMatricule === matricule;
    const isAdministrateur = role === "Administrateur" || userRoles.map(getCanonicalRole).includes("administrateur");

    const userCanonicalRoles = userRoles.map(getCanonicalRole);
    const requiredCanonical = getCanonicalRole(etapeActuelle?.roleRequis || "");

    const canValidate = isAdministrateur ||
      (!!requiredCanonical && userCanonicalRoles.includes(requiredCanonical));

    // Déterminer quelles sections peuvent être éditées
    const permissions = {
      canEditObjet: isDemandeur || isAdministrateur,
      canEditDemandeur: isDemandeur || isAdministrateur || canValidate,
      canEditFinance: false,
      canEditCG: false,
      canValidate: canValidate && (demande.statut === "EN_ATTENTE" || demande.statut === "EN_MAGASIN"),
    };

    // Si l'étape actuelle nécessite la saisie FINANCE
    if (etapeActuelle) {
      const etapeFinance = await prisma.workflowEtapes.findFirst({
        where: {
          type: demande.type,
          etape: { lte: demande.etapeActuelle },
        },
      });

      const isFinanceRole = etapeFinance && ["chargeeachat", "responsablefinancier"].includes(getCanonicalRole(etapeFinance.roleRequis));

      if (isFinanceRole && (canValidate || isAdministrateur)) {
        permissions.canEditFinance = true;
      }

      // Si l'étape actuelle nécessite la saisie CG
      const etapeCG = await prisma.workflowEtapes.findFirst({
        where: {
          type: demande.type,
          etape: { lte: demande.etapeActuelle },
        },
      });

      const isCGRole = etapeCG && getCanonicalRole(etapeCG.roleRequis) === "controleurgestion";

      if (isCGRole && (canValidate || isAdministrateur)) {
        permissions.canEditCG = true;
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: demande,
        permissions,
        etapeActuelle: etapeActuelle?.roleRequis || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la demande:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la récupération de la demande",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const demandeId = parseInt(id);
    if (isNaN(demandeId)) {
      return NextResponse.json(
        { success: false, message: "ID de demande invalide" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Vérifier les permissions avant de mettre à jour
    const demande = await prisma.demandeur.findUnique({
      where: { id: demandeId },
    });

    if (!demande) {
      return NextResponse.json(
        { success: false, message: "Demande introuvable" },
        { status: 404 }
      );
    }

    // Permissions de modification:
    // - Auteur: modifiable tant que NON validé par la Direction (statut !VALIDEE/REFUSEE et etape <= Etape Direction)
    // - Valideur: modifiable si c'est à son tour (inchangé)

    // Récupérer l'étape actuelle et les rôles de l'utilisateur
    const etapeActuelleObj = await prisma.workflowEtapes.findFirst({
      where: { type: demande.type, etape: demande.etapeActuelle },
    });

    // normalisation helpers are now at top level

    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule },
      include: { collaborateurRoles: { include: { role: true } } },
    });

    const userRoles = (collaborateur?.collaborateurRoles || []).map(cr => cr.role.nomRole);
    if (role && !userRoles.includes(role)) userRoles.push(role);

    // Check canonical roles
    const userCanonicalRoles = userRoles.map(getCanonicalRole);
    const requiredCanonical = getCanonicalRole(etapeActuelleObj?.roleRequis || "");

    const isAuteur = demande.auteurMatricule === matricule;
    const isAdministrateur = userCanonicalRoles.includes('administrateur') || role === "Administrateur";

    // Valideur check: compares canonical forms
    const isValideurCourant = !!(requiredCanonical && userCanonicalRoles.includes(requiredCanonical));

    const isStatutModifiable = demande.statut === "EN_ATTENTE" || demande.statut === "EN_MAGASIN";

    // Règles
    // 1. Admin
    if (isAdministrateur) {
      if (!isStatutModifiable) {
        return NextResponse.json(
          { success: false, message: "La demande n'est plus modifiable à ce statut" },
          { status: 403 }
        );
      }
    }
    // 2. Valideur (Priorité sur Auteur pour modification)
    else if (isValideurCourant) {
      if (!isStatutModifiable) {
        return NextResponse.json(
          { success: false, message: "La demande n'est plus modifiable à ce statut" },
          { status: 403 }
        );
      }
    }
    // 3. Auteur
    else if (isAuteur) {
      // Trouver l'étape de Direction pour ce type de navette
      const toutesLesEtapes = await prisma.workflowEtapes.findMany({
        where: { type: demande.type },
        orderBy: { etape: "asc" },
      });
      const etapeDirection = toutesLesEtapes.find(e =>
        getCanonicalRole(e.roleRequis).includes("directrice") ||
        getCanonicalRole(e.roleRequis).includes("direction")
      );

      const isPassedDirection = etapeDirection ? demande.etapeActuelle > etapeDirection.etape : false;
      const isLocked =
        demande.statut === "VALIDEE" ||
        demande.statut === "REFUSEE" ||
        demande.statut === "EN_MAGASIN" ||
        isPassedDirection;

      if (isLocked) {
        return NextResponse.json(
          { success: false, message: "La demande n'est plus modifiable (validée par la Direction ou refusée)." },
          { status: 403 }
        );
      }
    }
    else {
      return NextResponse.json(
        { success: false, message: "Vous n'êtes pas autorisé à modifier cette demande" },
        { status: 403 }
      );
    }

    // Calculer automatiquement le montant et le devis si quantite ou pu est modifié
    let calculatedMontant = body.montant;
    let calculatedDevis = body.devis;
    if (body.quantite !== undefined || body.pu !== undefined) {
      const quantite = body.quantite !== undefined ? body.quantite : demande.quantite;
      const pu = body.pu !== undefined ? body.pu : demande.pu;
      if (quantite !== null && pu !== null && quantite > 0 && pu > 0) {
        calculatedMontant = Number(quantite) * Number(pu);
        // Calculer le devis automatiquement selon le montant
        if (calculatedMontant <= 100000) {
          calculatedDevis = '0';
        } else if (calculatedMontant <= 1000000) {
          calculatedDevis = '1';
        } else if (calculatedMontant <= 2000000) {
          calculatedDevis = '2';
        } else if (calculatedMontant <= 5000000) {
          calculatedDevis = '3';
        } else {
          // Correspond to Frontend "Appel d'offre"
          calculatedDevis = "Appel d'offre";
        }
      }
    }

    // Mettre à jour la demande (seulement les champs autorisés, optionnels)
    const updatedDemande = await prisma.demandeur.update({
      where: { id: demandeId },
      data: {
        objet: body.objet ?? undefined,
        description: body.description ?? undefined,
        motif: body.motif ?? undefined,
        quantite: body.quantite ?? undefined,
        fournisseurID: body.fournisseurID ?? undefined,
        pu: body.pu ?? undefined,
        montant: calculatedMontant !== undefined ? calculatedMontant : undefined,
        devis: calculatedDevis !== undefined ? calculatedDevis : (body.devis ?? undefined),
        justificationChoix: body.justificationChoix ?? undefined,
        imputationComptable: body.imputationComptable ?? undefined,
        activite: body.activite ?? undefined,
        codeTIGER: body.codeTIGER ?? undefined,
        pieceJointe: body.pieceJointe ?? undefined,
        versQui: body.versQui ?? undefined,
      },
    });

    // Historiser la mise à jour (MIS_A_JOUR) pour conserver la trace des brouillons
    try {
      await prisma.historiqueValidation.create({
        data: {
          demandeurID: demandeId,
          etape: updatedDemande.etapeActuelle,
          valideurMatricule: matricule,
          statut: "MIS_A_JOUR",
          id_navette: demandeId,
          reference_navette: (updatedDemande as any).reference || null,
        },
      });
    } catch (e) {
      console.warn("[HISTO_UPDATE_MIS_A_JOUR_SKIPPED]", (e as any)?.message || e);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demande mise à jour avec succès",
        data: updatedDemande,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de la demande:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la mise à jour de la demande",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const demandeId = parseInt(id);
    if (isNaN(demandeId)) {
      return NextResponse.json(
        { success: false, message: "ID de demande invalide" },
        { status: 400 }
      );
    }

    const demande = await prisma.demandeur.findUnique({ where: { id: demandeId } });
    if (!demande) {
      return NextResponse.json(
        { success: false, message: "Demande introuvable" },
        { status: 404 }
      );
    }

    // Autoriser suppression par auteur uniquement (ou admin), tant que NON validé par la Direction
    const isAuteur = demande.auteurMatricule === matricule || role === "Administrateur";

    // Check validation direction logic
    const toutesLesEtapes = await prisma.workflowEtapes.findMany({
      where: { type: demande.type },
      orderBy: { etape: "asc" },
    });
    const etapeDirection = toutesLesEtapes.find(e => {
      const canonical = e.roleRequis.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return canonical.includes("directrice") || canonical.includes("direction");
    });

    const isPassedDirection = etapeDirection ? demande.etapeActuelle > etapeDirection.etape : false;
    const isLocked =
      demande.statut === "VALIDEE" ||
      demande.statut === "REFUSEE" ||
      demande.statut === "EN_MAGASIN" ||
      isPassedDirection;

    if (!isAuteur || isLocked) {
      return NextResponse.json(
        { success: false, message: "Suppression refusée (déjà validée par la Direction ou vous n'êtes pas l'auteur)" },
        { status: 403 }
      );
    }

    await prisma.demandeur.delete({ where: { id: demandeId } });
    return NextResponse.json({ success: true, message: "Demande supprimée" }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la demande:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la suppression de la demande",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
