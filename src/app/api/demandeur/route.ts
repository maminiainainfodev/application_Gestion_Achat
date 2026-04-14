import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { isEmailConfigured, sendEmail } from "@/lib/mailer";
import {
  findValidatorsForRole,
  formatDateTime,
  formatNavetteType,
  formatPersonName,
  getRoleDisplayName,
} from "@/lib/workflowNotifications";
import { generateNavetteReference } from "@/lib/reference";

// Types personnalisés basés sur le schéma Prisma
type Collaborateur = {
  id: number;
  matricule: string;
  nom: string | null;
  prenom: string | null;
  prenomUsuelle: string | null;
  mailPro: string | null;
  serviceAbbrev: string | null;
  service: {
    id: number;
    nomService: string;
    abreviation: string | null;
  } | null;
};

type TypeNavette = 'ACHAT' | 'PAIEMENT' | 'NOTE_FRAIS' | 'DRFMS' | 'DRFME';
type StatutDemande = 'EN_ATTENTE' | 'REFUSEE' | 'VALIDEE' | 'EN_MAGASIN';

type Demandeur = {
  id: number;
  auteurMatricule: string | null;
  type: TypeNavette;
  etapeActuelle: number;
  objet: string | null;
  description: string | null;
  statut: StatutDemande;
  dateDepot: Date;
  motif?: string | null;
  quantite?: number | null;
  fournisseurID?: number | null;
  pu?: number | null;
  montant?: number | null;
  devis?: string | null;
  pieceJointe?: string | null;
  justificationChoix?: string | null;
  imputationComptable?: string | null;
  activite?: string | null;
  codeTIGER?: string | null;
  versQui?: string | null;
  budgetID?: number | null;
  auteur?: {
    matricule: string;
    nom: string | null;
    prenom: string | null;
    mailPro: string | null;
    serviceAbbrev: string | null;
  } | null;
  budgetLow?: boolean;
};

type IncomingItem = {
  type?: "NAV-ACH" | "NP" | "NDF" | "DRFMS" | "DRFME";
  objet?: string | null;
  description?: string | null;
  motif?: string | null;
  qte?: number | null;
  fournisseur?: string | null; // name; will resolve to ID
  puHt?: number | null;
  montant?: number | null;
  devis?: string | null;
  justification?: string | null;
  imputation?: string | null;
  activite?: string | null;
  codeTiger?: string | null;
  paiementDetail?: string | null;
  modePaiement?: string | null;
  pieceJointe?: string | null;
};

function mapTypeCodeToEnum(code: string) {
  switch (code) {
    case "NAV-ACH":
      return "ACHAT";
    case "NP":
      return "PAIEMENT";
    case "NDF":
      return "NOTE_FRAIS";
    case "DRFMS":
      return "DRFMS";
    case "DRFME":
      return "DRFME";
    default:
      throw new Error("Type de navette invalide");
  }
}

export const runtime = "nodejs";

// Valider les types de données d'entrée
function validateItem(item: any): item is IncomingItem {
  if (!item || typeof item !== 'object') return false;

  const validTypes = ['NAV-ACH', 'NP', 'NDF', 'DRFMS', 'DRFME'];
  if (item.type && !validTypes.includes(item.type)) return false;

  // Validation des champs numériques
  if (item.qte !== undefined && (isNaN(Number(item.qte)) || Number(item.qte) < 0)) return false;
  if (item.puHt !== undefined && (isNaN(Number(item.puHt)) || Number(item.puHt) < 0)) return false;
  if (item.montant !== undefined && (isNaN(Number(item.montant)) || Number(item.montant) < 0)) return false;

  return true;
}

