import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const fonctions = await prisma.fonction.findMany({
      include: {
        service: {
          select: {
            id: true,
            nomService: true,
            abreviation: true,
          },
        },
      },
      orderBy: {
        nomFonction: 'asc',
      },
    });

    const data = fonctions.map((fonction) => ({
      id: fonction.id,
      nomFonction: fonction.nomFonction,
      abreviation: fonction.abreviation,
      serviceId: fonction.serviceId,
      service: fonction.service
        ? {
            id: fonction.service.id,
            nomService: fonction.service.nomService,
            abreviation: fonction.service.abreviation,
          }
        : null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des fonctions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des fonctions" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle fonction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      NomFonction,
      Abreviation,
      ServiceID,
      ChefMatricule,
    } = body;

    // Vérifier que le nom de fonction est unique
    const existing = await prisma.fonction.findUnique({
      where: { nomFonction: NomFonction },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Une fonction avec ce nom existe déjà" },
        { status: 400 }
      );
    }

    const fonction = await prisma.fonction.create({
      data: {
        nomFonction: NomFonction,
        abreviation: Abreviation || null,
        serviceId: ServiceID ? parseInt(ServiceID.toString(), 10) : null,
        chefMatricule: ChefMatricule || null,
      },
    });

    return NextResponse.json(
      { message: "Fonction créée avec succès", data: fonction },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création de la fonction:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création de la fonction" },
      { status: 500 }
    );
  }
}

