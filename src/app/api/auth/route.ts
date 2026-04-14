import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const matricule = cookieStore.get("matricule")?.value;
    const role = cookieStore.get("role")?.value;

    if (!matricule || !role) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Récupérer les informations complètes du collaborateur
    const collaborateur = await prisma.collaborateur.findUnique({
      where: { matricule },
      include: {
        fonction: {
          select: {
            nomFonction: true,
            abreviation: true,
          },
        },
        service: {
          select: {
            nomService: true,
            abreviation: true,
          },
        },
      },
    });

    if (!collaborateur) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      matricule: collaborateur.matricule,
      nom: collaborateur.nom,
      prenom: collaborateur.prenom,
      prenomUsuelle: collaborateur.prenomUsuelle || null,
      fonction: collaborateur.fonction?.nomFonction || "N/A",
      fonctionAbbrev: collaborateur.fonction?.abreviation || null,
      service: collaborateur.service?.nomService || "N/A",
      serviceAbbrev: collaborateur.service?.abreviation || null,
      photo: collaborateur.photo,
      telephone: collaborateur.telephone,
      mailPro: collaborateur.mailPro,
      role: role,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}

