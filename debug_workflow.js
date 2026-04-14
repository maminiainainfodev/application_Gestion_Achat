import prisma from './src/lib/prisma.js';

async function main() {
    const steps = await prisma.workflowEtapes.findMany({
        orderBy: { etape: 'asc' }
    });
    console.log('--- Workflow Steps ---');
    steps.forEach(s => console.log(`${s.type} - Step ${s.etape}: ${s.roleRequis}`));

    const demands = await prisma.demandeur.findMany({
        where: {
            statut: 'EN_ATTENTE'
        },
        include: {
            historique: {
                orderBy: { dateValidation: 'desc' }
            }
        },
        take: 10
    });

    console.log('\n--- Active Demands ---');
    demands.forEach(d => {
        console.log(`ID ${d.id} (${d.type}): Status ${d.statut}, Etape ${d.etapeActuelle}, Vers ${d.versQui}`);
        console.log('Historique: ' + d.historique.map(h => `${h.etape}:${h.statut}`).join(', '));
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
