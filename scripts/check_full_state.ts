import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
    console.log("--- Roles ---");
    const roles = await prisma.roles.findMany();
    console.table(roles);

    console.log("\n--- WorkflowEtapes ---");
    const workflow = await prisma.workflowEtapes.findMany({
        orderBy: [{ type: 'asc' }, { etape: 'asc' }]
    });
    console.table(workflow);

    console.log("\n--- All CollaborateurRoles ---");
    const collabRoles = await prisma.collaborateurRoles.findMany({
        include: { role: true, collaborateur: { select: { matricule: true, nom: true, prenom: true } } }
    });
    console.table(collabRoles.map(cr => ({
        matricule: cr.matricule,
        nom: cr.collaborateur.nom,
        prenom: cr.collaborateur.prenom,
        role: cr.role.nomRole
    })));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
