import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const parseId = (rawId: string) => {
  const numericId = parseInt(rawId, 10);
  if (isNaN(numericId)) {
    throw new Error("ID invalide");
  }
  return numericId;
};

const includeRelations = {
  service: {
    select: {
      nomService: true,
      abreviation: true,
    },
  },
  fonction: {
    select: {
      nomFonction: true,
      abreviation: true,
    },
  },
} as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseId(id);
    const collaborateur = await prisma.collaborateur.findUnique({
      where: { id: numericId },
      include: includeRelations,
    });

    if (!collaborateur) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(collaborateur);
  } catch (error: any) {
    const message = error.message === "ID invalide" ? error.message : "Erreur lors de la récupération du collaborateur";
    const status = error.message === "ID invalide" ? 400 : 500;
    console.error("Erreur récupération collaborateur (ID):", error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseId(id);
    const body = await request.json();
    const {
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

    const existing = await prisma.collaborateur.findUnique({
      where: { id: numericId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    let fonctionAbbrev = null;
    if (Fonction) {
      const fonction = await prisma.fonction.findFirst({
        where: { nomFonction: Fonction },
        select: { abreviation: true },
      });
      fonctionAbbrev = fonction?.abreviation || null;
    }

    let serviceAbbrev = null;
    if (Service) {
      const service = await prisma.service.findFirst({
        where: { nomService: Service },
        select: { abreviation: true },
      });
      serviceAbbrev = service?.abreviation || null;
    }

    const civiliteValue = Civilite === "Homme" ? "HOMME" : Civilite === "Femme" ? "FEMME" : null;

    const updateData: any = {
      nom: Nom || null,
      prenom: Prenom || null,
      prenomUsuelle: PrenomUsuelle || null,
      civilite: civiliteValue,
      fonctionAbbrev,
      serviceAbbrev,
      telephone: Telephone || null,
      mailPro: MailPro || null,
    };

    if (Photo !== undefined && Photo !== null && Photo !== "") {
      updateData.photo = Photo;
    }

    const collaborateur = await prisma.collaborateur.update({
      where: { id: numericId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Collaborateur mis à jour avec succès", data: collaborateur },
      { status: 200 }
    );
  } catch (error: any) {
    const message = error.message === "ID invalide" ? error.message : error.message || "Erreur lors de la mise à jour du collaborateur";
    const status = error.message === "ID invalide" ? 400 : 500;
    console.error("Erreur mise à jour collaborateur (ID):", error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseId(id);

    const existing = await prisma.collaborateur.findUnique({
      where: { id: numericId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Collaborateur non trouvé" },
        { status: 404 }
      );
    }

    await prisma.collaborateur.delete({
      where: { id: numericId },
    });

    return NextResponse.json(
      { message: "Collaborateur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    const message = error.message === "ID invalide" ? error.message : error.message || "Erreur lors de la suppression du collaborateur";
    const status = error.message === "ID invalide" ? 400 : 500;
    console.error("Erreur suppression collaborateur (ID):", error);
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
