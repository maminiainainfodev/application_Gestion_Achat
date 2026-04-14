"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/components/AuthProvider";
import Image from "next/image";
import {
    NAVETTE_FILTER_TYPES,
    type NavetteFilterType,
    type NavetteLayout,
    getNavetteLabel,
    getNavetteLayout,
    resolveNavetteFilterType,
} from "@/lib/navetteTableConfig";
import PDFModal from "@/components/PDFModal";
import { generateNavetteReference } from "@/lib/reference";
import TableSearch from "@/components/TableSearch";
import { formatDateTime } from "@/lib/workflowNotifications";

const FILTER_TYPES: Array<NavetteFilterType | "Tout"> = [
    ...NAVETTE_FILTER_TYPES,
    "Tout",
];

const formatNumberWithSpaces = (value: number | string | null | undefined) => {
    const numeric = Number(value ?? 0);
    if (Number.isNaN(numeric)) return "0";
    return numeric.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const statusRenderer = (status: string) => {
    switch (status) {
        case 'VALIDEE':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" title="Validée">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Validée
                </span>
            );
        case 'REFUSEE':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-600 border border-rose-500/20" title="Refusée">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Refusée
                </span>
            );
        case 'EN_MAGASIN':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 border border-blue-500/20" title="En magasin">
                    <Image src="/magasin.png" alt="" width={14} height={14} className="brightness-110" />
                    Magasin
                </span>
            );
        case 'EN_ATTENTE':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 border border-amber-500/20" title="En attente">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Attente
                </span>
            );
        default:
            return <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{status}</span>;
    }
};

type DemandeurData = {
    id: number;
    selected?: boolean;
    auteurMatricule: string | null;
    type: string;
    etapeActuelle: number;
    numero: number | null;
    objet: string | null;
    description: string | null;
    motif: string | null;
    quantite: number | null;
    fournisseurID: number | null;
    fournisseur: { nom: string | null } | null;
    pu: number | null;
    montant: number | null;
    devis: string | null;
    justificationChoix: string | null;
    imputationComptable: string | null;
    activite: string | null;
    codeTIGER: string | null;
    pieceJointe?: string | null;
    modePaiement?: string | null;
    paiementDetail?: string | null;
    statut: string;
    dateDepot: string;
    reference?: string | null;
    budgetID: number | null;
    auteur: {
        matricule: string;
        nom: string | null;
        prenom: string | null;
        prenomUsuelle: string | null;
        service?: {
            abreviation: string | null;
        } | null;
    } | null;
    historique: {
        id: number;
        etape: number;
        statut: string;
        motifRefus: string | null;
        dateValidation: string;
        id_navette?: number | null;
        reference_navette?: string | null;
        valideurMatricule: string | null;
        valideur?: {
            matricule: string | null;
            nom: string | null;
            prenom: string | null;
            prenomUsuelle: string | null;
        } | null;
    }[];
};

const PRENOMS_USUELS_MAP: Record<string, string> = {
    'Maminirina': 'Mamy',
    // ... autres mappages si besoin
};

const getPrenomUsuel = (nom: string, prenom: string) => {
    // Logique personnalisée si nécessaire, ou utilisation simple du prénom
    return prenom ? prenom.split(' ')[0] : nom;
};

// Fonction pour générer la référence personnalisée
const generateReference = (item: DemandeurData) => {
    return generateNavetteReference(item);
};

const normalizeRole = (r?: string | null) =>
    (r || '')
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '');

const isControleurGestion = (r?: string | null) => {
    const n = normalizeRole(r);
    return n.includes('CONTROLEUR') || n.includes('CG') || n === 'CONTROLEURGESTION';
};

