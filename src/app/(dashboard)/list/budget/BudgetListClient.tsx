"use client";

import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilterSortButtons from "@/components/FilterSortButtons";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import { formatAriary } from "@/lib/format";

type BudgetData = {
    ID_Budget: number;
    CodeBudgetaire: string;
    MontantDisponible: number;
    Service: string;
    ServiceID: number | null;
};

interface BudgetListClientProps {
    initialData: BudgetData[];
    total: number;
    role: string;
}

const columns = [
    { header: "Code Budgétaire", accessor: "CodeBudgetaire" },
    { header: "Montant Disponible", accessor: "MontantDisponible", className: "hidden md:table-cell" },
    { header: "Service", accessor: "Service", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 6;

const BudgetListClient = ({ initialData, total, role }: BudgetListClientProps) => {
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
                item.CodeBudgetaire.toLowerCase().includes(query) ||
                item.Service.toLowerCase().includes(query) ||
                String(item.MontantDisponible).includes(query)
            );
        });
    }, [initialData, searchQuery]);

    const paginatedData = useMemo(() => {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(skip, skip + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const renderRow = (item: BudgetData) => (
        <tr
            key={item.ID_Budget}
            className="border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-indigo-50/70 transition-colors"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.CodeBudgetaire}</h3>
                    <p className="text-xs text-gray-500">Service: {item.Service}</p>
                </div>
            </td>
            <td className="hidden md:table-cell font-medium text-blue-600 text-right">
                {formatAriary(item.MontantDisponible)}
            </td>
            <td className="hidden md:table-cell">{item.Service}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table="budget" type="update" data={item} id={item.ID_Budget} />
                            <FormModal table="budget" type="delete" data={item} id={item.ID_Budget} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="surface-panel flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Gestion des Budgets</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch
                        baseUrl="/list/budget"
                        placeholder="Rechercher par code budgétaire ou service..."
                        onSearch={setSearchQuery}
                    />
                    <div className="flex items-center gap-4 self-end">
                        <FilterSortButtons baseUrl="/list/budget" />
                        {role === "admin" && <FormModal table="budget" type="create" />}
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={paginatedData} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/list/budget" />
            <div className="text-sm text-gray-500 mt-2 px-4">
                Affichage de {((currentPage - 1) * ITEMS_PER_PAGE) + 1} à {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} sur {filteredData.length} budgets
            </div>
        </div>
    );
};

export default BudgetListClient;
