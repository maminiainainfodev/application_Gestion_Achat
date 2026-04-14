import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { generatePDFForDemandes } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;

    if (!matricule) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    const demandeId = parseInt(idStr);
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
                chef: { select: { nom: true, prenom: true } }
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

    // Récupérer le nom personnalisé depuis les query params si fourni
    const url = new URL(request.url);
    const customFilename = url.searchParams.get("filename");
    let title = url.searchParams.get("title") || undefined;

    // Générer un vrai PDF
    const payload = [
      {
        id: demande.id,
        numero: demande.numero,
        type: demande.type,
        dateDepot: demande.dateDepot,
        statut: demande.statut,
        etapeActuelle: demande.etapeActuelle,
        dateFinalisation: demande.dateFinalisation,
        objet: demande.objet,
        description: demande.description,
        motif: demande.motif,
        quantite: demande.quantite,
        pu: demande.pu,
        montant: demande.montant,
        devis: demande.devis,
        justificationChoix: demande.justificationChoix,
        imputationComptable: demande.imputationComptable,
        activite: demande.activite,
        codeTIGER: demande.codeTIGER,
        numeroBonCommande: demande.numeroBonCommande,
        versQui: demande.versQui,
        auteur: demande.auteur
          ? {
            matricule: demande.auteur.matricule,
            nom: demande.auteur.nom,
            prenom: demande.auteur.prenom,
            fonction: demande.auteur.fonction ? { nomFonction: demande.auteur.fonction.nomFonction, chef: (demande.auteur.fonction as any).chef } : null,
            service: demande.auteur.service ? { nomService: demande.auteur.service.nomService } : null,
            serviceAbbrev: demande.auteur.serviceAbbrev || null,
            telephone: demande.auteur.telephone || null,
            email: demande.auteur.mailPro || null,
          }
          : null,
        fournisseur: demande.fournisseur
          ? { nom: demande.fournisseur.nom }
          : null,
        budget: demande.budget
          ? {
            codeBudgetaire: demande.budget.codeBudgetaire,
            service: { nomService: demande.budget.service?.nomService || null },
          }
          : null,
        historique: demande.historique.map((h) => ({
          etape: h.etape,
          statut: h.statut,
          dateValidation: h.dateValidation,
          motifRefus: h.motifRefus,
          reference_navette: h.reference_navette || null,
          valideur: h.valideur
            ? {
              matricule: h.valideur.matricule,
              nom: h.valideur.nom,
              prenom: h.valideur.prenom,
            }
            : null,
        })),
        customFilename: customFilename || null,
      },
    ];

    const pdfBytes = await generatePDFForDemandes(payload as any, { title });

    // Utiliser le nom personnalisé ou générer un nom par défaut
    const filename = customFilename
      ? `${customFilename}.pdf`
      : `navette-${demande.numero || demandeId}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Erreur lors de la génération du PDF:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la génération du PDF",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
