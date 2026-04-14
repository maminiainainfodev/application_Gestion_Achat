
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma_v2";
import Link from "next/link";
import SelectionTable from "@/components/SelectionTable";
import APActionCell from "@/components/APActionCell";
import { generateNavetteReference } from "@/lib/reference";
import { cookies } from "next/headers";

// Type pour les données de l'autorisation de paiement (aligné sur BDC pour la cohérence)
type AutorisationPaiementData = {
    id: number;
    ordre: number;
    service: string;
    reference: string;
    designation: string;
    specification: string;
    unites: string;
    qtes: number;
    pu: string;
    total: string;
    resteALivrer: number;
    isAPGenere: boolean;
};

const columns = [
    { header: "Réf Navette Achat / Paiement Périodique", accessor: "reference" },
    { header: "Montant", accessor: "total" },
    { header: "Facture", accessor: "facture" },
    { header: "Commentaire", accessor: "specification" },
];

const ITEMS_PER_PAGE = 10;

async function getAutorisationsPaiement(
    search?: string,
    role?: string
): Promise<{
    data: AutorisationPaiementData[];
    total: number;
}> {
    try {
        // Filtrage par type selon le rôle
        // Si Chargée Achat, on ne montre que les Achats
        const isChargeeAchat = role === "Chargée Achat" || role === "ChargeeAchat";
        const allowedTypes = isChargeeAchat
            ? ["ACHAT"]
            : ["ACHAT", "PAIEMENT", "NOTE_FRAIS", "DRFMS", "DRFME"];

        const where: Prisma.DemandeurWhereInput = {
            type: { in: allowedTypes as any[] },
            statut: "VALIDEE",
        };

        if (search && search.trim()) {
            const searchTerm = search.trim();
            where.OR = [
                { objet: { contains: searchTerm } },
                { description: { contains: searchTerm } },
            ];
        }

        const total = await prisma.demandeur.count({ where });

        const demandes = await prisma.demandeur.findMany({
            where,
            include: {
                auteur: {
                    select: {
                        nom: true,
                        prenom: true,
                        prenomUsuelle: true,
                        service: true,
                    }
                }
            },
            orderBy: { dateDepot: 'desc' },
        });

        const data = demandes.map((item: any, index) => {
            const reference = generateNavetteReference(item);

            return {
                id: item.id,
                ordre: index + 1,
                service: item.auteur?.service?.nomService || '-',
                reference,
                designation: item.objet || '-',
                specification: item.description || '-',
                unites: "U",
                qtes: item.quantite || 0,
                pu: item.pu ? `${Number(item.pu).toLocaleString('fr-FR')} Ar` : '0 Ar',
                total: item.montant ? Number(item.montant).toLocaleString('fr-FR') : '0',
                facture: item.numeroBonCommande || '-',
                resteALivrer: 0,
                isAPGenere: item.isAPGenere || false,
            };
        });

        return {
            data,
            total,
        };
    } catch (error) {
        console.error('Erreur:', error);
        return { data: [], total: 0 };
    }
}

interface PageProps {
    searchParams: Promise<{
        search?: string;
    }>;
}

const AutorisationPaiementPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const searchQuery = params.search || '';

    // Récupérer le rôle des cookies
    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;

    const { data: apData, total } = await getAutorisationsPaiement(
        searchQuery,
        role
    );

    return (
        <div className="surface-panel flex-1 m-4 mt-0 relative">
            <SelectionTable
                initialData={apData}
                columns={columns.filter(c => c.accessor !== 'actions')}
                exportPrefix="Autorisations_Paiement"
                docType="AP"
                title="Autorisation de paiement"
                baseUrl="/list/autorisation-paiement"
            />

            <div className="mt-4 px-4">
                <div className="text-sm text-gray-500">
                    Total: {total} éléments
                </div>
            </div>
        </div>
    );
};

export default AutorisationPaiementPage;
