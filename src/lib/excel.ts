import * as XLSX from 'xlsx';

export type ExcelExportData = {
    id: number;
    numero: number | null;
    type: string;
    dateDepot: string | Date | null;
    objet: string | null;
    description: string | null;
    motif: string | null;
    quantite: number | null;
    pu: number | null;
    montant: number | null;
    imputationComptable: string | null;
    activite: string | null;
    codeTIGER: string | null;
    auteur?: {
        nom: string | null;
        prenom: string | null;
    } | null;
    fournisseur?: {
        nom: string | null;
    } | null;
};

export function generateExcelList(demandes: ExcelExportData[]): Buffer {
    const data = demandes.map((d) => ({
        "N°": d.numero || d.id,
        "Type": d.type,
        "Date Dépôt": d.dateDepot ? new Date(d.dateDepot).toLocaleDateString("fr-FR") : "-",
        "Demandeur": `${d.auteur?.nom || ""} ${d.auteur?.prenom || ""}`.trim(),
        "Objet": d.objet || "-",
        "Description": d.description || "-",
        "Motif": d.motif || "-",
        "Quantité": d.quantite || 0,
        "Fournisseur": d.fournisseur?.nom || "-",
        "P.U": d.pu || 0,
        "Montant": d.montant || 0,
        "Imputation": d.imputationComptable || "-",
        "Activité": d.activite || "-",
        "Code TIGER": d.codeTIGER || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demandes");

    // Fix column widths
    const maxWidths = [
        { wch: 10 }, // N°
        { wch: 15 }, // Type
        { wch: 12 }, // Date Dépôt
        { wch: 25 }, // Demandeur
        { wch: 30 }, // Objet
        { wch: 40 }, // Description
        { wch: 30 }, // Motif
        { wch: 10 }, // Quantité
        { wch: 25 }, // Fournisseur
        { wch: 15 }, // P.U
        { wch: 15 }, // Montant
        { wch: 20 }, // Imputation
        { wch: 20 }, // Activité
        { wch: 15 }, // Code TIGER
    ];
    worksheet['!cols'] = maxWidths;

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
