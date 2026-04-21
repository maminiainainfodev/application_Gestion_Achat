"use client";



import { useState, useEffect, useMemo, type ReactElement, useCallback, useRef, Suspense } from 'react';
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { getPreferredName } from "@/lib/nameFormatter";
import {
    NAVETTE_FILTER_TYPES,
    type NavetteFilterType,
    type NavetteLayout,
    getNavetteLabel,
    getNavetteLayout,
    resolveNavetteFilterType,
} from "@/lib/navetteTableConfig";
import PDFModal from "@/components/PDFModal";
import dynamicImport from "next/dynamic";
import TableSearch from "@/components/TableSearch";
import { formatNavetteType } from "@/lib/workflowNotifications";

const FournisseurForm = dynamicImport(() => import("@/components/forms/fournisseurForm"), {
    loading: () => <p>Chargement...</p>,
});

const FILTER_TYPES: Array<NavetteFilterType | "Tout"> = [
    ...NAVETTE_FILTER_TYPES,
    "Tout",
];

const formatNumberWithSpaces = (value: number | string | null | undefined) => {
    const numeric = Number(value ?? 0);
    if (Number.isNaN(numeric)) return "0";
    return numeric.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const formatFileSize = (bytes: number) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const ROLE_ALIAS_MAP: Record<string, string> = {
    CHEFSERVICE: "ChefService",
    CHEFDEService: "ChefService",
    CHEFDESERVICE: "ChefService",
    CHEFSERVICES: "ChefService",
    CHARGEEACHAT: "ChargeeAchat",
    CHARGÉEACHAT: "ChargeeAchat",
    CHARGEEACHATS: "ChargeeAchat",
    RESPONSABLEFINANCIER: "ResponsableFinancier",
    RESPONSABLEFINANCE: "ResponsableFinancier",
    ASSISTANTELOGISTIQUE: "AssistanteLogistique",
    CONTROLEURGESTION: "ControleurGestion",
    CONTROLEURDEGESTION: "ControleurGestion",
    DIRECTRICE: "Direction",
};

// Champs en responsabilité propre pour chaque rôle
const BASE_FIELDS_BY_ROLE: Record<string, string[]> = {
    // Le Demandeur/ChefDeService/AssLog gèrent les infos de base
    // Pour simplifier, on considère que le "Niveau 1" (ChefService) hérite du Demandeur
    Demandeur: ["objet", "description", "motif", "quantite", "pieceJointe"],
    ChefService: ["activite"], // Valide le demandeur -> hérite via logique 'precedente'
    AssistanteLogistique: [],

    // Services Achats / Finance
    ChargeeAchat: ["pu", "quantite", "fournisseurNom", "devis", "justificationChoix"],
    ResponsableFinancier: ["pieceJointe"], // Valide
    ControleurGestion: ["pu", "imputationComptable", "activite", "codeTIGER"],
    Direction: ["pu"],
};

// Définition du flux pour déterminer "le précédent"
const WORKFLOW_PREDECESSORS: Record<string, Record<string, string>> = {
    // ACHAT: ChefS -> AssLog -> ChargeeAchat -> RespFin -> CG -> Direction
    'ACHAT': {
        'ChefService': 'Demandeur',
        'AssistanteLogistique': 'ChefService',
        'ChargeeAchat': 'AssistanteLogistique', // Hérite de AssLog (qui hérite de ChefS..)
        'ResponsableFinancier': 'ChargeeAchat',
        'ControleurGestion': 'ResponsableFinancier',
        'Direction': 'ControleurGestion'
    },
    // AUTRES (Paiement, NDF, etc): ChefS -> RespFin -> CG -> Direction
    'DEFAULT': {
        'ChefService': 'Demandeur',
        'ResponsableFinancier': 'ChefService',
        'ControleurGestion': 'ResponsableFinancier',
        'Direction': 'ControleurGestion'
    }
};

const getAllowedFieldsForRole = (navetteType: string, role: string): Set<string> => {
    const normalizedType = navetteType.toUpperCase() === 'ACHAT' ? 'ACHAT' : 'DEFAULT';
    const mapping = WORKFLOW_PREDECESSORS[normalizedType];

    const roleKey = Object.keys(ROLE_ALIAS_MAP).find(k => ROLE_ALIAS_MAP[k] === role) ? role : (
        Object.values(ROLE_ALIAS_MAP).includes(role) ? role : null
    );

    if (!roleKey) return new Set();

    // 1. Champs du niveau actuel
    const myFields = [...(BASE_FIELDS_BY_ROLE[roleKey] || [])];

    // Cas particulier: Responsable Financier peut modifier le P.U. (Montant) pour les DRFMS
    if (navetteType === 'DRFMS' && roleKey === 'ResponsableFinancier') {
        myFields.push('pu', 'pieceJointe');
    }

    // 2. Champs du niveau précédent
    const prevRole = mapping[roleKey];
    let prevFields: string[] = [];

    if (prevRole) {
        prevFields = BASE_FIELDS_BY_ROLE[prevRole] || [];

        // Si le rôle précédent n'a pas de champs propres (ex: ChefService, AssLog), 
        // on remonte jusqu'à trouver des champs (ex: Demandeur) pour que la chaîne ne soit pas vide ?
        // La demande est: "son niveau et celui du precedente". Littéralement.
        // Si precedent = ChefService (vide), alors on n'édite rien de plus?
        // Probablement que ChefService est considéré comme "Le niveau Demandeur" dans la tête de l'utilisateur.
        // On va inclure Demandeur si prevRole est ChefService ou AssLog pour lister les champs de base.
        if ((prevRole === 'ChefService' || prevRole === 'AssistanteLogistique') && prevFields.length === 0) {
            prevFields = BASE_FIELDS_BY_ROLE['Demandeur'] || [];
        }
    }

    return new Set([...myFields, ...prevFields]);
};

const normalizeRoleName = (role?: string | null): string => {
    if (!role) return "";
    const key = role
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase();
    return ROLE_ALIAS_MAP[key] ?? role;
};

const statusRenderer = (status: string) => {
    const normalized = status.toUpperCase();
    switch (normalized) {
        case "VALIDEE":
            return (
                <span className="inline-flex text-xs leading-5 font-semibold text-green-600 items-center" title="Validée">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            );
        case "REFUSEE":
            return (
                <span className="inline-flex text-xs leading-5 font-semibold text-red-600 items-center" title="Refusée">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            );
        case "EN_MAGASIN":
            return (
                <span className="inline-flex text-xs leading-5 font-semibold text-blue-600 items-center" title="En magasin">
                    <Image src="/magasin.png" alt="En magasin" width={20} height={20} />
                </span>
            );
        case "EN_ATTENTE":
            return (
                <span className="inline-flex text-xs leading-5 font-semibold text-yellow-600 items-center" title="En attente">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            );
        default:
            return <span className="text-gray-500 font-medium text-xs">{status}</span>;
    }
};

const formatDateTime = (value: string | Date | null | undefined) => {
    if (!value) return "—";
    const date = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(date?.getTime?.())) return "—";
    return date.toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatHistoriqueStatus = (status: string) => {
    switch (status) {
        case "VALIDEE":
        case "Validée":
            return "Validée";
        case "REFUSEE":
        case "Refusée":
            return "Refusée";
        case "EN_ATTENTE":
        case "En attente":
            return "En attente";
        case "MIS_A_JOUR":
        case "Mis à jour":
            return "Mis à jour";
        case "EN_MAGASIN":
        case "En magasin":
            return "En magasin";
        default:
            return status;
    }
};

type HistoriqueItem = {
    id: number;
    etape: number;
    statut: string;
    motifRefus: string | null;
    dateValidation: string;
    valideurMatricule: string | null;
    valideur: {
        matricule: string | null;
        nom: string | null;
        prenom: string | null;
    } | null;
};

type DemandeurData = {
    id: number;
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
    isBCGenere?: boolean;
    isAPGenere?: boolean;
    dateDepot: string;
    budgetID: number | null;
    auteur: {
        matricule: string;
        nom: string | null;
        prenom: string | null;
        prenomUsuelle?: string | null;
        serviceAbbrev?: string | null;
    } | null;
    historique: HistoriqueItem[];
    currentRole?: string | null;
    currentRoleDisplay?: string | null;
    nextRole?: string | null;
    nextRoleDisplay?: string | null;
    isAuteur?: boolean;
    isCurrentValidator?: boolean;
    selected?: boolean;
};

type FournisseurOption = {
    id: number;
    nom: string | null;
};

// Helpers for Status Display
const statusIcons: Record<string, React.ReactElement> = {
    VALIDEE: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    REFUSEE: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    EN_ATTENTE: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    EN_MAGASIN: (
        <Image src="/magasin.png" alt="En magasin" width={16} height={16} />
    ),
    default: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "VALIDEE": return "bg-green-100 text-green-800";
        case "REFUSEE": return "bg-red-100 text-red-800";
        case "EN_ATTENTE": return "bg-amber-100 text-amber-800";
        case "EN_MAGASIN": return "bg-blue-100 text-blue-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const AttenteListContent = () => {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const scopeParam = (searchParams.get("scope") || "").toLowerCase();
    const scope: "mine" | "to_validate" | "all" =
        scopeParam === "mine"
            ? "mine"
            : scopeParam === "to_validate" || scopeParam === "to-validate"
                ? "to_validate"
                : "all";
    const [demandes, setDemandes] = useState<DemandeurData[]>([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState<{ scope: string; total: number; self: number; others: number } | null>(null);
    const [filterType, setFilterType] = useState<NavetteFilterType | 'Tout'>('Tout');
    const [filterDate, setFilterDate] = useState('');
    const [filterAuteur, setFilterAuteur] = useState<string>('Tout');
    const [searchQuery, setSearchQuery] = useState('');
    const [refuseModalOpen, setRefuseModalOpen] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState<number | null>(null);
    const [motifRefus, setMotifRefus] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [validatorEditMode] = useState(false); // Mode modification pour les valideurs (désactivé)
    const [editedValues, setEditedValues] = useState<Record<number, {
        objet?: string;
        description?: string;
        motif?: string;
        quantite?: string;
        pu?: string;
        justificationChoix?: string;
        imputationComptable?: string;
        activite?: string;
        codeTIGER?: string;
        fournisseurNom?: string;
        fournisseurId?: number | null;
        devis?: string;
        pieceJointe?: any[];
    }>>({});
    const [fournisseurOptions, setFournisseurOptions] = useState<FournisseurOption[]>([]);
    const [fournisseurSearchTerm, setFournisseurSearchTerm] = useState('');
    const [creatingFournisseurFor, setCreatingFournisseurFor] = useState<number | null>(null);
    const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);
    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const [supplierModalData, setSupplierModalData] = useState<{ Nom?: string, forItemId?: number } | null>(null);
    const fournisseurFetchAbortRef = useRef<AbortController | null>(null);
    const [processingItems, setProcessingItems] = useState<Set<number>>(new Set());
    const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; id: number; defaultName: string }>({
        isOpen: false,
        id: 0,
        defaultName: "",
    });

    const fetchDemandes = useCallback(async (isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            const response = await fetch(
                `/api/demandeur/attente${scope === "all" ? "" : `?scope=${scope}`}`
            );
            const data = await response.json();
            if (data.success) {
                const withSelection: DemandeurData[] = (data.data as DemandeurData[]).map(d => ({ ...d, selected: false }));
                setDemandes(withSelection);
                setMeta(data.meta ?? null);
            } else {
                if (!isBackground) toast.error(data.message || "Erreur lors du chargement des demandes");
            }
        } catch (error) {
            console.error("Erreur:", error);
            if (!isBackground) toast.error("Erreur lors du chargement des demandes");
        } finally {
            if (!isBackground) setLoading(false);
        }
    }, [scope]);



    const loadFournisseurs = useCallback(
        async (query?: string) => {
            try {
                if (fournisseurFetchAbortRef.current) {
                    fournisseurFetchAbortRef.current.abort();
                }
                const controller = new AbortController();
                fournisseurFetchAbortRef.current = controller;

                const trimmed = query?.trim() ?? "";
                const searchParam =
                    trimmed.length > 0
                        ? `?search=${encodeURIComponent(trimmed)}`
                        : "?limit=50";

                const res = await fetch(`/api/fournisseur${searchParam}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });
                if (!res.ok) return;
                const data = await res.json();
                if (Array.isArray(data)) {
                    setFournisseurOptions(data);
                }
            } catch (error: any) {
                if (error?.name === "AbortError") return;
                console.error("Erreur chargement fournisseurs:", error);
            }
        },
        []
    );

    useEffect(() => {
        const trimmed = fournisseurSearchTerm.trim();
        if (trimmed.length === 0) {
            loadFournisseurs();
            return;
        }
        if (trimmed.length < 2) {
            return;
        }

    }, [fournisseurSearchTerm, loadFournisseurs]);

    useEffect(() => {
        fetchDemandes(false);
    }, [fetchDemandes]);

    // Sync search query from URL
    useEffect(() => {
        const query = searchParams.get("query") || searchParams.get("q") || searchParams.get("search") || "";
        setSearchQuery(query);
    }, [searchParams]);

    useEffect(() => {
        return () => {
            fournisseurFetchAbortRef.current?.abort();
        };
    }, []);


    const getColumnCount = (layout: NavetteLayout) => {
        const base = layout === "standard" ? 15 : 13;
        return base + 1; // Always include selection column
    };

    const startEdit = (item: DemandeurData) => {
        setEditingId(item.id);
        setEditedValues(prev => ({
            ...prev,
            [item.id]: {
                objet: item.objet || '',
                description: item.description || '',
                motif: item.motif || '',
                quantite: item.quantite !== null ? String(item.quantite) : '',
                pu: item.pu !== null ? String(item.pu) : '',
                justificationChoix: item.justificationChoix || '',
                imputationComptable: item.imputationComptable || '',
                activite: item.activite || '',
                codeTIGER: item.codeTIGER || '',
                fournisseurNom: item.fournisseur?.nom || '',
                fournisseurId: item.fournisseurID ?? null,
            }
        }));
    };

    const cancelEdit = (id: number) => {
        setEditingId(null);
        setEditedValues(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const saveEdit = async (item: DemandeurData): Promise<boolean> => {
        const values = editedValues[item.id] || {};

        // Use values from editedValues if present, otherwise fall back to item values
        // We use undefined check because empty string is a valid value
        const objet = values.objet !== undefined ? values.objet : item.objet;
        const description = values.description !== undefined ? values.description : item.description;
        const motif = values.motif !== undefined ? values.motif : item.motif;
        const quantiteStr = values.quantite !== undefined ? values.quantite : (item.quantite !== null ? String(item.quantite) : '');
        const puStr = values.pu !== undefined ? values.pu : (item.pu !== null ? String(item.pu) : '');
        const justificationChoix = values.justificationChoix !== undefined ? values.justificationChoix : item.justificationChoix;
        const imputationComptable = values.imputationComptable !== undefined ? values.imputationComptable : item.imputationComptable;
        const activite = values.activite !== undefined ? values.activite : item.activite;
        const codeTIGER = values.codeTIGER !== undefined ? values.codeTIGER : item.codeTIGER;
        const fournisseurNomInput = values.fournisseurNom !== undefined ? values.fournisseurNom : (item.fournisseur?.nom || '');

        let fournisseurId =
            values.fournisseurId !== undefined ? values.fournisseurId : item.fournisseurID;

        const quantiteNum = quantiteStr ? Number(quantiteStr) : (item.quantite ?? 0);
        if (quantiteStr && (isNaN(quantiteNum as any) || (quantiteNum as any) < 0)) {
            toast.error("Quantité invalide");
            return false;
        }
        const puNum = puStr ? Number(puStr) : (item.pu ?? null);
        if (puStr && (isNaN(puNum as any) || (puNum as any) < 0)) {
            toast.error("P.U invalide");
            return false;
        }
        // Calcul automatique du montant
        const newMontant = puNum !== null && quantiteNum > 0 ? (quantiteNum as number) * (puNum as number) : item.montant;

        // Calcul automatique du devis
        let newDevis: string | null | undefined = values.devis;
        if (!newDevis) {
            newDevis = item.devis;
            if (newMontant) {
                if (newMontant <= 100000) {
                    newDevis = '0';
                } else if (newMontant <= 1000000) {
                    newDevis = '1';
                } else if (newMontant <= 2000000) {
                    newDevis = '2';
                } else if (newMontant <= 5000000) {
                    newDevis = '3';
                } else {
                    newDevis = "Appel d'offre";
                }
            }
        }

        // Gestion du fournisseur
        if (!fournisseurId && fournisseurNomInput && fournisseurNomInput.trim() !== '') {
            const existing = fournisseurOptions.find(
                (opt) => (opt.nom || "").toLowerCase() === fournisseurNomInput.toLowerCase()
            );
            if (existing) {
                fournisseurId = existing.id;
            } else {
                toast.error("Ce fournisseur n'existe pas. Veuillez l'ajouter avant d'enregistrer.");
                return false;
            }
        }

        try {
            const payload = {
                objet: objet || null,
                description: description || null,
                motif: motif || null,
                quantite: quantiteNum,
                pu: puNum,
                justificationChoix: justificationChoix || null,
                imputationComptable: imputationComptable || null,
                activite: activite || null,
                codeTIGER: codeTIGER || null,
                montant: newMontant,
                devis: newDevis,
                fournisseurID: fournisseurId ?? null,
                pieceJointe: values.pieceJointe !== undefined ? JSON.stringify(values.pieceJointe) : (item.pieceJointe || null),
            };

            const res = await fetch(`/api/demandeur/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Erreur lors de la sauvegarde");
            }
            toast.success("Modifications enregistrées");
            setEditingId(null);
            setEditedValues(prev => {
                const next = { ...prev };
                delete next[item.id];
                return next;
            });
            return true;
        } catch (e: any) {
            toast.error(e.message || "Erreur lors de l'enregistrement");
            return false;
        }
    };

    const handleCreateFournisseur = (item: DemandeurData) => {
        const currentValues = editedValues[item.id] ?? initializeItemValues(item);
        const rawValue = (currentValues.fournisseurNom ?? "").trim();

        if (!rawValue) {
            toast.error("Veuillez saisir un nom de fournisseur.");
            return;
        }

        // Ouvrir le modal avec le nom pré-rempli
        setSupplierModalData({ Nom: rawValue, forItemId: item.id });
        setSupplierModalOpen(true);
    };

    const handleSupplierSuccess = (newFournisseur: any) => {
        setSupplierModalOpen(false);
        // Mettre à jour la liste des options
        setFournisseurOptions((prev) => {
            const exists = prev.some((opt) => opt.id === newFournisseur.id);
            if (exists) return prev;
            // UPDATE: Use default casing from API response (nom instead of Nom)
            const nom = newFournisseur.nom || newFournisseur.Nom || "";
            return [...prev, { id: newFournisseur.id, nom }].sort((a, b) =>
                (a.nom || "").localeCompare(b.nom || "", undefined, { sensitivity: "base" })
            );
        });

        // Si nous créions cela pour une demande spécifique, mettons à jour sa valeur
        if (supplierModalData?.forItemId) {
            const itemId = supplierModalData.forItemId;

            // UPDATE: Use default casing from API response (nom instead of Nom)
            const nom = newFournisseur.nom || newFournisseur.Nom || "";

            setEditedValues((prev) => {
                const currentValues = prev[itemId] ?? initializeItemValues(demandes.find(d => d.id === itemId)!);
                // Also update the search term to match the new supplier so it appears found
                setFournisseurSearchTerm(nom);
                return {
                    ...prev,
                    [itemId]: {
                        ...currentValues,
                        fournisseurNom: nom,
                        fournisseurId: newFournisseur.id,
                    },
                };
            });
        }
        setSupplierModalData(null);
    };

    const handleDelete = async (item: DemandeurData) => {
        try {
            const res = await fetch(`/api/demandeur/${item.id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Suppression impossible");
            }
            toast.success("Demande supprimée");
            // L'interface sera mise à jour lors du prochain rafraîchissement manuel
        } catch (e: any) {
            toast.error(e.message || "Erreur lors de la suppression");
        }
    };

    const downloadPDF = (base64Data: string, filename: string) => {
        try {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (e) {
            console.error("Erreur lors du téléchargement du PDF", e);
            toast.error("Erreur lors du téléchargement du PDF");
        }
    };

    const handleValider = async (id: number, action: string = 'valider') => {
        if (processingItems.has(id)) return;

        try {
            // Optimistic UI: Feedback immédiat
            setProcessingItems(prev => new Set(prev).add(id));
            // toast.success("Demande validée avec succès"); // REMOVED: Moved to actual success

            // Sauvegarder les modifications en cours si existantes avant de valider
            const pendingEdits = editedValues[id];
            const item = demandes.find(d => d.id === id);

            if (item && pendingEdits && Object.keys(pendingEdits).length > 0) {
                const success = await saveEdit(item);
                if (!success) {
                    // Si l'enregistrement échoue, on arrête tout
                    setProcessingItems(prev => {
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                    });
                    return;
                }
            }

            const response = await fetch(`/api/demandeur/${id}/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });

            const data = await response.json();
            if (data.success) {
                // Télécharger les PDFs s'ils sont présents dans la réponse
                if (data.data?.bonCommande) {
                    downloadPDF(data.data.bonCommande, `Bon_Commande_${id}.pdf`);
                    toast.success("Bon de Commande téléchargé");
                }

                if (data.data?.autorisationPaiement) {
                    // Petit délai pour ne pas bloquer le navigateur avec deux téléchargements simultanés
                    setTimeout(() => {
                        downloadPDF(data.data.autorisationPaiement, `Autorisation_Paiement_${id}.pdf`);
                        toast.success("Autorisation de Paiement téléchargée");
                    }, 500);
                }

                toast.success(action === "generate_ap" ? "Autorisation de paiement générée" : "Demande validée avec succès");

                // Si on a généré un document, on propose de voir la page de rendu
                if (data.data?.bonCommande || (action === "valider" && item?.type === "ACHAT" && item?.etapeActuelle === 7)) {
                    // Optionnel: router.push(`/render/bon-commande/${id}`);
                }
            } else {
                // En cas d'erreur API, on annule l'effet optimiste (bien que le toast soit déjà passé)
                toast.error(data.message || "Erreur lors de la validation");
                setProcessingItems(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            }
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors de la validation");
            setProcessingItems(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    };

    const handlePrendreMagasin = async (id: number) => {
        try {
            const response = await fetch(`/api/demandeur/${id}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'prendre_magasin' }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Demande prise au magasin");
                // L'interface sera mise à jour lors du prochain rafraîchissement manuel
            } else {
                toast.error(data.message || "Erreur lors de la prise en magasin");
            }
        } catch (e) {
            toast.error("Erreur lors de la prise en magasin");
        }
    };

    const handleRefuser = async () => {
        if (!selectedDemande || !motifRefus.trim()) {
            toast.error("Veuillez saisir un motif de refus");
            return;
        }

        try {
            const response = await fetch(`/api/demandeur/${selectedDemande}/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'refuser',
                    motifRefus: motifRefus.trim()
                }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Demande refusée avec succès");
                setRefuseModalOpen(false);
                setSelectedDemande(null);
                setMotifRefus('');
                // L'interface sera mise à jour lors du prochain rafraîchissement manuel
            } else {
                toast.error(data.message || "Erreur lors du refus");
            }
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors du refus");
        }
    };

    const openRefuseModal = (id: number) => {
        setSelectedDemande(id);
        setRefuseModalOpen(true);
    };

    // Dérive l'état "Tout sélectionner" des données
    const allSelected = demandes.length > 0 && demandes.every(d => d.selected);

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

    const handleExportList = async () => {
        const ids = demandes.filter(d => d.selected).map(d => d.id);
        if (ids.length === 0) {
            toast.error("Veuillez sélectionner au moins une ligne");
            return;
        }
        try {
            const response = await fetch('/api/demandeur/export/excel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (!response.ok) {
                toast.error("Erreur lors de l'export de la liste");
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `liste_a_valider_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Liste exportée en Excel");
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur lors de l'export de la liste");
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

        if (filterAuteur !== 'Tout') {
            currentData = currentData.filter(item =>
                item.auteur?.prenomUsuelle === filterAuteur
            );
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            currentData = currentData.filter(item => {
                const isSelf = item.isAuteur ?? (user?.matricule === item.auteurMatricule);
                const searchStrings = [
                    item.numero ? `n°${item.numero}` : `id ${item.id}`,
                    item.type,
                    formatHistoriqueStatus(item.statut),
                    item.currentRoleDisplay,
                    item.currentRole,
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
                    isSelf ? "moi" : null,
                    isSelf ? "ma demande" : "à valider",
                    formatDateTime(item.dateDepot),
                    item.modePaiement,
                    item.paiementDetail,
                    item.historique?.map(h => [h.valideur?.nom, h.valideur?.prenom, h.motifRefus, h.statut]).flat()
                ].filter(Boolean).flat().map(s => String(s).toLowerCase());

                return searchStrings.some(s => s.includes(query));
            });
        }

        return currentData;
    }, [demandes, filterType, filterDate, filterAuteur, searchQuery, user?.matricule]);

    const auteurOptions = useMemo(() => {
        const names = demandes
            .map(d => d.auteur?.prenomUsuelle)
            .filter((name): name is string => Boolean(name));
        return ['Tout', ...Array.from(new Set(names)).sort()];
    }, [demandes]);

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

    const summary = useMemo(() => {
        const total = filteredData.length;
        const self = filteredData.filter((item) => item.isAuteur).length;
        return {
            total,
            self,
            others: total - self,
        };
    }, [filteredData]);

    const memoizedSupplierData = useMemo(() =>
        supplierModalData ? { Nom: supplierModalData.Nom } : undefined
        , [supplierModalData]);

    const stats = meta ?? summary;
    const viewTitle =
        scope === "mine"
            ? "Mes navettes en attente"
            : scope === "to_validate"
                ? "Demandes à valider"
                : "Navettes en attente";
    const viewSubtitle =
        scope === "mine"
            ? "Vos demandes encore en cours de validation."
            : scope === "to_validate"
                ? "Demandes d'autres collaborateurs (les vôtres sont signalées) qui attendent votre décision."
                : "Toutes les demandes en attente accessibles avec votre profil.";

    function initializeItemValues(item: DemandeurData) {
        return {
            objet: item.objet || '',
            description: item.description || '',
            motif: item.motif || '',
            quantite: item.quantite !== null ? String(item.quantite) : '',
            pu: item.pu !== null ? String(item.pu) : '',
            // justificationChoix: item.justificationChoix || '', // Removed
            imputationComptable: item.imputationComptable || '',
            activite: item.activite || '',
            codeTIGER: item.codeTIGER || '',
            fournisseurNom: item.fournisseur?.nom || '',
            fournisseurId: item.fournisseurID ?? null,
            pieceJointe: item.pieceJointe ? JSON.parse(item.pieceJointe) : [],
        };
    }

    const updateField = (item: DemandeurData, field: string, value: any) => {
        setEditedValues(prev => {
            const currentValues = prev[item.id] ?? initializeItemValues(item);
            const updatedValues = {
                ...currentValues,
                [field]: value
            };

            // Calcul automatique du montant si quantite ou pu est modifié
            if (field === 'quantite' || field === 'pu') {
                const qte = parseFloat(updatedValues.quantite || String(item.quantite || 0)) || 0;
                const pu = parseFloat(updatedValues.pu || String(item.pu || 0)) || 0;
                const montant = qte * pu;

                // Calcul du devis
                let newDevis = '';
                if (montant <= 100000) newDevis = '0';
                else if (montant <= 1000000) newDevis = '1';
                else if (montant <= 2000000) newDevis = '2';
                else if (montant <= 5000000) newDevis = '3';
                else newDevis = "Appel d'offre";

                updatedValues.devis = newDevis;
            }

            return {
                ...prev,
                [item.id]: updatedValues
            };
        });
    };



    const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.max(el.scrollHeight, 48)}px`;
    };

    const textareaChangeHandler = (
        item: DemandeurData,
        field: "description" | "motif" // | "justificationChoix"
    ) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        autoResizeTextarea(e.currentTarget);
        autoResizeTextarea(e.currentTarget);
        updateField(item, field, e.currentTarget.value);
    };

    const uploadAttachment = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/uploads", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                return data.data;
            } else {
                toast.error(data.message || "Erreur upload");
                return null;
            }
        } catch (e) {
            console.error(e);
            toast.error("Erreur upload");
            return null;
        }
    };

    const handleFileChange = async (item: DemandeurData, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const uploadedFiles: any[] = [];

            for (const file of files) {
                const uploaded = await uploadAttachment(file);
                if (uploaded) {
                    uploadedFiles.push(uploaded);
                }
            }

            setEditedValues(prev => {
                const currentValues = prev[item.id] ?? initializeItemValues(item);
                const existingFiles = currentValues.pieceJointe || [];
                return {
                    ...prev,
                    [item.id]: {
                        ...currentValues,
                        pieceJointe: [...existingFiles, ...uploadedFiles]
                    }
                };
            });
        }
    };

    const removeFile = (item: DemandeurData, fileIndex: number) => {
        setEditedValues(prev => {
            const currentValues = prev[item.id] ?? initializeItemValues(item);
            const currentFiles = [...(currentValues.pieceJointe || [])];
            currentFiles.splice(fileIndex, 1);
            return {
                ...prev,
                [item.id]: {
                    ...currentValues,
                    pieceJointe: currentFiles
                }
            };
        });
    };

    const fieldBaseClasses =
        "w-full rounded-xl bg-gray-100/50 border-0 px-3 py-2 text-sm text-slate-700 shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] focus:outline-none focus:bg-white focus:shadow-[0_0_15px_rgba(59,130,246,0.5),inset_0px_0px_0px_transparent] transition-all duration-300 ease-in-out placeholder:text-gray-400";
    const textAreaBaseClasses = `${fieldBaseClasses} resize-none min-h-[44px] leading-relaxed`;
    const disabledCls = "bg-slate-100 text-slate-400 cursor-not-allowed opacity-60";

    const checkValidationDisabled = (item: DemandeurData): boolean => {
        // Validation assouplie : plus aucun blocage strict ("pas obligatoire") pour la plupart
        // MAIS pour le Contrôleur de Gestion, on exige : Imputation, Activité, Code TIGER
        const currentUserRole = normalizeRoleName(user?.role);

        if (currentUserRole === "ControleurGestion") {
            const values = editedValues[item.id] || {};
            // On vérifie les valeurs éditées (en priorité) ou les valeurs existantes
            const imputation = values.imputationComptable !== undefined ? values.imputationComptable : item.imputationComptable;
            const activite = values.activite !== undefined ? values.activite : item.activite;
            const codeTIGER = values.codeTIGER !== undefined ? values.codeTIGER : item.codeTIGER;

            // Si l'un des trois est vide ou null --> bouton désactivé
            if (!imputation || !imputation.trim()) return true;
            if (!activite || !activite.trim()) return true;
            if (!codeTIGER || !codeTIGER.trim()) return true;
        }

        return false;
    };

    const renderRow = (item: DemandeurData, layout: NavetteLayout) => {
        const isStandardLayout = layout === "standard";
        const normalizedType = resolveNavetteFilterType(item.type);
        // Calculer le montant en temps réel si des modifications sont en cours
        const editedItem = editedValues[item.id];
        let currentMontant = Number(item.montant ?? 0);
        let currentDevis = item.devis;
        if (editedItem) {
            const qte = editedItem.quantite !== undefined ? parseFloat(editedItem.quantite || String(item.quantite || 0)) : (item.quantite || 0);
            const pu = editedItem.pu !== undefined ? parseFloat(editedItem.pu || String(item.pu || 0)) : (item.pu || 0);
            if (pu > 0 && qte > 0) {
                currentMontant = qte * pu;
                // Calculer le devis automatiquement
                if (currentMontant <= 100000) {
                    currentDevis = '0';
                } else if (currentMontant <= 1000000) {
                    currentDevis = '1';
                } else if (currentMontant <= 2000000) {
                    currentDevis = '2';
                } else if (currentMontant <= 5000000) {
                    currentDevis = '3';
                } else {
                    currentDevis = "Appel d'offre";
                }
            }
        }

        const attachments = (() => {
            if (!item.pieceJointe) return null;
            try {
                const parsed = JSON.parse(item.pieceJointe);
                return Array.isArray(parsed) ? parsed as { name: string; size: number; type?: string; url?: string }[] : null;
            } catch {
                return null;
            }
        })();

        const formattedMontant = `${formatNumberWithSpaces(currentMontant)} Ar`;
        const formattedPu = item.pu !== null && item.pu !== undefined ? `${formatNumberWithSpaces(item.pu)} Ar` : '-';
        // Afficher le prix depuis editedValues si modifié, sinon depuis item
        const currentPu = editedItem?.pu !== undefined ? `${formatNumberWithSpaces(parseFloat(editedItem.pu || "0"))} Ar` : formattedPu;

        const qteDisplay = item.quantite !== null ? item.quantite : '-';
        const fournisseurDefaultValue = item.fournisseur?.nom || '';
        const fournisseurDisplay = fournisseurDefaultValue || '-';
        const puDisplay = currentPu;
        const devisDisplay = currentDevis || item.devis || '-';
        const modePaiementDisplay = (() => {
            if (item.modePaiement) {
                return item.paiementDetail
                    ? `${item.modePaiement} (${item.paiementDetail})`
                    : item.modePaiement;
            }
            if (item.paiementDetail) {
                return item.paiementDetail;
            }
            return '—';
        })();

        const isAuteurMatricule = user?.matricule === item.auteurMatricule;
        const isAuteur = item.isAuteur ?? isAuteurMatricule;
        const isCurrentValidator = item.isCurrentValidator ?? false;
        const currentRoleLabel = item.currentRoleDisplay || item.currentRole || null;
        const nextRoleLabel = item.nextRoleDisplay || item.nextRole || null;
        const auteurName = item.auteur
            ? getPreferredName(item.auteur, item.auteur.matricule || "-")
            : "-";
        const statusLabel = formatHistoriqueStatus(item.statut);
        const isPending = item.statut === "EN_ATTENTE" || item.statut === "EN_MAGASIN";
        const canValidate =
            (user?.role === "Administrateur" || isCurrentValidator) && isPending;

        // Logic: Editable/Deletable by author UNTIL validated by Direction (or Refused/Magasin)
        const isLockedForAuthor =
            ['VALIDEE', 'REFUSEE', 'EN_MAGASIN'].includes(item.statut) ||
            (normalizedType === 'Achat' && item.etapeActuelle > 6);

        const canDelete = isAuteurMatricule && !isLockedForAuthor;
        const isEditing = editingId === item.id;
        const editVals = editedValues[item.id] || {};
        const fournisseurInputValue = editVals.fournisseurNom ?? fournisseurDefaultValue;

        const historiqueItems = item.historique || [];

        const currentRoleCanonical = normalizeRoleName(item.currentRole || item.currentRoleDisplay || null);
        // Validators can edit specific fields according to their role (un-commented and updated)
        const validatorAllowedFields = getAllowedFieldsForRole(item.type, currentRoleCanonical);
        const canEditAsValidator = canValidate;
        const showMagasinForItem = currentRoleCanonical === "AssistanteLogistique" && normalizedType === "Achat" && isPending;

        const isEditingAsValidator = isEditing && canEditAsValidator && !isAuteurMatricule;
        // Pour les valideurs : les champs sont directement éditables si vides, ou si en mode modification
        const isValidatorDirectEdit = canEditAsValidator && !isAuteurMatricule && (validatorEditMode || scope === "to_validate");
        const canEditField = (
            field:
                | keyof DemandeurData
                | "objet"
                | "description"
                | "motif"
                | "quantite"
                | "pu"
                // | "justificationChoix"
                | "imputationComptable"
                | "activite"
                | "codeTIGER"
                | "fournisseurNom"
        ) => {
            // Priority 1: "mine" scope (Mes navettes en attente)
            if (scope === "mine") {
                return isAuteurMatricule && !isLockedForAuthor;
            }

            // Priority 2: "to_validate" scope (À valider)
            // Any validator can edit ANY field when it's their turn
            if (scope === "to_validate") {
                return canValidate;
            }

            // Fallback for other potential scopes or mixed views
            if (isEditing) return true;
            if (isAuteurMatricule && canDelete) return true;

            // If it's the current user's turn to validate, allow editing everything
            if (canValidate) {
                return true;
            }

            return false;
        };
        const canEditFournisseur = isEditing || canEditField("fournisseurNom");
        const trimmedFournisseurValue = (fournisseurInputValue || "").trim();
        const hasFournisseurMatch =
            trimmedFournisseurValue.length > 0 &&
            fournisseurOptions.some(
                (opt) => (opt.nom || "").toLowerCase() === trimmedFournisseurValue.toLowerCase()
            );
        const canSuggestFournisseurCreation =
            canEditFournisseur && trimmedFournisseurValue.length >= 2 && !hasFournisseurMatch;
        const buildValidationGroup = (key: string, includeMagasin: boolean): ReactElement => {
            const isDisabled = processingItems.has(item.id) || checkValidationDisabled(item);
            const isAchat = normalizedType === "Achat";
            const isLastStep = item.etapeActuelle === 7;
            const isValidee = item.statut === "VALIDEE";

            // Cas particulier pour le dernier valideur de Navette Achat (Chargée Achat Étape 7)
            if (isAchat && isLastStep) {
                return (
                    <div key={`validation-${key}`} className="flex flex-col gap-2 mt-2">
                        {!isValidee ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleValider(item.id, 'valider')}
                                    disabled={isDisabled}
                                    title="Valider et générer le Bon de Commande"
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all shadow-md ${isDisabled
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed grayscale"
                                        : "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95"
                                        }`}
                                >
                                    <Image src="/valide.png" alt="" width={14} height={14} className="brightness-0 invert" />
                                    Valider (BC)
                                </button>
                                <button
                                    onClick={() => openRefuseModal(item.id)}
                                    title="Refuser"
                                    className="p-2 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors shadow-sm"
                                >
                                    <Image src="/refuse.png" alt="Refuser" width={14} height={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-emerald-600 uppercase mb-1">Documents disponibles</span>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/render/bon-commande/${item.id}`}
                                        target="_blank"
                                        className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded border border-blue-200 hover:bg-blue-100 transition-all shadow-sm"
                                    >
                                        <Image src="/file.png" alt="" width={10} height={10} />
                                        Voir BC
                                    </Link>

                                    <div className="flex gap-2 items-center">
                                        {!item.isAPGenere ? (
                                            <button
                                                onClick={() => handleValider(item.id, 'generate_ap')}
                                                disabled={processingItems.has(item.id)}
                                                className="flex items-center gap-1.5 px-2 py-1 bg-amber-500 text-white text-[10px] font-black rounded hover:bg-amber-600 transition-all shadow-md active:scale-95"
                                            >
                                                <Image src="/valide.png" alt="" width={10} height={10} className="brightness-0 invert" />
                                                Générer AP
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    disabled
                                                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-200 text-slate-500 text-[10px] font-black rounded cursor-not-allowed"
                                                >
                                                    <Image src="/valide.png" alt="" width={10} height={10} className="brightness-0 opacity-30" />
                                                    AP Généré
                                                </button>
                                                <Link
                                                    href={`/render/autorisation-paiement/${item.id}`}
                                                    target="_blank"
                                                    className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded border border-emerald-200 hover:bg-emerald-100 transition-all shadow-sm"
                                                >
                                                    <Image src="/file.png" alt="" width={10} height={10} />
                                                    Voir AP
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            return (
                <div key={`validation-${key}`} className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => handleValider(item.id)}
                        disabled={isDisabled}
                        title={isDisabled ? "Veuillez remplir tous les champs requis avant de valider" : "Valider"}
                        aria-label="Valider"
                        className={`p-2 rounded transition-colors ${isDisabled
                            ? "bg-gray-100 opacity-50 cursor-not-allowed grayscale"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        <Image src="/valide.png" alt="Valider" width={18} height={18} />
                    </button>
                    <button
                        onClick={() => openRefuseModal(item.id)}
                        title="Refuser"
                        aria-label="Refuser"
                        className="p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                        <Image src="/refuse.png" alt="Refuser" width={18} height={18} />
                    </button>
                    {includeMagasin && (
                        <button
                            onClick={() => handlePrendreMagasin(item.id)}
                            title="Prendre en magasin"
                            aria-label="Prendre en magasin"
                            className="p-2 rounded hover:bg-gray-100 transition-colors"
                        >
                            <Image src="/magasin.png" alt="Prendre en magasin" width={16} height={16} />
                        </button>
                    )}
                </div>
            );
        };

        const validationButtons = scope !== "mine" && canValidate
            ? buildValidationGroup("val", showMagasinForItem)
            : null;

        return (
            <tr
                key={item.id}
                className={`hover:bg-gray-50 transition-colors ${scope === "to_validate" && isAuteur ? "bg-amber-50" : ""} ${scope === "mine" && isCurrentValidator ? "bg-green-50/60" : ""}`}
            >
                <td className="px-4 py-4 text-center border-r border-gray-200">
                    <input
                        type="checkbox"
                        checked={!!item.selected}
                        onChange={() => toggleRow(item.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                    />
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 min-w-numero">
                    <Link href={`/list/historique/${item.id}`} className="text-blue-600 hover:text-blue-800">
                        {item.numero ? `N°${item.numero}` : `ID ${item.id}`}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Demandeur : {isAuteur ? "Moi" : auteurName}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                        Dépôt : {formatDateTime(item.dateDepot)}
                    </p>
                    {scope === "to_validate" && (
                        <span
                            className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-[11px] font-semibold ${isAuteur ? "bg-amber-200 text-amber-800" : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {isAuteur ? "Ma demande" : "À valider"}
                        </span>
                    )}
                </td>
                <td className="px-3 py-3 text-sm font-medium border-r border-gray-200 min-w-standard">
                    <div className="flex flex-col items-center gap-2 w-full text-center">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            {statusRenderer(item.statut)}
                            <span>{statusLabel}</span>
                        </div>
                        {currentRoleLabel && isPending && (
                            <div className="text-[10px] text-blue-600 mt-1 font-bold uppercase tracking-wider">
                                Etape {item.etapeActuelle} : {currentRoleLabel}
                            </div>
                        )}
                        <button
                            onClick={() => setPdfModal({ isOpen: true, id: item.id, defaultName: `Navette_${item.type}_${item.id}` })}
                            className="group/pdf flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white text-slate-700 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all hover:scale-105"
                        >
                            <Image src="/file.png" alt="" width={14} height={14} className="opacity-70 group-hover/pdf:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Aperçu</span>
                        </button>
                        {(() => {
                            const pendingEdits = editedValues[item.id];
                            const hasRealChanges = (() => {
                                if (!pendingEdits) return false;
                                return Object.entries(pendingEdits).some(([key, val]) => {
                                    if (val === undefined) return false;
                                    if (key === 'pieceJointe') {
                                        const currentFiles = (val as any[]) || [];
                                        const originalFiles = item.pieceJointe ? JSON.parse(item.pieceJointe) : [];
                                        if (currentFiles.length !== originalFiles.length) return true;
                                        return JSON.stringify(currentFiles) !== JSON.stringify(originalFiles);
                                    }
                                    let originalVal: any;
                                    if (key === 'fournisseurNom') {
                                        originalVal = item.fournisseur?.nom || '';
                                    } else if (key === 'fournisseurId') {
                                        originalVal = item.fournisseurID;
                                    } else {
                                        originalVal = item[key as keyof DemandeurData];
                                    }
                                    const valStr = String(val ?? '').trim();
                                    const origStr = String(originalVal ?? '').trim();
                                    if (!valStr && !origStr) return false;
                                    return valStr !== origStr;
                                });
                            })();

                            if (hasRealChanges) {
                                return (
                                    <button
                                        onClick={() => saveEdit(item)}
                                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm mb-2"
                                        title="Enregistrer les modifications"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                        Enregistrer
                                    </button>
                                );
                            }
                            return null;
                        })()}
                        {validationButtons}
                    </div>
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">
                    {((isGlobalEditMode || scope === "to_validate") && canEditField('objet')) ? (
                        <input
                            type="text"
                            className={`${fieldBaseClasses} ${(!canEditField('objet')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.objet ?? item.objet ?? ''}
                            onChange={(e) => updateField(item, 'objet', e.target.value)}
                            placeholder="Objet"
                            disabled={!canEditField('objet')}
                        />
                    ) : ((editedValues[item.id]?.objet ?? item.objet) || '-')}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">
                    {((isGlobalEditMode || scope === "to_validate") && canEditField('description')) ? (
                        <textarea
                            className={`${textAreaBaseClasses} ${(!canEditField('description')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.description ?? item.description ?? ''}
                            onChange={textareaChangeHandler(item, 'description')}
                            placeholder="Description"
                            disabled={!canEditField('description')}
                            ref={autoResizeTextarea}
                        />
                    ) : ((editedValues[item.id]?.description ?? item.description) || '-')}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">
                    {((isGlobalEditMode || scope === "to_validate") && canEditField('motif')) ? (
                        <textarea
                            className={`${textAreaBaseClasses} ${(!canEditField('motif')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.motif ?? item.motif ?? ''}
                            onChange={textareaChangeHandler(item, 'motif')}
                            placeholder="Motif"
                            disabled={!canEditField('motif')}
                            ref={autoResizeTextarea}
                        />
                    ) : ((editedValues[item.id]?.motif ?? item.motif) || '-')}
                </td>
                {isStandardLayout && (
                    <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-qte">
                        {((isGlobalEditMode || scope === "to_validate") && canEditField('quantite')) ? (
                            <input
                                type="number"
                                className={`${fieldBaseClasses} ${(!canEditField('quantite')) ? disabledCls : ''}`}
                                value={editedValues[item.id]?.quantite ?? (item.quantite !== null ? String(item.quantite) : '')}
                                onChange={(e) => updateField(item, 'quantite', e.target.value)}
                                min="0"
                                disabled={!canEditField('quantite')}
                            />
                        ) : (editedValues[item.id]?.quantite ?? (item.quantite !== null ? String(item.quantite) : '-'))}
                    </td>
                )}
                {isStandardLayout && (
                    <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                        {(isGlobalEditMode || scope === "to_validate") && canEditFournisseur ? (
                            <div className="relative">
                                <input
                                    list={`fournisseurs-${item.id}`}
                                    className={`${fieldBaseClasses} pr-8`}
                                    value={fournisseurInputValue || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFournisseurSearchTerm(value);
                                        const normalized = value.trim().toLowerCase();
                                        const match = fournisseurOptions.find(
                                            (opt) => (opt.nom || "").toLowerCase() === normalized
                                        );
                                        setEditedValues((prev) => ({
                                            ...prev,
                                            [item.id]: {
                                                ...(prev[item.id] ?? initializeItemValues(item)),
                                                fournisseurNom: value,
                                                fournisseurId: match ? match.id : null,
                                            },
                                        }));
                                    }}
                                    placeholder="Nom du fournisseur"
                                />
                                <datalist id={`fournisseurs-${item.id}`}>
                                    {fournisseurOptions.map((opt) => (
                                        <option key={opt.id} value={opt.nom || ""} />
                                    ))}
                                </datalist>
                                {canSuggestFournisseurCreation && (
                                    <button
                                        type="button"
                                        onClick={() => handleCreateFournisseur(item)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        disabled={creatingFournisseurFor === item.id}
                                        title={`Ajouter "${trimmedFournisseurValue}"`}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 active:shadow-inner active:translate-y-px transition-all z-10 cursor-pointer"
                                    >
                                        <Image src="/Fournisseur.png" alt="Ajouter fournisseur" width={16} height={16} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            editedValues[item.id]?.fournisseurNom ?? (item.fournisseur?.nom || '-')
                        )}
                    </td>
                )
                }
                {
                    isStandardLayout && (
                        <td className="px-3 py-3 text-sm text-gray-500 text-right border-r border-gray-200 min-w-montant">
                            {((isGlobalEditMode || scope === "to_validate") && canEditField('pu')) ? (
                                <input
                                    type="number"
                                    className={`${fieldBaseClasses} text-right ${(!canEditField('pu')) ? disabledCls : ''}`}
                                    value={editedValues[item.id]?.pu ?? (item.pu !== null ? String(item.pu) : '')}
                                    onChange={(e) => updateField(item, 'pu', e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="any"
                                    disabled={!canEditField('pu')}
                                />
                            ) : (
                                <span className={item.pu ? '' : 'text-gray-400'}>
                                    {editedValues[item.id]?.pu !== undefined
                                        ? formatNumberWithSpaces(Number(editedValues[item.id]?.pu))
                                        : (item.pu ? formatNumberWithSpaces(item.pu) : '-')}
                                </span>
                            )}
                        </td>
                    )
                }
                <td className="px-3 py-3 text-sm font-bold text-gray-700 text-right border-r border-gray-200 min-w-montant">
                    {(() => {
                        // Afficher le montant calculé en temps réel si des modifications sont en cours
                        const editedItem = editedValues[item.id];

                        // Check if we are in a non-standard layout (like DRFMS) where Montant should be editable
                        // In non-standard layouts, Quantity is typically 1, so Montant = P.U.
                        // We will allow editing "Montant" by actually editing "P.U"
                        const isNonStandardEditable = !isStandardLayout && ((isGlobalEditMode || scope === "to_validate" || (scope === "all" && isCurrentValidator)) && canEditField('pu'));

                        if (isNonStandardEditable) {
                            return (
                                <div className="relative">
                                    <input
                                        type="number"
                                        className={`${fieldBaseClasses} text-right font-bold ${(!canEditField('pu')) ? disabledCls : ''}`}
                                        value={editedValues[item.id]?.pu ?? (item.pu !== null ? String(item.pu) : '')}
                                        onChange={(e) => updateField(item, 'pu', e.target.value)}
                                        placeholder="0"
                                        min="0"
                                        step="any"
                                        disabled={!canEditField('pu')}
                                    />
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">Ar</span>
                                </div>
                            );
                        }

                        if (editedItem && (editedItem.quantite !== undefined || editedItem.pu !== undefined)) {
                            const qte = editedItem.quantite !== undefined ? parseFloat(editedItem.quantite || String(item.quantite || 0)) : (item.quantite || 0);
                            const pu = editedItem.pu !== undefined ? parseFloat(editedItem.pu || String(item.pu || 0)) : (item.pu || 0);
                            if (pu > 0 && qte > 0) {
                                const calculatedMontant = qte * pu;
                                return `${formatNumberWithSpaces(calculatedMontant)} Ar`;
                            }
                        }
                        return formattedMontant;
                    })()}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-devis">
                    {(() => {
                        const editedItem = editedValues[item.id];
                        if (editedItem && (editedItem.quantite !== undefined || editedItem.pu !== undefined)) {
                            const qte = editedItem.quantite !== undefined ? parseFloat(editedItem.quantite || String(item.quantite || 0)) : (item.quantite || 0);
                            const pu = editedItem.pu !== undefined ? parseFloat(editedItem.pu || String(item.pu || 0)) : (item.pu || 0);
                            if (pu > 0 && qte > 0) {
                                const calculatedMontant = qte * pu;
                                let calculatedDevis = item.devis;
                                if (calculatedMontant <= 100000) {
                                    calculatedDevis = '0';
                                } else if (calculatedMontant <= 1000000) {
                                    calculatedDevis = '1';
                                } else if (calculatedMontant <= 2000000) {
                                    calculatedDevis = '2';
                                } else if (calculatedMontant <= 5000000) {
                                    calculatedDevis = '3';
                                } else {
                                    calculatedDevis = "Appel d'offre";
                                }
                                return calculatedDevis;
                            }
                        }
                        return devisDisplay;
                    })()}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                    {/* Colonne Pièce Jointe */}
                    <div className="flex flex-col gap-2">
                        {((isGlobalEditMode || scope === "to_validate") && canEditField('pieceJointe' as any)) && (
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="*/*"
                                    className="hidden"
                                    id={`file-upload-attente-${item.id}`}
                                    onChange={(e) => handleFileChange(item, e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById(`file-upload-attente-${item.id}`)?.click()}
                                    className="w-full text-center text-xs border rounded-md py-1 text-blue-600 border-blue-300 hover:bg-blue-50"
                                >
                                    + Ajouter
                                </button>
                            </div>
                        )}

                        {(() => {
                            const currentFiles = editedValues[item.id]?.pieceJointe ?? attachments ?? [];
                            if (currentFiles.length === 0) return <span className="text-gray-400 text-xs">Aucun fichier</span>;

                            return (
                                <div className="space-y-1">
                                    {currentFiles.map((file: any, fileIdx: number) => {
                                        const isImage = file.type?.startsWith("image/");
                                        const isPdf = file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");
                                        const isExcel = file.type?.includes("excel") || file.type?.includes("spreadsheetml") || file.name?.toLowerCase().match(/\.xlsx?$|\.csv$/);
                                        const isDoc = file.type?.includes("word") || file.name?.toLowerCase().match(/\.docx?$/);

                                        let iconSrc = "/file.png";
                                        if (isPdf) iconSrc = "/pdf-icon.png";
                                        if (isExcel) iconSrc = "/excel-icon.png";
                                        if (isDoc) iconSrc = "/word-icon.png";

                                        return (
                                            <div key={`${file.url || file.name}-${fileIdx}`} className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-lg p-1.5 shadow-sm hover:shadow-md transition-all group/file">
                                                <a
                                                    href={file.url || "#"}
                                                    download={file.name || "fichier"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 flex-grow overflow-hidden"
                                                    title={`Télécharger ${file.name || 'Fichier'}`}
                                                >
                                                    <div className="relative w-8 h-8 flex-shrink-0">
                                                        <Image
                                                            src={iconSrc}
                                                            alt={file.name || "Fichier"}
                                                            fill
                                                            className="rounded border object-cover p-1 bg-gray-50"
                                                            onError={(e: any) => {
                                                                e.target.src = "/file.png";
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="text-[10px] font-bold text-slate-700 truncate max-w-[80px]">{file.name || 'Fichier'}</span>
                                                        {file.size && <span className="text-[8px] text-slate-400">{formatFileSize(file.size)}</span>}
                                                    </div>
                                                </a>
                                                {((isGlobalEditMode || scope === "to_validate") && canEditField('pieceJointe' as any)) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(item, fileIdx)}
                                                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    >
                                                        <Image src="/delete.png" alt="Supprimer" width={12} height={12} className="opacity-70 group-hover/file:opacity-100" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </div>
                </td>
                {
                    !isStandardLayout && (
                        <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-paiement">
                            {modePaiementDisplay}
                        </td>
                    )
                }
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                    {((isGlobalEditMode || scope === "to_validate") && canEditField('imputationComptable')) ? (
                        <input
                            type="text"
                            className={`${fieldBaseClasses} ${(!canEditField('imputationComptable')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.imputationComptable ?? item.imputationComptable ?? ''}
                            onChange={(e) => updateField(item, 'imputationComptable', e.target.value)}
                            placeholder="Imputation"
                            disabled={!canEditField('imputationComptable')}
                        />
                    ) : ((editedValues[item.id]?.imputationComptable ?? item.imputationComptable) || '-')}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                    {((isGlobalEditMode || scope === "to_validate" || (scope === "all" && isCurrentValidator)) && canEditField('activite')) ? (
                        <input
                            type="text"
                            className={`${fieldBaseClasses} ${(!canEditField('activite')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.activite ?? item.activite ?? ''}
                            onChange={(e) => updateField(item, 'activite', e.target.value)}
                            placeholder="Code budgetaire (Activité)"
                            disabled={!canEditField('activite')}
                        />
                    ) : (
                        (editedValues[item.id]?.activite ?? item.activite) || '-'
                    )}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                    {((isGlobalEditMode || scope === "to_validate") && canEditField('codeTIGER')) ? (
                        <input
                            type="text"
                            className={`${fieldBaseClasses} ${(!canEditField('codeTIGER')) ? disabledCls : ''}`}
                            value={editedValues[item.id]?.codeTIGER ?? item.codeTIGER ?? ''}
                            onChange={(e) => updateField(item, 'codeTIGER', e.target.value)}
                            placeholder="Code TIGER"
                            disabled={!canEditField('codeTIGER')}
                        />
                    ) : (
                        (editedValues[item.id]?.codeTIGER ?? item.codeTIGER) || '-'
                    )}
                </td>
                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 min-w-commentaire">
                    {item.historique?.find(h => h.motifRefus)?.motifRefus || (item as any).commentaire || '-'}
                </td>

            </tr >
        );
    };

    const renderNavetteTableHeader = (layout: NavetteLayout) => {
        const isStandard = layout === "standard";
        const demandeurColSpan = isStandard ? 3 : 2;
        const financeColSpan = isStandard ? 5 : 4;

        return (
            <>
                <tr className="bg-slate-800/5 backdrop-blur-sm">
                    <th rowSpan={2} className="px-4 py-4 border-b border-white/20 border-r">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                        />
                    </th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-numero">N°/Type</th>
                    <th rowSpan={2} className="px-6 py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/20">Statut/Actions</th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-description-motif">Objet</th>

                    <th colSpan={demandeurColSpan} className="px-6 py-3 text-center text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-500/10 border-b border-r border-white/20">À Remplir par le Demandeur</th>

                    <th colSpan={financeColSpan} className="px-6 py-3 text-center text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-500/10 border-b border-r border-white/20">FINANCE</th>

                    <th colSpan={3} className="px-6 py-3 text-center text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] bg-purple-500/10 border-b border-r border-white/20">CG (Contrôle de Gestion)</th>

                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-commentaire">Commentaire</th>
                </tr>
                <tr className="bg-slate-800/5 backdrop-blur-sm">
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">Description</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">
                        {/* Dynamic label for Motif */}
                        Motif / Personne soignée
                    </th>
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
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Pièce Jointe</th>
                    {!isStandard && (
                        <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-paiement">Mode de Paiement</th>
                    )}

                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Imputation (Compte)</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Activité</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Code TIGER</th>
                </tr>
            </>
        );
    };

    if (loading) {
        return (
            <div className="surface-panel flex-1 m-4 mt-0 flex items-center justify-center">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 p-4 lg:p-6 no-scrollbar">
                <div className="glass-panel p-8 mb-8 shadow-2xl border-white/40 ring-1 ring-black/10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="flex items-start justify-between w-full lg:w-auto">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Gestion des validations</p>
                                <div className="flex items-center gap-4 mt-1">
                                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">{viewTitle}</h1>
                                    <button
                                        onClick={() => fetchDemandes(false)}
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
                                            className={`${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500 text-slate-600`}
                                        >
                                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                                            <polyline points="21 3 21 8 16 8" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 mt-2 font-medium max-w-2xl">{viewSubtitle}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Total: {stats.total}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Autres: {stats.others}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-sm backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Mes demandes: {stats.self}</span>
                            </div>
                        </div>
                    </div>
                </div>

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
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'}
                                        `}
                                    >
                                        {getNavetteLabel(type)}
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

                            <div className="relative">
                                <select
                                    value={filterAuteur}
                                    onChange={(e) => setFilterAuteur(e.target.value)}
                                    className="neu-input px-4 py-2.5 text-sm font-bold text-slate-700 bg-white/40 border-white/60 focus:ring-2 focus:ring-blue-500/20 min-w-[200px]"
                                >
                                    {auteurOptions.map(name => (
                                        <option key={name} value={name}>
                                            {name === 'Tout' ? 'Tous les collaborateurs' : name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {scope === "to_validate" && (
                                <button
                                    onClick={handleExportList}
                                    className="px-6 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100"
                                    disabled={!demandes.some(d => d.selected)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Exporter la liste
                                </button>
                            )}

                            <button
                                onClick={handleBulkPDF}
                                className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100"
                                disabled={!demandes.some(d => d.selected)}
                            >
                                <Image src="/file.png" alt="" width={16} height={16} className="brightness-200 group-hover:rotate-12 transition-transform" />
                                Exporter Sélection
                            </button>
                        </div>
                    </div>
                </div>

                <div className="glass-panel shadow-2xl border-white/40 overflow-hidden min-h-[400px]">
                    <div className="px-8 py-5 border-b border-white/40 bg-white/40 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Liste des Demandes</h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">{filteredData.length} résultats trouvés</p>
                        </div>
                    </div>

                    {groupedTables.length === 0 ? (
                        <div className="px-6 py-8 text-center text-sm text-gray-500">
                            Aucune demande en attente
                        </div>
                    ) : (
                        groupedTables.map((group, index) => {
                            const layout = getNavetteLayout(group.type);
                            const columnCount = getColumnCount(layout);
                            return (
                                <div key={group.type} className={index > 0 ? "border-t border-white/20" : ""}>
                                    <div className="px-8 py-4 bg-white/30 backdrop-blur-md border-b border-white/20 flex items-center justify-between">
                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">
                                            {group.label} — {group.rows.length} résultat{group.rows.length > 1 ? 's' : ''}
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-white/20 navette-table">
                                            <thead>
                                                {renderNavetteTableHeader(layout)}
                                            </thead>
                                            <tbody className="divide-y divide-white/10 bg-white/5">
                                                {group.rows.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={columnCount} className="px-6 py-8 text-center text-sm text-slate-500 italic">
                                                            Aucune demande en attente pour ce type
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    group.rows.map(item => renderRow(item, layout))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <style jsx global>{`
                    .navette-table tbody td {
                        height: 4.5cm;
                        vertical-align: top;
                        padding: 12px;
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
            </div>

            {/* Modal de refus */}
            {refuseModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[9999] p-4 transition-all duration-300">
                    <div className="glass-panel p-8 max-w-md w-full shadow-2xl border-white/40 ring-1 ring-black/5 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                                <Image src="/delete.png" alt="" width={24} height={24} className="brightness-110" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Refuser la demande</h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Action irréversible</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-4 font-medium leading-relaxed">Veuillez saisir le motif du refus pour informer le demandeur :</p>

                        <textarea
                            value={motifRefus}
                            onChange={(e) => setMotifRefus(e.target.value)}
                            placeholder="Ex: Facture manquante, montant incorrect..."
                            className="neu-input w-full px-4 py-3 text-sm font-bold text-slate-700 bg-white/40 border-white/60 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none mb-6"
                            rows={4}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setRefuseModalOpen(false);
                                    setSelectedDemande(null);
                                    setMotifRefus('');
                                }}
                                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleRefuser}
                                className="px-6 py-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-rose-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-900/20"
                            >
                                Confirmer le refus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de création Fournisseur */}
            {supplierModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-lg z-[9999] flex items-center justify-center p-4 transition-all duration-500">
                    <div className="glass-panel p-8 relative w-full max-w-2xl max-h-[90vh] overflow-auto shadow-[0_0_50px_rgba(0,0,0,0.3)] border-white/40 ring-1 ring-black/10 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
                        <button
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/40 hover:bg-white/80 rounded-xl border border-white/60 shadow-sm transition-all hover:rotate-90"
                            onClick={() => setSupplierModalOpen(false)}
                        >
                            <Image src="/close.png" alt="Fermer" width={14} height={14} />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ajouter un Fournisseur</h3>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Créez une nouvelle fiche fournisseur</p>
                        </div>

                        <div className="p-2">
                            <FournisseurForm
                                type="create"
                                data={memoizedSupplierData}
                                onSuccess={handleSupplierSuccess}
                            />
                        </div>
                    </div>
                </div>
            )}

            <PDFModal
                isOpen={pdfModal.isOpen}
                onClose={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmDownloadPDF}
                initialValue={pdfModal.defaultName}
            />
        </>
    );
};


export default AttenteListContent;

