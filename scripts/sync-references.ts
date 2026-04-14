import { PrismaClient } from "../src/generated/prisma_v2";
import { generateNavetteReference } from "../src/lib/reference";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting synchronization of reference fields...");

    // 1. Update all Demandeur references
    const demandes = await prisma.demandeur.findMany({
        include: {
            auteur: {
                include: {
                    service: true
                }
            }
        }
    });

    console.log(`Found ${demandes.length} demandes to synchronize.`);

    for (const d of demandes) {
        const reference = generateNavetteReference({
            id: d.id,
            type: d.type,
            dateDepot: d.dateDepot,
            auteur: d.auteur as any
        });

        await prisma.demandeur.update({
            where: { id: d.id },
            data: { reference }
        });
        console.log(`Updated Demandeur ${d.id} with new reference: ${reference}`);
    }

    // 2. Update HistoriqueValidation references to match Demandeur
    const historiques = await prisma.historiqueValidation.findMany({
        include: {
            demandeur: true
        }
    });

    console.log(`Found ${historiques.length} history entries to synchronize.`);

    for (const h of historiques) {
        const updatedDemandeur = await prisma.demandeur.findUnique({
            where: { id: h.demandeurID }
        });

        if (updatedDemandeur) {
            await prisma.historiqueValidation.update({
                where: { id: h.id },
                data: {
                    id_navette: updatedDemandeur.id,
                    reference_navette: updatedDemandeur.reference
                }
            });
            console.log(`Updated History ${h.id} (Ref: ${updatedDemandeur.reference})`);
        }
    }

    console.log("Synchronization completed successfully.");
}

main()
    .catch((e) => {
        console.error("Error during synchronization:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
