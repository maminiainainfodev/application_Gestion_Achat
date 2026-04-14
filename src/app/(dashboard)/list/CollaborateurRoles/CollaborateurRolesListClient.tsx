"use client";

import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

type CollaborateurRolesData = {
    Matricule: string;
    RoleID: number;
    NomCollaborateur: string;
    NomRole: string;
};

interface CollaborateurRolesListClientProps {
    initialData: CollaborateurRolesData[];
    total: number;
    role: string;
}

const columns = [
    { header: "Collaborateur", accessor: "NomCollaborateur" },
    { header: "Matricule", accessor: "Matricule", className: "hidden md:table-cell" },
    { header: "Rôle", accessor: "NomRole", className: "hidden md:table-cell" },
    { header: "ID Rôle", accessor: "RoleID", className: "hidden lg:table-cell" },
    { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 6;

const CollaborateurRolesListClient = ({ initialData, total, role }: CollaborateurRolesListClientProps) => {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
        setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
    }, [searchParams]);

    const filteredData = useMemo(() => {
        if (!searchQuery) return initialData;
        const query = searchQuery.toLowerCase();
        return initialData.filter((item) => {
            return (
                item.NomCollaborateur.toLowerCase().includes(query) ||
                item.Matricule.toLowerCase().includes(query) ||
                item.NomRole.toLowerCase().includes(query)
            );
        });
    }, [initialData, searchQuery]);

    const paginatedData = useMemo(() => {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(skip, skip + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const renderRow = (item: CollaborateurRolesData) => (
        <tr
            key={`${item.Matricule}-${item.RoleID}`}
            className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.NomCollaborateur}</h3>
                    <p className="text-xs text-gray-500">Matricule: {item.Matricule}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.Matricule}</td>
            <td className="hidden md:table-cell font-medium">{item.NomRole}</td>
            <td className="hidden lg:table-cell">{item.RoleID}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table="CollaborateurRoles" type="update" data={item} />
                            <FormModal table="CollaborateurRoles" type="delete" data={item} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="surface-panel flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Attribution des Rôles</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch
                        baseUrl="/list/CollaborateurRoles"
                        placeholder="Rechercher par collaborateur ou rôle..."
                        onSearch={setSearchQuery}
                    />
                    <div className="flex items-center gap-4 self-end">
                        <FilterSortButtons baseUrl="/list/CollaborateurRoles" showFilter={false} />
                        {role === "admin" && <FormModal table="CollaborateurRoles" type="create" />}
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/list/CollaborateurRoles" />
            <div className="text-sm text-gray-500 mt-2 px-4">
                Affichage de {((currentPage - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} sur {filteredData.length} relations
            </div>
        </div>
    );
};

export default CollaborateurRolesListClient;
