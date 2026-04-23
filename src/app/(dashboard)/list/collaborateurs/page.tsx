import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

type CollaborateurData = {
    Id: number;
    Matricule: string;
    Nom: string;
    Prenom: string;
    PrenomUsuelle: string;
    Service: string;
    Fonction: string;
    Telephone: string;
    MailPro: string;
    Civilite?: string;
    PhotoURL?: string;
    Roles?: string[];
};

type CollaborateurWithRelations = {
    include: {
        service: {
            select: {
                nomService: true;
            };
        };
        fonction: {
            select: {
                nomFonction: true;
            };
        };
        collaborateurRoles: {
            include: {
                role: {
                    select: {
                        nomRole: true;
                    };
                };
            };
        };
    };
}>;

const columns = [
    {
        header: "Collaborateur",
        accessor: "NomComplet",
    },
    {
        header: "Matricule",
        accessor: "Matricule",
        className: "hidden md:table-cell",
    },
    {
        header: "Prénom usuel",
        accessor: "PrenomUsuelle",
        className: "hidden md:table-cell",
    },
    {
        header: "Service",
        accessor: "Service",
        className: "hidden lg:table-cell",
    },
    {
        header: "Fonction",
        accessor: "Fonction",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const ITEMS_PER_PAGE = 6;

async function getCollaborateurs(
    page: number = 1,
    search?: string,
    filterType?: string,
    filterValue?: string,
    sortBy?: string,
    sortOrder?: string
): Promise<{
    data: CollaborateurData[];
    total: number;
    totalPages: number;
    currentPage: number;
}> {
    try {
        const skip = (page - 1) * ITEMS_PER_PAGE;

        // Build where clause for search and filters
        const where: any = {};

        if (search && search.trim()) {
            const searchTerm = search.trim();
            where.OR = [
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
                    prenomUsuelle: {
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
                    fonction: {
                        nomFonction: {
                            contains: searchTerm,
                        },
                    },
                },
            ];
        }

        // Apply filters
        if (filterType && filterValue) {
            if (filterType === "civilite") {
                // Convert "Homme" to "HOMME" and "Femme" to "FEMME" for Prisma enum
                const civiliteValue = filterValue === "Homme" ? "HOMME" : filterValue === "Femme" ? "FEMME" : null;
                if (civiliteValue) {
                    where.civilite = civiliteValue;
                }
            } else if (filterType === "responsabilite") {
                if (filterValue.startsWith("service:")) {
                    const serviceName = filterValue.replace("service:", "");
                    where.service = {
                        nomService: {
                            contains: serviceName,
                        },
                    };
                } else if (filterValue.startsWith("fonction:")) {
                    const fonctionName = filterValue.replace("fonction:", "");
                    where.fonction = {
                        nomFonction: {
                            contains: fonctionName,
                        },
                    };
                }
            } else if (filterType === "role") {
                const roleId = Number(filterValue);
                if (!Number.isNaN(roleId)) {
                    where.collaborateurRoles = {
                        some: {
                            roleID: roleId,
                        },
                    };
                }
            }
        }

        const total = await prisma.collaborateur.count({
            where,
        });

        // Build orderBy clause - trier par date d'ajout (id) ou par défaut par matricule
        let orderBy: any = {
            matricule: 'asc',
        };

        if (sortBy === "date") {
            // Trier par ID (date d'ajout) - plus grand ID = plus récent
            const order: "asc" | "desc" = sortOrder === "desc" ? "desc" : "asc";
            orderBy = {
                id: order,
            };
        }

        const collaborateurs = await prisma.collaborateur.findMany({
            where,
            skip,
            take: ITEMS_PER_PAGE,
            include: {
                service: {
                    select: {
                        nomService: true,
                    },
                },
                fonction: {
                    select: {
                        nomFonction: true,
                    },
                },
                collaborateurRoles: {
                    include: {
                        role: {
                            select: {
                                nomRole: true,
                            },
                        },
                    },
                },
            },
            orderBy,
        });

        const data: CollaborateurData[] = collaborateurs.map((collab: CollaborateurWithRelations) => ({
            Id: collab.id,
            Matricule: collab.matricule,
            Nom: collab.nom || '',
            Prenom: collab.prenom || '',
            PrenomUsuelle: collab.prenomUsuelle || '',
            Service: collab.service?.nomService || 'Non assigné',
            Fonction: collab.fonction?.nomFonction || 'Non assigné',
            Telephone: collab.telephone || '',
            MailPro: collab.mailPro || '',
            Civilite: collab.civilite === 'HOMME' ? 'Homme' : collab.civilite === 'FEMME' ? 'Femme' : undefined,
            PhotoURL: collab.photo || undefined,
            Roles: collab.collaborateurRoles?.map((item) => item.role?.nomRole).filter(Boolean) as string[] | undefined,
        }));

        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

        return {
            data,
            total,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des collaborateurs:', error);
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

const CollaborateursListPage = async ({ searchParams }: PageProps) => {
    const currentPage = parseInt(searchParams.page || '1', 10);
    const searchQuery = searchParams.search || '';
    const filterType = searchParams.filterType;
    const filterValue = searchParams.filterValue;
    const sortBy = searchParams.sortBy;
    const sortOrder = searchParams.sortOrder as "asc" | "desc" | undefined;

    const {
        data: collaborateursData,
        totalPages,
        total,
        currentPage: page
    } = await getCollaborateurs(currentPage, searchQuery, filterType, filterValue, sortBy, sortOrder);

    const renderRow = (item: CollaborateurData) => {
        const nomComplet = `${item.Prenom || ''} ${item.Nom || ''}`.trim() || item.Matricule;

        return (
            <tr
                key={item.Matricule}
                className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
            >
                <td className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                        <Image
                            src={item.PhotoURL || "/avatar.png"}
                            alt={nomComplet || item.Matricule}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{nomComplet}</h3>
                        <p className="text-xs text-gray-500">Matricule: {item.Matricule}</p>
                        {item.Roles && item.Roles.length > 0 && (
                            <p className="text-[11px] text-indigo-600 mt-0.5">
                                {item.Roles.join(" • ")}
                            </p>
                        )}
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.Matricule}</td>
                <td className="hidden md:table-cell">{item.PrenomUsuelle || 'N/A'}</td>
                <td className="hidden lg:table-cell font-medium">{item.Service}</td>
                <td className="hidden lg:table-cell font-medium">{item.Fonction}</td>

                <td>
                    <div className="flex items-center gap-2">
                        {role === "admin" && (
                            <>
                                <FormModal
                                    table="Collaborateurs"
                                    type="update"
                                    data={item}
                                />
                                <FormModal
                                    table="Collaborateurs"
                                    type="delete"
                                    data={item}
                                    id={item.Id}
                                />
                            </>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="flex-1 p-4 lg:p-6 no-scrollbar">
            <div className="glass-panel p-8 mb-8 shadow-2xl border-white/40 ring-1 ring-black/10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Gestion d&apos;équipe</p>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Tous les Collaborateurs</h1>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Consultez et gérez les membres de votre organisation.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <TableSearch baseUrl="/list/collaborateurs" />
                        </div>
                        <div className="flex items-center gap-3">
                            <FilterSortButtons baseUrl="/list/collaborateurs" />
                            {role === "admin" && (
                                <FormModal table="Collaborateurs" type="create" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel shadow-2xl border-white/40 overflow-hidden">
                <div className="px-8 py-5 border-b border-white/40 bg-white/40 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Liste du Personnel</h2>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">{total} collaborateurs au total</p>
                    </div>
                </div>

                <div className="overflow-x-auto navette-table-collaborateurs">
                    <Table columns={columns} renderRow={renderRow} data={collaborateursData} />
                </div>

                <div className="p-6 border-t border-white/20 bg-white/20">
                    <Pagination currentPage={page} totalPages={totalPages} baseUrl="/list/collaborateurs" />
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4 opacity-60">
                        Affichage de {((page - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(page * ITEMS_PER_PAGE, total)} sur {total} collaborateurs
                    </p>
                </div>
            </div>


        </div>
    );
};

export default CollaborateursListPage;