import { PrismaClient } from '../src/generated/prisma/client';
import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/"/g, '');
        }
    });
}

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

    let hasError = false;

    for (const statement of statements) {
        try {
            // Ignore comment-only statements more robustly
            if (statement.replace(/--.*/g, '').trim().length === 0) continue;

            await prisma.$executeRawUnsafe(statement);
            // console.log('Executed statement.'); // Reduce noise
        } catch (e) {
            console.error('Error executing statement:', e);
            // Log the statement provided it's not too long
            console.error('Statement:', statement.substring(0, 100) + '...');
            hasError = true;
        }
    }

    if (hasError) console.log("Finished with errors.");
    else console.log("Finished successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
