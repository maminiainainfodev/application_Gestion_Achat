
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const steps = await prisma.workflowEtapes.findMany({
        where: { type: 'ACHAT' },
        orderBy: { etape: 'asc' }
    });
    console.log(JSON.stringify(steps, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