export async function POST(request: Request) {
  try {
    // Vérification de l'authentification
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      console.error('Accès non autorisé - Matricule ou rôle manquant');
      return NextResponse.json(
        { success: false, message: "Accès non autorisé. Veuillez vous reconnecter." },
        { status: 401 }
      );
    }

    // Validation du corps de la requête
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Erreur de parsing du corps de la requête:', e);
      return NextResponse.json(
        { success: false, message: "Format de requête invalide" },
        { status: 400 }
      );
    }

    const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];
    const navetteType: string | undefined = body?.type;

    console.log(`[DEBUG] Nouveau dépôt de demande - Type: ${navetteType}, Nombre d'éléments: ${items.length}`);
    console.log(`[DEBUG] Données reçues:`, JSON.stringify(items, null, 2));

    // Validation des données d'entrée
    if (!navetteType || !['NAV-ACH', 'NP', 'NDF', 'DRFMS', 'DRFME'].includes(navetteType)) {
      console.error('Type de navette invalide:', navetteType);
      return NextResponse.json(
        {
          success: false,
          message: "Type de demande invalide. Les types valides sont: NAV-ACH, NP, NDF, DRFMS, DRFME"
        },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      console.error('Aucun élément fourni dans la demande');
      return NextResponse.json(
        { success: false, message: "Au moins un élément est requis" },
        { status: 400 }
      );
    }

    // Validation de chaque élément
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (!validateItem(item)) {
        console.error(`Élément invalide à l'index ${index}:`, item);
        return NextResponse.json(
          {
            success: false,
            message: `Données invalides pour l'élément ${index + 1}. Vérifiez les champs fournis.`
          },
          { status: 400 }
        );
      }
    }

    const typeEnum = mapTypeCodeToEnum(navetteType);

    // Récupération des informations de l'auteur
    let auteur: any;
    try {
      auteur = await prisma.collaborateur.findUnique({
        where: { matricule },
        include: { service: true },
      });

      if (!auteur) {
        console.error(`Collaborateur non trouvé pour le matricule: ${matricule}`);
        return NextResponse.json(
          {
            success: false,
            message: `Votre matricule (${matricule}) n'a pas été trouvé dans la base de données.`
          },
          { status: 404 }
        );
      }
      console.log(`[DEBUG] Auteur identifié: ${auteur.prenom} ${auteur.nom} (Service: ${auteur.service?.nomService || 'N/A'})`);
    } catch (dbError) {
      console.error('Erreur lors de la récupération des informations du collaborateur:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de la vérification de votre compte. Veuillez réessayer plus tard.",
          error: dbError instanceof Error ? dbError.message : String(dbError)
        },
        { status: 500 }
      );
    }

    // Récupération du budget du service (facultatif)
    let budget = null;
    try {
      if (auteur.service) {
        budget = await prisma.budget.findFirst({
          where: { serviceId: auteur.service.id },
        });

        if (budget) {
          console.log(`[DEBUG] Budget trouvé pour le service ${auteur.service.nomService}: ${budget.montantDisponible}`);
        } else {
          console.log(`[DEBUG] Aucun budget trouvé pour le service ${auteur.service.nomService}`);
        }
      }
    } catch (budgetError) {
      console.error('Erreur lors de la récupération du budget:', budgetError);
      // On continue même en cas d'erreur de budget, ce n'est pas bloquant
    }

    // Création de la demande dans une transaction
    let created;
    try {
      console.log(`[DEBUG] Démarrage de la transaction pour ${items.length} éléments...`);
      created = await prisma.$transaction(async (tx) => {
        const results: any[] = [];

        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          console.log(`[DEBUG] Traitement de l'élément ${i + 1}/${items.length}...`);

          // Résoudre fournisseurID à partir du nom si fourni
          let fournisseurID: number | null = null;
          if (it.fournisseur) {
            const fournisseur = await tx.fournisseur.findFirst({
              where: { nom: it.fournisseur },
              select: { id: true },
            });
            fournisseurID = fournisseur ? fournisseur.id : null;
            console.log(`[DEBUG] Fournisseur: ${it.fournisseur} -> ID: ${fournisseurID}`);
          }

          // Étape actuelle: Première étape définie pour ce type de navette
          const firstStep = await tx.workflowEtapes.findFirst({
            where: { type: typeEnum as any },
            orderBy: { etape: 'asc' },
          });
          const etapeActuelle = firstStep ? firstStep.etape : 1;

          // VersQui: prochain role requis (si défini dans WorkflowEtapes)
          const nextStep = await tx.workflowEtapes.findFirst({
            where: {
              type: typeEnum as any,
              etape: { gt: etapeActuelle }
            },
            orderBy: { etape: 'asc' },
          });
          const versQui = nextStep ? nextStep.roleRequis : null;
          console.log(`[DEBUG] Etape initiale: ${etapeActuelle}, Prochaine étape: ${nextStep?.etape || 'N/A'}, Role requis: ${versQui}`);

          // Statut initial
          const statut = "EN_ATTENTE";

          // Calculer automatiquement le montant et le devis si quantite et pu sont fournis
          // Défensif: s'assurer que les valeurs sont des nombres valides ou null
          const rawQte = Number(it.qte);
          const rawPu = Number(it.puHt);
          const rawMontant = Number(it.montant);

          const quantite = (!isNaN(rawQte) && isFinite(rawQte)) ? rawQte : (["NDF", "DRFMS", "DRFME"].includes(navetteType) ? 1 : null);
          const pu = (!isNaN(rawPu) && isFinite(rawPu)) ? rawPu : null;
          let calculatedMontant = (!isNaN(rawMontant) && isFinite(rawMontant)) ? rawMontant : null;
          let calculatedDevis = it.devis || null;

          // Si montant non fourni mais quantite et pu sont disponibles, calculer automatiquement
          if (calculatedMontant === null && quantite !== null && pu !== null && quantite > 0 && pu > 0) {
            calculatedMontant = quantite * pu;
          }

          // Calculer le devis automatiquement si montant est disponible
          if (calculatedMontant !== null && calculatedDevis === null) {
            if (calculatedMontant <= 100000) {
              calculatedDevis = '0';
            } else if (calculatedMontant <= 1000000) {
              calculatedDevis = '1';
            } else if (calculatedMontant <= 2000000) {
              calculatedDevis = '2';
            } else if (calculatedMontant <= 5000000) {
              calculatedDevis = '3';
            } else {
              calculatedDevis = '4';
            }
          }

          console.log(`[DEBUG] Valeurs calculées - Qte: ${quantite}, PU: ${pu}, Montant: ${calculatedMontant}, Devis: ${calculatedDevis}`);

          // Check budget (facultatif)
          let budgetLow = false;
          if (budget && calculatedMontant && Number(calculatedMontant) > Number(budget.montantDisponible)) {
            budgetLow = true;
          }

          console.log(`[DEBUG] Création de l'enregistrement Demandeur...`);
          const createdDemande = await tx.demandeur.create({
            data: {
              auteurMatricule: matricule,
              type: typeEnum as any,
              etapeActuelle,
              reference: generateNavetteReference({
                id: 0, // Placeholder, will be replaced after creation if needed, but we can't know ID before create in some DBs. 
                // Wait, MySQL autoincrement ID is not known before create.
                // I should update it after creation or use a transaction with a temporary ID.
                // Actually, I can use a second update or just calculate it if I know the next ID (risk of race condition).
                // Better: Update it immediately after creation within the transaction.
                type: typeEnum,
                dateDepot: new Date(),
                auteur: auteur
              }),
              objet: it.objet || null,
              description: it.description || null,
              motif: it.motif || null,
              quantite: quantite,
              fournisseurID,
              pu: (pu !== null && !isNaN(pu)) ? pu : null,
              montant: (calculatedMontant !== null && !isNaN(calculatedMontant)) ? calculatedMontant : null,
              devis: calculatedDevis,
              pieceJointe: it.pieceJointe || null,
              justificationChoix: it.justification || null,
              imputationComptable: it.imputation || null,
              activite: it.activite || null,
              codeTIGER: it.codeTiger || null,
              modePaiement: it.modePaiement || null,
              paiementDetail: it.paiementDetail || null,
              versQui,
              statut: statut as any,
              budgetID: budget ? budget.id : null,
              dateDepot: new Date(),
            },
          });

          // Update reference with actual ID
          const finalReference = generateNavetteReference({
            id: createdDemande.id,
            type: typeEnum,
            dateDepot: createdDemande.dateDepot,
            auteur: auteur
          });

          const updatedDemande = await tx.demandeur.update({
            where: { id: createdDemande.id },
            data: {
              reference: finalReference,
              numeroBonCommande: `BC/${finalReference}`
            }
          });

          console.log(`[DEBUG] Enregistrement Demandeur créé et référence mise à jour - ID: ${updatedDemande.id}, Ref: ${finalReference}`);

          // Historiser la création en EN_ATTENTE
          try {
            await tx.historiqueValidation.create({
              data: {
                demandeurID: updatedDemande.id,
                etape: etapeActuelle,
                valideurMatricule: matricule,
                statut: "EN_ATTENTE",
                id_navette: updatedDemande.id,
                reference_navette: finalReference
              },
            });
            console.log(`[DEBUG] Historique créé pour ID: ${updatedDemande.id}`);
          } catch (histoError) {
            console.warn("[DEBUG] Erreur (non-bloquante) historique:", histoError instanceof Error ? histoError.message : String(histoError));
          }

          results.push({ demande: updatedDemande, budgetLow });
        }

        return results;
      });

      console.log(`Demande créée avec succès: ${created.length} élément(s)`);
    } catch (error: any) {
      console.error('Erreur lors de la transaction de création de la demande:', error);

      // Log details of the error to help debugging
      if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
      }

      // Gestion des erreurs spécifiques à Prisma
      if (error.code === 'P2002') {
        const target = error.meta?.target || 'inconnu';
        console.error(`Violation de contrainte d'unicité sur: ${target}`);
        return NextResponse.json(
          {
            success: false,
            message: `Une demande similaire existe déjà (conflit sur ${target}).`
          },
          { status: 400 }
        );
      }

      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      return NextResponse.json(
        {
          success: false,
          message: "Une erreur est survenue lors de la création de votre demande. Veuillez réessayer.",
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
          code: error.code
        },
        { status: 500 }
      );
    }

    // Envoi des notifications par email si configuré
    if (isEmailConfigured()) {
      console.log('Envoi des notifications par email...');
      const emailPromises = created.map(async (entry) => {
        try {
          await notifySubmission(entry.demande, auteur);
          return { success: true, id: entry.demande.id };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
          console.error(`[DEMANDE_SUBMISSION_EMAIL_ERROR] Erreur pour la demande ${entry.demande.id}:`, errorMessage);
          return { success: false, id: entry.demande.id, error: errorMessage };
        }
      });

      // Attendre que tous les emails soient envoyés, mais ne pas échouer la requête en cas d'échec d'envoi
      const emailResults = await Promise.all(emailPromises);
      const failedEmails = emailResults.filter(r => !r.success);

      if (failedEmails.length > 0) {
        console.warn(`${failedEmails.length} email(s) n'ont pas pu être envoyés`);
      } else {
        console.log('Tous les emails de notification ont été envoyés avec succès');
      }
    } else {
      console.warn('Les emails sont désactivés (SMTP non configuré)');
    }

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur inattendue lors de la création de la demande (OUTER):", error);

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur inattendue est survenue lors de la création de votre demande.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        code: error.code
      },
      { status: 500 }
    );
  }
}


