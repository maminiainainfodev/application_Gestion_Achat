"use client";

import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

type FournisseurData = {
    ID_Fournisseur: number;
    Nom: string;
    Adresse: string;
    NomCheque: string;
    NIF: string;
    CIN: string;
};

interface FournisseurListClientProps {
    initialData: FournisseurData[];
    total: number;
    role: string;
}

const columns = [
    { header: "Nom Fournisseur", accessor: "Nom" },
    { header: "Nom Chèque", accessor: "NomCheque", className: "hidden md:table-cell" },
    { header: "NIF", accessor: "NIF", className: "hidden md:table-cell" },
    { header: "Adresse", accessor: "Adresse", className: "hidden lg:table-cell" },
    { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 6;

const FournisseurListClient = ({ initialData, total, role }: FournisseurListClientProps) => {
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
                item.Nom.toLowerCase().includes(query) ||
                item.NomCheque.toLowerCase().includes(query) ||
                item.NIF.toLowerCase().includes(query) ||
                item.CIN.toLowerCase().includes(query) ||
                item.Adresse.toLowerCase().includes(query)
            );
        });
    }, [initialData, searchQuery]);

    const paginatedData = useMemo(() => {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(skip, skip + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const renderRow = (item: FournisseurData) => (
        <tr
            key={item.ID_Fournisseur}
            className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.Nom}</h3>
                    <p className="text-xs text-gray-500">NIF: {item.NIF}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.NomCheque}</td>
            <td className="hidden md:table-cell">{item.NIF}</td>
            <td className="hidden lg:table-cell">{item.Adresse}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table="fournisseur" type="update" data={item} id={item.ID_Fournisseur} />
                            <FormModal table="fournisseur" type="delete" data={item} id={item.ID_Fournisseur} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="surface-panel flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Tous les Fournisseurs</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch
                        baseUrl="/list/fournisseur"
                        placeholder="Rechercher par nom, NIF, CIN ou adresse..."
                        onSearch={setSearchQuery}
                    />
                    <div className="flex items-center gap-4 self-end">
                        <FilterSortButtons baseUrl="/list/fournisseur" />
                        {role === "admin" && <FormModal table="fournisseur" type="create" />}
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/list/fournisseur" />
            <div className="text-sm text-gray-500 mt-2 px-4">
                Affichage de {((currentPage - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} sur {filteredData.length} fournisseurs
            </div>
        </div>
    );
};

export default FournisseurListClient;
