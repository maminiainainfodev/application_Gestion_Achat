import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer un collaborateur par matricule
export async function GET(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule: matricule },
      include: {
        service: {
          select: {
            nomService: true,
            abreviation: true,
          },
        },
        fonction: {
          select: {
            nomFonction: true,
            abreviation: true,
          },
        },
      },
    });

    if (!collaborateur) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(collaborateur);
  } catch (error) {
    console.error("Erreur lors de la récupération du collaborateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du collaborateur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un collaborateur
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    const body = await request.json();
    const {
      Nom,
      Prenom,
      PrenomUsuelle,
      Civilite,
      Fonction,
      Service,
      Telephone,
      MailPro,
      Photo,
    } = body;

    // Vérifier que le collaborateur existe
    const existing = await prisma.collaborateur.findUnique({
      where: { matricule: matricule },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    // Trouver l'abréviation de la fonction
    let fonctionAbbrev = null;
    if (Fonction) {
      const fonction = await prisma.fonction.findFirst({
        where: { nomFonction: Fonction },
        select: { abreviation: true },
      });
      fonctionAbbrev = fonction?.abreviation || null;
    }

    // Trouver l'abréviation du service
    let serviceAbbrev = null;
    if (Service) {
      const service = await prisma.service.findFirst({
        where: { nomService: Service },
        select: { abreviation: true },
      });
      serviceAbbrev = service?.abreviation || null;
    }

    // Convertir la civilité en enum
    const civiliteValue = Civilite === "Homme" ? "HOMME" : Civilite === "Femme" ? "FEMME" : null;

    // Préparer les données de mise à jour
    const updateData: any = {
      nom: Nom || null,
      prenom: Prenom || null,
      prenomUsuelle: PrenomUsuelle || null,
      civilite: civiliteValue,
      fonctionAbbrev,
      serviceAbbrev,
      telephone: Telephone || null,
      mailPro: MailPro || null,
    };

    // Ne mettre à jour la photo que si une nouvelle photo est fournie
    if (Photo !== undefined && Photo !== null && Photo !== "") {
      updateData.photo = Photo;
    }

    const collaborateur = await prisma.collaborateur.update({
      where: { matricule: matricule },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Collaborateur mis à jour avec succès", data: collaborateur },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du collaborateur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour du collaborateur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un collaborateur
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    // Vérifier que le collaborateur existe
    const existing = await prisma.collaborateur.findUnique({
      where: { matricule: matricule },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    await prisma.collaborateur.delete({
      where: { matricule: matricule },
    });

    return NextResponse.json(
      { message: "Collaborateur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression du collaborateur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression du collaborateur" },
      { status: 500 }
    );
  }
}

