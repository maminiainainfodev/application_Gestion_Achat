'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from "@/components/AuthProvider";
import FournisseurForm from "@/components/forms/fournisseurForm";
import ModalWrapper from "@/components/ModalWrapper";

type UploadedFileMeta = {
    name: string;
    size: number;
    type: string;
    url: string;
};

type FournisseurOption = {
    id: number;
    nom: string | null;
};

const navetteTypeDescriptions: Record<string, string> = {
    'NAV-ACH': 'Navette Achat',
    'NP': 'Navette Paiement',
    'NDF': 'Note de Frais',
    'DRFMS': 'DRFMS (Demande de remboursement des Frais Médicaux des Salariés)',
    'DRFME': 'DRFME (Demande de remboursement des Frais Médicaux des Élèves)'
};

const multiRowAllowed = ['NAV-ACH', 'NP', 'NDF'];

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatNumberWithSpaces = (value: number | string | null | undefined) => {
    const numeric = Number(value ?? 0);
    if (Number.isNaN(numeric)) return "0";
    return numeric.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const calculateDevis = (totalAmount: number) => {
    if (totalAmount <= 100000) return '0';
    if (totalAmount <= 1000000) return '1';
    if (totalAmount <= 2000000) return '2';
    if (totalAmount <= 5000000) return '3';
    if (totalAmount <= 16000000) return '4';
    return "Appel d'offre";
};

export default function AjouterNavetteForm() {
    const { user } = useAuth();
    // État du type de navette sélectionné
    const [navetteType, setNavetteType] = useState('');
    // État des données du formulaire (peut contenir plusieurs lignes/navettes)
    const [formData, setFormData] = useState<any[]>([]);

    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const [supplierModalData, setSupplierModalData] = useState<{ Nom?: string, forRowIndex?: number } | null>(null);

    // Auto-resize textarea
    const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.max(el.scrollHeight, 76)}px`; // 2cm approx 76px
    };

    const textareaChangeHandler = useCallback((index: number, field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateRow(index, field, e.target.value);
        autoResizeTextarea(e.target);
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const loadFournisseurs = useCallback(async (query?: string) => {
        try {
            if (fournisseurFetchAbortRef.current) {
                fournisseurFetchAbortRef.current.abort();
            }
            const controller = new AbortController();
            fournisseurFetchAbortRef.current = controller;

            const trimmed = query?.trim() ?? "";
            setLastFetchTerm(trimmed);

            const searchParam = trimmed.length > 0
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
    }, []);

    const handleSupplierSuccess = useCallback((newFournisseur: any) => {
        const nom = newFournisseur.nom || newFournisseur.Nom || "";
        setSupplierModalOpen(false);
        // Update options
        setFournisseurOptions((prev) => {
            const exists = prev.some((opt) => opt.id === newFournisseur.id);
            if (exists) return prev;
            return [...prev, { id: newFournisseur.id, nom }].sort((a, b) =>
                (a.nom || "").localeCompare(b.nom || "", undefined, { sensitivity: "base" })
            );
        });

        // Update form data if triggered from a row
        if (supplierModalData?.forRowIndex !== undefined) {
            const idx = supplierModalData.forRowIndex;
            updateRow(idx, 'fournisseur', nom);
            setFournisseurSearchTerm(nom);
        }
        setSupplierModalData(null);
        loadFournisseurs(); // Refresh
    }, [supplierModalData, loadFournisseurs]); // eslint-disable-next-line react-hooks/exhaustive-deps


    // Supplier fetching state
    const [fournisseurOptions, setFournisseurOptions] = useState<FournisseurOption[]>([]);
    const [fournisseurSearchTerm, setFournisseurSearchTerm] = useState('');
    const [lastFetchTerm, setLastFetchTerm] = useState('');
    const fournisseurFetchAbortRef = useRef<AbortController | null>(null);



    // Debounced search
    useEffect(() => {
        if (fournisseurSearchTerm === lastFetchTerm) return;
        const handler = setTimeout(() => {
            loadFournisseurs(fournisseurSearchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [fournisseurSearchTerm, loadFournisseurs, lastFetchTerm]);

    const getInitialRow = useCallback((type: string) => {
        const base = {
            objet: '',
            description: '',
            motif: '',
            justification: '',
            imputation: '',
            activite: '',
            codeTiger: '',
            commentaire: '',
            files: [] as UploadedFileMeta[],
            filesCount: 0,
            modePaiement: '',
            chequeNom: '',
            virementRIB: '',
            autrePaiementDetail: ''
        };
        const isStandard = ['NAV-ACH', 'NP'].includes(type);
        const isDRF = ['DRFMS', 'DRFME'].includes(type);

        if (isStandard) {
            return {
                ...base,
                qte: 1,
                fournisseur: '',
                puHt: 0,
                montant: 0,
                devis: '0'
            };
        } else if (isDRF) {
            return {
                ...base,
                descriptionType: '',
                autreDescription: '',
                personneType: '',
                personneNom: '',
                montant: 0
            };
        } else if (type === 'NDF') {
            return {
                ...base,
                qte: 1,
                fournisseur: user ? `${user.nom || ''} ${user.prenom || ''}`.trim() : '',
                puHt: 0,
                montant: 0,
                devis: '0'
            };
        }
        return base;
    }, [user]);

    const updateRow = useCallback((index: number, field: string, value: any) => {
        setFormData(prev => {
            const newData = [...prev];
            const isStandard = ['NAV-ACH', 'NP', 'NDF'].includes(navetteType);
            const currentRow = { ...newData[index], [field]: value };

            // Auto-fill Salarié Name or Clear
            if (field === 'personneType' && user) {
                if (value === 'Salarié') {
                    // Use only Preom Usuel (+ Nom if desired, but user asked for "pas le nom complet" which implies usually just the name part or the usual name). 
                    // Let's use PRENOM USUEL (or PRENOM) + NOM for better identification, but the request says "mets plutôt le prenom usuel pas le nom complet".
                    // I will strictly prioritize prenomUsuelle and just output that + Nom. 
                    // Actually, "pas le nom complet" usually refers to the "First Name" string being the full legal name vs the usual name.
                    const p = user.prenomUsuelle || user.prenom || '';
                    const n = user.nom || '';
                    // The user screenshot showed "First Last". I will do "Usuel Last".
                    currentRow.personneNom = `${p} ${n}`.trim();
                } else if (value === 'Enfant' || value === 'Conjoint') {
                    currentRow.personneNom = "";
                }
            }

            // Recalculations
            if (isStandard) {
                const qte = parseFloat(currentRow.qte) || 0;
                const puHt = parseFloat(currentRow.puHt) || 0;
                const montant = qte * puHt;
                const devis = calculateDevis(montant);
                if (currentRow.montant !== montant || currentRow.devis !== devis) {
                    currentRow.montant = montant;
                    currentRow.devis = devis;
                }
            }

            newData[index] = currentRow;
            return newData;
        });
    }, [navetteType, user]);

    const updateFiles = useCallback((index: number, newFiles: UploadedFileMeta[]) => {
        setFormData(prev => {
            const newData = [...prev];
            newData[index] = { ...newData[index], files: newFiles, filesCount: newFiles.length };
            return newData;
        });
    }, []);

    const uploadAttachment = useCallback(async (file: File): Promise<UploadedFileMeta> => {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        const response = await fetch("/api/uploads", {
            method: "POST",
            body: formDataUpload
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Upload impossible");
        }
        return data.data as UploadedFileMeta;
    }, []);

    const handleFileChange = useCallback(async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []) as File[];
        if (newFiles.length === 0) return;
        try {
            const uploaded: UploadedFileMeta[] = [];
            for (const file of newFiles) {
                const meta = await uploadAttachment(file);
                uploaded.push(meta);
            }
            const currentFiles = formData[index]?.files || [];
            updateFiles(index, [...currentFiles, ...uploaded]);
            toast.success(`${uploaded.length} fichier(s) téléversé(s)`);
        } catch (error: any) {
            console.error("Upload attachment error:", error);
            toast.error(error.message || "Upload de fichier échoué");
        } finally {
            e.target.value = "";
        }
    }, [formData, updateFiles, uploadAttachment]);

    const removeFile = useCallback((index: number, fileIndex: number) => {
        const currentFiles = formData[index]?.files || [];
        const updatedFiles = currentFiles.filter((_: UploadedFileMeta, i: number) => i !== fileIndex);
        updateFiles(index, updatedFiles);
    }, [formData, updateFiles]);

    const getPaiementDetailFromRow = useCallback((row: any) => {
        switch (row.modePaiement) {
            case 'Cheque': return row.chequeNom;
            case 'Virement': return row.virementRIB;
            case 'AutrePaiement': return row.autrePaiementDetail;
            default: return null;
        }
    }, []);

    const getRowDataForSubmit = useCallback((row: any) => {
        const isStandard = ['NAV-ACH', 'NP', 'NDF'].includes(navetteType);
        const isDRF = ['DRFMS', 'DRFME'].includes(navetteType);
        const data = { ...row };

        if (isDRF) {
            data.description = row.descriptionType === 'Autre' ? row.autreDescription : row.descriptionType;
            data.motif = row.personneType ? `${row.personneType} (${row.personneNom})` : '';
            data.fournisseur = row.personneNom || (user ? `${user.nom || ''} ${user.prenom || ''}`.trim() : 'Personnel');
            data.qte = 1;
            data.puHt = row.montant;
            data.devis = `${row.filesCount} fichier(s) joint(s)`;
        } else if (navetteType === 'NDF') {
            data.description = row.description;
            data.motif = row.motif;
            data.fournisseur = row.fournisseur || (user ? `${user.nom || ''} ${user.prenom || ''}`.trim() : 'Personnel (NDF)');
            data.qte = Number(row.qte);
            data.puHt = Number(row.puHt);
        }

        if (isStandard) {
            data.qte = Number(row.qte);
            data.puHt = Number(row.puHt);
        }

        data.modePaiement = row.modePaiement || null;
        data.paiementDetail = row.modePaiement ? getPaiementDetailFromRow(row) : null;

        data.pieceJointe = Array.isArray(row.files) && row.files.length > 0
            ? JSON.stringify(row.files)
            : null;

        return data;
    }, [navetteType, getPaiementDetailFromRow]);

    const isValidRow = useCallback((rowData: any, rawRow: any) => {
        const hasContent = Object.values(rowData).some(val => val && String(val).trim() !== '' && val !== '0');
        return hasContent;
    }, []);

    const addNavetteRow = useCallback(() => {
        if (multiRowAllowed.includes(navetteType)) {
            const newRow = getInitialRow(navetteType);
            setFormData(prev => [...prev, newRow]);
        }
    }, [navetteType, getInitialRow]);

    const removeNavetteRow = useCallback((index: number) => {
        if (index > 0) {
            setFormData(prev => prev.filter((_: any, i: number) => i !== index));
        }
    }, []);

    const handleNavetteTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setNavetteType(type);
        setFormData([]);
        if (type) {
            const newRow = getInitialRow(type);
            setFormData([newRow]);
        }
    }, [getInitialRow]);

    const renderAjouterNavetteFormRow = (index: number, row: any) => {
        const isStandard = ['NAV-ACH', 'NP', 'NDF'].includes(navetteType);
        const isDRF = ['DRFMS', 'DRFME'].includes(navetteType);
        const rowIndex = index;

        // Neumorphic Input Classes with minimal height 2cm (~76px)
        const inputClass = "neu-input min-h-[76px] bg-slate-100/30 w-full border-slate-200/50 focus:border-blue-500/50 transition-all font-bold text-slate-700"; // Refined styling
        const textareaClass = `${inputClass} resize-none leading-relaxed overflow-hidden`;
        const selectClass = `${inputClass} appearance-none cursor-pointer`;

        let numeroInput = <input type="text" value={`Ligne ${rowIndex + 1}`} readOnly className={`${inputClass} bg-slate-200/20 text-center opacity-70`} />;

        // Changed Objet to Textarea
        let objetInput = (
            <textarea
                value={row.objet}
                onChange={textareaChangeHandler(index, 'objet')}
                className={textareaClass}
                placeholder="Objet de la demande"
                rows={1}
            />
        );

        let descriptionCell, motifCell, qteCell;

        if (isDRF) {
            descriptionCell = (
                <div className="flex flex-col gap-2 h-full">
                    <select
                        name={`row[${rowIndex}][descriptionType]`}
                        value={row.descriptionType}
                        onChange={(e) => updateRow(index, 'descriptionType', e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Type de frais...</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Médicament">Médicament</option>
                        <option value="Hospitalisation">Hospitalisation</option>
                        <option value="Analyse">Analyse</option>
                        <option value="Radio/Scanner/Echo">Radio/Scanner/Echo</option>
                        <option value="Dentiste">Dentiste</option>
                        <option value="Optiques">Optiques</option>
                        <option value="Autre">Autre</option>
                    </select>
                    {row.descriptionType === 'Autre' && (
                        <textarea
                            name={`row[${rowIndex}][autreDescription]`}
                            value={row.autreDescription}
                            onChange={textareaChangeHandler(index, 'autreDescription')}
                            className={textareaClass}
                            placeholder="Préciser..."
                            rows={1}
                        />
                    )}
                </div>
            );
            motifCell = (
                <div className="flex flex-col gap-2 h-full justify-center">
                    <div className="flex gap-2 mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`row[${rowIndex}][personneType]`}
                                value="Salarié"
                                checked={row.personneType === 'Salarié'}
                                onChange={(e) => updateRow(index, 'personneType', e.target.value)}
                                className="form-radio text-blue-600 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">Salarié</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`row[${rowIndex}][personneType]`}
                                value="Enfant"
                                checked={row.personneType === 'Enfant'}
                                onChange={(e) => updateRow(index, 'personneType', e.target.value)}
                                className="form-radio text-blue-600 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enfant</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`row[${rowIndex}][personneType]`}
                                value="Conjoint"
                                checked={row.personneType === 'Conjoint'}
                                onChange={(e) => updateRow(index, 'personneType', e.target.value)}
                                className="form-radio text-blue-600 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">Conjoint</span>
                        </label>
                    </div>
                    {/* Always show input but readonly if Salarié might be better UX, 
                        or just hide if Salarié and rely on auto-fill? 
                        Request said "ca prends automatique". 
                        Let's show it so user can verify. */}
                    {(row.personneType) && (
                        <input
                            type="text"
                            name={`row[${rowIndex}][personneNom]`}
                            value={row.personneNom}
                            onChange={(e) => updateRow(index, 'personneNom', e.target.value)}
                            className={inputClass}
                            placeholder={`Nom...`}
                            readOnly={row.personneType === 'Salarié'}
                        />
                    )}
                </div>
            );
            qteCell = <span className="text-gray-400">N/A</span>;
        } else if (navetteType === 'NDF') {
            descriptionCell = <textarea name={`row[${rowIndex}][description]`} value={row.description} onChange={textareaChangeHandler(index, 'description')} className={textareaClass} placeholder="Détail de la demande..." rows={1} />;
            motifCell = <textarea name={`row[${rowIndex}][motif]`} value={row.motif} onChange={textareaChangeHandler(index, 'motif')} className={textareaClass} placeholder="Justification de la demande..." rows={1} />;
            qteCell = <span className="text-gray-400">N/A</span>;
        } else {
            descriptionCell = <textarea name={`row[${rowIndex}][description]`} value={row.description} onChange={textareaChangeHandler(index, 'description')} className={textareaClass} placeholder="Détail de la demande..." rows={1} />;
            motifCell = <textarea name={`row[${rowIndex}][motif]`} value={row.motif} onChange={textareaChangeHandler(index, 'motif')} className={textareaClass} placeholder="Justification de la demande..." rows={1} />;
            qteCell = <input type="number" name={`row[${rowIndex}][qte]`} value={row.qte} onChange={(e) => updateRow(index, 'qte', e.target.value)} min="1" className={inputClass} />;
        }

        // Logic for Supplier with Add button
        const trimmedFournisseurValue = (row.fournisseur || "").trim();
        const hasFournisseurMatch =
            trimmedFournisseurValue.length > 0 &&
            fournisseurOptions.some(
                (opt) => (opt.nom || "").toLowerCase() === trimmedFournisseurValue.toLowerCase()
            );
        const canSuggestFournisseurCreation =
            trimmedFournisseurValue.length >= 2 && !hasFournisseurMatch;

        let fournisseurCell = isStandard ? (
            <div className="relative h-full">
                <input
                    list={`fournisseurs-list-${rowIndex}`}
                    type="text"
                    name={`row[${rowIndex}][fournisseur]`}
                    value={row.fournisseur}
                    onChange={(e) => {
                        const val = e.target.value;
                        updateRow(index, 'fournisseur', val);
                        setFournisseurSearchTerm(val);
                    }}
                    onFocus={() => {
                        // Ensure options are loaded or refresh
                        if (fournisseurOptions.length === 0) loadFournisseurs(row.fournisseur);
                    }}
                    className={`${inputClass} pr-10`} // added padding for button
                    placeholder="-- Choisir --"
                    autoComplete="off"
                />
                <datalist id={`fournisseurs-list-${rowIndex}`}>
                    {fournisseurOptions.map(opt => (
                        <option key={opt.id} value={opt.nom || ''} />
                    ))}
                </datalist>
                {canSuggestFournisseurCreation && (
                    <button
                        type="button"
                        onClick={() => {
                            setSupplierModalData({ Nom: trimmedFournisseurValue, forRowIndex: index });
                            setSupplierModalOpen(true);
                        }}
                        title={`Ajouter "${trimmedFournisseurValue}"`}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer text-emerald-600 ring-1 ring-black/5"
                    >
                        <Image src="/Fournisseur.png" alt="Ajouter fournisseur" width={22} height={22} className="brightness-110" />
                    </button>
                )}
            </div>
        ) : <span className="text-gray-400">N/A</span>;

        let puHtCell = isStandard ? (
            <input
                type="number"
                name={`row[${rowIndex}][puHt]`}
                value={row.puHt}
                onChange={(e) => updateRow(index, 'puHt', e.target.value)}
                step="any"
                min="0"
                className={`${inputClass} text-right`}
                placeholder="0"
            />
        ) : <span className="text-gray-400">N/A</span>;
        let montantCell;
        let devisCell;
        let modePaiementCell;

        if (isStandard) {
            montantCell = (
                <div className="h-full flex flex-col justify-center">
                    <input type="text" value={formatNumberWithSpaces(row.montant)} readOnly disabled className={`${inputClass} text-right font-bold bg-gray-100/50 text-gray-500`} />
                    <input type="hidden" name={`row[${rowIndex}][montant]`} value={row.montant} />

                </div>
            );
            devisCell = (
                <div className="h-full flex flex-col justify-center">
                    <input type="text" name={`row[${rowIndex}][devis]`} value={row.devis} readOnly disabled className={`${inputClass} bg-gray-100/50 text-gray-500`} />
                </div>
            );
            modePaiementCell = <span className="text-gray-400">N/A</span>;
        } else {
            montantCell = (
                <div className="h-full flex flex-col justify-center">
                    <input type="text" value={formatNumberWithSpaces(row.montant)} readOnly={false} className={`${inputClass} text-right font-bold bg-white`} onChange={(e) => updateRow(index, 'montant', e.target.value.replace(/\s/g, ''))} />
                </div>
            );
            devisCell = <span className="text-gray-400">N/A</span>;

            modePaiementCell = (
                <div className="flex flex-col gap-2 h-full">
                    <select
                        name={`row[${rowIndex}][modePaiement]`}
                        value={row.modePaiement}
                        onChange={(e) => updateRow(index, 'modePaiement', e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Mode de paiement...</option>
                        <option value="Espèce">Espèce</option>
                        <option value="Chèque">Chèque</option>
                        <option value="Virement">Virement</option>
                        <option value="Autre">Autre</option>
                    </select>
                    {row.modePaiement === 'Chèque' && (
                        <input
                            type="text"
                            name={`row[${rowIndex}][chequeNom]`}
                            value={row.chequeNom}
                            onChange={(e) => updateRow(index, 'chequeNom', e.target.value)}
                            className={inputClass}
                            placeholder="Nom du chèque..."
                        />
                    )}
                    {row.modePaiement === 'Virement' && (
                        <input
                            type="text"
                            name={`row[${rowIndex}][virementRIB]`}
                            value={row.virementRIB}
                            onChange={(e) => updateRow(index, 'virementRIB', e.target.value)}
                            className={inputClass}
                            placeholder="RIB..."
                        />
                    )}
                    {row.modePaiement === 'Autre' && (
                        <textarea
                            name={`row[${rowIndex}][autrePaiementDetail]`}
                            value={row.autrePaiementDetail}
                            onChange={(e) => updateRow(index, 'autrePaiementDetail', e.target.value)}
                            className={textareaClass}
                            placeholder="Détails..."
                            rows={1}
                        />
                    )}
                </div>
            );
        }

        const imputationInput = <input type="text" name={`row[${rowIndex}][imputation]`} value={row.imputation} onChange={(e) => updateRow(index, 'imputation', e.target.value)} className={`${inputClass}`} placeholder="Ex: 607100" />;
        const activiteInput = <input type="text" name={`row[${rowIndex}][activite]`} value={row.activite} onChange={(e) => updateRow(index, 'activite', e.target.value)} className={`${inputClass}`} placeholder="Ex: DIR / DSI" />;
        const codeTigerInput = <input type="text" name={`row[${rowIndex}][codeTiger]`} value={row.codeTiger} onChange={(e) => updateRow(index, 'codeTiger', e.target.value)} className={`${inputClass}`} placeholder="Ex: BURO / HARD" />;
        const commentaireInput = <textarea name={`row[${rowIndex}][commentaire]`} value={row.commentaire} onChange={(e) => updateRow(index, 'commentaire', e.target.value)} className={`${textareaClass}`} placeholder="Notes..." rows={1} />;

        // Add Justification Cell
        const justificationCell = (
            <textarea
                name={`row[${rowIndex}][justification]`}
                value={row.justification}
                onChange={textareaChangeHandler(index, 'justification')}
                className={textareaClass}
                placeholder="Justification..."
                rows={1}
            />
        );

        const isDeletable = multiRowAllowed.includes(navetteType) && index > 0;
        const actionCell = isDeletable ? (
            <button type="button" onClick={() => removeNavetteRow(index)} className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-500/10 transition-all hover:scale-110 active:scale-90 h-full w-full flex items-center justify-center">
                <Image src="/delete.png" alt="Supprimer" width={22} height={22} className="brightness-110" />
            </button>
        ) : <>&nbsp;</>;

        const attachmentFiles = row.files || [];

        return (
            <tr key={index} data-row-index={rowIndex} className="group backdrop-blur-sm transition-all duration-300 border-b border-white/5 hover:bg-white/40">
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 min-w-numero">{numeroInput}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">{objetInput}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">{descriptionCell}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">{motifCell}</td>
                {isStandard && <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-qte">{qteCell}</td>}
                {isStandard && <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-standard">{fournisseurCell}</td>}
                {isStandard && <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-montant">{puHtCell}</td>}
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-montant">{montantCell}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-devis">{devisCell}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-standard">
                    {/* Colonne Pièce Jointe */}
                    <div className="file-upload-container neu-flat p-1 border-0 rounded-xl overflow-y-auto max-h-full min-h-[76px]">
                        <input
                            type="file"
                            multiple accept="*/*" onChange={(e) => handleFileChange(index, e)} className="hidden" id={`file-upload-${index}-pj`} />
                        <button
                            type="button"
                            onClick={() => document.getElementById(`file-upload-${index}-pj`)?.click()}
                            className="w-full text-center text-sm border rounded-md py-1 mb-2 text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                        >
                            Joindre
                        </button>
                        <div className="space-y-2">
                            {attachmentFiles.length > 0 ? (
                                attachmentFiles.map((file: UploadedFileMeta, fileIndex: number) => {
                                    const isImage = file.type?.startsWith("image/");
                                    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
                                    const isExcel = file.type?.includes("excel") || file.type?.includes("spreadsheetml") || file.name.toLowerCase().match(/\.xlsx?$|\.csv$/);
                                    const isDoc = file.type?.includes("word") || file.name.toLowerCase().match(/\.docx?$/);

                                    let iconSrc = "/file.png";
                                    if (isPdf) iconSrc = "/pdf-icon.png"; // Fallback to generic if not exist, will check
                                    if (isExcel) iconSrc = "/excel-icon.png";
                                    if (isDoc) iconSrc = "/word-icon.png";

                                    return (
                                        <div key={`${file.url}-${fileIndex}`} className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-lg p-2 shadow-sm hover:shadow-md transition-all group/file">
                                            <a
                                                href={file.url}
                                                download={file.name || "fichier"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 flex-grow overflow-hidden"
                                                title={`Télécharger ${file.name}`}
                                            >
                                                <div className="relative w-10 h-10 flex-shrink-0">
                                                    <Image
                                                        src={iconSrc}
                                                        alt={file.name}
                                                        fill
                                                        className="rounded border object-cover p-1 bg-gray-50"
                                                        onError={(e: any) => {
                                                            e.target.src = "/file.png";
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{file.name}</span>
                                                    <span className="text-[10px] text-slate-400">{formatFileSize(file.size)}</span>
                                                </div>
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index, fileIndex)}
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Image src="/delete.png" alt="Supprimer" width={14} height={14} className="opacity-70 group-hover/file:opacity-100" />
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-xs text-gray-400 text-center">Aucun fichier</p>
                            )}
                        </div>
                    </div>
                </td>
                {!isStandard && <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-paiement">{modePaiementCell}</td>}
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-description-motif">{justificationCell}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-standard">{imputationInput}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-standard">{activiteInput}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-standard">{codeTigerInput}</td>
                <td className="px-3 py-2 text-sm text-gray-500 border-r border-gray-200 min-w-commentaire">{commentaireInput}</td>
                <td className="px-3 py-2 text-sm font-medium">
                    {actionCell}
                </td>
            </tr>
        );
    };

    const renderAjouterNavetteTableHeader = (type: string) => {
        const isStandard = ['NAV-ACH', 'NP', 'NDF'].includes(type);
        const colSpanDemandeur = isStandard ? 3 : 2;
        const colSpanFinance = isStandard ? 6 : 5;

        return (
            <>
                <tr className="bg-slate-800/10 backdrop-blur-md">
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-numero">N° (Auto)</th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-description-motif">Objet</th>
                    <th colSpan={colSpanDemandeur} className="px-6 py-3 text-center text-[10px] font-extrabold text-blue-700 uppercase tracking-[0.2em] bg-blue-500/10 border-b border-r border-white/20">À Remplir par le Demandeur</th>
                    <th colSpan={colSpanFinance} className="px-6 py-3 text-center text-[10px] font-extrabold text-emerald-700 uppercase tracking-[0.2em] bg-emerald-500/10 border-b border-r border-white/20">Demandeur/FINANCE</th>
                    <th colSpan={3} className="px-6 py-3 text-center text-[10px] font-extrabold text-purple-700 uppercase tracking-[0.2em] bg-purple-500/10 border-b border-r border-white/20">CG (Contrôle de Gestion)</th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] border-r border-b border-white/20 min-w-commentaire">Commentaire</th>
                    <th rowSpan={2} className="px-6 py-4 text-center text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] border-b border-white/20">Actions</th>
                </tr>
                <tr className="bg-slate-800/5 backdrop-blur-sm">
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">Description</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-description-motif">{type === 'DRFMS' ? 'Personne soignée' : 'Motif'}</th>
                    {isStandard && <th className="px-6 py-3 text-center text-[9px] font-black text-slate-700 uppercase tracking-widest bg-blue-500/5 border-r border-b border-white/20 min-w-qte">Qté</th>}
                    {isStandard && <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Fournisseur/Bénéficiaire</th>}
                    {isStandard && <th className="px-6 py-3 text-right text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-montant">P.U</th>}
                    <th className="px-6 py-3 text-right text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-montant">Montant (Ar)</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-devis">Devis</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-standard">Pièce Jointe</th>
                    {!isStandard && <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-paiement">Mode de Paiement</th>}
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-emerald-500/5 border-r border-b border-white/20 min-w-description-motif">Justification</th>

                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Imputation (Compte)</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Activité</th>
                    <th className="px-6 py-3 text-left text-[9px] font-black text-slate-700 uppercase tracking-widest bg-purple-500/5 border-r border-b border-white/20 min-w-standard">Code TIGER</th>
                </tr>
            </>
        );
    };

    const submitNavetteForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!navetteType) {
            toast.error("Veuillez sélectionner un type de navette.");
            return;
        }

        const validItems = formData.map(rawRow => {
            const rowData = getRowDataForSubmit(rawRow);
            if (isValidRow(rowData, rawRow)) {
                return rowData;
            }
            return null;
        }).filter(Boolean);

        if (validItems.length === 0) {
            toast.error("Veuillez remplir au moins une ligne de demande.");
            return;
        }

        try {
            const response = await fetch('/api/demandeur', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: navetteType, items: validItems })
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Erreur lors de la création");
            }
            const created = data.data || [];
            const budgetWarnings = created.filter((c: any) => c.budgetLow).length;
            if (budgetWarnings > 0) {
                toast.custom((t) => (
                    <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded border border-yellow-200 shadow">
                        Budget du service potentiellement insuffisant pour {budgetWarnings} demande(s).
                    </div>
                ));
            }
            toast.success(`${created.length} demande(s) enregistrée(s). Modification possible tant que non validée par la Direction.`);
            resetForm();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Erreur lors de l'enregistrement");
        }
    };

    const resetForm = () => {
        setNavetteType('');
        setFormData([]);
    };

    return (
        <div className="flex-1 p-4 lg:p-6 no-scrollbar">
            <div className="max-w-7xl mx-auto py-8 relative">
                <form onSubmit={submitNavetteForm}>
                    <div className="glass-panel p-8 mb-8 shadow-2xl border-white/40 ring-1 ring-black/10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Nouvelle demande</p>
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Ajouter une Navette</h1>
                                <p className="text-sm text-slate-500 mt-2 font-medium max-w-2xl">Remplissez les informations ci-dessous pour soumettre une nouvelle demande.</p>
                            </div>
                        </div>
                    </div>

                    {/* Selecteur de Type de Navette */}
                    <div className="glass-card p-8 mb-8 border-white/60 shadow-xl overflow-visible">
                        <label htmlFor="navetteTypeSelect" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-4 opacity-70">
                            Type de Navette <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <select
                                id="navetteTypeSelect"
                                value={navetteType}
                                onChange={handleNavetteTypeChange}
                                className="neu-input w-full px-6 py-4 text-base font-bold text-slate-700 appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all bg-white/40 border-white/60"
                            >
                                <option value="">-- Choisir le type de navette --</option>
                                <option value="NAV-ACH">Navette Achat (NAV-ACH)</option>
                                <option value="NP">Navette Paiement (NP)</option>
                                <option value="NDF">Note de Frais (NDF)</option>
                                <option value="DRFMS">DRFMS (Salariés)</option>
                                <option value="DRFME">DRFME (Élèves)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Tableau de Saisie des Détails */}
                    <div className="glass-panel shadow-2xl border-white/40 overflow-hidden min-h-[400px]">
                        <div className="px-8 py-6 border-b border-white/40 bg-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                    {navetteType ? `Détails : ${navetteTypeDescriptions[navetteType] || navetteType}` : 'Saisie des Détails'}
                                </h2>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Veuillez renseigner toutes les informations nécessaires</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {multiRowAllowed.includes(navetteType) && (
                                    <button
                                        type="button"
                                        onClick={addNavetteRow}
                                        className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 flex items-center gap-3 group"
                                        title="Ajouter une ligne"
                                    >
                                        <span className="text-xl font-light leading-none group-hover:rotate-90 transition-transform">+</span>
                                        Ajouter une Ligne
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={!navetteType || formData.length === 0 || !formData.some(row => row.files && row.files.length > 0)}
                                    className="px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Image src="/submission.png" alt="Soumettre" width={18} height={18} className="brightness-200 group-hover:rotate-12 transition-transform" />
                                    Soumettre la Demande
                                </button>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 ${navetteType ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="min-w-full divide-y divide-white/20 navette-table">
                                    <thead>{renderAjouterNavetteTableHeader(navetteType)}</thead>
                                    <tbody className="divide-y divide-white/10">
                                        {!navetteType ? (
                                            <tr key="select">
                                                <td colSpan={15} className="px-8 py-24 text-center">
                                                    <div className="flex flex-col items-center gap-4 opacity-40">
                                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                            <Image src="/search.png" alt="" width={32} height={32} />
                                                        </div>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Choisissez un type pour commencer</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : formData.length === 0 ? (
                                            <tr key="empty">
                                                <td colSpan={15} className="px-8 py-24 text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 opacity-60">Aucune ligne de saisie</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            formData.map((row, index) => renderAjouterNavetteFormRow(index, row))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Styles globaux pour le tableau */}
                <style jsx global>{`
                    .navette-table tbody td {
                        min-height: 2cm;
                        height: auto;
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
                    .navette-table textarea,
                    .navette-table input[type="text"],
                    .navette-table input[type="number"],
                    .navette-table .file-upload-container,
                    .navette-table select {
                        width: 100%;
                        min-height: 2cm;
                        height: auto;
                        box-sizing: border-box;
                        padding: 8px;
                        overflow-y: hidden;
                        resize: none;
                    }
                    .navette-table .min-w-numero { min-width: 7rem; }
                    .navette-table .min-w-description-motif { min-width: 14rem; }
                    .navette-table .min-w-qte { min-width: 5rem; }
                    .navette-table .min-w-montant { min-width: 10rem; }
                    .navette-table .min-w-devis { min-width: 7rem; }
                    .navette-table .min-w-standard { min-width: 8rem; }
                    .navette-table .min-w-commentaire { min-width: 12rem; }
                    .navette-table .min-w-paiement { min-width: 16rem; }
                `}</style>
            </div>

            {/* Modal de création de fournisseur */}
            <ModalWrapper
                isOpen={supplierModalOpen}
                onClose={() => setSupplierModalOpen(false)}
            // title="Ajouter un fournisseur" // Title inside form
            >
                <FournisseurForm
                    type="create"
                    onSuccess={handleSupplierSuccess}
                    data={{ Nom: supplierModalData?.Nom || "" }}
                />
            </ModalWrapper>
        </div>
    );
}