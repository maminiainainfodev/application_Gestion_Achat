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
    const steps = await prisma.workflowEtapes.findMany({
        where: {
            type: 'ACHAT' // Using the enum value from schema
        },
        orderBy: {
            etape: 'asc'
        }
    });

    console.log('--- Current Workflow Steps for ACHAT ---');
    steps.forEach(s => {
        console.log(`Step ${s.etape}: Role=${s.roleRequis}, Desc=${s.description}`);
    });
    console.log('----------------------------------------');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
