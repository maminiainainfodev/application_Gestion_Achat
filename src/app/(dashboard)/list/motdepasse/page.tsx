import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const columns = [
  {
    header: "Matricule",
    accessor: "Matricule",
  },
  {
    header: "Prénom usuel",
    accessor: "PrenomUsuel",
    className: "hidden md:table-cell",
  },
  {
    header: "Mot de passe",
    accessor: "MotDePasse",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const ITEMS_PER_PAGE = 8;

type CompteUtilisateur = {
  Matricule: string;
  PrenomUsuel: string;
  NomComplet: string;
  MotDePasse: string;
};

type CompteWithCollaborateur = any<{
  include: {
    collaborateur: {
      select: {
        prenomUsuelle: true;
        prenom: true;
        nom: true;
      };
    };
  };
}>;

async function getComptesUtilisateurs(
  page: number = 1,
  search?: string
): Promise<{
  data: CompteUtilisateur[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const where: any = {};

    if (search && search.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        {
          matricule_collaborateur: {
            contains: searchTerm,
          },
        },
        {
          collaborateur: {
            prenomUsuelle: {
              contains: searchTerm,
            },
          },
        },
        {
          collaborateur: {
            prenom: {
              contains: searchTerm,
            },
          },
        },
        {
          collaborateur: {
            nom: {
              contains: searchTerm,
            },
          },
        },
      ];
    }

    const total = await prisma.comptesUtilisateurs.count({ where });

    const comptes = await prisma.comptesUtilisateurs.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        collaborateur: {
          select: {
            prenomUsuelle: true,
            prenom: true,
            nom: true,
          },
        },
      },
      orderBy: {
        matricule_collaborateur: "asc",
      },
    });

    const data: CompteUtilisateur[] = comptes.map(
      (compte: CompteWithCollaborateur) => {
        const prenomUsuel =
          compte.collaborateur?.prenomUsuelle ||
          compte.collaborateur?.prenom ||
          "";
        const nomComplet = `${compte.collaborateur?.prenom || ""} ${
          compte.collaborateur?.nom || ""
        }`.trim();

        return {
          Matricule: compte.matricule_collaborateur,
          PrenomUsuel: prenomUsuel || "—",
          NomComplet: nomComplet || compte.matricule_collaborateur,
          MotDePasse: compte.motDePasse,
        };
      }
    );

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des comptes utilisateurs:",
      error
    );
    return {
      data: [],
      total: 0,
      totalPages: 1,
      currentPage: 1,
    };
  }
}

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const MotDePassePage = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const searchQuery = searchParams.search || "";

  const {
    data: comptes,
    total,
    totalPages,
    currentPage: page,
  } = await getComptesUtilisateurs(currentPage, searchQuery);

  const renderRow = (item: CompteUtilisateur) => (
    <tr
      key={item.Matricule}
      className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
    >
      <td className="p-4 font-semibold text-gray-700">{item.Matricule}</td>
      <td className="hidden md:table-cell text-gray-600">{item.PrenomUsuel}</td>
      <td className="p-4 font-mono text-gray-800">{item.MotDePasse}</td>
      <td>
        {role === "admin" && (
          <div className="flex items-center gap-2">
            <FormModal
              table="motdepasse"
              type="update"
              data={item}
            />
            <FormModal
              table="motdepasse"
              type="delete"
              data={item}
              id={item.Matricule}
            />
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <div className="surface-panel flex-1 m-4 mt-0">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-semibold">Gestion des mots de passe</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            baseUrl="/list/motdepasse"
            placeholder="Rechercher par matricule ou prénom usuel..."
          />
          {role === "admin" && (
            <div className="flex items-center gap-2 self-end">
              <FormModal table="motdepasse" type="create" />
            </div>
          )}
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={comptes} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/list/motdepasse"
      />
      <div className="text-sm text-gray-500 mt-2 px-4">
        Affichage de {comptes.length ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} à{" "}
        {Math.min(page * ITEMS_PER_PAGE, total)} sur {total} comptes
      </div>
    </div>
  );
};

export default MotDePassePage;


