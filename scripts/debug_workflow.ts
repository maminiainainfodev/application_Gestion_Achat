import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
    console.log("--- WorkflowEtapes ---");
    const workflow = await prisma.workflowEtapes.findMany({
        orderBy: [{ type: 'asc' }, { etape: 'asc' }]
    });
    console.table(workflow);

    console.log("\n--- Pending Demands ---");
    const demands = await prisma.demandeur.findMany({
        where: { statut: { in: ['EN_ATTENTE', 'EN_MAGASIN'] } },
        select: { id: true, type: true, etapeActuelle: true, statut: true, reference: true }
    });
    console.table(demands);

    console.log("\n--- Controllers (Contrôleurs de Gestion) ---");
    const controllers = await prisma.collaborateurRoles.findMany({
        where: { role: { nomRole: { contains: 'Contrôleur' } } },
        include: { role: true, collaborateur: { select: { matricule: true, nom: true, prenom: true } } }
    });
    console.table(controllers.map(c => ({
        matricule: c.matricule,
        nom: c.collaborateur.nom,
        prenom: c.collaborateur.prenom,
        role: c.role.nomRole
    })));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
