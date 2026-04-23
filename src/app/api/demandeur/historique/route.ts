import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || searchParams.get("q") || "").trim();

    const budgets = await prisma.budget.findMany({
      where: search ? {
        OR: [
          { codeBudgetaire: { contains: search } },
          {
            service: {
              abreviation: { contains: search }
            }
          }
        ]
      } : undefined,
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
        codeBudgetaire: 'asc',
      },
    });

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("Erreur lors de la récupération des budgets:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des budgets" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau budget
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      CodeBudgetaire,
      MontantDisponible,
      ServiceID,
    } = body;

    // Vérifier que le code budgétaire est unique
    const existing = await prisma.budget.findUnique({
      where: { codeBudgetaire: CodeBudgetaire },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un budget avec ce code existe déjà" },
        { status: 400 }
      );
    }

    const budget = await prisma.budget.create({
      data: {
        codeBudgetaire: CodeBudgetaire,
        montantDisponible: new Prisma.import { Prisma } from "@prisma/client"; (MontantDisponible || 0),
          serviceId: ServiceID ? parseInt(ServiceID.toString(), 10) : null,
      },
});

return NextResponse.json(
  { message: "Budget créé avec succès", data: budget },
  { status: 201 }
);
  } catch (error: any) {
  console.error("Erreur lors de la création du budget:", error);
  return NextResponse.json(
    { error: error.message || "Erreur lors de la création du budget" },
    { status: 500 }
  );
}
}

