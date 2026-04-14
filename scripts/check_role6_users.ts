import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
    console.log("--- Users with Role ID 6 (Contrôleur de Gestion) ---");
    const collabRoles = await prisma.collaborateurRoles.findMany({
        where: { roleID: 6 },
        include: { collaborateur: true }
    });
    console.log(JSON.stringify(collabRoles, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
