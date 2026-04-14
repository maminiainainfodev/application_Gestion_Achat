import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer toutes les relations Collaborateur-Rôle
export async function GET() {
  try {
    const relations = await prisma.collaborateurRoles.findMany({
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
      orderBy: [
        { matricule: 'asc' },
        { roleID: 'asc' },
      ],
    });

    return NextResponse.json(relations);
  } catch (error) {
    console.error("Erreur lors de la récupération des relations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des relations" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle relation Collaborateur-Rôle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      Matricule,
      RoleID,
    } = body;

    // Vérifier que la relation n'existe pas déjà
    const existing = await prisma.collaborateurRoles.findUnique({
      where: {
        matricule_roleID: {
          matricule: Matricule,
          roleID: parseInt(RoleID.toString(), 10),
        },
      },
    }).catch(() => null);

    if (existing) {
      return NextResponse.json(
        { error: "Cette relation existe déjà" },
        { status: 400 }
      );
    }

    // Vérifier que le collaborateur existe
    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule: Matricule },
    });

    if (!collaborateur) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier que le rôle existe
    const role = await prisma.roles.findUnique({
      where: { id: parseInt(RoleID.toString(), 10) },
    });

    if (!role) {
      return NextResponse.json(
        { error: "Rôle non trouvé" },
        { status: 404 }
      );
    }

    const relation = await prisma.collaborateurRoles.create({
      data: {
        matricule: Matricule,
        roleID: parseInt(RoleID.toString(), 10),
      },
    });

    return NextResponse.json(
      { message: "Relation créée avec succès", data: relation },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création de la relation:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création de la relation" },
      { status: 500 }
    );
  }
}

