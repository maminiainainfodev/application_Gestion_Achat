import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer un fournisseur par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fournisseur = await prisma.fournisseur.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!fournisseur) {
      return NextResponse.json(
        { error: "Fournisseur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(fournisseur);
  } catch (error) {
    console.error("Erreur lors de la récupération du fournisseur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du fournisseur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un fournisseur
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      Nom,
      Adresse,
      NomCheque,
      NIF,
      CIN,
    } = body;

    // Vérifier que le fournisseur existe
    const existing = await prisma.fournisseur.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Fournisseur non trouvé" },
        { status: 404 }
      );
    }


    const updateData: any = {
      nom: Nom || null,
      adresse: Adresse || null,
      nomCheque: NomCheque || null,
      nif: NIF || null,
      cin: CIN || null,
    };

    const fournisseur = await prisma.fournisseur.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Fournisseur mis à jour avec succès", data: fournisseur },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du fournisseur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour du fournisseur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un fournisseur
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier que le fournisseur existe
    const existing = await prisma.fournisseur.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Fournisseur non trouvé" },
        { status: 404 }
      );
    }

    await prisma.fournisseur.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Fournisseur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression du fournisseur:", error);

    // Gérer les erreurs de contrainte de clé étrangère
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Impossible de supprimer ce fournisseur car il est utilisé par d'autres enregistrements" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression du fournisseur" },
      { status: 500 }
    );
  }
}

