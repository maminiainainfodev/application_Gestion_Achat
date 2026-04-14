"use client";

import React from 'react';

const PrintButton = ({ data, filenamePrefix = "Document", title, onExportSuccess }: { data: any[], filenamePrefix?: string, title?: string, onExportSuccess?: () => void }) => {
    const ids = data.map(d => d.id);

    const handleGeneratePDF = async () => {
        if (ids.length === 0) return;
        try {
            const response = await fetch('/api/demandeur/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids, title }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${filenamePrefix}_${new Date().toISOString().split('T')[0]}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                onExportSuccess?.();
            } else {
                console.error('Failed to generate PDF');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <button
            onClick={handleGeneratePDF}
            disabled={ids.length === 0}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all shadow-lg active:scale-95 text-[10px] font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exporter Sélection {ids.length > 0 && `(${ids.length})`}
        </button>
    );
};

export default PrintButton;
