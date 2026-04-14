import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

// GET - Liste des comptes utilisateurs avec option de recherche
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();

    const where: Prisma.ComptesUtilisateursWhereInput = {};

    if (search) {
      where.OR = [
        {
          matricule_collaborateur: {
            contains: search,
          },
        },
        {
          collaborateur: {
            prenomUsuelle: {
              contains: search,
            },
          },
        },
        {
          collaborateur: {
            prenom: {
              contains: search,
            },
          },
        },
        {
          collaborateur: {
            nom: {
              contains: search,
            },
          },
        },
      ];
    }

    const comptes = await prisma.comptesUtilisateurs.findMany({
      where,
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
      orderBy: {
        matricule_collaborateur: "asc",
      },
    });

    return NextResponse.json(comptes);
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des comptes utilisateurs" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau compte utilisateur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Matricule, MotDePasse } = body;

    if (!Matricule || !MotDePasse) {
      return NextResponse.json(
        { error: "Le matricule et le mot de passe sont requis" },
        { status: 400 }
      );
    }

    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule: Matricule },
    });

    if (!collaborateur) {
      return NextResponse.json(
        { error: "Collaborateur introuvable pour ce matricule" },
        { status: 404 }
      );
    }

    const existingCompte = await prisma.comptesUtilisateurs.findUnique({
      where: { matricule_collaborateur: Matricule },
    });

    if (existingCompte) {
      return NextResponse.json(
        { error: "Un compte existe déjà pour ce collaborateur" },
        { status: 400 }
      );
    }

    const compte = await prisma.comptesUtilisateurs.create({
      data: {
        matricule_collaborateur: Matricule,
        motDePasse: MotDePasse,
      },
    });

    return NextResponse.json(
      { message: "Compte utilisateur créé avec succès", data: compte },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du compte:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
}