const HistoriqueListPage = () => {
    const { user } = useAuth();
    const userIsControleurGestion = isControleurGestion(user?.role);
    const [demandes, setDemandes] = useState<DemandeurData[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState<NavetteFilterType | 'Tout'>('Tout');
    const [filterDate, setFilterDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<"demandeur" | "valideur" | "all">("demandeur");
    const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; id: number; defaultName: string }>({
        isOpen: false,
        id: 0,
        defaultName: "",
    });

    // Caching state to store data for each view mode
    const [cachedData, setCachedData] = useState<Record<string, DemandeurData[]>>({
        demandeur: [],
        valideur: [],
        all: []
    });
    const [isRefreshing, setIsRefreshing] = useState(false);



    // Switch view mode instantly using cached data
    useEffect(() => {
        if (cachedData[viewMode].length > 0) {
            setDemandes(cachedData[viewMode]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMode]);

    // Dérive l'état "Tout sélectionner" des données
    const allSelected = demandes.length > 0 && demandes.every(d => d.selected);

    const fetchDemandes = async (mode: "demandeur" | "valideur" | "all") => {
        try {
            const hasCache = cachedData[mode].length > 0;
            if (!hasCache) {
                setLoading(true);
            } else {
                setIsRefreshing(true);
                // Immediately show cached data while refreshing
                setDemandes(cachedData[mode]);
            }

            const response = await fetch(
                `/api/demandeur/historique${mode === "all" ? "" : `?mode=${mode}`}`
            );
            const data = await response.json();
            if (data.success) {
                const withSelection: DemandeurData[] = (data.data as DemandeurData[]).map(d => ({ ...d, selected: false }));
                setDemandes(withSelection);
                setCachedData(prev => ({ ...prev, [mode]: withSelection }));
            } else {
                toast.error(data.message || "Erreur lors du chargement de l'historique");
            }
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors du chargement de l'historique");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleDownloadPDF = (id: number, defaultName?: string) => {
        setPdfModal({
            isOpen: true,
            id,
            defaultName: defaultName || `navette-${id}`,
        });
    };

    const confirmDownloadPDF = async (customName: string) => {
        const { id, defaultName } = pdfModal;
        setPdfModal(prev => ({ ...prev, isOpen: false }));

        try {
            const filename = customName.trim() || defaultName;
            const url = `/api/demandeur/${id}/pdf${filename ? `?filename=${encodeURIComponent(filename)}` : ''}`;
            const response = await fetch(url);

            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `${filename}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);
                toast.success("PDF téléchargé avec succès");
            } else {
                toast.error("Erreur lors du téléchargement du PDF");
            }
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors du téléchargement du PDF");
        }
    };

    const toggleSelectAll = () => {
        const next = !allSelected;
        setDemandes(prev => prev.map(d => ({ ...d, selected: next })));
    };

    const toggleRow = (id: number) => {
        setDemandes(prev => prev.map(d => d.id === id ? ({ ...d, selected: !d.selected }) : d));
    };

    const handleBulkPDF = async () => {
        const ids = demandes.filter(d => d.selected).map(d => d.id);
        if (ids.length === 0) {
            toast.error("Veuillez sélectionner au moins une ligne");
            return;
        }
        try {
            const response = await fetch('/api/demandeur/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (!response.ok) {
                toast.error("Erreur lors de la génération du PDF");
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = ids.length === 1 ? `navette-${ids[0]}.pdf` : `navettes-${ids.join('_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("PDF généré");
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors de la génération du PDF");
        }
    };

    const handleExportExcel = async () => {
        const ids = filteredData.map(d => d.id);
        if (ids.length === 0) {
            toast.error("Aucune donnée à exporter");
            return;
        }
        try {
            const response = await fetch('/api/demandeur/export/excel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (!response.ok) {
                toast.error("Erreur lors de l'export Excel");
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `historique_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Historique exporté en Excel");
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors de l'export Excel");
        }
    };

    const filteredData = useMemo(() => {
        let currentData = demandes;

        if (filterType !== 'Tout') {
            currentData = currentData.filter(item => resolveNavetteFilterType(item.type) === filterType);
        }

        if (filterDate) {
            currentData = currentData.filter(item =>
                item.dateDepot.startsWith(filterDate)
            );
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            currentData = currentData.filter(item => {
                const searchStrings = [
                    item.id ? `id ${item.id} n°${item.numero}` : '',
                    item.type,
                    item.statut,
                    item.objet,
                    item.description,
                    item.motif,
                    item.fournisseur?.nom,
                    item.pu ? String(item.pu) : '',
                    item.montant ? String(item.montant) : '',
                    item.devis,
                    item.imputationComptable,
                    item.activite,
                    item.codeTIGER,
                    item.auteur?.nom,
                    item.auteur?.prenom,
                    item.auteur?.prenomUsuelle,
                    formatDateTime(item.dateDepot),
                    item.modePaiement,
                    item.paiementDetail,
                    item.historique?.map(h => [h.valideur?.nom, h.valideur?.prenom, h.motifRefus, h.statut]).flat()
                ].filter(Boolean).flat().map(s => String(s).toLowerCase());

                return searchStrings.some(s => s.includes(query));
            });
        }

        return currentData;
    }, [demandes, filterType, filterDate, searchQuery]);

    const groupedTables = useMemo(() => {
        if (filterType !== 'Tout') {
            const typed = filterType as NavetteFilterType;
            return [{
                type: typed,
                label: getNavetteLabel(typed),
                rows: filteredData,
            }];
        }
        return NAVETTE_FILTER_TYPES.map((type) => ({
            type,
            label: getNavetteLabel(type),
            rows: filteredData.filter(item => resolveNavetteFilterType(item.type) === type),
        })).filter(group => group.rows.length > 0);
    }, [filteredData, filterType]);

    const viewTabs = [
        { key: "demandeur", label: "Mes navettes" },
        { key: "valideur", label: "Mes validations" },
        { key: "all", label: "Tout l'historique" },
    ] as const;

    const viewSubtitle =
        viewMode === "demandeur"
            ? "Historique de vos demandes (validées, refusées, en magasin)."
            : viewMode === "valideur"
                ? "Historique des validations que vous avez effectuées (validation ou refus)."
                : "Historique complet accessible selon vos droits.";

    const renderRow = (item: DemandeurData, layout: NavetteLayout) => {
        const isStandard = layout === "standard";
        const formattedMontant = `${formatNumberWithSpaces(item.montant)} Ar`;
        const formattedPuHt = item.pu !== null && item.pu !== undefined ? `${formatNumberWithSpaces(item.pu)} Ar` : '-';

        const qteDisplay = item.quantite !== null ? item.quantite : '-';
        const fournisseurDisplay = item.fournisseur?.nom || '-';
        const puHtDisplay = formattedPuHt;
        const attachments = (() => {
            if (!item.pieceJointe) return null;
            try {
                const parsed = JSON.parse(item.pieceJointe);
                return Array.isArray(parsed) ? parsed as { name: string; size: number; type?: string; url?: string }[] : null;
            } catch {
                return null;
            }
        })();
        const devisDisplay = item.devis || '-';
        const modePaiementDisplay = (() => {
            if (item.modePaiement) {
                return item.paiementDetail ? `${item.modePaiement} (${item.paiementDetail})` : item.modePaiement;
            }
            if (item.paiementDetail) {
                return item.paiementDetail;
            }
            return '—';
        })();
        const isMine = user?.matricule === item.auteurMatricule;
        const hasValidated = item.historique?.some((h) => h.valideurMatricule === user?.matricule);
        const auteurPrenomUsuel = item.auteur?.prenomUsuelle || item.auteur?.prenom || item.auteur?.matricule || "-";

        // CUSTOM REFERENCE DISPLAY
        const customReference = item.reference || generateReference(item);

        return (
            <tr
                key={item.id}
                className={`group backdrop-blur-sm transition-all duration-300 border-b border-white/5 ${isMine ? "bg-amber-500/5 hover:bg-amber-500/10" : hasValidated ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-white/40"
                    }`}
            >
                <td className="px-4 py-4 text-center">
                    <input
                        type="checkbox"
                        checked={!!item.selected}
                        onChange={() => toggleRow(item.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                    />
                </td>
                <td className="px-6 py-5 whitespace-nowrap border-r border-white/10 min-w-numero">
                    <Link href={`/list/historique/${item.id}`} className="group/link block">
                        <span className="text-sm font-black text-slate-800 group-hover/link:text-blue-600 transition-colors drop-shadow-sm">
                            {customReference}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-200/50 text-slate-500">{item.type}</span>
                            {isMine && (
                                <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 border border-amber-500/20">
                                    Moi
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Demandeur: {isMine ? 'Moi' : auteurPrenomUsuel}</p>
                    </Link>
                </td>
                <td className="px-6 py-5 text-sm font-semibold text-slate-600 border-r border-white/10 min-w-description-motif leading-relaxed">{item.objet || '-'}</td>
                <td className="px-6 py-5 text-sm text-slate-500 border-r border-white/10 min-w-description-motif leading-relaxed italic">{item.description || '-'}</td>
                <td className="px-6 py-5 text-sm text-slate-500 border-r border-white/10 min-w-description-motif leading-relaxed">{item.motif || '-'}</td>
                {isStandard && (
                    <td className="px-6 py-5 text-sm font-black text-slate-700 border-r border-white/10 min-w-qte text-center">{qteDisplay}</td>
                )}
                {isStandard && (
                    <td className="px-6 py-5 text-sm font-bold text-slate-600 border-r border-white/10 min-w-standard">{fournisseurDisplay}</td>
                )}
                {isStandard && (
                    <td className="px-6 py-5 text-sm font-bold text-slate-500 text-right border-r border-white/10 min-w-montant">{puHtDisplay}</td>
                )}
                <td className="px-6 py-5 text-sm font-black text-slate-900 text-right border-r border-white/10 min-w-montant bg-white/20">{formattedMontant}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-500 border-r border-white/10 min-w-devis">
                    <span className="px-2 py-1 bg-slate-100/50 rounded-lg border border-white/40">{devisDisplay}</span>
                </td>
                {!isStandard && (
                    <td className="px-6 py-5 text-sm font-bold text-slate-500 border-r border-white/10 min-w-paiement">{modePaiementDisplay}</td>
                )}
                <td className="px-6 py-5 text-sm text-slate-500 border-r border-white/10 min-w-standard leading-snug">{item.justificationChoix || '-'}</td>
                <td className="px-6 py-5 text-sm border-r border-white/10 min-w-standard">
                    {attachments && attachments.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {attachments.map((file, fileIdx) => {
                                const isImage = file.type?.startsWith("image/");
                                const isPdf = file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");
                                const isExcel = file.type?.includes("excel") || file.type?.includes("spreadsheetml") || file.name?.toLowerCase().match(/\.xlsx?$|\.csv$/);
                                const isDoc = file.type?.includes("word") || file.name?.toLowerCase().match(/\.docx?$/);

                                let iconSrc = "/file.png";
                                if (isPdf) iconSrc = "/pdf-icon.png";
                                if (isExcel) iconSrc = "/excel-icon.png";
                                if (isDoc) iconSrc = "/word-icon.png";

                                return (
                                    <div key={`${file.url || file.name}-${fileIdx}`} className="relative group/file">
                                        <a
                                            href={file.url || "#"}
                                            download={file.name || "fichier"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-1.5 bg-white/60 rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all hover:scale-110"
                                            title={`Télécharger ${file.name || 'Fichier'}`}
                                        >
                                            <div className="relative w-10 h-10">
                                                <Image
                                                    src={iconSrc}
                                                    alt={file.name || "Fichier"}
                                                    fill
                                                    className="rounded-lg object-cover p-1 opacity-70"
                                                    onError={(e: any) => {
                                                        e.target.src = "/file.png";
                                                    }}
                                                />
                                            </div>
                                        </a>
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover/file:opacity-100 transition-opacity">
                                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <span className="text-slate-300">—</span>
                    )}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-600 border-r border-white/10 min-w-standard">{item.imputationComptable || '-'}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-600 border-r border-white/10 min-w-standard">{item.activite || '-'}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-600 border-r border-white/10 min-w-standard">{item.codeTIGER || '-'}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-400 border-r border-white/10 min-w-commentaire italic">
                    {[...(item.historique || [])].reverse().find(h => h.motifRefus)?.motifRefus || (
                        item.statut === 'EN_ATTENTE' ? 'Traitement en cours' :
                            item.statut === 'VALIDEE' ? 'Dossier validé' :
                                item.statut === 'REFUSEE' ? 'Dossier rejeté' :
                                    item.statut === 'EN_MAGASIN' ? 'Disponible au magasin' : item.statut
                    )}
                </td>
                <td className="px-6 py-5 text-sm">
                    <div className="flex flex-col items-center gap-3">
                        {statusRenderer(item.statut)}
                        <button
                            onClick={() => handleDownloadPDF(item.id)}
                            className="group/pdf flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white text-slate-700 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all hover:scale-105"
                        >
                            <Image src="/file.png" alt="" width={14} height={14} className="opacity-70 group-hover/pdf:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Aperçu</span>
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    const renderNavetteTableHeader = (layout: NavetteLayout) => {
        const isStandard = layout === "standard";
        const demandeurColSpan = isStandard ? 3 : 2;
        const financeColSpan = isStandard ? 5 : 4;
        return (
            <>
                <tr className="bg-slate-800/5 backdrop-blur-sm">
                    <th rowSpan={2} className="px-4 py-4 border-b border-white/20">
                        <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                    </th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-numero">Reference</th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-description-motif">Objet</th>

                    <th colSpan={demandeurColSpan} className="px-6 py-3 text-center text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-500/10 border-b border-r border-white/20">À Remplir par le Demandeur</th>

                    <th colSpan={financeColSpan + 1} className="px-6 py-3 text-center text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-500/10 border-b border-r border-white/20">FINANCE</th>

                    <th colSpan={3} className="px-6 py-3 text-center text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] bg-purple-500/10 border-b border-r border-white/20">CG (Contrôle de Gestion)</th>

                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-commentaire">Commentaire</th>
                    <th rowSpan={2} className="px-6 py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/20">Statut/Actions</th>
                </tr>
                <tr className="bg-slate-800/5 backdrop-blur-sm">
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">Description</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">Motif</th>
                    {isStandard && (
                        <th className="px-6 py-3 text-center text-[9px] font-black text-slate-500 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-qte">Qté</th>
                    )}

                    {isStandard && (
                        <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Fournisseur/Bénéficiaire</th>
                    )}
                    {isStandard && (
                        <th className="px-6 py-3 text-right text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-montant">P.U</th>
                    )}
                    <th className="px-6 py-3 text-right text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-montant">Montant (Ar)</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-devis">Devis (*)</th>
                    {!isStandard && (
                        <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-paiement">Mode de Paiement</th>
                    )}
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Justification Choix</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Pièce Jointe</th>

                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Imputation (Compte)</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Activité</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Code TIGER</th>
                </tr>
            </>
        );
    };

    const getColumnCount = (layout: NavetteLayout) => (layout === "standard" ? 16 : 14);

    if (loading) {
        return (
            <div className="surface-panel flex-1 m-4 mt-0 flex items-center justify-center">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 lg:p-6 no-scrollbar">
            {/* Page Header & Navigation */}
            <div className="glass-panel p-8 mb-8 shadow-2xl border-white/40 ring-1 ring-black/10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Gestion des demandes</p>
                        <div className="flex items-center gap-4 mt-1">
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Historique des Navettes</h1>
                            <button
                                onClick={() => fetchDemandes(viewMode)}
                                className="p-2 rounded-xl bg-white/40 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/60 transition-all active:scale-95 group"
                                title="Rafraîchir la liste"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`${loading || isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500 text-slate-600`}
                                >
                                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                                    <polyline points="21 3 21 8 16 8" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 mt-2 font-medium max-w-2xl">{viewSubtitle}</p>
                    </div>

                    <div className="flex items-center gap-3 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/50 w-fit">
                        {viewTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setViewMode(tab.key)}
                                className={`
                                    px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                                    ${viewMode === tab.key
                                        ? "neu-btn-active bg-white text-blue-600 shadow-lg scale-105"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div >

            {/* Search & Filters */}
            <div className="glass-card p-6 mb-8 border-white/60 shadow-xl overflow-visible">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <TableSearch
                            placeholder="Rechercher partout..."
                            onSearch={setSearchQuery}
                        />

                        <div className="flex items-center gap-2 p-1 bg-slate-100/30 rounded-xl border border-slate-200/50">
                            {FILTER_TYPES.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`
                                        px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200
                                        ${filterType === type
                                            ? 'bg-white text-blue-600 shadow-md scale-105 border border-slate-200/50'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                                        }
                                    `}
                                >
                                    {type === 'Tout' ? 'Toutes' : type}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="neu-input px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <button
                            onClick={handleBulkPDF}
                            className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100"
                            disabled={!demandes.some(d => d.selected)}
                        >
                            <Image src="/file.png" alt="" width={16} height={16} className="brightness-200 group-hover:rotate-12 transition-transform" />
                            Exporter Sélection
                        </button>

                        {userIsControleurGestion && (
                            <button
                                onClick={handleExportExcel}
                                className="px-6 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100"
                                disabled={filteredData.length === 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Exporter la liste
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Table Section */}
            <div className="glass-panel shadow-2xl border-white/40 overflow-hidden min-h-[400px]">
                <div className="px-8 py-5 border-b border-white/40 bg-white/40 flex items-center justify-between relative overflow-hidden">
                    {/* Background refresh bar */}
                    {isRefreshing && (
                        <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500/50 animate-shimmer" style={{ width: '100%' }} />
                    )}
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Liste des Demandes</h2>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">{filteredData.length} résultats trouvés</p>
                    </div>
                    {(loading || isRefreshing) && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 animate-pulse">
                                {loading ? 'Chargement...' : 'Mise à jour...'}
                            </span>
                            <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {groupedTables.length === 0 && !loading ? (
                    <div className="flex flex-col items-center justify-center py-24 opacity-60">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Image src="/refuse.png" alt="" width={40} height={40} className="grayscale" />
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Aucune demande trouvée</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/20">
                        {groupedTables.map((group, index) => {
                            const layout = getNavetteLayout(group.type);
                            const columnCount = getColumnCount(layout);
                            return (
                                <div key={group.type} className={`transition-all duration-500 ${index > 0 ? "mt-4" : ""}`}>
                                    <div className="px-8 py-3 bg-slate-800/5 backdrop-blur-sm flex items-center justify-between border-y border-white/20">
                                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">
                                            {group.label} <span className="ml-2 text-blue-600 opacity-60">({group.rows.length})</span>
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto no-scrollbar">
                                        <table className="min-w-full divide-y divide-white/20 navette-table">
                                            <thead>
                                                {renderNavetteTableHeader(layout)}
                                            </thead>
                                            <tbody className="divide-y divide-white/10">
                                                {group.rows.map(item => renderRow(item, layout))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <PDFModal
                isOpen={pdfModal.isOpen}
                onClose={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmDownloadPDF}
                initialValue={pdfModal.defaultName}
            />

            <style jsx global>{`
                .navette-table tbody td {
                    min-height: 4.5cm;
                    vertical-align: top;
                    padding: 5px;
                    box-sizing: border-box;
                    white-space: normal;
                    word-wrap: break-word;
                    overflow: visible;
                }
                .navette-table thead th {
                    vertical-align: middle;
                    padding: 0.5rem;
                    height: auto;
                }
                .navette-table .min-w-numero { min-width: 7rem; }
                .navette-table .min-w-description-motif { min-width: 14rem; }
                .navette-table .min-w-qte { min-width: 5rem; }
                .navette-table .min-w-montant { min-width: 10rem; }
                .navette-table .min-w-devis { min-width: 7rem; }
                .navette-table .min-w-standard { min-width: 8rem; }
                .navette-table .min-w-commentaire { min-width: 12rem; }
                .navette-table .min-w-paiement { min-width: 12rem; }
            `}</style>
        </div >
    );
};

export default HistoriqueListPage;
