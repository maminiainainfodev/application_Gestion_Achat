const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const sqlPath = path.join(__dirname, 'seed-workflow.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

    // Split by semicolon to get individual statements
    // Filter out empty statements and comments
    const statements = sqlContent
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    for (const statement of statements) {
        try {
            // Basic check to ensure it's a valid query (not just comments)
            if (statement.startsWith('--') && !statement.includes('\n')) continue;

            await prisma.$executeRawUnsafe(statement);
            console.log('Executed statement successfully.');
        } catch (e) {
            console.error('Error executing statement:', e);
            // Log the statement provided it's not too long
            console.error('Statement snippet:', statement.substring(0, 100));
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
