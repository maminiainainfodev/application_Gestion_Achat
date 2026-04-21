import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Collaborateur, Demandeur, Service } from "@/lib/types";
import prisma from "@/lib/prisma";
import { generateAutorisationPaiement, generatePDFForDemandes, type DemandePDFData } from "@/lib/pdf";
import { isEmailConfigured, sendEmail } from "@/lib/mailer";
import {
  findValidatorsForRole,
  formatDateTime,
  formatNavetteType,
  formatPersonName,
  getRoleDisplayName,
} from "@/lib/workflowNotifications";

// Ensure this route runs on Node.js runtime (required for Nodemailer)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fonction pour normaliser un matricule
function normalizeMatricule(matricule: string): string {
  return matricule.replace(/\s+/g, '').toUpperCase().trim();
}

export async function POST(
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

    const body = await request.json();
    const { action, motifRefus } = body; // action: "valider" | "refuser" | "prendre_magasin" | "generate_ap" | "generate_bc"

    if (!action || (action !== "valider" && action !== "refuser" && action !== "prendre_magasin" && action !== "generate_ap" && action !== "generate_bc")) {
      return NextResponse.json(
        { success: false, message: "Action invalide" },
        { status: 400 }
      );
    }

    if (action === "refuser" && !motifRefus) {
      return NextResponse.json(
        { success: false, message: "Le motif de refus est requis" },
        { status: 400 }
      );
    }

    const demandeId = parseInt(id);
    if (isNaN(demandeId)) {
      return NextResponse.json(
        { success: false, message: "ID de demande invalide" },
        { status: 400 }
      );
    }

    // Récupérer la demande avec son workflow
    const demande = await prisma.demandeur.findUnique({
      where: { id: demandeId },
      include: {
        auteur: {
          include: {
            service: true,
          },
        },
        historique: {
          orderBy: { dateValidation: "desc" },
        },
      },
    });

    if (!demande) {
      return NextResponse.json(
        { success: false, message: "Demande introuvable" },
        { status: 404 }
      );
    }

    // NEW ACTION: generate_bc (Specifically to mark it as generated)
    if (action === "generate_bc") {
      const result = await prisma.$transaction(async (tx) => {
        const d = await tx.demandeur.findUnique({ where: { id: demandeId } });
        if (!d) throw new Error("Demande introuvable");

        const updated = await tx.demandeur.update({
          where: { id: demandeId },
          data: { isBCGenere: true }
        });

        return {
          demande: updated,
          action: "bc_marqué_généré",
        };
      });

      return NextResponse.json({
        success: true,
        message: "Bon de commande marqué comme généré",
        data: result
      });
    }

    // NEW ACTION: generate_ap (Specifically for Step 7 or after validation)
    if (action === "generate_ap") {
      const result = await prisma.$transaction(async (tx) => {
        const d = await tx.demandeur.findUnique({ where: { id: demandeId } });
        if (!d) throw new Error("Demande introuvable");

        const updated = await tx.demandeur.update({
          where: { id: demandeId },
          data: { isAPGenere: true }
        });

        return {
          demande: updated,
          action: "ap_genere"
        };
      });

      return NextResponse.json({
        success: true,
        message: "Autorisation de paiement générée",
        data: result
      });
    }

    // Vérifier que la demande n'est pas déjà refusée ou finalisée
    // EN_MAGASIN est autorisé car la Direction peut encore valider
    if (demande.statut === "REFUSEE" || demande.statut === "VALIDEE") {
      return NextResponse.json(
        { success: false, message: "Cette demande a déjà été traitée" },
        { status: 400 }
      );
    }

    // Récupérer l'étape actuelle du workflow
    const etapeActuelle = await prisma.workflowEtapes.findFirst({
      where: {
        type: demande.type,
        etape: demande.etapeActuelle,
      },
    });

    if (!etapeActuelle) {
      return NextResponse.json(
        { success: false, message: "Étape de workflow introuvable" },
        { status: 404 }
      );
    }

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

    // Normalisation helper: accents -> ascii, remove spaces/special chars
    const normalize = (s: string) =>
      s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Mapping pour aligner les noms de rôles Frontend/DB/Token
    const ROLE_ALIASES: Record<string, string> = {
      'chargedesaachats': 'chargeeachat',
      'chargedeschats': 'chargeeachat',
      'chargeeachat': 'chargeeachat',
      'chargeachat': 'chargeeachat',
      'acheteur': 'chargeeachat', // Mapping pour le rôle "Acheteur"
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
      const n = normalize(r);
      return ROLE_ALIASES[n] || n;
    };

    const rawUserRoles = collaborateur.collaborateurRoles.map(
      (cr) => cr.role.nomRole
    );
    if (role && !rawUserRoles.includes(role)) rawUserRoles.push(role);

    const userCanonicalRoles = rawUserRoles.map(getCanonicalRole);
    const isAdmin = userCanonicalRoles.includes('administrateur') || role === "Administrateur";


    const requiredCanonical = getCanonicalRole(etapeActuelle.roleRequis);
    const hasRequiredRole = userCanonicalRoles.includes(requiredCanonical);

    if (!isAdmin && !hasRequiredRole) {
      return NextResponse.json(
        {
          success: false,
          message: `Vous n'avez pas le rôle requis (${etapeActuelle.roleRequis}) pour valider cette étape`
        },
        { status: 403 }
      );
    }

    // Les valideurs peuvent valider leurs propres demandes si et seulement si :
    // 1. La demande est arrivée à leur étape dans le workflow (après validation des étapes précédentes)
    // 2. L'étape actuelle correspond à leur rôle requis
    // C'est-à-dire que si un Responsable Financier fait une demande, elle doit passer par toutes les étapes
    // précédentes (Chef de Service, etc.) et quand elle arrive à l'étape Responsable Financier, il peut la valider
    // Pas besoin de blocage supplémentaire car le workflow garantit que les étapes précédentes ont été validées

    // Action spéciale: prise en magasin (Assistante logistique)
    // Pour Navette Achat uniquement: saute directement à la Direction (dernière étape)
    if (action === "prendre_magasin") {
      // Autorisé uniquement pour le rôle Assistante Logistique
      const hasAssistanteLogistiqueRole = userCanonicalRoles.includes("assistantelogistique");
      if (!hasAssistanteLogistiqueRole) {
        return NextResponse.json({ success: false, message: "Action non autorisée" }, { status: 403 });
      }

      // Vérifier que c'est bien une Navette Achat
      if (demande.type !== "ACHAT") {
        return NextResponse.json(
          { success: false, message: "L'action 'Prendre dans le magasin' est uniquement disponible pour les Navettes Achat" },
          { status: 400 }
        );
      }

      // Utiliser une transaction pour garantir la cohérence
      const result = await prisma.$transaction(async (tx) => {
        // Trouver l'étape de Direction (généralement la Direction ou Directrice est le dernier valideur avant le retour Achat ou la fin)
        // On cherche le rôle "Directrice" ou "Direction"
        const toutesLesEtapes = await tx.workflowEtapes.findMany({
          where: { type: "ACHAT" },
          orderBy: { etape: "asc" },
        });

        if (toutesLesEtapes.length === 0) {
          throw new Error("Aucune étape de workflow trouvée pour Navette Achat");
        }

        // On cherche l'étape "Directrice" (souvent l'étape 6 pour Achat)
        const etapeDirection = toutesLesEtapes.find(e =>
          getCanonicalRole(e.roleRequis).includes("directrice") ||
          getCanonicalRole(e.roleRequis).includes("direction")
        );

        if (!etapeDirection) {
          throw new Error("Étape de Direction non trouvée pour Navette Achat");
        }

        // Enregistrer la validation de l'étape actuelle (Assistante Logistique)
        await tx.historiqueValidation.create({
          data: {
            demandeurID: demandeId,
            etape: demande.etapeActuelle,
            valideurMatricule: matricule,
            statut: "VALIDEE",
            motifRefus: "Prise dans le magasin - Passage direct à la Direction",
            id_navette: demande.id,
            reference_navette: demande.reference,
          },
        });

        // Passer directement à la dernière étape (Direction)
        const demandeUpdatee = await tx.demandeur.update({
          where: { id: demandeId },
          data: {
            etapeActuelle: etapeDirection.etape,
            versQui: etapeDirection.roleRequis,
            statut: "EN_MAGASIN", // Statut spécial pour prise en magasin
          },
        });

        return {
          demande: demandeUpdatee,
          action: "en_magasin",
          prochaineEtape: etapeDirection.etape,
          prochainRole: etapeDirection.roleRequis,
        };
      });

      return NextResponse.json({
        success: true,
        message: "Demande prise au magasin - Passage direct à la Direction",
        data: result,
      });
    }


    // Les validations bloquantes de champs sont levées pour laisser les valideurs décider
    if (action === "valider") {
      const roleRequis = etapeActuelle.roleRequis;
      const missingFields: string[] = [];

      const canonicalRole = getCanonicalRole(roleRequis);
      if (canonicalRole === "chargeeachat") {
        if (!demande.pu) missingFields.push("P.U");
        if (!demande.fournisseurID) missingFields.push("Fournisseur");
        if (!demande.devis) missingFields.push("Devis");
        if (!demande.justificationChoix) missingFields.push("Justification Choix");
      }

      if (canonicalRole === "controleurgestion") {
        if (!demande.imputationComptable) missingFields.push("Imputation Comptable");
        if (!demande.activite) missingFields.push("Activité");
        if (!demande.codeTIGER) missingFields.push("Code TIGER");
      }

      if (missingFields.length > 0) {
        console.warn(
          "[DEMANDE_VALIDATION_WITH_MISSING_FIELDS]",
          JSON.stringify({
            demandeId,
            roleRequis,
            matricule,
            missingFields,
          })
        );
        // On continue le flux: la décision appartient au valideur même si certains champs sont vides
      }
    }

    // Utiliser une transaction pour garantir la cohérence
    const result = await prisma.$transaction(async (tx) => {
      if (action === "refuser") {
        // Refuser la demande
        const demandeUpdatee = await tx.demandeur.update({
          where: { id: demandeId },
          data: {
            statut: "REFUSEE",
            dateFinalisation: new Date(),
          },
        });

        // Enregistrer dans l'historique
        await tx.historiqueValidation.create({
          data: {
            demandeurID: demandeId,
            etape: demande.etapeActuelle,
            valideurMatricule: matricule,
            statut: "REFUSEE",
            motifRefus: motifRefus,
            id_navette: demande.id,
            reference_navette: demande.reference,
          },
        });

        return { demande: demandeUpdatee, action: "refusee" };
      } else {
        // Valider la demande
        // (Les validations de champs ont déjà été faites avant la transaction)
        // Récupérer la prochaine étape réelle
        const prochaineEtape = await tx.workflowEtapes.findFirst({
          where: {
            type: demande.type,
            etape: { gt: demande.etapeActuelle },
          },
          orderBy: { etape: "asc" },
        });

        // Enregistrer dans l'historique
        await tx.historiqueValidation.create({
          data: {
            demandeurID: demandeId,
            etape: demande.etapeActuelle,
            valideurMatricule: matricule,
            statut: "VALIDEE",
            id_navette: demande.id,
            reference_navette: demande.reference,
          },
        });

        // Si c'est la dernière étape, marquer comme validée
        if (!prochaineEtape) {
          const demandeUpdatee = await tx.demandeur.update({
            where: { id: demandeId },
            data: {
              statut: "VALIDEE",
              dateFinalisation: new Date(),
            },
          });

          // Générer les documents PDF pour la validation finale
          let autorisationPaiement: Uint8Array | null = null;
          let bonCommande: Uint8Array | null = null;

          // Types qui génèrent uniquement AUTORISATION DE PAIEMENT (pas de BON DE COMMANDE)
          const typesAPOnly = ["NOTE_FRAIS", "DRFMS", "PAIEMENT", "DRFME"];

          if (demande.type === "PAIEMENT" || demande.type === "ACHAT" || typesAPOnly.includes(demande.type)) {
            try {
              // Récupérer les données complètes pour le PDF
              const pdfData = await getPDFData(tx, demandeId);

              if (pdfData) {
                // Types qui génèrent uniquement AUTORISATION DE PAIEMENT
                if (typesAPOnly.includes(demande.type)) {
                  autorisationPaiement = await generateAutorisationPaiement(pdfData);
                }
                // ACHAT génère uniquement BON DE COMMANDE
                else if (demande.type === "ACHAT") {
                  // Custom title: Bon de Commande
                  bonCommande = await generatePDFForDemandes([{ ...pdfData, customFilename: "Bon de Commande" }]);
                }
              }
            } catch (pdfError) {
              console.error("[PDF_GENERATION_ERROR] Erreur génération PDF:", pdfError);
            }
          }

          return {
            demande: demandeUpdatee,
            action: "validee_finale",
            autorisationPaiement: autorisationPaiement ? Buffer.from(autorisationPaiement).toString('base64') : null,
            bonCommande: bonCommande ? Buffer.from(bonCommande).toString('base64') : null
          };
        } else {
          // Passer à l'étape suivante
          const demandeUpdatee = await tx.demandeur.update({
            where: { id: demandeId },
            data: {
              etapeActuelle: prochaineEtape.etape,
              versQui: prochaineEtape.roleRequis,
            },
          });

          // Récupérer le rôle requis pour la prochaine étape
          const prochainRole = prochaineEtape.roleRequis;

          return { demande: demandeUpdatee, action: "validee", prochaineEtape: prochaineEtape.etape, prochainRole };
        }
      }
    });

    if (isEmailConfigured()) {
      try {
        const updatedDemande = await prisma.demandeur.findUnique({
          where: { id: demandeId },
          include: {
            auteur: {
              include: {
                service: true,
              },
            },
          },
        });

        if (updatedDemande) {
          await notifyValidationTransition({
            demande: updatedDemande,
            actionResult: result.action as "validee" | "validee_finale" | "refusee" | "en_magasin",
            nextRole: (result as any)?.prochainRole ?? null,
            currentRole: etapeActuelle.roleRequis,
            motifRefus: action === "refuser" ? motifRefus : undefined,
            acteur: collaborateur,
            isPriseMagasin: action === "prendre_magasin",
          });
        }
      } catch (notifyError) {
        console.error("[DEMANDE_VALIDATION_EMAIL_ERROR]", notifyError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Demande ${action === "valider" ? "validée" : action === "refuser" ? "refusée" : "mise en magasin"} avec succès`,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la validation/refus:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors du traitement de la demande",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


type DemandeWithAuteur = Demandeur & {
  auteur: (Collaborateur & { service: Service | null }) | null;
};

type NotifyValidationParams = {
  demande: DemandeWithAuteur;
  actionResult: "validee" | "validee_finale" | "refusee" | "en_magasin";
  nextRole: string | null;
  currentRole: string;
  motifRefus?: string;
  acteur: Collaborateur;
  isPriseMagasin?: boolean;
};

async function notifyValidationTransition({
  demande,
  actionResult,
  nextRole,
  currentRole,
  motifRefus,
  acteur,
  isPriseMagasin,
}: NotifyValidationParams) {
  const navetteLabel = formatNavetteType(demande.type);
  const currentRoleDisplay = getRoleDisplayName(currentRole);
  const nextRoleDisplay = nextRole ? getRoleDisplayName(nextRole) : null;
  const acteurName = formatPersonName(acteur);

  const auteur = demande.auteur;
  const auteurMail = auteur?.mailPro?.trim() ?? null;
  const auteurName = auteur ? formatPersonName(auteur) : "Demandeur";
  const serviceName = auteur?.service?.nomService ?? null;

  if (actionResult === "refusee") {
    if (!auteurMail) return;
    const html = buildRequesterRefusalHtml({
      navetteLabel,
      demande,
      auteurName,
      acteurName,
      currentRoleDisplay,
      motifRefus,
    });
    const text = buildRequesterRefusalText({
      navetteLabel,
      demande,
      auteurName,
      acteurName,
      currentRoleDisplay,
      motifRefus,
    });

    await sendEmail({
      to: auteurMail,
      subject: `[Navette] Demande #${demande.id} refusée`,
      html,
      text,
    });
    return;
  }

  if (actionResult === "validee_finale") {
    if (!auteurMail) return;
    const html = buildRequesterFinalHtml({
      navetteLabel,
      demande,
      auteurName,
      acteurName,
      currentRoleDisplay,
    });
    const text = buildRequesterFinalText({
      navetteLabel,
      demande,
      auteurName,
      acteurName,
      currentRoleDisplay,
    });

    await sendEmail({
      to: auteurMail,
      subject: `[Navette] Demande #${demande.id} validée`,
      html,
      text,
    });
    return;
  }

  if (actionResult === "validee" || actionResult === "en_magasin") {
    if (nextRole && nextRoleDisplay) {
      const validators = await findValidatorsForRole(prisma, nextRole, {
        demande: buildDemandeContextForNotifications(demande),
      });

      if (validators.length > 0) {
        const html = buildNextValidatorHtml({
          navetteLabel,
          demande,
          acteurName,
          currentRoleDisplay,
          nextRoleDisplay,
          serviceName,
          isPriseMagasin,
        });
        const text = buildNextValidatorText({
          navetteLabel,
          demande,
          acteurName,
          currentRoleDisplay,
          nextRoleDisplay,
          serviceName,
          isPriseMagasin,
        });

        await sendEmail({
          to: validators.map((validator) => validator.mail),
          subject: `[Navette] Demande #${demande.id} à votre validation`,
          html,
          text,
        });
      }
    }

    if (auteurMail) {
      const html = buildRequesterProgressHtml({
        navetteLabel,
        demande,
        auteurName,
        acteurName,
        currentRoleDisplay,
        nextRoleDisplay,
        serviceName,
        isPriseMagasin,
      });
      const text = buildRequesterProgressText({
        navetteLabel,
        demande,
        auteurName,
        acteurName,
        currentRoleDisplay,
        nextRoleDisplay,
        serviceName,
        isPriseMagasin,
      });

      await sendEmail({
        to: auteurMail,
        subject: `[Navette] Mise à jour de votre demande #${demande.id}`,
        html,
        text,
      });
    }
  }
}

