"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BDCActionCellProps {
    id: number;
    isBCGenere: boolean;
}

const BDCActionCell = ({ id, isBCGenere: initialIsBCGenere }: BDCActionCellProps) => {
    const [isGenerated, setIsGenerated] = useState(initialIsBCGenere);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (loading) return;

        setLoading(true);
        try {
            // 1. Mark as generated in DB (one-click rule)
            if (!isGenerated) {
                const valRes = await fetch(`/api/demandeur/${id}/validate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'generate_bc' }),
                });
                if (valRes.ok) {
                    setIsGenerated(true);
                }
            }

            // 2. Fetch the professional PDF
            const pdfRes = await fetch(`/api/demandeur/${id}/pdf?title=BON DE COMMANDE`);
            if (pdfRes.ok) {
                const blob = await pdfRes.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Bon_de_Commande_${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                console.error('Failed to download PDF');
            }
        } catch (error) {
            console.error('Error in PDF generation:', error);
        } finally {
            setLoading(false);
        }
    };

    const PdfIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18H17V16H7V18Z" fill="currentColor" />
            <path d="M17 14H7V12H17V14Z" fill="currentColor" />
            <path d="M7 10H11V8H7V10Z" fill="currentColor" />
            <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="flex items-center justify-center">
            {isGenerated ? (
                <button
                    disabled
                    className="p-2 bg-slate-200 text-slate-500 rounded-full border border-slate-300 cursor-not-allowed shadow-sm"
                    title="Document déjà généré (B.C)"
                >
                    <PdfIcon className="w-5 h-5 opacity-40" />
                </button>
            ) : (
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="p-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm active:scale-95 disabled:opacity-50"
                    title="Générer Bon de Commande (B.C)"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <PdfIcon className="w-5 h-5" />
                    )}
                </button>
            )}
        </div>
    );
};

export default BDCActionCell;
