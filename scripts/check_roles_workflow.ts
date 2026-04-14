import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
    console.log("--- Roles ---");
    const roles = await prisma.roles.findMany();
    console.table(roles);

    console.log("\n--- WorkflowEtapes (Achat & NoteFrais) ---");
    const workflow = await prisma.workflowEtapes.findMany({
        where: { type: { in: ['ACHAT', 'NOTE_FRAIS'] } },
        orderBy: [{ type: 'asc' }, { etape: 'asc' }]
    });
    console.table(workflow);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
