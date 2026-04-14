import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

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
    const modeParam = (searchParams.get("mode") || "").toLowerCase();
    const mode =
      modeParam === "demandeur"
        ? "demandeur"
        : modeParam === "valideur"
          ? "valideur"
          : "all";

    // Historique: exclure les demandes EN_ATTENTE
    // Visibilité:
    // - Admin: tout l'historique (hors EN_ATTENTE)
    // - Non-admin: seulement
    //   * demandes dont il est l'auteur
    //   * OU demandes où il a validé au moins une étape (historique.valideurMatricule = matricule)
    const whereClause: any = {};

    // Historique: inclure toutes les demandes, y compris EN_ATTENTE
    // whereClause.statut = { not: "EN_ATTENTE" }; 


    if (mode === "demandeur") {
      whereClause.auteurMatricule = matricule;
    } else if (mode === "valideur") {
      const roleSteps = await prisma.workflowEtapes.findMany({
        where: { roleRequis: role },
      });

      const roleStepConditions = roleSteps.map((step) => ({
        type: step.type,
        etapeActuelle: { gt: step.etape },
      }));

      whereClause.OR = [
        { historique: { some: { valideurMatricule: matricule } } },
        ...roleStepConditions,
      ];
    } else if (role !== "Administrateur") {
      whereClause.OR = [
        { auteurMatricule: matricule },
        { historique: { some: { valideurMatricule: matricule } } },
      ];
    }

    const demandes = await prisma.demandeur.findMany({
      where: whereClause,
      include: {
        auteur: {
          select: {
            matricule: true,
            nom: true,
            prenom: true,
            prenomUsuelle: true,
            civilite: true,
            mailPro: true,
            service: {
              select: {
                abreviation: true,
              },
            },
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
                prenomUsuelle: true,
              },
            },
          },
          orderBy: { dateValidation: "asc" },
        },
      },
      orderBy: { dateDepot: "desc" },
    });

    // Convertir les valeurs Decimal en nombres pour le JSON
    const demandesSerialized = demandes.map((demande) => ({
      ...demande,
      pu: demande.pu ? Number(demande.pu) : null,
      montant: demande.montant ? Number(demande.montant) : null,
    }));

    return NextResponse.json({ success: true, data: demandesSerialized }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la récupération de l'historique",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

