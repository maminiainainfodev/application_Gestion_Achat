import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer tous les collaborateurs (optionnel, pour debug)
export async function GET() {
  try {
    const collaborateurs = await prisma.collaborateur.findMany({
      select: {
        matricule: true,
        nom: true,
        prenom: true,
        prenomUsuelle: true,
      },
      orderBy: {
        matricule: 'asc',
      },
    });
    return NextResponse.json(collaborateurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des collaborateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des collaborateurs" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau collaborateur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      Matricule,
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

    // Vérifier que le matricule est unique
    const existing = await prisma.collaborateur.findUnique({
      where: { matricule: Matricule },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un collaborateur avec ce matricule existe déjà" },
        { status: 400 }
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

    const collaborateur = await prisma.collaborateur.create({
      data: {
        matricule: Matricule,
        nom: Nom || null,
        prenom: Prenom || null,
        prenomUsuelle: PrenomUsuelle || null,
        civilite: civiliteValue,
        fonctionAbbrev,
        serviceAbbrev,
        telephone: Telephone || null,
        mailPro: MailPro || null,
        photo: Photo || null,
      },
    });

    return NextResponse.json(
      { message: "Collaborateur créé avec succès", data: collaborateur },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la création du collaborateur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du collaborateur" },
      { status: 500 }
    );
  }
}

