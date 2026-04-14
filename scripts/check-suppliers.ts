import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const nifToSearch = process.argv[2];
    const cinToSearch = process.argv[3];

    if (nifToSearch) {
        const existingNIF = await prisma.fournisseur.findUnique({
            where: { nif: nifToSearch },
        });
        console.log('Search by NIF:', nifToSearch);
        console.log(existingNIF ? 'FOUND:' : 'NOT FOUND', existingNIF);
    }

    if (cinToSearch) {
        const existingCIN = await prisma.fournisseur.findUnique({
            where: { cin: cinToSearch },
        });
        console.log('Search by CIN:', cinToSearch);
        console.log(existingCIN ? 'FOUND:' : 'NOT FOUND', existingCIN);
    }

    // List some suppliers to get an idea of the data
    const someSuppliers = await prisma.fournisseur.findMany({
        take: 10,
        orderBy: { id: 'desc' }
    });
    console.log('\nLast 10 suppliers:');
    console.table(someSuppliers.map((f: any) => ({ id: f.id, nom: f.nom, nif: f.nif, cin: f.cin })));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
