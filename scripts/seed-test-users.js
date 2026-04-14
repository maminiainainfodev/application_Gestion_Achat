const { PrismaClient } = require('../src/generated/prisma_v2');

const prisma = new PrismaClient();

async function main() {
    const users = [
        { matricule: 'CA001', nom: 'Test', prenom: 'Chargee Achat', role: 'ChargeeAchat' },
        { matricule: 'RF001', nom: 'Test', prenom: 'Resp Financier', role: 'ResponsableFinancier' },
        { matricule: 'CG001', nom: 'Test', prenom: 'Controleur Gestion', role: 'ControleurGestion' },
        { matricule: 'PCRS 0046', nom: 'CHEF', prenom: 'SERVICE', role: 'ChefService' }, // Ensure Chef exists with role
    ];

    for (const u of users) {
        // 1. Create/Update Collaborateur
        let collab = await prisma.collaborateur.findUnique({ where: { matricule: u.matricule } });
        if (!collab) {
            collab = await prisma.collaborateur.create({
                data: {
                    matricule: u.matricule,
                    nom: u.nom,
                    prenom: u.prenom,
                    mailPro: `${u.matricule.replace(' ', '')}@test.com`,
                    serviceAbbrev: null // Assuming no specific service constraint
                }
            });
            console.log(`Created user ${u.matricule}`);
        } else {
            console.log(`User ${u.matricule} exists`);
        }

        // 2. Ensure Role exists
        let role = await prisma.roles.findUnique({ where: { nomRole: u.role } });
        if (!role) {
            role = await prisma.roles.create({ data: { nomRole: u.role } });
            console.log(`Created role ${u.role}`);
        }

        // 3. Assign Role if not assigned
        const userRole = await prisma.collaborateurRoles.findUnique({
            where: { matricule_roleID: { matricule: u.matricule, roleID: role.id } }
        });

        // Prisma findUnique for composite ID:
        const ur = await prisma.collaborateurRoles.findUnique({
            where: {
                matricule_roleID: {
                    matricule: u.matricule,
                    roleID: role.id
                }
            }
        });

        if (!ur) {
            await prisma.collaborateurRoles.create({
                data: {
                    matricule: u.matricule,
                    roleID: role.id
                }
            });
            console.log(`Assigned role ${u.role} to ${u.matricule}`);
        }
    }

    // Ensure Service 1 has PCRS 0046 as Chef
    await prisma.service.update({
        where: { id: 1 },
        data: { chefServiceMatricule: 'PCRS 0046' }
    });
    console.log('Confirmed PCRS 0046 as Chef of Service 1');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
