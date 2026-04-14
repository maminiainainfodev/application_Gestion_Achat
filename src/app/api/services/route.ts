import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        nomService: true,
        abreviation: true,
        chefServiceMatricule: true,
      },
      orderBy: {
        nomService: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des services" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      NomService,
      Abreviation,
      ChefServiceMatricule,
    } = body;

    // Vérifier que le nom de service est unique
    const existing = await prisma.service.findUnique({
      where: { nomService: NomService },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un service avec ce nom existe déjà" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        nomService: NomService,
        abreviation: Abreviation || null,
        chefServiceMatricule: ChefServiceMatricule || null,
      },
    });

    return NextResponse.json(
      { message: "Service créé avec succès", data: service },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du service:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du service" },
      { status: 500 }
    );
  }
}

