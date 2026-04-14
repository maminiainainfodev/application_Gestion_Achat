import prisma from "@/lib/prisma";
import { role } from "@/lib/data";
import { Suspense } from "react";
import BudgetListClient from "./BudgetListClient";

export const dynamic = 'force-dynamic';

async function getAllBudgets() {
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

    return budgets.map(b => ({
      ID_Budget: b.id,
      CodeBudgetaire: b.codeBudgetaire,
      MontantDisponible: b.montantDisponible.toNumber(),
      ServiceID: b.serviceId,
      Service: b.service?.nomService || b.service?.abreviation || 'Non alloué',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des budgets:', error);
    return [];
  }
}

const BudgetListPage = async () => {
  const data = await getAllBudgets();

  return (
    <Suspense fallback={<div className="p-4 text-center">Chargement...</div>}>
      <BudgetListClient initialData={data} total={data.length} role={role} />
    </Suspense>
  );
};

export default BudgetListPage;