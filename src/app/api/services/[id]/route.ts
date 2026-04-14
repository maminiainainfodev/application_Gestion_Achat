import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer un service par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        chef: {
          select: {
            nom: true,
            prenom: true,
            matricule: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Erreur lors de la récupération du service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du service" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un service
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      NomService,
      Abreviation,
      ChefServiceMatricule,
    } = body;

    // Vérifier que le service existe
    const existing = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 }
      );
    }

    const updateData: any = {
      nomService: NomService,
      abreviation: Abreviation || null,
      chefServiceMatricule: ChefServiceMatricule || null,
    };

    const service = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    // START: Sync Logic - Update child Fonctions if Chef changed
    // We check if ChefServiceMatricule was part of the request (undefined means not sent, null means clear)
    if (ChefServiceMatricule !== undefined) {
      await prisma.fonction.updateMany({
        where: { serviceId: service.id },
        data: { chefMatricule: ChefServiceMatricule || null },
      });
    }
    // END: Sync Logic

    return NextResponse.json(
      { message: "Service mis à jour avec succès", data: service },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du service:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour du service" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un service
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier que le service existe
    const existing = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Service supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression du service:", error);

    // Gérer les erreurs de contrainte de clé étrangère
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Impossible de supprimer ce service car il est utilisé par d'autres enregistrements" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression du service" },
      { status: 500 }
    );
  }
}

