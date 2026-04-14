import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer tous les fournisseurs ou effectuer une recherche
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || searchParams.get("q") || "").trim();
    const limitParam = searchParams.get("limit");
    const hasSearch = search.length > 0;
    const limit = (() => {
      if (limitParam) {
        const parsed = Number(limitParam);
        if (!Number.isNaN(parsed)) {
          return Math.min(Math.max(parsed, 5), 100);
        }
      }
      return hasSearch ? 25 : 100;
    })();

    const fournisseurs = await prisma.fournisseur.findMany({
      where: hasSearch
        ? {
          OR: [
            { nom: { contains: search } },
            { nif: { contains: search } },
            { cin: { contains: search } },
            { nomCheque: { contains: search } },
            { adresse: { contains: search } },
          ],
        }
        : undefined,
      orderBy: {
        nom: "asc",
      },
      take: limit,
    });

    return NextResponse.json(fournisseurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des fournisseurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des fournisseurs" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau fournisseur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      Nom,
      Adresse,
      NomCheque,
      NIF,
      CIN,
    } = body;


    const fournisseur = await prisma.fournisseur.create({
      data: {
        nom: Nom || null,
        adresse: Adresse || null,
        nomCheque: NomCheque || null,
        nif: NIF || null,
        cin: CIN || null,
      },
    });

    return NextResponse.json(
      { message: "Fournisseur créé avec succès", data: fournisseur },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du fournisseur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du fournisseur" },
      { status: 500 }
    );
  }
}

