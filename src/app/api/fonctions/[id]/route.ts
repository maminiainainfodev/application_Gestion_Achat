import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Récupérer une fonction par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fonction = await prisma.fonction.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        service: {
          select: {
            id: true,
            nomService: true,
            abreviation: true,
          },
        },
        chef: {
          select: {
            nom: true,
            prenom: true,
            matricule: true,
          },
        },
      },
    });

    if (!fonction) {
      return NextResponse.json(
        { error: "Fonction non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(fonction);
  } catch (error) {
    console.error("Erreur lors de la récupération de la fonction:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la fonction" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une fonction
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      NomFonction,
      Abreviation,
      ServiceID,
      ChefMatricule,
    } = body;

    // Vérifier que la fonction existe
    const existing = await prisma.fonction.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Fonction non trouvée" },
        { status: 404 }
      );
    }

    const updateData: any = {
      nomFonction: NomFonction,
      abreviation: Abreviation || null,
      serviceId: ServiceID ? parseInt(ServiceID.toString(), 10) : null,
    };

    // Use specific Chef if provided, otherwise inherit from Service if ServiceID changed or is present
    if (ChefMatricule !== undefined) {
      updateData.chefMatricule = ChefMatricule || null;
    } else if (ServiceID) {
      // If ServiceID is changed/set but ChefMatricule is NOT explicitly provided, 
      // inherit from the new Service.
      const service = await prisma.service.findUnique({
        where: { id: parseInt(ServiceID.toString(), 10) },
        select: { chefServiceMatricule: true }
      });
      if (service) {
        updateData.chefMatricule = service.chefServiceMatricule;
      }
    } else if (ServiceID === null) {
      // If Service is removed (set to null) and no Chef provided? 
      // Maybe keep existing or set to null? 
      // Requirement: "ChefMatricule.fonction = ChefServiceMatricule.service si id.service = ServiceID.fonction"
      // If service is null, the condition doesn't apply.
      // But typically if you detach from a service you might lose the functional chef if he was the service chef.
      // Let's leave it as is unless explicitly cleared?
      // Or just do nothing, relying on user or default behavior.     
      // Let's assume user might want to manually set it if no service.
    }

    const fonction = await prisma.fonction.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Fonction mise à jour avec succès", data: fonction },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de la fonction:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour de la fonction" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une fonction
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier que la fonction existe
    const existing = await prisma.fonction.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Fonction non trouvée" },
        { status: 404 }
      );
    }

    await prisma.fonction.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Fonction supprimée avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la fonction:", error);

    // Gérer les erreurs de contrainte de clé étrangère
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Impossible de supprimer cette fonction car elle est utilisée par d'autres enregistrements" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression de la fonction" },
      { status: 500 }
    );
  }
}

