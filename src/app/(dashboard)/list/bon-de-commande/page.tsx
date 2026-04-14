
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma_v2";
import Link from "next/link";
import Image from "next/image";
import PrintButton from "@/components/PrintButton";
import BDCActionCell from "@/components/BDCActionCell";
import SelectionTable from "@/components/SelectionTable";
import { generateNavetteReference } from "@/lib/reference";

// Type pour les données du bon de commande
type BonDeCommandeData = {
  id: number;
  ordre: number;
  service: string;
  reference: string;
  designation: string;
  specification: string;
  unites: string;
  qtes: string;
  pu: string;
  total: string;
  resteALivrer: string;
  isBCGenere: boolean;
};

type DemandeWithRelations = Prisma.DemandeurGetPayload<{
  include: {
    auteur: {
      include: {
        service: {
          select: {
            nomService: true;
            abreviation: true;
          };
        };
      };
    };
  };
}>;

// Colonnes de la table
const columns = [
  {
    header: "N° d'ordre",
    accessor: "ordre",
    className: "hidden md:table-cell",
  },
  {
    header: "Service demandeur",
    accessor: "service",
    className: "hidden md:table-cell",
  },
  {
    header: "Ref navette achat",
    accessor: "reference",
  },
  {
    header: "Designation",
    accessor: "designation",
  },
  {
    header: "Specification",
    accessor: "specification",
    className: "hidden lg:table-cell",
  },
  {
    header: "Unites",
    accessor: "unites",
    className: "hidden xl:table-cell",
  },
  {
    header: "Qtes",
    accessor: "qtes",
    className: "hidden md:table-cell",
  },
  {
    header: "P.U",
    accessor: "pu",
    className: "hidden lg:table-cell",
  },
  {
    header: "Total",
    accessor: "total",
  },
  {
    header: "Reste à livrer",
    accessor: "resteALivrer",
    className: "hidden xl:table-cell",
  },
  {
    header: "Action",
    accessor: "actions",
    className: "text-center"
  },
];



// Fonction pour récupérer les bons de commande (Navette Achat)
async function getBonsDeCommande(
  search?: string,
  filterType?: string,
  filterValue?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<{
  data: BonDeCommandeData[];
}> {
  try {

    // Build where clause for search and filters
    const where: Prisma.DemandeurWhereInput = {
      type: "ACHAT",
      statut: "VALIDEE",
    };

    if (search && search.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        {
          objet: {
            contains: searchTerm,
          },
        },
        {
          description: {
            contains: searchTerm,
          },
        },
        {
          auteur: {
            service: {
              nomService: {
                contains: searchTerm
              }
            }
          }
        }
      ];
    }


    // Build orderBy clause
    let orderBy: Prisma.DemandeurOrderByWithRelationInput = {
      dateDepot: 'desc',
    };

    if (sortBy === "montant") {
      orderBy = { montant: sortOrder === 'asc' ? 'asc' : 'desc' };
    }

    // Récupérer les données
    const demandes = await prisma.demandeur.findMany({
      where,
      include: {
        auteur: {
          select: {
            nom: true,
            prenom: true,
            prenomUsuelle: true,
            service: {
              select: {
                nomService: true,
                abreviation: true,
              }
            }
          }
        }
      },
      orderBy,
    });

    // Transformer les données
    const data = demandes.map((item: any) => {
      const reference = generateNavetteReference(item);

      return {
        id: item.id,
        ordre: item.id, // Ou un autre numéro d'ordre si disponible, ici on utilise ID
        service: item.auteur?.service?.nomService || 'N/A',
        reference: reference,
        designation: item.objet || 'N/A',
        specification: item.description || 'N/A',
        unites: "U", // Valeur par défaut demandée
        qtes: item.quantite ? item.quantite.toString() : '0',
        pu: item.pu ? `${Number(item.pu).toFixed(2)}` : '0.00',
        total: item.montant ? `${Number(item.montant).toFixed(2)} Ar` : '0.00 Ar',
        resteALivrer: "N/A", // Valeur par défaut demandée
        isBCGenere: !!item.isBCGenere,
      };
    });

    return {
      data,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des bons de commande:', error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    filterType?: string;
    filterValue?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

const BonDeCommandePage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams.search || '';
  const filterType = resolvedParams.filterType;
  const filterValue = resolvedParams.filterValue;
  const sortBy = resolvedParams.sortBy;
  const sortOrder = resolvedParams.sortOrder as "asc" | "desc" | undefined;

  const { data: bdcData } = await getBonsDeCommande(
    searchQuery,
    filterType,
    filterValue,
    sortBy,
    sortOrder
  );

  return (
    <div className="surface-panel flex-1 m-4 mt-0 relative">
      <SelectionTable
        initialData={bdcData}
        columns={columns.filter(c => c.accessor !== 'actions')}
        exportPrefix="Bons_de_Commande"
        docType="BDC"
        title="Historique des bons de commande"
        description="Visualisez et exportez vos bons de commande validés."
        baseUrl="/list/bon-de-commande"
        filterButtons={<FilterSortButtons key="filter-bdc" baseUrl="/list/bon-de-commande" />}
      />


    </div>
  );
};

export default BonDeCommandePage;
