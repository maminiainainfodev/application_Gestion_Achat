import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer un compte utilisateur par matricule
export async function GET(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    const compte = await prisma.comptesUtilisateurs.findUnique({
      where: { matricule_collaborateur: matricule },
      include: {
        collaborateur: {
          select: {
            matricule: true,
            nom: true,
            prenom: true,
            prenomUsuelle: true,
          },
        },
      },
    });

    if (!compte) {
      return NextResponse.json(
        { error: "Compte utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(compte);
  } catch (error) {
    console.error("Erreur lors de la récupération du compte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du compte utilisateur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour le mot de passe
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    const body = await request.json();
    const { MotDePasse } = body;

    if (!MotDePasse) {
      return NextResponse.json(
        { error: "Le mot de passe est requis" },
        { status: 400 }
      );
    }

    const existing = await prisma.comptesUtilisateurs.findUnique({
      where: { matricule_collaborateur: matricule },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Compte utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const compte = await prisma.comptesUtilisateurs.update({
      where: { matricule_collaborateur: matricule },
      data: { motDePasse: MotDePasse },
    });

    return NextResponse.json(
      { message: "Mot de passe mis à jour avec succès", data: compte },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour du mot de passe" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un compte utilisateur
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ matricule: string }> }
) {
  try {
    const { matricule } = await params;
    const existing = await prisma.comptesUtilisateurs.findUnique({
      where: { matricule_collaborateur: matricule },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Compte utilisateur non trouvé" },
        { status: 404 }
      );
    }

    await prisma.comptesUtilisateurs.delete({
      where: { matricule_collaborateur: matricule },
    });

    return NextResponse.json(
      { message: "Compte utilisateur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression du compte:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression du compte" },
      { status: 500 }
    );
  }
}


