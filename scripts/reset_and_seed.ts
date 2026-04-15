import { PrismaClient } from '../src/generated/prisma_v2';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("== DEBUT DU NETTOYAGE ET RESET ==");

  // 1. Vider les tables
  console.log("1. Suppression des données opérationnelles...");
  await prisma.historiqueValidation.deleteMany({});
  await prisma.demandeur.deleteMany({});
  await prisma.budget.deleteMany({});
  await prisma.fournisseur.deleteMany({});

  console.log("2. Suppression des utilisateurs et comptes...");
  await prisma.comptesUtilisateurs.deleteMany({});
  await prisma.collaborateurRoles.deleteMany({});
  await prisma.collaborateur.deleteMany({});

  // 2. S'assurer que les rôles existent
  console.log("3. Création/Vérification des Rôles...");
  const roleNames = [
    "Administrateur",
    "Chef de service",
    "Chef de département",
    "Chargée d'achat",
    "Directrice Générale",
    "DRF",
    "Demandeur"
  ];
  const roles = await Promise.all(
    roleNames.map(nomRole =>
      prisma.roles.upsert({
        where: { nomRole },
        update: {},
        create: { nomRole }
      })
    )
  );
  
  // 3. S'assurer que les services de base existent (génériques)
  console.log("4. Création/Vérification de Services génériques...");
  const servicesData = [
    { nomService: "Service Informatique", abreviation: "IT" },
    { nomService: "Service Financier", abreviation: "FIN" },
    { nomService: "Service Achat", abreviation: "ACH" },
    { nomService: "Direction", abreviation: "DIR" },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { nomService: s.nomService },
      update: {},
      create: s
    });
  }

  // 4. Création des utilisateurs de test (Matricules en majuscules)
  const motDePasseAdmin = await bcrypt.hash('admin', 10);
  const motDePasseGenerique = await bcrypt.hash('test1234', 10);

  const testUsers = [
    { matricule: 'ADMINISTRATEUR', nom: 'Admin', prenom: 'Système', roleName: 'Administrateur', pwd: motDePasseAdmin },
    { matricule: 'CHEF_SERVICE', nom: 'Chef', prenom: 'De Service', roleName: 'Chef de service', pwd: motDePasseGenerique },
    { matricule: 'CHEF_DEPARTEMENT', nom: 'Chef', prenom: 'De Département', roleName: 'Chef de département', pwd: motDePasseGenerique },
    { matricule: 'CHARGEE_ACHAT', nom: 'Acheteur', prenom: 'Principal', roleName: "Chargée d'achat", pwd: motDePasseGenerique },
    { matricule: 'DIRECTRICE', nom: 'Directrice', prenom: 'Générale', roleName: 'Directrice Générale', pwd: motDePasseGenerique },
    { matricule: 'RESP_FINANCIER', nom: 'Responsable', prenom: 'Financier', roleName: 'DRF', pwd: motDePasseGenerique },
    { matricule: 'DEMANDEUR', nom: 'Employé', prenom: 'Standard', roleName: 'Demandeur', pwd: motDePasseGenerique }
  ];

  console.log("5. Création des Collaborateurs et de leurs Comptes...");
  for (const tu of testUsers) {
    // Création collaborateur
    await prisma.collaborateur.upsert({
      where: { matricule: tu.matricule },
      update: {},
      create: {
        matricule: tu.matricule,
        nom: tu.nom,
        prenom: tu.prenom
      }
    });

    // Création compte
    await prisma.comptesUtilisateurs.upsert({
      where: { matricule_collaborateur: tu.matricule },
      update: { motDePasse: tu.pwd },
      create: {
        matricule_collaborateur: tu.matricule,
        motDePasse: tu.pwd
      }
    });

    // Assignation du Rôle
    const r = roles.find(role => role.nomRole === tu.roleName);
    if (r) {
      await prisma.collaborateurRoles.upsert({
        where: { matricule_roleID: { matricule: tu.matricule, roleID: r.id } },
        update: {},
        create: {
          matricule: tu.matricule,
          roleID: r.id
        }
      });
    }
  }

  console.log("== RESET TERMINE AVEC SUCCES ==");
  console.log("Les utilisateurs suivants ont été créés :", testUsers.map(u => u.matricule));
}

main().catch(console.error).finally(() => prisma.$disconnect());
