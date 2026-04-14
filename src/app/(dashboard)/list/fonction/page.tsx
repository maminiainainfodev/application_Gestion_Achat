import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

// Type pour les données de fonction
type FonctionData = {
  ID_Fonction: number;
  NomFonction: string;
  Abreviation: string;
  ServiceID: number | string | undefined;
  ChefMatricule: string;
  Service?: string;
  Chef?: string;
};

// Type pour la fonction avec les relations incluses
type FonctionWithRelations = Prisma.FonctionGetPayload<{
  include: {
    service: {
      select: {
        nomService: true;
        abreviation: true;
      };
    };
    chef: {
      select: {
        nom: true;
        prenom: true;
        matricule: true;
      };
    };
  };
}>;

// Colonnes de la table
const columns = [
  {
    header: "Fonction",
    accessor: "NomFonction",
  },
  {
    header: "Abréviation",
    accessor: "Abreviation",
    className: "hidden md:table-cell",
  },
  {
    header: "Service",
    accessor: "ServiceID",
    className: "hidden md:table-cell",
  },
  {
    header: "Chef",
    accessor: "ChefMatricule",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ITEMS_PER_PAGE = 6;

// Fonction pour récupérer les fonctions depuis la base de données avec pagination
async function getFonctions(
  page: number = 1, 
  search?: string,
  filterType?: string,
  filterValue?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<{
  data: FonctionData[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build where clause for search and filters
    const where: Prisma.FonctionWhereInput = {};
    
    if (search && search.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        {
          nomFonction: {
            contains: searchTerm,
          },
        },
        {
          abreviation: {
            contains: searchTerm,
          },
        },
        {
          service: {
            nomService: {
              contains: searchTerm,
            },
          },
        },
        {
          chef: {
            OR: [
              {
                nom: {
                  contains: searchTerm,
                },
              },
              {
                prenom: {
                  contains: searchTerm,
                },
              },
              {
                matricule: {
                  contains: searchTerm,
                },
              },
            ],
          },
        },
      ];
    }

    // Apply filters
    if (filterType && filterValue) {
      if (filterType === "service") {
        where.service = {
          nomService: {
            contains: filterValue,
          },
        };
      } else if (filterType === "chef") {
        where.chef = {
          OR: [
            {
              nom: {
                contains: filterValue,
              },
            },
            {
              prenom: {
                contains: filterValue,
              },
            },
            {
              matricule: {
                contains: filterValue,
              },
            },
          ],
        };
      }
    }

    const total = await prisma.fonction.count({
      where,
    });

    // Build orderBy clause
    let orderBy: Prisma.FonctionOrderByWithRelationInput = {
      id: 'asc',
    };

    if (sortBy === "date") {
      const order: "asc" | "desc" = sortOrder === "desc" ? "desc" : "asc";
      orderBy = {
        id: order,
      };
    } else if (sortBy === "nom") {
      const order: "asc" | "desc" = sortOrder === "desc" ? "desc" : "asc";
      orderBy = {
        nomFonction: order,
      };
    }
    
    // Récupérer les fonctions paginées
    const fonctions = await prisma.fonction.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        service: {
          select: {
            nomService: true,
            abreviation: true,
          },
        },
        chef: {
          select: {
            nom: true,
            prenom: true,
            matricule: true,
          },
        },
      },
      orderBy,
    });

    // Transformer les données Prisma au format attendu par le composant
    const data = fonctions.map((fonction: FonctionWithRelations) => ({
      ID_Fonction: fonction.id,
      NomFonction: fonction.nomFonction,
      Abreviation: fonction.abreviation || '',
      ServiceID: fonction.serviceId || undefined, // Garder l'ID numérique pour le formulaire
      ChefMatricule: fonction.chefMatricule || '', // Garder le matricule pour le formulaire
      Service: fonction.service?.nomService || fonction.service?.abreviation || 'N/A', // Pour l'affichage
      Chef: fonction.chef ? `${fonction.chef.prenom || ''} ${fonction.chef.nom || ''}`.trim() || fonction.chef.matricule : 'N/A', // Pour l'affichage
    }));

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des fonctions:', error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
    filterType?: string;
    filterValue?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

const FonctionListPage = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchQuery = searchParams.search || '';
  const filterType = searchParams.filterType;
  const filterValue = searchParams.filterValue;
  const sortBy = searchParams.sortBy;
  const sortOrder = searchParams.sortOrder as "asc" | "desc" | undefined;
  
  const { data: fonctionsData, totalPages, total, currentPage: page } = await getFonctions(
    currentPage, 
    searchQuery, 
    filterType, 
    filterValue, 
    sortBy, 
    sortOrder
  );

  const renderRow = (item: FonctionData) => (
    <tr
      key={item.ID_Fonction}
      className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.NomFonction}</h3>
          <p className="text-xs text-gray-500">Abrev: {item.Abreviation}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.Abreviation || 'N/A'}</td>
      <td className="hidden md:table-cell">{item.Service || 'N/A'}</td>
      <td className="hidden lg:table-cell">{item.Chef || 'N/A'}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal 
                table="fonction" 
                type="update" 
                data={item}
                id={item.ID_Fonction}
              />
              <FormModal 
                table="fonction" 
                type="delete" 
                data={item}
                id={item.ID_Fonction} 
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="surface-panel flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Toutes les Fonctions</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch baseUrl="/list/fonction" placeholder="Rechercher par nom, abréviation, service ou chef..." />
          <div className="flex items-center gap-4 self-end">
            <FilterSortButtons baseUrl="/list/fonction" />
            {role === "admin" && (
              <FormModal table="fonction" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={fonctionsData} />
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/list/fonction" />
      <div className="text-sm text-gray-500 mt-2 px-4">
        Affichage de {((page - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(page * ITEMS_PER_PAGE, total)} sur {total} fonctions
      </div>
    </div>
  );
};

export default FonctionListPage;
