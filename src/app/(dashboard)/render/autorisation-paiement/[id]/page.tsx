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
    imputationComptable: string | null;
    activite: string | null;
    codeTIGER: string | null;
    dateDepot: string;
    reference?: string | null;
    dateFinalisation: string | null;
    auteur: {
        nom: string | null;
        prenom: string | null;
        matricule: string;
        service: { nomService: string | null } | null;
    } | null;
    fournisseur: {
        nom: string | null;
    } | null;
    historique: Array<{
        etape: number;
        statut: string;
        dateValidation: string;
        id_navette?: number | null;
        reference_navette?: string | null;
        valideur: {
            nom: string | null;
            prenom: string | null;
        } | null;
    }>;
};

export default function AutorisationPaiementPage() {
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
        <div className="min-h-screen bg-neutral-50 p-4 sm:p-12 print:bg-white print:p-0">
            <div className="max-w-[800px] mx-auto bg-white shadow-xl border border-neutral-200 print:shadow-none print:border-none">
                {/* Header Controls */}
                <div className="bg-neutral-900 p-4 flex justify-between items-center text-white print:hidden">
                    <button onClick={() => router.back()} className="text-sm border border-white/20 px-3 py-1 rounded hover:bg-white/10 transition-all">Retour</button>
                    <button onClick={handlePrint} className="bg-white text-black px-6 py-2 rounded font-bold text-sm shadow-lg hover:bg-neutral-200 transition-all">Imprimer Document</button>
                </div>

                <div className="p-16 text-black print:p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-8">
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Autorisation de Paiement</h1>
                            <p className="text-sm font-bold text-neutral-600 uppercase">Navette {demande.type} N°{demande.numero || demande.id}</p>
                        </div>
                        <div className="w-24 h-24 relative">
                            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Section 1: General Info */}
                        <section>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-2 border-b border-neutral-100 pb-1">Date d&apos;autorisation</h2>
                                    <p className="font-bold text-lg">{formatDate(new Date().toISOString())}</p>
                                </div>
                                <div>
                                    <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-2 border-b border-neutral-100 pb-1">Bénéficiaire</h2>
                                    <p className="font-black text-lg text-neutral-800">{demande.fournisseur?.nom || "-"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Details */}
                        <section className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
                            <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-6">Détails du paiement</h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Objet</p>
                                    <p className="font-bold text-lg leading-tight">{demande.objet || "-"}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Montant autorisé</p>
                                        <p className="text-2xl font-black text-emerald-600 tracking-tighter">{formatMoney(demande.montant)}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                                        <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Service Émetteur</p>
                                        <p className="text-sm font-bold text-neutral-800">{demande.auteur?.service?.nomService || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Description</p>
                                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{demande.description || "-"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Accounting */}
                        <section>
                            <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-4 border-b border-neutral-100 pb-1">Informations Comptables</h2>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Imputation</p>
                                    <p className="font-bold">{demande.imputationComptable || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Activité</p>
                                    <p className="font-bold">{demande.activite || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Code TIGER</p>
                                    <p className="font-bold">{demande.codeTIGER || "-"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Signatures */}
                        <section className="pt-8 flex justify-between gap-12">
                            <div className="flex-1">
                                <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-8">Direction</h2>
                                <div className="border-t border-black pt-2">
                                    <p className="text-[10px] uppercase text-neutral-400 font-bold mb-4">Cachet et Signature</p>
                                    <div className="h-32"></div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-8">Finances / Comptabilité</h2>
                                <div className="border-t border-black pt-2">
                                    <p className="text-[10px] uppercase text-neutral-400 font-bold mb-4">Observation et Validation</p>
                                    <div className="h-32"></div>
                                </div>
                            </div>
                        </section>

                        {/* History Log */}
                        <section className="bg-neutral-900 rounded-2xl p-6 text-white text-[10px]">
                            <h2 className="uppercase font-black text-neutral-400 tracking-widest mb-4">Historique des validations système</h2>
                            <div className="space-y-3">
                                {demande.historique.filter(h => h.statut === "VALIDEE").map((h, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                                        <div className="flex flex-col">
                                            <span>Étape {h.etape} - {h.valideur?.prenom} {h.valideur?.nom}</span>
                                            {h.reference_navette && <span className="text-[8px] opacity-40">Ref: {h.reference_navette}</span>}
                                        </div>
                                        <span className="font-bold opacity-60 uppercase">{formatDate(h.dateValidation)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: A4 vertical;
                        margin: 1cm;
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
