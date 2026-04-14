import { PrismaClient } from '../src/generated/prisma/client';
import fs from 'fs';
import path from 'path';

// Load .env
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
    const roles = await prisma.roles.findMany();
    console.log('--- ALL ROLES ---');
    roles.forEach(r => console.log(`"${r.nomRole}"`));
    console.log('-----------------');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