async function notifySubmission(
  demande: Demandeur,
  auteur: Collaborateur
) {
  const etape = await prisma.workflowEtapes.findFirst({
    where: {
      type: demande.type,
      etape: demande.etapeActuelle,
    },
  });

  console.log(`[DEBUG_EMAIL] NotifySubmission - Request ID: ${demande.id}, Type: ${demande.type}, Etape: ${demande.etapeActuelle}`);

  if (!etape) {
    console.warn(
      "[DEMANDE_SUBMISSION_EMAIL_SKIPPED] Étape introuvable pour la demande",
      demande.id
    );
    return;
  }

  const displayRole = getRoleDisplayName(etape.roleRequis);
  const navetteLabel = formatNavetteType(demande.type);
  const auteurName = formatPersonName(auteur);
  const auteurMail = auteur.mailPro?.trim();
  const serviceName = auteur.service?.nomService || null;

  console.log(`[DEBUG_EMAIL] Role Requis: ${etape.roleRequis}, DisplayRole: ${displayRole}`);

  const validators = await findValidatorsForRole(prisma, etape.roleRequis, {
    demande: {
      id: demande.id,
      type: demande.type,
      objet: demande.objet,
      auteur: {
        matricule: auteur.matricule,
        nom: auteur.nom,
        prenom: auteur.prenom,
        mailPro: auteur.mailPro,
        serviceId: auteur.service?.id ?? null,
        serviceAbbrev: auteur.serviceAbbrev ?? auteur.service?.abreviation ?? null,
      },
    },
  });

  if (validators.length > 0) {
    console.log(`[DEBUG_EMAIL] Found ${validators.length} validators:`, validators.map(v => v.mail).join(', '));
    const validatorEmails = validators.map((validator) => validator.mail);
    const validatorsHtml = buildValidatorSubmissionHtml({
      navetteLabel,
      demande,
      auteurName,
      displayRole,
      serviceName,
    });
    const validatorsText = buildValidatorSubmissionText({
      navetteLabel,
      demande,
      auteurName,
      displayRole,
      serviceName,
    });

    await sendEmail({
      to: validatorEmails,
      subject: `[Navette] Nouvelle demande #${demande.id} à valider`,
      html: validatorsHtml,
      text: validatorsText,
    });
    console.log(`[DEBUG_EMAIL] Email sent to validators: ${validatorEmails.join(', ')}`);
  } else {
    console.warn(`[DEBUG_EMAIL] No validators found for role: ${etape.roleRequis}`);
  }

  if (auteurMail) {
    console.log(`[DEBUG_EMAIL] Sending confirmation to author: ${auteurMail}`);
    const requesterHtml = buildRequesterSubmissionHtml({
      navetteLabel,
      demande,
      auteurName,
      displayRole,
      serviceName,
    });
    const requesterText = buildRequesterSubmissionText({
      navetteLabel,
      demande,
      auteurName,
      displayRole,
      serviceName,
    });

    await sendEmail({
      to: auteurMail,
      subject: `[Navette] Votre demande #${demande.id} est soumise`,
      html: requesterHtml,
      text: requesterText,
    });
    console.log(`[DEBUG_EMAIL] Confirmation email sent to author.`);
  } else {
    console.warn(`[DEBUG_EMAIL] Author has no email, skipping confirmation.`);
  }
}