function buildDemandeContextForNotifications(demande: DemandeWithAuteur) {
  return {
    id: demande.id,
    type: demande.type,
    objet: demande.objet,
    auteur: {
      matricule: demande.auteur?.matricule ?? null,
      nom: demande.auteur?.nom ?? null,
      prenom: demande.auteur?.prenom ?? null,
      mailPro: demande.auteur?.mailPro ?? null,
      serviceId: demande.auteur?.service?.id ?? null,
      serviceAbbrev: demande.auteur?.serviceAbbrev ?? demande.auteur?.service?.abreviation ?? null,
    },
  };
}

type ValidatorEmailContext = {
  navetteLabel: string;
  demande: DemandeWithAuteur;
  acteurName: string;
  currentRoleDisplay: string;
  nextRoleDisplay: string | null;
  serviceName: string | null;
  isPriseMagasin?: boolean;
};

type RequesterProgressContext = {
  navetteLabel: string;
  demande: DemandeWithAuteur;
  auteurName: string;
  acteurName: string;
  currentRoleDisplay: string;
  nextRoleDisplay: string | null;
  serviceName: string | null;
  isPriseMagasin?: boolean;
};

type RequesterFinalContext = {
  navetteLabel: string;
  demande: DemandeWithAuteur;
  auteurName: string;
  acteurName: string;
  currentRoleDisplay: string;
};

