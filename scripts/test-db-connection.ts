import { PrismaClient } from '../src/generated/prisma_v2';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing database connection...');
    try {
        const count = await prisma.collaborateur.count();
        console.log(`Successfully connected! Found ${count} collaborateurs.`);
        const firstCollab = await prisma.collaborateur.findFirst();
        console.log('Sample data:', firstCollab);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
