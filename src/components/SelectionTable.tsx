"use client";

import React, { useState } from 'react';
import Table from "@/components/Table";
import PrintButton from "@/components/PrintButton";
import BDCActionCell from "@/components/BDCActionCell";
import APActionCell from "@/components/APActionCell";

import TableSearch from "@/components/TableSearch";

interface SelectionTableProps {
    initialData: any[];
    columns: any[];
    exportPrefix: string;
    docType: 'BDC' | 'AP';
    title?: string;
    description?: string;
    baseUrl: string;
    filterButtons?: React.ReactNode;
}
const SelectionTable = ({
    initialData,
    columns: baseColumns,
    exportPrefix,
    docType,
    title,
    description,
    baseUrl,
    filterButtons
}: SelectionTableProps) => {
    const [data, setData] = useState(initialData.map(item => ({ ...item, selected: false })));
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = React.useMemo(() => {
        if (!searchQuery) return data;
        const q = searchQuery.toLowerCase();
        return data.filter(item => {
            const searchStrings = [
                item.reference,
                item.designation,
                item.specification,
                item.service,
                item.total,
                item.facture,
                item.pu,
                item.qtes ? String(item.qtes) : '',
            ].filter(Boolean).map(s => String(s).toLowerCase());

            return searchStrings.some(s => s.includes(q));
        });
    }, [data, searchQuery]);

    const toggleSelectAll = () => {
        const allSelected = data.every(item => item.selected);
        setData(data.map(item => ({ ...item, selected: !allSelected })));
    };

    const toggleRow = (id: number) => {
        setData(data.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    };

    const allSelected = data.length > 0 && data.every(item => item.selected);

    // Standardized Row Rendering
    const renderRow = (item: any) => {
        if (docType === 'AP') {
            return (
                <tr
                    key={item.id}
                    className={`border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-slate-50/80 transition-colors ${item.selected ? 'bg-blue-50/50' : ''}`}
                >
                    <td className="p-4 text-center">
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleRow(item.id)}
                            className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 transition-all cursor-pointer"
                        />
                    </td>
                    <td className="p-4 font-semibold">{item.reference}</td>
                    <td className="p-4 font-medium">{item.total} Ar</td>
                    <td className="p-4">{item.facture || "-"}</td>
                    <td className="p-4 max-w-xs truncate" title={item.specification}>{item.specification}</td>
                    <td className="p-4 text-center">
                        <APActionCell id={item.id} isAPGenere={item.isAPGenere} />
                    </td>
                </tr>
            );
        }

        return (
            <tr
                key={item.id}
                className={`border-b border-gray-100 even:bg-slate-50/60 text-sm hover:bg-slate-50/80 transition-colors ${item.selected ? 'bg-blue-50/50' : ''}`}
            >
                <td className="p-4 text-center">
                    <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleRow(item.id)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 transition-all cursor-pointer"
                    />
                </td>
                <td className="hidden md:table-cell p-4">{item.ordre}</td>
                <td className="hidden md:table-cell p-4">{item.service}</td>
                <td className="p-4 font-semibold">{item.reference}</td>
                <td className="p-4">{item.designation}</td>
                <td className="hidden lg:table-cell p-4 max-w-xs truncate" title={item.specification}>{item.specification}</td>
                <td className="hidden xl:table-cell p-4">{item.unites}</td>
                <td className="hidden md:table-cell p-4">{item.qtes}</td>
                <td className="hidden lg:table-cell p-4">{item.pu}</td>
                <td className="p-4 font-medium">{item.total}</td>
                <td className="hidden xl:table-cell p-4">{item.resteALivrer}</td>
                <td className="p-4 text-center">
                    <BDCActionCell id={item.id} isBCGenere={item.isBCGenere} />
                </td>
            </tr>
        );
    };

    // Add checkbox column
    const columns = [
        {
            header: (
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 transition-all cursor-pointer"
                    />
                </div>
            ),
            accessor: "selection",
            className: "w-10 text-center",
        },
        ...baseColumns,
        { header: "", accessor: "actions", className: "w-20 text-center" }
    ];

    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <div>
                    {title && <h1 className="hidden md:block text-lg font-semibold text-slate-800">{title}</h1>}
                    {description && <p className="text-xs text-slate-500 font-medium">{description}</p>}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-4">
                        <PrintButton
                            data={data.filter(d => d.selected)}
                            filenamePrefix={exportPrefix}
                            title={docType === 'AP' ? "AUTORISATION DE PAIEMENT" : "BON DE COMMANDE"}
                            onExportSuccess={docType === 'AP' ? () => setData(prev => prev.filter(item => !item.selected)) : undefined}
                        />
                        <TableSearch
                            baseUrl={baseUrl}
                            placeholder="Rechercher..."
                            onSearch={setSearchQuery}
                        />
                    </div>
                    <div className="flex items-center gap-4 self-end">
                        {filterButtons}
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                renderRow={renderRow}
                data={filteredData}
                headerClassName="bg-[#f8fafc] border-b border-gray-200"
            />
        </div>
    );
};

export default SelectionTable;