function buildValidatorSubmissionHtml({
  navetteLabel,
  demande,
  auteurName,
  displayRole,
  serviceName,
}: SubmissionEmailContext) {
  return `
    <p>Bonjour,</p>
    <p>Une nouvelle ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été soumise par <strong>${auteurName}</strong>.</p>
    <p>Elle est désormais à votre niveau <strong>${displayRole}</strong>${serviceName ? ` pour le service <strong>${serviceName}</strong>` : ""} et attend votre validation.</p>
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Type :</strong> ${navetteLabel}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
    </ul>
    <p>Merci de vous connecter à la plateforme Navette pour traiter cette demande.</p>
  `;
}

function buildValidatorSubmissionText({
  navetteLabel,
  demande,
  auteurName,
  displayRole,
  serviceName,
}: SubmissionEmailContext) {
  return [
    "Bonjour,",
    `Une nouvelle ${navetteLabel.toLowerCase()} (n° ${demande.id}) a été soumise par ${auteurName}.`,
    `Elle attend votre validation en tant que ${displayRole}${serviceName ? ` pour le service ${serviceName}` : ""}.`,
    `Objet : ${demande.objet || "Sans objet"}`,
    `Type : ${navetteLabel}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
    "",
    "Merci de vous connecter à la plateforme Navette pour traiter cette demande.",
  ].join("\n");
}

function buildRequesterSubmissionHtml({
  navetteLabel,
  demande,
  auteurName,
  displayRole,
  serviceName,
}: SubmissionEmailContext) {
  return `
    <p>Bonjour ${auteurName},</p>
    <p>Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a bien été soumise.</p>
    <p>Elle est actuellement en attente de validation par <strong>${displayRole}</strong>${serviceName ? ` (${serviceName})` : ""}.</p>
    <ul>
      <li><strong>Objet :</strong> ${demande.objet || "Sans objet"}</li>
      <li><strong>Date de dépôt :</strong> ${formatDateTime(demande.dateDepot)}</li>
    </ul>
    <p>Vous recevrez un email à chaque changement d'étape.</p>
  `;
}

function buildRequesterSubmissionText({
  navetteLabel,
  demande,
  auteurName,
  displayRole,
  serviceName,
}: SubmissionEmailContext) {
  return [
    `Bonjour ${auteurName},`,
    `Votre ${navetteLabel.toLowerCase()} (n° ${demande.id}) a bien été soumise.`,
    `Elle attend la validation de ${displayRole}${serviceName ? ` (${serviceName})` : ""}.`,
    `Objet : ${demande.objet || "Sans objet"}`,
    `Date de dépôt : ${formatDateTime(demande.dateDepot)}`,
    "",
    "Vous recevrez un email à chaque changement d'étape.",
  ].join("\n");
}

type SubmissionEmailContext = {
  navetteLabel: string;
  demande: Demandeur;
  auteurName: string;
  displayRole: string;
  serviceName: string | null;
};


