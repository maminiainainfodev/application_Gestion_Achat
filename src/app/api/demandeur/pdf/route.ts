import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { generatePDFForDemandes, generatePDFList } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

    const body = await request.json();
    const ids: number[] = Array.isArray(body?.ids) ? body.ids : [];
    let title = body?.title || undefined;
    const format = body?.format || "standard";

    if (!ids.length) {
      return NextResponse.json(
        { success: false, message: "Aucun ID fourni" },
        { status: 400 }
      );
    }

    const demandes = await prisma.demandeur.findMany({
      where: { id: { in: ids } },
      include: {
        auteur: {
          select: {
            matricule: true,
            nom: true,
            prenom: true,
            serviceAbbrev: true,
            mailPro: true,
            telephone: true,
            service: { select: { nomService: true, abreviation: true, chef: { select: { nom: true, prenom: true } } } },
            fonction: { select: { nomFonction: true, chef: { select: { nom: true, prenom: true } } } }
          },
        },
        fournisseur: {
          select: {
            nom: true,
            adresse: true,
            nomCheque: true,
            nif: true,
            cin: true
          }
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
              select: { matricule: true, nom: true, prenom: true },
            },
          },
          orderBy: { dateValidation: "asc" },
        },
      },
      orderBy: { dateDepot: "desc" },
    });

    if (!demandes.length) {
      return NextResponse.json(
        { success: false, message: "Aucune demande trouvée" },
        { status: 404 }
      );
    }

    const directrice = await prisma.collaborateur.findFirst({
      where: {
        collaborateurRoles: {
          some: {
            role: {
              nomRole: {
                in: ["Directrice", "Direction"]
              }
            }
          }
        }
      },
      select: { nom: true, prenom: true }
    });
    const directriceName = directrice ? `${directrice.prenom || ""} ${directrice.nom || ""}`.trim() : null;

    const payload = demandes.map((demande) => ({
      ...demande,
      directriceName,
      historique: demande.historique.map((h) => ({
        etape: h.etape,
        statut: h.statut,
        dateValidation: h.dateValidation,
        motifRefus: h.motifRefus,
        reference_navette: (h as any).reference_navette || null,
        valideur: h.valideur,
      })),
    }));

    let pdfBytes: Uint8Array;
    if (format === "list") {
      pdfBytes = await generatePDFList(payload as any, { title });
    } else {
      pdfBytes = await generatePDFForDemandes(payload as any, { title });
    }
    return new NextResponse(pdfBytes as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="navettes-${ids.join("_")}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("Erreur génération PDF multiple:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la génération des PDFs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