type RequesterRefusalContext = {
  navetteLabel: string;
  demande: DemandeWithAuteur;
  auteurName: string;
  acteurName: string;
  currentRoleDisplay: string;
  motifRefus?: string;
};

function buildNextValidatorHtml(context: ValidatorEmailContext) {
  const {
    navetteLabel,
    demande,
    acteurName,
    currentRoleDisplay,
    nextRoleDisplay,
    serviceName,
    isPriseMagasin,
  } = context;

  return `
    <p>Bonjour,</p>
    <p>La ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été validée par <strong>${acteurName}</strong> (${currentRoleDisplay}).</p>
    <p>Elle est désormais à votre niveau${nextRoleDisplay ? ` (<strong>${nextRoleDisplay}</strong>)` : ""}${serviceName ? ` pour le service <strong>${serviceName}</strong>` : ""} et attend votre décision.</p>
    ${isPriseMagasin ? "<p>Note : cette demande a été prise dans le magasin et est passée directement à votre étape.</p>" : ""}
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Type :</strong> ${navetteLabel}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
    </ul>
    <p>Merci de vous connecter à la plateforme Navette pour poursuivre le traitement.</p>
  `;
}

function buildNextValidatorText(context: ValidatorEmailContext) {
  const {
    navetteLabel,
    demande,
    acteurName,
    currentRoleDisplay,
    nextRoleDisplay,
    serviceName,
    isPriseMagasin,
  } = context;

  return [
    "Bonjour,",
    `La ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été validée par ${acteurName} (${currentRoleDisplay}).`,
    `Elle est maintenant à votre niveau${nextRoleDisplay ? ` (${nextRoleDisplay})` : ""}${serviceName ? ` pour le service ${serviceName}` : ""}.`,
    isPriseMagasin ? "Note : cette demande a été prise dans le magasin et est passée directement à votre étape." : "",
    `Objet : ${demande.objet || "Sans objet"}`,
    `Type : ${navetteLabel}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
    "",
    "Merci de vous connecter à la plateforme Navette pour poursuivre le traitement.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRequesterProgressHtml(context: RequesterProgressContext) {
  const {
    navetteLabel,
    demande,
    auteurName,
    acteurName,
    currentRoleDisplay,
    nextRoleDisplay,
    serviceName,
    isPriseMagasin,
  } = context;

  return `
    <p>Bonjour ${auteurName},</p>
    <p><strong>${acteurName}</strong> (${currentRoleDisplay}) a validé votre ${navetteLabel.toLowerCase()} (n° ${demande.id}).</p>
    ${nextRoleDisplay
      ? `<p>La demande est maintenant en attente de validation par <strong>${nextRoleDisplay}</strong>${serviceName ? ` (${serviceName})` : ""}.</p>`
      : "<p>La demande suit désormais le workflow défini.</p>"
    }
    ${isPriseMagasin ? "<p>Note : l'étape \"Assistante Logistique\" a choisi l'option \"Prendre dans le magasin\".</p>" : ""}
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
    </ul>
  `;
}

function buildRequesterProgressText(context: RequesterProgressContext) {
  const {
    navetteLabel,
    demande,
    auteurName,
    acteurName,
    currentRoleDisplay,
    nextRoleDisplay,
    serviceName,
    isPriseMagasin,
  } = context;

  return [
    `Bonjour ${auteurName},`,
    `${acteurName} (${currentRoleDisplay}) a validé votre ${navetteLabel.toLowerCase()} (n° ${demande.id}).`,
    nextRoleDisplay
      ? `La demande attend désormais la validation de ${nextRoleDisplay}${serviceName ? ` (${serviceName})` : ""}.`
      : "La demande suit désormais le workflow défini.",
    isPriseMagasin ? `Note : l'étape "Assistante Logistique" a choisi l'option "Prendre dans le magasin".` : "",
    `Objet : ${demande.objet || "Sans objet"}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRequesterFinalHtml(context: RequesterFinalContext) {
  const { navetteLabel, demande, auteurName, acteurName, currentRoleDisplay } = context;

  return `
    <p>Bonjour ${auteurName},</p>
    <p>Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été validée par <strong>${acteurName}</strong> (${currentRoleDisplay}).</p>
    <p>Le traitement de cette demande est terminé.</p>
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
      <li><strong>Date de finalisation :</strong> ${formatDateTime(demande.dateFinalisation)}</li>
    </ul>
  `;
}

function buildRequesterFinalText(context: RequesterFinalContext) {
  const { navetteLabel, demande, auteurName, acteurName, currentRoleDisplay } = context;

  return [
    `Bonjour ${auteurName},`,
    `Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été validée par ${acteurName} (${currentRoleDisplay}).`,
    "Le traitement de cette demande est terminé.",
    `Objet : ${demande.objet || "Sans objet"}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
    `Date de finalisation : ${formatDateTime(demande.dateFinalisation)}`,
  ].join("\n");
}

function buildRequesterRefusalHtml(context: RequesterRefusalContext) {
  const { navetteLabel, demande, auteurName, acteurName, currentRoleDisplay, motifRefus } = context;

  return `
    <p>Bonjour ${auteurName},</p>
    <p>Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été refusée par <strong>${acteurName}</strong> (${currentRoleDisplay}).</p>
    ${motifRefus
      ? `<p><strong>Motif indiqué :</strong><br/>${motifRefus.replace(/\n/g, "<br/>")}</p>`
      : "<p>Aucun motif n'a été fourni.</p>"
    }
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
    </ul>
  `;
}

function buildRequesterRefusalText(context: RequesterRefusalContext) {
  const { navetteLabel, demande, auteurName, acteurName, currentRoleDisplay, motifRefus } = context;

  return [
    `Bonjour ${auteurName},`,
    `Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été refusée par ${acteurName} (${currentRoleDisplay}).`,
    motifRefus ? `Motif indiqué : ${motifRefus}` : "Aucun motif n'a été fourni.",
    `Objet : ${demande.objet || "Sans objet"}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
  ].join("\n");
}

async function getPDFData(tx: any, demandeId: number): Promise<DemandePDFData | null> {
  const demandeComplete = await tx.demandeur.findUnique({
    where: { id: demandeId },
    include: {
      auteur: {
        select: {
          matricule: true,
          nom: true,
          prenom: true,
          mailPro: true,
          serviceAbbrev: true,
          fonction: {
            select: {
              nomFonction: true,
              chef: { select: { nom: true, prenom: true } }
            }
          },
          service: { select: { nomService: true } },
          telephone: true,
        },
      },
      fournisseur: {
        select: { nom: true },
      },
      budget: {
        select: {
          codeBudgetaire: true,
          service: { select: { nomService: true } },
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

  if (!demandeComplete) return null;

  return {
    id: demandeComplete.id,
    numero: demandeComplete.numero,
    type: demandeComplete.type,
    dateDepot: demandeComplete.dateDepot,
    statut: demandeComplete.statut,
    etapeActuelle: demandeComplete.etapeActuelle,
    dateFinalisation: demandeComplete.dateFinalisation,
    objet: demandeComplete.objet,
    description: demandeComplete.description,
    motif: demandeComplete.motif,
    quantite: demandeComplete.quantite,
    pu: demandeComplete.pu ? Number(demandeComplete.pu) : null,
    montant: demandeComplete.montant ? Number(demandeComplete.montant) : null,
    devis: demandeComplete.devis,
    justificationChoix: demandeComplete.justificationChoix,
    imputationComptable: demandeComplete.imputationComptable,
    activite: demandeComplete.activite,
    codeTIGER: demandeComplete.codeTIGER,
    versQui: demandeComplete.versQui,
    auteur: {
      matricule: demandeComplete.auteur?.matricule || "",
      nom: demandeComplete.auteur?.nom || null,
      prenom: demandeComplete.auteur?.prenom || null,
      fonction: demandeComplete.auteur?.fonction || null,
      service: demandeComplete.auteur?.service || null,
      serviceAbbrev: demandeComplete.auteur?.serviceAbbrev || null,
      telephone: demandeComplete.auteur?.telephone || null,
      email: demandeComplete.auteur?.mailPro || null,
    },
    fournisseur: demandeComplete.fournisseur,
    budget: demandeComplete.budget,
    historique: demandeComplete.historique.map((h: any) => ({
      etape: h.etape,
      statut: h.statut,
      dateValidation: h.dateValidation,
      motifRefus: h.motifRefus,
      reference_navette: h.reference_navette || null,
      valideur: h.valideur,
    })),
  };
}

