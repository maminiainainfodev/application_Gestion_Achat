
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const steps = await prisma.workflowEtapes.findMany({
        where: { type: 'ACHAT' },
        orderBy: { etape: 'asc' }
    });
    console.log('ACHAT Steps:', steps);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
