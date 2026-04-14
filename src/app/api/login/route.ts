import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

// Fonction pour normaliser un matricule (retirer espaces, insensible à la casse)
function normalizeMatricule(matricule: string): string {
  return matricule.replace(/\s+/g, '').toUpperCase().trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matricule, motDePasse } = body;

    if (!matricule || !motDePasse) {
      return NextResponse.json(
        { success: false, message: "Matricule et mot de passe requis" },
        { status: 400 }
      );
    }

    // Normaliser le matricule (retirer espaces, insensible à la casse)
    const normalizedMatricule = normalizeMatricule(matricule);

    // Vérification de format stricte retirée pour permettre plus de flexibilité
    // Le code continuera de chercher une correspondance basée sur la similitude (voir plus bas)

    // Chercher le compte avec le matricule normalisé
    // On doit chercher dans tous les collaborateurs car le matricule peut avoir des espaces en base
    const allCollaborateurs = await prisma.collaborateur.findMany({
      select: { matricule: true },
    });

    // Trouver le matricule correspondant (normalisé)
    const matchingMatricule = allCollaborateurs.find(
      (c) => normalizeMatricule(c.matricule) === normalizedMatricule
    )?.matricule;

    if (!matchingMatricule) {
      return NextResponse.json(
        { success: false, message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Vérifier si le compte utilisateur existe avec le matricule trouvé
    const compte = await prisma.comptesUtilisateurs.findUnique({
      where: {
        matricule_collaborateur: matchingMatricule,
      },
      include: {
        collaborateur: {
          include: {
            collaborateurRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!compte) {
      return NextResponse.json(
        { success: false, message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe (inchangé): hashé ou en clair
    let isPasswordValid = false;
    const isHashed = compte.motDePasse.startsWith("$2");
    if (isHashed) {
      isPasswordValid = await bcrypt.compare(motDePasse, compte.motDePasse);
    } else {
      isPasswordValid = motDePasse === compte.motDePasse;
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Récupérer le rôle du collaborateur
    const roles = compte.collaborateur.collaborateurRoles.map(
      (cr) => cr.role.nomRole
    );

    // Déterminer le rôle principal (priorité à "Administrateur")
    let rolePrincipal = roles[0] || "Utilisateur";
    if (roles.includes("Administrateur")) {
      rolePrincipal = "Administrateur";
    }

    // Stocker les informations dans des cookies (utiliser le matricule normalisé de la base)
    const cookieStore = await cookies();
    cookieStore.set("matricule", matchingMatricule, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });
    cookieStore.set("role", rolePrincipal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return NextResponse.json(
      {
        success: true,
        role: rolePrincipal,
        matricule: matchingMatricule,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la connexion" },
      { status: 500 }
    );
  }
}

