import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET - Récupérer un budget par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        service: {
          select: {
            id: true,
            nomService: true,
            abreviation: true,
          },
        },
      },
    });

    if (!budget) {
      return NextResponse.json(
        { error: "Budget non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(budget);
  } catch (error) {
    console.error("Erreur lors de la récupération du budget:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du budget" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un budget
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      CodeBudgetaire,
      MontantDisponible,
      ServiceID,
    } = body;

    // Vérifier que le budget existe
    const existing = await prisma.budget.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Budget non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier que le code budgétaire est unique s'il est différent de l'actuel
    if (CodeBudgetaire && CodeBudgetaire !== existing.codeBudgetaire) {
      const existingCode = await prisma.budget.findUnique({
        where: { codeBudgetaire: CodeBudgetaire },
      });

      if (existingCode) {
        return NextResponse.json(
          { error: "Un budget avec ce code existe déjà" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {
      codeBudgetaire: CodeBudgetaire,
      montantDisponible: new Prisma.Decimal(MontantDisponible || 0),
      serviceId: ServiceID ? parseInt(ServiceID.toString(), 10) : null,
    };

    const budget = await prisma.budget.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Budget mis à jour avec succès", data: budget },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du budget:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la mise à jour du budget" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un budget
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier que le budget existe
    const existing = await prisma.budget.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Budget non trouvé" },
        { status: 404 }
      );
    }

    await prisma.budget.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Budget supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de la suppression du budget:", error);

    // Gérer les erreurs de contrainte de clé étrangère
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Impossible de supprimer ce budget car il est utilisé par d'autres enregistrements" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la suppression du budget" },
      { status: 500 }
    );
  }
}

