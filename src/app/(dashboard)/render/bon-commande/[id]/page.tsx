"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

type DemandeData = {
    id: number;
    numero: number | null;
    type: string;
    objet: string | null;
    description: string | null;
    motif: string | null;
    quantite: number | null;
    pu: number | null;
    montant: number | null;
    devis: string | null;
    justificationChoix: string | null;
    imputationComptable: string | null;
    activite: string | null;
    codeTIGER: string | null;
    numeroBonCommande: string | null;
    dateDepot: string;
    dateFinalisation: string | null;
    auteur: {
        nom: string | null;
        prenom: string | null;
        matricule: string;
        service: { nomService: string | null } | null;
        fonction: { nomFonction: string | null } | null;
        telephone: string | null;
        mailPro: string | null;
    } | null;
    fournisseur: {
        nom: string | null;
    } | null;
    historique: Array<{
        etape: number;
        statut: string;
        dateValidation: string;
        valideur: {
            nom: string | null;
            prenom: string | null;
        } | null;
    }>;
};

export default function BonCommandePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [demande, setDemande] = useState<DemandeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const res = await fetch(`/api/demandeur/${id}`);
                const data = await res.json();
                if (data.success) {
                    setDemande(data.data);
                } else {
                    toast.error(data.message || "Erreur lors du chargement");
                }
            } catch (error) {
                console.error("Erreur:", error);
                toast.error("Erreur lors du chargement");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDemande();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
    if (!demande) return <div className="flex items-center justify-center min-h-screen">Demande introuvable</div>;

    const formatDate = (date: string | null) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("fr-FR");
    };

    const formatMoney = (amount: number | null) => {
        if (amount === null) return "0 Ar";
        return `${amount.toLocaleString("fr-FR")} Ar`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 print:bg-white print:p-0">
            <div className="max-w-[1000px] mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
                {/* Header Controls */}
                <div className="bg-slate-800 p-4 flex justify-between items-center text-white print:hidden">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrint}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimer
                        </button>
                    </div>
                </div>

                {/* PDF Content Mockup */}
                <div className="p-10 text-slate-900 leading-relaxed print:p-8" id="print-area">
                    {/* Top Logos */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-20 h-20 relative">
                            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Bon de Commande</h1>
                            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">N° {demande.numeroBonCommande || demande.numero || demande.id}</p>
                        </div>
                        <div className="w-24 h-24 relative">
                            <Image src="/promes.jpg" alt="Promes" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Date and Info Grid */}
                    <div className="mb-8">
                        <p className="text-sm font-bold mb-4">Date de dépôt : {formatDate(demande.dateDepot)}</p>

                        <div className="grid grid-cols-4 gap-4 text-[11px] border-t border-b py-4 border-slate-200 bg-slate-50/50 rounded-xl px-4">
                            <div className="space-y-2">
                                <p><span className="font-bold uppercase opacity-60">Nom :</span> <br />{demande.auteur?.nom} {demande.auteur?.prenom}</p>
                                <p><span className="font-bold uppercase opacity-60">Code Nom :</span> <br />{demande.codeTIGER || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-bold uppercase opacity-60">Matricule :</span> <br />{demande.auteur?.matricule}</p>
                                <p><span className="font-bold uppercase opacity-60">Email :</span> <br />{demande.auteur?.mailPro}</p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-bold uppercase opacity-60">Fonction :</span> <br />{demande.auteur?.fonction?.nomFonction}</p>
                                <p><span className="font-bold uppercase opacity-60">Service :</span> <br />{demande.auteur?.service?.nomService}</p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-bold uppercase opacity-60">Contact :</span> <br />{demande.auteur?.telephone}</p>
                                <p><span className="font-bold uppercase opacity-60">Objet :</span> <br />{demande.objet}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Table */}
                    <div className="mb-10 overflow-hidden border border-slate-300 rounded-lg">
                        <table className="w-full text-[10px] text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 uppercase font-black text-slate-600 border-b border-slate-300">
                                    <th className="p-2 border-r border-slate-300">Description</th>
                                    <th className="p-2 border-r border-slate-300">Motif</th>
                                    <th className="p-2 border-r border-slate-300 text-center">Qté</th>
                                    <th className="p-2 border-r border-slate-300">Fournisseur</th>
                                    <th className="p-2 border-r border-slate-300 text-right">PU</th>
                                    <th className="p-2 text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-200">
                                    <td className="p-3 border-r border-slate-200 font-medium">{demande.description}</td>
                                    <td className="p-3 border-r border-slate-200 italic text-slate-600">{demande.motif}</td>
                                    <td className="p-3 border-r border-slate-200 text-center font-bold">{demande.quantite}</td>
                                    <td className="p-3 border-r border-slate-200 font-bold text-blue-800">{demande.fournisseur?.nom}</td>
                                    <td className="p-3 border-r border-slate-200 text-right">{formatMoney(demande.pu)}</td>
                                    <td className="p-3 text-right font-black text-slate-800">{formatMoney(demande.montant)}</td>
                                </tr>
                                {/* Dummy rows to fill space if needed, like in the PDF */}
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-slate-100 h-8">
                                        <td className="border-r border-slate-100"></td>
                                        <td className="border-r border-slate-100"></td>
                                        <td className="border-r border-slate-100"></td>
                                        <td className="border-r border-slate-100"></td>
                                        <td className="border-r border-slate-100"></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-slate-50 font-black">
                                    <td colSpan={5} className="p-3 text-right uppercase tracking-widest border-r border-slate-300">Montant Total</td>
                                    <td className="p-3 text-right text-lg text-blue-900">{formatMoney(demande.montant)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-5 gap-0 border border-slate-900 text-[10px] mb-8">
                        <div className="col-span-1 border-r border-slate-900">
                            <div className="bg-slate-100 p-2 font-black border-b border-slate-900 text-center uppercase">Demandeur</div>
                            <div className="p-4 h-32 flex flex-col justify-between">
                                <p className="font-bold tracking-tight">{demande.auteur?.prenom} {demande.auteur?.nom}</p>
                                <div>
                                    <p className="opacity-40">Date: {formatDate(demande.dateDepot)}</p>
                                    <p className="opacity-40">Signature:</p>
                                </div>
                            </div>
                        </div>
                        {["Chargée des Achats", "Responsable Financier", "Contrôleur de Gestion", "Directrice"].map((role, idx) => {
                            const val = demande.historique.find(h => h.etape === (idx + 3)); // Approximate etape mapping
                            return (
                                <div key={idx} className={`col-span-1 ${idx < 3 ? 'border-r border-slate-900' : ''}`}>
                                    <div className="bg-slate-100 p-2 font-black border-b border-slate-900 text-center uppercase truncate" title={role}>{role}</div>
                                    <div className="p-4 h-32 flex flex-col justify-between italic">
                                        <p className="font-medium text-[9px]">{val ? `${val.valideur?.prenom} ${val.valideur?.nom}` : ""}</p>
                                        <div>
                                            <p className="opacity-40">Date: {val ? formatDate(val.dateValidation) : ""}</p>
                                            <p className="opacity-40">Signature:</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer / Comment */}
                    <div className="flex items-center gap-4 text-xs italic text-slate-500">
                        <p className="font-bold flex-shrink-0">Commentaire :</p>
                        <div className="flex-1 border-b border-dotted border-slate-400 h-4"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }
                    body {
                        background: white;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
