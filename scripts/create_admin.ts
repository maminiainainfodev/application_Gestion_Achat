import { PrismaClient } from '../src/generated/prisma_v2';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking if Roles 'Administrateur' exists...");
  let roleAdmin = await prisma.roles.findFirst({ where: { nomRole: 'Administrateur' } });
  if (!roleAdmin) {
    roleAdmin = await prisma.roles.create({ data: { nomRole: 'Administrateur' } });
  }

  const hashedPassword = await bcrypt.hash('admin', 10);

  console.log("Creating or updating Collaborateur ADMIN...");
  await prisma.collaborateur.upsert({
    where: { matricule: 'admin' },
    update: {},
    create: {
      matricule: 'admin',
      nom: 'Administrateur',
      prenom: 'System',
    }
  });

  console.log("Setting password...");
  await prisma.comptesUtilisateurs.upsert({
    where: { matricule_collaborateur: 'admin' },
    update: { motDePasse: hashedPassword },
    create: {
      matricule_collaborateur: 'admin',
      motDePasse: hashedPassword
    }
  });

  console.log("Assigning role...");
  const roleExists = await prisma.collaborateurRoles.findFirst({
    where: { matricule: 'admin', roleID: roleAdmin.id }
  });

  if (!roleExists) {
    await prisma.collaborateurRoles.create({
      data: {
        matricule: 'admin',
        roleID: roleAdmin.id
      }
    });
  }

  console.log('Compte admin créé avec succès (login: admin / mot de passe: admin)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
