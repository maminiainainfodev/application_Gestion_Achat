import { PrismaClient } from "../src/generated/prisma_v2";
import { generateNavetteReference } from "../src/lib/reference";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting population of reference fields...");

    // 1. Update Demandeur references
    const demandes = await prisma.demandeur.findMany({
        where: { reference: null },
        include: {
            auteur: {
                include: {
                    service: true
                }
            }
        }
    });

    console.log(`Found ${demandes.length} demandes without reference.`);

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
        console.log(`Updated Demandeur ${d.id} with reference: ${reference}`);
    }

    // 2. Update HistoriqueValidation references
    const historiques = await prisma.historiqueValidation.findMany({
        where: {
            OR: [
                { id_navette: null },
                { reference_navette: null }
            ]
        },
        include: {
            demandeur: true
        }
    });

    console.log(`Found ${historiques.length} history entries to update.`);

    for (const h of historiques) {
        // If the demandeur update failed or was already updated, we use the demandeur's reference
        // We might need to fetch the updated demandeur if it was updated in the previous loop
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
            console.log(`Updated History ${h.id} for Demandeur ${h.demandeurID}`);
        }
    }

    console.log("Population completed successfully.");
}

main()
    .catch((e) => {
        console.error("Error during population:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
