import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer une relation par matricule et roleID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ matricule: string; roleID: string }> }
) {
  try {
    const { matricule, roleID } = await params;
    const relation = await prisma.collaborateurRoles.findUnique({
      where: {
        matricule_roleID: {
          matricule: matricule,
          roleID: parseInt(roleID, 10),
        },
      },
      include: {
        collaborateur: {
          select: {
            nom: true,
            prenom: true,
            matricule: true,
          },
        },
        role: {
          select: {
            id: true,
            nomRole: true,
          },
        },
      },
    });

    if (!relation) {
      return NextResponse.json(
        { error: "Relation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(relation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la relation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la relation" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une relation (en fait, on ne peut que supprimer et recréer)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ matricule: string; roleID: string }> }
) {
  try {
    const { matricule, roleID } = await params;
    const body = await request.json();
    const {
      Matricule,
      RoleID,
    } = body;

    // Vérifier que la relation existe
    const existing = await prisma.collaborateurRoles.findUnique({
      where: {
        matricule_roleID: {
          matricule: matricule,
          roleID: parseInt(roleID, 10),
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Relation non trouvée" },
        { status: 404 }
      );
    }

    // Si les valeurs changent, supprimer l'ancienne et créer la nouvelle
    if (Matricule !== matricule || parseInt(RoleID.toString(), 10) !== parseInt(roleID, 10)) {
      // Supprimer l'ancienne relation
      await prisma.collaborateurRoles.delete({
        where: {
          matricule_roleID: {
            matricule: matricule,
            roleID: parseInt(roleID, 10),
          },
        },
      });

      // Vérifier que la nouvelle relation n'existe pas déjà
      const newExisting = await prisma.collaborateurRoles.findUnique({
        where: {
          matricule_roleID: {
            matricule: Matricule,
            roleID: parseInt(RoleID.toString(), 10),
          },
        },
      });

      if (newExisting) {
        return NextResponse.json(
          { error: "Cette relation existe déjà" },
          { status: 400 }
        );
      }

      // Créer la nouvelle relation
      const relation = await prisma.collaborateurRoles.create({
        data: {
          matricule: Matricule,
          roleID: parseInt(RoleID.toString(), 10),
        },
      });

      return NextResponse.json(
        { message: "Relation mise à jour avec succès", data: relation },
        { status: 200 }
      );
    }

    // Si rien n'a changé, retourner la relation existante
    return NextResponse.json(
      { message: "Relation mise à jour avec succès", data: existing },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de la relation:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour de la relation" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une relation
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ matricule: string; roleID: string }> }
) {
  try {
    const { matricule, roleID } = await params;
    // Vérifier que la relation existe
    const existing = await prisma.collaborateurRoles.findUnique({
      where: {
        matricule_roleID: {
          matricule: matricule,
          roleID: parseInt(roleID, 10),
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Relation non trouvée" },
        { status: 404 }
      );
    }

    await prisma.collaborateurRoles.delete({
      where: {
        matricule_roleID: {
          matricule: matricule,
          roleID: parseInt(roleID, 10),
        },
      },
    });

    return NextResponse.json(
      { message: "Relation supprimée avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la relation:", error);

    // Gérer les erreurs de contrainte de clé étrangère
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Impossible de supprimer cette relation car elle est utilisée par d'autres enregistrements" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression de la relation" },
      { status: 500 }
    );
  }
}

