import { PrismaClient } from '../src/generated/prisma_v2';
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
    const types = ['ACHAT', 'PAIEMENT', 'NOTE_FRAIS', 'DRFMS', 'DRFME'];

    for (const type of types) {
        console.log(`\n--- Workflow Steps for ${type} ---`);
        // @ts-ignore
        const steps = await prisma.workflowEtapes.findMany({
            where: { type: type as any },
            orderBy: { etape: 'asc' }
        });

        if (steps.length === 0) console.log("No steps found.");
        steps.forEach(s => {
            console.log(`Step ${s.etape}: Role=${s.roleRequis}, Desc=${s.description}`);
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
