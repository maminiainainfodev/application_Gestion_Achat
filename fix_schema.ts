import { PrismaClient } from './src/generated/prisma_v2/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting schema update...');
    try {
        await prisma.$executeRawUnsafe(`
      ALTER TABLE demandeur 
      ADD COLUMN IF NOT EXISTS ModePaiement VARCHAR(191) NULL,
      ADD COLUMN IF NOT EXISTS PaiementDetail VARCHAR(191) NULL,
      ADD COLUMN IF NOT EXISTS IsAPExporte TINYINT(1) NOT NULL DEFAULT 0
    `);
        console.log('Schema update successful!');
    } catch (error) {
        console.error('Error updating schema:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
