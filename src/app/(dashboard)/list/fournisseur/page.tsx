import prisma from "@/lib/prisma";
import { role } from "@/lib/data";
import { Suspense } from "react";
import FournisseurListClient from "./FournisseurListClient";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getAllFournisseurs() {
    try {
        const fournisseurs = await prisma.fournisseur.findMany({
            orderBy: { nom: 'asc' },
        });

        return fournisseurs.map(f => ({
            ID_Fournisseur: f.id,
            Nom: f.nom || '',
            Adresse: f.adresse || '',
            NomCheque: f.nomCheque || '',
            NIF: f.nif || '',
            CIN: f.cin || '',
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
        return [];
    }
}

const FournisseurListPage = async () => {
    const data = await getAllFournisseurs();

    return (
        <Suspense fallback={<div className="p-4 text-center">Chargement...</div>}>
            <FournisseurListClient initialData={data} total={data.length} role={role} />
        </Suspense>
    );
};

export default FournisseurListPage;