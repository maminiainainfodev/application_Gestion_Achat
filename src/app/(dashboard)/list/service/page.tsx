import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

type ServiceData = {
  ID_Service: number;
  NomService: string;
  Abreviation: string;
  ChefMatricule: string;
};

type ServiceWithRelations = Prisma.ServiceGetPayload<{
  include: {
    chef: {
      select: {
        nom: true;
        prenom: true;
        matricule: true;
      };
    };
  };
}>;

const columns = [
  {
    header: "Service",
    accessor: "NomService",
  },
  {
    header: "Abréviation",
    accessor: "Abreviation",
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

async function getServices(
  page: number = 1, 
  search?: string,
  filterType?: string,
  filterValue?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<{
  data: ServiceData[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build where clause for search and filters
    const where: Prisma.ServiceWhereInput = {};
    
    if (search && search.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        {
          nomService: {
            contains: searchTerm,
          },
        },
        {
          abreviation: {
            contains: searchTerm,
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
      if (filterType === "chef") {
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

    const total = await prisma.service.count({
      where,
    });

    // Build orderBy clause
    let orderBy: Prisma.ServiceOrderByWithRelationInput = {
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
        nomService: order,
      };
    }

    const services = await prisma.service.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
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

    const data: ServiceData[] = services.map((service: ServiceWithRelations) => ({
      ID_Service: service.id,
      ID: service.id, // Pour le formulaire
      NomService: service.nomService,
      Abreviation: service.abreviation || '',
      ChefServiceMatricule: service.chefServiceMatricule || null, // Garder le matricule pour le formulaire
      ChefMatricule: service.chef 
        ? `${service.chef.prenom || ''} ${service.chef.nom || ''}`.trim() || service.chef.matricule 
        : 'Non assigné', // Pour l'affichage
    }));

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
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

const ServiceListPage = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchQuery = searchParams.search || '';
  const filterType = searchParams.filterType;
  const filterValue = searchParams.filterValue;
  const sortBy = searchParams.sortBy;
  const sortOrder = searchParams.sortOrder as "asc" | "desc" | undefined;
  
  const { 
    data: servicesData, 
    totalPages, 
    total, 
    currentPage: page 
  } = await getServices(currentPage, searchQuery, filterType, filterValue, sortBy, sortOrder);

  const renderRow = (item: ServiceData) => (
    <tr
      key={item.ID_Service}
      className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.NomService}</h3>
          <p className="text-xs text-gray-500">Abrev: {item.Abreviation}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.Abreviation}</td>
      <td className="hidden lg:table-cell">{item.ChefMatricule}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal 
                table="service" 
                type="update" 
                data={item}
                id={item.ID_Service}
              />
              <FormModal 
                table="service" 
                type="delete" 
                data={item}
                id={item.ID_Service} 
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
        <h1 className="hidden md:block text-lg font-semibold">Tous les Services</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch baseUrl="/list/service" placeholder="Rechercher par nom, abréviation ou chef..." />
          <div className="flex items-center gap-4 self-end">
            <FilterSortButtons baseUrl="/list/service" />
            {role === "admin" && (
              <FormModal table="service" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={servicesData} />
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/list/service" />
      <div className="text-sm text-gray-500 mt-2 px-4">
        Affichage de {((page - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(page * ITEMS_PER_PAGE, total)} sur {total} services
      </div>
    </div>
  );
};

export default ServiceListPage;