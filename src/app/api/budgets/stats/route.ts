import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      include: {
        service: {
          select: {
            nomService: true,
            abreviation: true,
          },
        },
      },
      orderBy: {
        codeBudgetaire: 'asc',
      },
    });

    // Grouper les budgets par service et calculer le total
    const budgetsByService = budgets.reduce((acc, budget) => {
      const serviceName = budget.service?.nomService || budget.service?.abreviation || 'Non alloué';
      const montant = budget.montantDisponible.toNumber();
      
      if (!acc[serviceName]) {
        acc[serviceName] = 0;
      }
      acc[serviceName] += montant;
      
      return acc;
    }, {} as Record<string, number>);

    // Convertir en tableau pour le graphique
    const data = Object.entries(budgetsByService).map(([service, montant]) => ({
      name: service.length > 10 ? service.substring(0, 10) + '...' : service,
      montant: Math.round(montant),
    }));

    // Limiter à 12 services maximum pour le graphique
    const limitedData = data.slice(0, 12);

    return NextResponse.json(limitedData);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques de budget:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques de budget" },
      { status: 500 }
    );
  }
}

