
process.env.DATABASE_URL = 'mysql://root:hcappAsereC23!*@localhost:3306/next_navette_application';

import prisma from '../src/lib/prisma';

// const prisma = new PrismaClient(); // Removed

async function main() {
    console.log('Checking existing ACHAT workflow steps...');
    try {
        const steps = await prisma.workflowEtapes.findMany({
            where: { type: 'ACHAT' },
            orderBy: { etape: 'asc' }
        });

        console.log('Current steps:', steps);

        const maxStep = steps.length > 0 ? steps[steps.length - 1].etape : 0;
        const newStepNumber = maxStep + 1;

        console.log(`Adding new step ${newStepNumber} for role 'ChargeeAchat'...`);

        // Check if it already exists to avoid duplicates
        const existing = await prisma.workflowEtapes.findUnique({
            where: {
                unique_type_etape: {
                    type: 'ACHAT',
                    etape: newStepNumber
                }
            }
        });

        if (existing) {
            console.log('Step already exists:', existing);
            return;
        }

        const newStep = await prisma.workflowEtapes.create({
            data: {
                type: 'ACHAT',
                etape: newStepNumber,
                roleRequis: 'ChargeeAchat', // Using the standard role name found in code
                description: 'Validation Finale & Génération Documents'
            }
        });

        console.log('Successfully added new step:', newStep);
    } catch (err) {
        console.error('Error querying/writing to DB:', err);
        throw err;
    }
}

main()
    .catch((e) => {
        console.error("SCRIPT ERROR OCCURRED:");
        console.error(e);
        if (e instanceof Error) {
            console.error("Message:", e.message);
            console.error("Stack:", e.stack);
        }
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
