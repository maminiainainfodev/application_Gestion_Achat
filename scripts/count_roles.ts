import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
    console.log("--- Role Counts ---");
    const counts = await prisma.collaborateurRoles.groupBy({
        by: ['roleID'],
        _count: { matricule: true }
    });

    const roles = await prisma.roles.findMany();
    const report = counts.map(c => ({
        roleID: c.roleID,
        nomRole: roles.find(r => r.id === c.roleID)?.nomRole || 'Unknown',
        count: c._count.matricule
    }));

    console.table(report);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
