import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

type HistoriqueItem = {
    etape: number;
    statut: string;
    dateValidation: string | Date | null;
    motifRefus?: string | null;
    id_navette?: number | null;
    reference_navette?: string | null;
    valideur?: {
        matricule: string;
        nom: string | null;
        prenom: string | null;
    } | null;
};

export type DemandePDFData = {
    id: number;
    numero: number | null;
    type: string;
    dateDepot: string | Date | null;
    reference?: string | null;
    statut: string;
    etapeActuelle: number;
    dateFinalisation: string | Date | null;
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
    versQui: string | null;
    numeroBonCommande?: string | null;
    auteur?: {
        matricule: string;
        nom: string | null;
        prenom: string | null;
        fonction?: {
            nomFonction: string | null;
            chef?: {
                nom: string | null;
                prenom: string | null;
            } | null;
        } | null;
        service?: {
            nomService: string | null;
            abreviation?: string | null;
            chef?: {
                nom: string | null;
                prenom: string | null;
            } | null;
        } | null;
        serviceAbbrev?: string | null;
        telephone?: string | null;
        email?: string | null;
        mailPro?: string | null;
    } | null;
    fournisseur?: {
        nom: string | null;
        adresse?: string | null;
        nomCheque?: string | null;
        nif?: string | null;
        cin?: string | null;
    } | null;
    budget?: {
        codeBudgetaire: string | null;
        service?: { nomService: string | null } | null;
    } | null;
    dateLivraison?: string | Date | null;
    isBCGenere?: boolean;
    isAPGenere?: boolean;
    pieceJointe?: string | null;
    modePaiement?: string | null;
    paiementDetail?: string | null;
    fournisseurID?: number | null;
    budgetID?: number | null;
    historique: HistoriqueItem[];
    customFilename?: string | null;
    directriceName?: string | null;
};

const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    const d = new Date(date);
    // Format: JJ/MM/AAAA (ex: 11/11/2025)
    return d.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatMoney = (n: number | string | null) => {

    if (n === null || n === "") return "0,00";

    return Number(n)
        .toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        //remplace l'espace insécable (qui peux être fine) par espace normal
        .replace(/\u202F/g, " ");

}
/**
 * Sanitize text for PDF rendering by removing characters that cannot be encoded in WinAnsi
 * WinAnsi (Windows-1252) supports most Western European characters but not all Unicode characters
 */
const sanitizeTextForPDF = (text: string | null | undefined): string => {
    if (!text) return "";

    return String(text)
        // Replace the replacement character (U+FFFD) which indicates encoding issues
        .replace(/\uFFFD/g, "?")
        // Replace common problematic characters with safe alternatives
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
        .replace(/[\u2018\u2019]/g, "'") // Smart single quotes → straight quotes
        .replace(/[\u201C\u201D]/g, '"') // Smart double quotes → straight quotes
        .replace(/\u2013/g, "-") // En dash → hyphen
        .replace(/\u2014/g, "--") // Em dash → double hyphen
        .replace(/\u2026/g, "...") // Ellipsis → three dots
        .replace(/\u00A0/g, " ") // Non-breaking space → regular space
        // Remove any remaining characters outside WinAnsi range (0x00-0xFF)
        .replace(/[^\x00-\xFF]/g, "?");
};

function numberToFrenchWords(n: number): string {
    if (n === 0) return "ZÉRO";

    const units = ["", "UN", "DEUX", "TROIS", "QUATRE", "CINQ", "SIX", "SEPT", "HUIT", "NEUF"];
    const tens = ["", "DIX", "VINGT", "TRENTE", "QUARANTE", "CINQUANTE", "SOIXANTE", "SOIXANTE-DIX", "QUATRE-VINGT", "QUATRE-VINGT-DIX"];
    const teenagers = ["DIX", "ONZE", "DOUZE", "TREIZE", "QUATORZE", "QUINZE", "SEIZE", "DIX-SEPT", "DIX-HUIT", "DIX-NEUF"];

    function convert(num: number): string {
        if (num < 10) return units[num];
        if (num < 20) return teenagers[num - 10];
        if (num < 100) {
            const unit = num % 10;
            const ten = Math.floor(num / 10);
            if (ten === 7 || ten === 9) {
                return tens[ten - 1] + (unit === 1 ? "-ET-" : "-") + teenagers[unit];
            }
            return tens[ten] + (unit === 0 ? "" : (unit === 1 ? "-ET-" : "-") + units[unit]);
        }
        if (num < 1000) {
            const ten = num % 100;
            const hundred = Math.floor(num / 100);
            const hundredStr = hundred === 1 ? "CENT" : units[hundred] + " CENTS";
            return (hundredStr + (ten === 0 ? "" : " " + convert(ten))).trim();
        }
        if (num < 1000000) {
            const thousand = Math.floor(num / 1000);
            const remaining = num % 1000;
            const thousandStr = thousand === 1 ? "MILLE" : convert(thousand) + " MILLE";
            return (thousandStr + (remaining === 0 ? "" : " " + convert(remaining))).trim();
        }
        if (num < 1000000000) {
            const million = Math.floor(num / 1000000);
            const remaining = num % 1000000;
            const millionStr = million === 1 ? "UN MILLION" : convert(million) + " MILLIONS";
            return (millionStr + (remaining === 0 ? "" : " " + convert(remaining))).trim();
        }
        return num.toString();
    }

    return convert(Math.floor(n)).toUpperCase();
}

function drawWrappedText(
    page: any,
    text: string,
    x: number,
    startY: number,
    maxWidth: number,
    lineHeight: number,
    font: any,
    fontSize: number,
    align: 'left' | 'center' | 'right' = 'left'
) {
    const sanitizedText = sanitizeTextForPDF(text);
    const words = sanitizedText.split(/\s+/);
    let line = "";
    let y = startY;

    const drawLine = (textLine: string, currentY: number) => {
        let drawX = x;
        if (align === 'center') {
            const lineWidth = font.widthOfTextAtSize(textLine, fontSize);
            drawX = x + (maxWidth - lineWidth) / 2;
        } else if (align === 'right') {
            const lineWidth = font.widthOfTextAtSize(textLine, fontSize);
            drawX = x + (maxWidth - lineWidth);
        }
        page.drawText(textLine, { x: drawX, y: currentY, size: fontSize, font });
    };

    for (let i = 0; i < words.length; i++) {
        const testLine = line ? `${line} ${words[i]}` : words[i];
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width > maxWidth && line) {
            drawLine(line, y);
            line = words[i];
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    if (line) {
        drawLine(line, y);
        y -= lineHeight;
    }
    return y;
}
function getTextHeight(
    text: string,
    font: any,
    fontSize: number,
    maxWidth: number,
    lineHeight: number
) {
    if (!text) return lineHeight;
    const sanitizedText = sanitizeTextForPDF(text);
    const words = sanitizedText.split(/\s+/);
    let line = "";
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        const testLine = line ? `${line} ${words[i]}` : words[i];
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width > maxWidth && line) {
            count++;
            line = words[i];
        } else {
            line = testLine;
        }
    }
    if (line) count++;
    return Math.max(1, count) * lineHeight;
}

function drawAccountingSection(page: any, startX: number, startY: number, width: number, font: any, bold: any): number {
    const rowH = 20;
    const titleH = 18;
    const tableH = titleH + rowH * 4;

    // Entête du cadre
    page.drawRectangle({
        x: startX,
        y: startY - titleH,
        width,
        height: titleH,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
        color: rgb(0.92, 0.92, 0.95)
    });

    const title = "CADRE RÉSERVÉ À LA COMPTABILITÉ";
    const titleWidth = bold.widthOfTextAtSize(title, 10);
    page.drawText(title, {
        x: startX + (width - titleWidth) / 2,
        y: startY - titleH + 5,
        size: 10,
        font: bold
    });

    const col1W = width * 0.45; // 45% / 55% split for labels length

    for (let i = 0; i < 4; i++) {
        const rY = startY - titleH - (i + 1) * rowH;
        // Bordure de la ligne
        page.drawRectangle({
            x: startX,
            y: rY,
            width,
            height: rowH,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        // Séparateur milieu
        page.drawLine({
            start: { x: startX + col1W, y: rY },
            end: { x: startX + col1W, y: rY + rowH },
            thickness: 1
        });

        let label1 = "";
        let label2 = "";
        switch (i) {
            case 0: label1 = "Journal :"; label2 = "Référence de paiement :"; break;
            case 1: label1 = `Date : ${formatDate(new Date())}`; label2 = "Montant retour différence :"; break;
            case 2: label1 = "N° de pièce :"; label2 = "Pièce de retour :"; break;
            case 3: label1 = "COMPTE GENERALE DE DEBIT :"; label2 = "COMPTE GENERAL CREDIT :"; break;
        }

        page.drawText(label1, { x: startX + 5, y: rY + 6, size: 8, font: bold });
        page.drawText(label2, { x: startX + col1W + 5, y: rY + 6, size: 8, font: bold });
    }

    return startY - tableH;
}

export async function generatePDFForDemandes(
    demandes: DemandePDFData[],
    options?: { title?: string }
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const bold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const isAP = options?.title === "AUTORISATION DE PAIEMENT";

    const labelForType = (type: string, isBulk: boolean = false) => {
        if (options?.title) return options.title;
        if (isBulk) {
            if (type === "ACHAT") return "NAVETTE ACHAT";
            return "NAVETTE ACHAT";
        }
        switch (type) {
            case "ACHAT":
            case "PAIEMENT":
            case "NP":
                return "NAVETTE ACHAT";
            case "NOTE_FRAIS":
                return "NOTE DE FRAIS";
            case "DRFMS":
                return "DRFMS";
            case "DRFME":
                return "DRFME";
            default:
                return "NAVETTE";
        }
    };

    // Groupement par auteur, type et objet pour les mettre sur la même page
    // SAUF pour AP et BDC : groupement par fournisseur uniquement
    const isBC = options?.title === "BON DE COMMANDE";
    const groups: Record<string, DemandePDFData[]> = {};
    demandes.forEach(d => {
        let key;
        if (isAP || isBC) {
            // Groupement par fournisseur
            const supplierName = (d.type === 'DRFMS' || d.type === 'NOTE_FRAIS') && !d.fournisseur?.nom
                ? `${d.auteur?.nom || ""} ${d.auteur?.prenom || ""}`.trim()
                : (d.fournisseur?.nom || "unknown");
            key = `supplier_${d.fournisseurID || supplierName}`;
        } else {
            const unifiedType = (d.type === "PAIEMENT" || d.type === "NP") ? "ACHAT" : d.type;
            key = `${d.auteur?.matricule || "unknown"}_${unifiedType}_${d.objet || "sans_objet"}`;
        }
        if (!groups[key]) groups[key] = [];
        groups[key].push(d);
    });

    for (const key in groups) {
        const items = groups[key];
        const d = items[0]; // Infos communes (auteur, type)
        // A4 paysage par défaut, portrait pour AP
        const pageWidth = isAP ? 595.28 : 841.89;
        const pageHeight = isAP ? 841.89 : 595.28;
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        let cursorY = pageHeight - 25; // Dynamique selon la hauteur
        const marginX = 25;
        const contentWidth = pageWidth - marginX * 2;
        const fontSize = 9.5;
        const lineHeight = 12;

        // Logo en haut à gauche (1,5 cm x 1,5 cm)
        try {
            const logoPath = path.join(process.cwd(), "public", "logo.jpg");
            if (fs.existsSync(logoPath)) {
                const logoBytes = fs.readFileSync(logoPath);
                const logo = await pdfDoc.embedJpg(logoBytes);
                const cm = 28.3465;
                const logoW = 1.5 * cm;
                const logoH = 1.5 * cm;
                page.drawImage(logo, {
                    x: marginX + 5,
                    y: cursorY - (logoH / 2),
                    width: logoW,
                    height: logoH,
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'intégration du logo:", error);
        }

        // Logo d'entreprise à droite (masqué pour modèle générique)

        // Titre principal (centré, sans bloc de fond)
        const title = labelForType(d.type);
        const isNavetteAchat = title === "NAVETTE ACHAT";
        const isInternalForm = isNavetteAchat || title === "NOTE DE FRAIS" || title === "DRFMS" || title === "DRFME";
        const isBonDeCommande = title === "BON DE COMMANDE";

        // Informations de l'entreprise à droite de logo.jpg (uniquement pour BON DE COMMANDE)
        if (isBonDeCommande) {
            const cm = 28.3465;
            const logoW = 1.5 * cm;
            const infoX = marginX + 5 + logoW + 15; // Position à droite de l'image logo
            let infoY = cursorY + 10; // Aligné avec le haut de l'image

            page.drawText("[NOM ENTREPRISE]", { x: infoX, y: infoY, size: 9, font: bold });
            infoY -= 12;
            page.drawText("NIF : [NIF]", { x: infoX, y: infoY, size: 9, font });
            infoY -= 12;
            page.drawText("STAT : [STAT]", { x: infoX, y: infoY, size: 9, font });
            infoY -= 12;
            page.drawText(`N° BC : ${sanitizeTextForPDF(d.numeroBonCommande) || "-"}`, { x: infoX, y: infoY, size: 9, font });
        }

        const titleSize = 16;
        const titleWidth = bold.widthOfTextAtSize(title, titleSize);
        page.drawText(title, {
            x: marginX + (contentWidth - titleWidth) / 2,
            y: cursorY,
            size: titleSize,
            font: bold,
            color: rgb(0.1, 0.1, 0.2),
        });

        // Ajout de la référence et du fournisseur sous le titre
        cursorY -= 15;
        const refText = `Réf : ${d.reference || "-"}`;
        const refSize = 10;
        const refWidth = bold.widthOfTextAtSize(refText, refSize);
        page.drawText(refText, {
            x: marginX + (contentWidth - refWidth) / 2,
            y: cursorY,
            size: refSize,
            font: bold,
            color: rgb(0.2, 0.2, 0.3),
        });
        cursorY -= 15;

        // Pour AP et BC, on centralise aussi le fournisseur en dessous de la référence
        if (isAP || isBonDeCommande) {
            const supplierName = (d.type === 'DRFMS' || d.type === 'NOTE_FRAIS') && !d.fournisseur?.nom
                ? `${d.auteur?.nom || ""} ${d.auteur?.prenom || ""}`.trim()
                : (d.fournisseur?.nom || "");
            const fouText = `Fournisseur : ${sanitizeTextForPDF(supplierName)}`;
            const fouWidth = bold.widthOfTextAtSize(fouText, 10);
            page.drawText(fouText, {
                x: marginX + (contentWidth - fouWidth) / 2,
                y: cursorY,
                size: 10,
                font: bold,
                color: rgb(0.1, 0.1, 0.2),
            });
            cursorY -= 15;
        }

        // Date d'impression et Mode de paiement (uniquement pour BON DE COMMANDE)
        if (isBonDeCommande) {
            const printDate = formatDate(new Date());
            const paymentMode = d.modePaiement || "-";
            const paymentDetail = d.paiementDetail ? ` (${sanitizeTextForPDF(d.paiementDetail)})` : "";
            const infoLine = `Date d'impression : ${printDate}  |  Mode de paiement : ${sanitizeTextForPDF(paymentMode)}${paymentDetail}`;

            const infoWidth = bold.widthOfTextAtSize(infoLine, 10);
            page.drawText(infoLine, {
                x: marginX + (contentWidth - infoWidth) / 2,
                y: cursorY,
                size: 10,
                font: bold,
                color: rgb(0.1, 0.1, 0.2),
            });
            cursorY -= 15;
        }
        cursorY -= 3;

        // Bloc identité (Refonte : 2 lignes sur 4 colonnes)
        // Ligne 1 : Nom et Prénom | Matricule | Fonction | Contact
        // Ligne 2 : Code Nom | Email | Service | Objet

        // On conserve la Date de dépôt au-dessus ou dans le titre ? 
        // Le user a dit "les informations en haut sur le nom, prenom et tout".
        // On va placer Date de dépôt et Service un peu à part ou intégrés.
        // Essai de 4 colonnes :
        // Col 1 : Nom & Prénom / Code Nom
        // Col 2 : Matricule / Email
        // Col 3 : Fonction / Service
        // Col 4 : Contact / Objet

        // Mais il y a 9 champs (Date, Service, Nom, Mat, Fonc, Contact, Code, Email, Objet).
        // On va laisser Date en haut à gauche (déjà géré ou pas ? non c'était dans la boucle).
        // On va mettre Date de dépôt juste sous le titre.

        // Date de dépôt affichée pour les formulaires internes (Navettes, NDF, DRF)
        if (isInternalForm) {
            page.drawText(`Date de dépôt : ${formatDate(d.dateDepot)}`, { x: marginX, y: cursorY + 2, size: 9, font: bold });
        }

        if (isInternalForm) {
            const idBoxTop = cursorY - 10;
            const colWidth = contentWidth / 2;
            const rowSpacing = 12;

            const drawField = (label: string, value: string, cIndex: number, rowIndex: number) => {
                const cx = marginX + cIndex * colWidth;
                const ry = idBoxTop - rowIndex * rowSpacing;
                page.drawText(label, { x: cx, y: ry, size: 9, font: bold });
                const lblW = bold.widthOfTextAtSize(label, 9);
                if (value) {
                    drawWrappedText(page, value, cx + lblW + 3, ry, colWidth - lblW - 10, 9, font, 9);
                }
            };

            // Colonne 1
            drawField("Nom :", `${d.auteur?.nom || ""} ${d.auteur?.prenom || ""}`, 0, 0);
            drawField("Fonction :", d.auteur?.fonction?.nomFonction || "", 0, 1);
            drawField("Service :", d.auteur?.service?.nomService || d.budget?.service?.nomService || d.auteur?.serviceAbbrev || "", 0, 2);
            drawField("Objet :", d.objet || "", 0, 3);

            // Colonne 2
            drawField("Matricule :", d.auteur?.matricule || "", 1, 0);
            drawField("Contact :", d.auteur?.telephone || "", 1, 1);
            drawField("Email :", d.auteur?.mailPro || d.auteur?.email || "", 1, 2);

            // const fournisseurName = (d.type === 'DRFMS' || d.type === 'NOTE_FRAIS') && !d.fournisseur?.nom
            //     ? `${d.auteur?.nom || ""} ${d.auteur?.prenom || ""}`.trim()
            //     : (d.fournisseur?.nom || "");
            // drawField("Fournisseur :", fournisseurName, 1, 3);

            cursorY = idBoxTop - 4 * rowSpacing - 10;
        } else {
            cursorY -= 20; // Plus compact pour le BDC
        }

        // Tableau principal... (reste inchangé, on saute jusqu'au commentaire)


        // Tableau principal (une seule ligne de données remplie pour coller au modèle de l'image)
        const tableLeft = marginX;
        const tableTop = cursorY;
        const rowHeight = 22; // Réduit de 25 à 22 pour gagner de la place
        const rowsCount = 10; // 10 lignes visibles
        const headerHeight1 = 0;
        // 2 cm pour la ligne des titres de colonnes
        const headerHeight2 = 1 * 28.3465;
        const dataHeight = rowHeight * rowsCount;
        const totalTableHeight = headerHeight1 + headerHeight2 + dataHeight;

        // Largeurs ajustées pour les 10 colonnes spécifiques (somme ~816.89)
        // Colonnes conditionnelles
        const baseCols = [
            { key: "n", title: "N°\nD'ORDRE", width: 45 },
            { key: "service", title: "SERVICE\nDEMANDEUR", width: 80 },
            { key: "description", title: "DESIGNATION", width: 150 },
            { key: "specification", title: "MOTIF", width: 120 },
            { key: "unites", title: "UNITES", width: 50 },
            { key: "qte", title: "QTES", width: 45 },
            { key: "pu", title: "P.U", width: 75 },
            { key: "montant", title: "TOTAL", width: 85 },
            { key: "justification", title: "JUSTIFICATION\nCHOIX", width: 90 },
            { key: "imputation", title: "IMPUTATION\nCOMPTABLE", width: 85 },
            { key: "activite", title: "ACTIVITE", width: 80 },
            { key: "tiger", title: "CODE TIGER", width: 70 },
        ];

        const apCols = [
            { key: "reference", title: "REF NAVETTE ACHAT /\nPAIEMENT PÉRIODIQUE", width: 250 },
            { key: "total", title: "MONTANT", width: 150 },
            { key: "facture", title: "FACTURE", width: 150 },
            { key: "specification", title: "COMMENTAIRE", width: 270 },
        ];

        let cols = isAP ? apCols : [...baseCols];

        // Pour le BON DE COMMANDE, on garde une version simplifiée
        if (isBonDeCommande) {
            cols = cols.filter(c => !["service", "justification", "imputation", "activite", "tiger"].includes(c.key));
        }

        const typesWithFournisseur = ["NAVETTE ACHAT", "NOTE DE FRAIS"];
        if (typesWithFournisseur.includes(title)) {
            // Insert FOURNISSEUR after DESIGNATION (description)
            const descIndex = cols.findIndex(c => c.key === "description");
            if (descIndex !== -1) {
                cols.splice(descIndex + 1, 0, { key: "fournisseur", title: "FOURNISSEUR", width: 100 });
            }
        }

        // Pour le DRFME et DRFMS, on enlève uniquement les colonnes de prix/quantité
        if (title === "DRFME" || title === "DRFMS") {
            cols = cols.filter(c => !["pu", "unites", "qte"].includes(c.key));

            // On ajoute REMBOURSE [50%] uniquement pour le DRFME
            if (title === "DRFME") {
                const montantIndex = cols.findIndex(c => c.key === "montant");
                if (montantIndex !== -1) {
                    cols.splice(montantIndex + 1, 0, { key: "remboursement", title: "REMBOURSE\n[50%]", width: 85 });
                }
            }
        }

        // Largeurs des colonnes scalées pour remplir toute la largeur disponible
        const totalOriginalWidth = cols.reduce((sum, c) => sum + c.width, 0);
        const scaleFactor = contentWidth / totalOriginalWidth;

        const scaledCols = cols.map(c => ({
            ...c,
            width: c.width * scaleFactor
        }));




        // Positions des groupes pour les lignes verticales (BDC uniquement)
        let g2SX = 0;
        let g3SX = 0;
        if (!isAP) {
            let accX = tableLeft;
            for (let i = 0; i < scaledCols.length; i++) {
                const c = scaledCols[i];
                if (c.key === "description") g2SX = accX;
                if (c.key === "unites") g3SX = accX; // unites is where the 3rd group starts in BDCCols
                accX += c.width;
            }
        }

        let currentX = tableLeft;

        // Les bordures seront dessinées au fur et à mesure des lignes

        // Barres horizontales + fond d’en-tête
        // page.drawRectangle({ x: tableLeft, y: tableTop - headerHeight1, width: contentWidth, height: headerHeight1, color: rgb(0.94, 0.96, 1) });
        page.drawRectangle({ x: tableLeft, y: tableTop - headerHeight1 - headerHeight2, width: contentWidth, height: headerHeight2, color: rgb(0.97, 0.97, 0.99) });
        // page.drawLine({ start: { x: tableLeft, y: tableTop - headerHeight1 }, end: { x: tableLeft + contentWidth, y: tableTop - headerHeight1 }, thickness: 1, color: rgb(0.7, 0.7, 0.8) });
        page.drawLine({ start: { x: tableLeft, y: tableTop - headerHeight1 - headerHeight2 }, end: { x: tableLeft + contentWidth, y: tableTop - headerHeight1 - headerHeight2 }, thickness: 1, color: rgb(0.7, 0.7, 0.8) });




        // Colonnes
        currentX = tableLeft;
        for (let c = 0; c < scaledCols.length; c++) {
            const col = scaledCols[c];
            // séparateur vertical des colonnes
            if (c < scaledCols.length - 1) {
                page.drawLine({
                    start: { x: currentX + col.width, y: tableTop - headerHeight1 },
                    end: { x: currentX + col.width, y: tableTop - headerHeight1 - headerHeight2 },
                    thickness: 1,
                    color: rgb(0.7, 0.7, 0.8),
                });
            }

            // Header 2 (Titres de colonnes)
            const titleText = col.title;
            const titleLines = titleText.split('\n');

            const alignX = (w: number, text: string) => currentX + (col.width - bold.widthOfTextAtSize(text, 9)) / 2;

            if (titleLines.length > 1) { // Imputation
                page.drawText(titleLines[0], { x: alignX(2, titleLines[0]), y: tableTop - headerHeight1 - 8, size: 9, font: bold, color: rgb(0.1, 0.1, 0.2) });
                page.drawText(titleLines[1], { x: alignX(2, titleLines[1]), y: tableTop - headerHeight1 - 16, size: 9, font: bold, color: rgb(0.1, 0.1, 0.2) });
            } else {
                page.drawText(titleText, { x: alignX(1, titleText), y: tableTop - headerHeight1 - 12, size: 9, font: bold, color: rgb(0.1, 0.1, 0.2) });
            }
            currentX += col.width;
        }

        // Lignes de données
        let currentY = tableTop - headerHeight1 - headerHeight2;
        let totalSum = 0;
        const rowHeightMin = 22;

        for (let r = 0; r < Math.max(items.length, 10); r++) {
            const item = items[r];
            let rowH = rowHeightMin;
            if (item) {
                totalSum += Number(item.montant || 0);
                // Calcul de la hauteur dynamique de la ligne (Sécurisé pour AP et BDC)
                let hDesc = 0;
                let hMotif = 0;
                let hDevis = 0;
                let hJustif = 0;

                if (isAP) {
                    // AP: index 0 = reference, index 3 = specification
                    hDesc = getTextHeight(item.description || "", font, 8.5, scaledCols[3]?.width - 6, 10);
                    hMotif = getTextHeight(item.motif || "", font, 8.5, scaledCols[0]?.width - 6, 10);
                } else {
                    // BDC: index 2 = description, index 3/4 = specification (MOTIF), etc.
                    const descColIndex = scaledCols.findIndex(c => c.key === "description");
                    const motifColIndex = scaledCols.findIndex(c => c.key === "specification");
                    const justifColIndex = scaledCols.findIndex(c => c.key === "justification");
                    const imputationColIndex = scaledCols.findIndex(c => c.key === "imputation");
                    const activiteColIndex = scaledCols.findIndex(c => c.key === "activite");

                    hDesc = getTextHeight(item.description || "", font, 8.5, (scaledCols[descColIndex]?.width || 100) - 6, 10);
                    hMotif = getTextHeight(item.motif || "", font, 8.5, (scaledCols[motifColIndex]?.width || 100) - 6, 10);
                    hJustif = getTextHeight(item.justificationChoix || "", font, 8.5, (scaledCols[justifColIndex]?.width || 100) - 6, 10);
                    const hImput = getTextHeight(item.imputationComptable || "", font, 8.5, (scaledCols[imputationColIndex]?.width || 90) - 6, 10);
                    const hActivite = getTextHeight(item.activite || "", font, 8.5, (scaledCols[activiteColIndex]?.width || 80) - 6, 10);

                    rowH = Math.max(rowHeightMin, hDesc + 4, hMotif + 4, hJustif + 4, hImput + 4, hActivite + 4);
                }
            }

            let dx = tableLeft + 3;
            for (const c of scaledCols) {
                let val = "";
                if (item) {
                    switch (c.key) {
                        case "n": val = String(r + 1); break;
                        case "service": val = item.auteur?.serviceAbbrev || item.auteur?.service?.abreviation || item.auteur?.service?.nomService || ""; break;
                        case "reference": val = item.reference || item.objet || ""; break;
                        case "fournisseur":
                            val = (item.type === 'DRFMS' || item.type === 'NOTE_FRAIS') && !item.fournisseur?.nom
                                ? `${item.auteur?.nom || ""} ${item.auteur?.prenom || ""}`.trim()
                                : (item.fournisseur?.nom || "");
                            break;
                        case "description": val = item.description || ""; break;
                        case "specification": val = item.motif || ""; break;
                        case "unites": val = "U"; break;
                        case "qte": val = item.quantite != null ? String(item.quantite) : ""; break;
                        case "pu": val = formatMoney(item.pu); break;
                        case "montant": val = formatMoney(item.montant); break;
                        case "total": val = formatMoney(item.montant); break;
                        case "remboursement": val = formatMoney(Number(item.montant || 0) / 2); break;
                        case "devis": val = item.devis || ""; break;
                        case "justification": val = item.justificationChoix || ""; break;
                        case "imputation": val = item.imputationComptable || ""; break;
                        case "activite": val = item.activite || ""; break;
                        case "tiger": val = item.codeTIGER || ""; break;
                        case "reste": val = "0"; break;
                        case "facture": val = item.numeroBonCommande || "-"; break;
                    }
                }

                // Determine alignment
                let alignment: 'left' | 'center' | 'right' = 'center';
                const rightAlignedKeys = ['n', 'qte', 'pu', 'montant', 'total', 'reste', 'remboursement'];
                if (rightAlignedKeys.includes(c.key)) {
                    alignment = 'right';
                }

                if (val) drawWrappedText(page, String(val), dx, currentY - 12, c.width - 6, 10, font, 8.5, alignment);
                dx += c.width;
            }

            // Séparateurs verticaux
            let vx = tableLeft;
            for (const sc of scaledCols) {
                vx += sc.width;
                page.drawLine({ start: { x: vx, y: currentY }, end: { x: vx, y: currentY - rowH }, thickness: 0.5, color: rgb(0.7, 0.7, 0.8) });
            }
            // Bordures gauche/droite tableau (plus épaisses)
            page.drawLine({ start: { x: tableLeft, y: currentY }, end: { x: tableLeft, y: currentY - rowH }, thickness: 1 });
            page.drawLine({ start: { x: tableLeft + contentWidth, y: currentY }, end: { x: tableLeft + contentWidth, y: currentY - rowH }, thickness: 1 });

            // Prolongement des séparateurs de groupes (épais) - Uniquement pour BDC
            if (!isAP) {
                page.drawLine({ start: { x: g2SX, y: currentY }, end: { x: g2SX, y: currentY - rowH }, thickness: 1 });
                page.drawLine({ start: { x: g3SX, y: currentY }, end: { x: g3SX, y: currentY - rowH }, thickness: 1 });
            }

            currentY -= rowH;
            page.drawLine({ start: { x: tableLeft, y: currentY }, end: { x: tableLeft + contentWidth, y: currentY }, thickness: 0.6, color: rgb(0.85, 0.85, 0.9) });
        }
        // Bordure supérieure tableau et séparateurs groupes persistants
        page.drawLine({ start: { x: tableLeft, y: tableTop }, end: { x: tableLeft + contentWidth, y: tableTop }, thickness: 1 });
        if (!isAP) {
            page.drawLine({ start: { x: g2SX, y: tableTop }, end: { x: g2SX, y: currentY }, thickness: 1 });
            page.drawLine({ start: { x: g3SX, y: tableTop }, end: { x: g3SX, y: currentY }, thickness: 1 });
        }

        // Montant en lettres (à gauche) & Montant Total (à droite)
        const resumeTop = currentY - 12;

        page.drawText("Montant Total :", { x: marginX + contentWidth - 220, y: resumeTop, size: 10, font: bold });
        page.drawText(formatMoney(totalSum), { x: marginX + contentWidth - 90, y: resumeTop, size: 10, font: bold });

        const lettersTop = resumeTop - 18;
        const letters = numberToFrenchWords(totalSum);
        page.drawText(`Arrêté à la somme de : ${letters} ARIARY`, {
            x: marginX,
            y: lettersTop,
            size: 9,
            font: bold
        });

        cursorY = lettersTop - 25;

        // Signatures (grille comme le modèle)
        const sigTop = cursorY;
        const totalSigW = contentWidth;

        // Configuration conditionnelle pour AP et BDC
        let roles: string[] = [];
        let names: string[] = [];

        const chefService = d.auteur?.service?.chef;
        const chefServiceName = chefService ? `${chefService.prenom || ""} ${chefService.nom || ""}`.trim() : "";
        const directriceName = d.directriceName || "Vincent Caroline DE TAPOL";

        if (isAP) {
            roles = ["Responsable Financier", "Directrice"];
            names = ["Hery Magnamby RAKOTONIRINA ", directriceName];
        } else if (isBonDeCommande) {
            roles = ["Chargée Achat", "Responsable Financier", "Fournisseur"];
            names = ["Olivia NJARAMANANA", "Hery Magnamby RAKOTONIRINA", d.fournisseur?.nom || ""];
        } else if (d.type === "ACHAT") {
            roles = ["Chef de Service", "Assistante Administrative et Logistique", "Chargée Achat", "Responsable Financier", "Contrôleur de Gestion", "Directrice"];
            names = [chefServiceName, "Annick Romualdine SOAMANDEFITRA", "Olivia NJARAMANANA", "Hery Magnamby RAKOTONIRINA", "Joseph RANAIVOSON", directriceName];
        } else if (d.type === "DRFMS") {
            roles = ["Responsable des Ressources Humaines", "Responsable Financier", "Contrôleur de Gestion", "Directrice"];
            names = ["Mariah RAMANAMPAMONJY", "Hery Magnamby RAKOTONIRINA", "Joseph RANAIVOSON", directriceName];
        } else if (d.type === "DRFME") {
            roles = ["Chef de Service", "Responsable Financier", "Contrôleur de Gestion", "Directrice"];
            names = [chefServiceName, "Hery Magnamby RAKOTONIRINA", "Joseph RANAIVOSON", directriceName];
        } else if (d.type === "NOTE_FRAIS" || d.type === "NP" || d.type === "PAIEMENT") {
            const demandeurName = `${d.auteur?.prenom || ""} ${d.auteur?.nom || ""}`.trim();
            roles = ["Demandeur", "Chef de Service", "Responsable Financier", "Contrôleur de Gestion", "Directrice"];
            names = [demandeurName, chefServiceName, "Hery Magnamby RAKOTONIRINA", "Joseph RANAIVOSON", directriceName];
        } else {
            roles = ["Chargé Achat", "Fournisseur"];
            names = ["NJARAMANANA Olivia", ""];
        }

        const demandeurW = 0; // Caché pour AP et BDC désormais
        const valideursW = totalSigW;
        let sigRowH = 65;

        // En-têtes (Uniquement Signatures des Valideurs car demandeurW = 0)
        page.drawRectangle({ x: marginX, y: sigTop - 18, width: valideursW, height: 18, borderColor: rgb(0, 0, 0), borderWidth: 1, color: rgb(0.95, 0.95, 0.98) });
        page.drawText("Signature des Valideurs", { x: marginX + 6, y: sigTop - 12, size: 9, font: bold });

        // Cases de signature
        const valideurCellW = valideursW / roles.length;

        // Calcul de la hauteur maximale nécessaire pour les signataires
        for (let j = 0; j < roles.length; j++) {
            const hRole = getTextHeight(roles[j], bold, 9, valideurCellW - 12, 10);
            const hName = names[j] ? getTextHeight(names[j], font, 8.5, valideurCellW - 12, 10) : 0;
            const needed = hRole + hName + 50; // Texte + champs Date/Signature + marges
            if (needed > sigRowH) sigRowH = needed;
        }

        for (let j = 0; j < roles.length; j++) {
            const roleX = marginX + demandeurW + j * valideurCellW;

            page.drawRectangle({
                x: roleX,
                y: sigTop - 18 - sigRowH,
                width: valideurCellW,
                height: sigRowH,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });

            let currentSigY = sigTop - 28;
            currentSigY = drawWrappedText(page, roles[j], roleX + 6, currentSigY, valideurCellW - 12, 10, bold, 9);

            if (names[j]) {
                currentSigY -= 2; // Small buffer
                currentSigY = drawWrappedText(page, names[j], roleX + 6, currentSigY, valideurCellW - 12, 10, font, 8.5);
            }

            // Récupération de la date de validation selon l'étape et le type
            let sigDate = "-";
            const roleLower = roles[j].toLowerCase();

            if (roleLower.startsWith("demandeur")) {
                sigDate = formatDate(d.dateDepot);
            } else if (d.type === "ACHAT" || d.type === "PAIEMENT" || d.type === "NP") {
                // 1:ChefService, 2:AssistanteLogistique, 3:ChargeeAchat, 4:ResponsableFinancier, 5:ControleurGestion, 6:Directrice
                const h = d.historique.find(item => item.etape === (j + 1) && item.statut === "VALIDEE");
                if (h) sigDate = formatDate(h.dateValidation);
            } else if (["DRFMS", "NOTE_FRAIS", "DRFME"].includes(d.type)) {
                // Pour NOTE_FRAIS: 0:Demandeur, 1:ChefService (etape 1), 2:RespFi (etape 2)...
                // Pour DRFMS/E: 0:RRH/ChefService (etape 1), 1:RespFi (etape 2)... (pas de demandeur explicitement dans roles[0])
                const isNDF = d.type === "NOTE_FRAIS";
                const stepToFind = isNDF ? j : (j + 1);

                if (!isNDF || j > 0) {
                    const h = d.historique.find(item => item.etape === stepToFind && item.statut === "VALIDEE");
                    if (h) sigDate = formatDate(h.dateValidation);
                }
            } else if (isBonDeCommande) {
                // Pour le Bon de Commande, on laisse la date vide pour remplissage manuel
                sigDate = "";
            } else if (isAP) {
                // Pour l'Autorisation de Paiement, on affiche la date du jour (date d'impression)
                sigDate = formatDate(new Date());
            }

            page.drawText(`Date : `, { x: roleX + 6, y: currentSigY - 12, size: 8.5, font });
            page.drawText("Signature:", { x: roleX + 6, y: currentSigY - 24, size: 8.5, font });
        }

        cursorY = sigTop - 18 - sigRowH - 10;

        // Section Comptabilité (Uniquement pour l'Autorisation de Paiement)
        if (isAP) {
            cursorY = drawAccountingSection(page, marginX, cursorY, contentWidth, font, bold);
            cursorY -= 15;
        }

        // Commentaires (Facultatifs)
        const commY = cursorY - 10;
        page.drawText("Commentaire (Facultatifs)", { x: marginX, y: commY, size: 9, font });

        // Ligne de commentaire (juste à côté)
        const lineStartX = marginX + 110;
        // Ligne pointillée ou continue ? User a dit "mets la ligne du commentaire là". 
        // On garde une ligne continue simple.
        page.drawLine({ start: { x: lineStartX, y: commY + 3 }, end: { x: marginX + contentWidth, y: commY + 3 }, thickness: 0.7, color: rgb(0.6, 0.6, 0.65) });
        // Ligne du dessous supprimée comme demandé
    }

    return await pdfDoc.save();
}

/**
 * Génère une Autorisation de Paiement pour une Navette Paiement validée
 */
export async function generateAutorisationPaiement(
    demande: DemandePDFData
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    let cursorY = 800;
    const marginX = 40;
    const contentWidth = 595.28 - marginX * 2;

    // Titre principal
    page.drawText("AUTORISATION DE PAIEMENT", {
        x: marginX,
        y: cursorY,
        size: 18,
        font: bold,
        color: rgb(0.15, 0.2, 0.6),
    });
    cursorY -= 30;

    // Informations de la demande
    const refText = `Réf : ${demande.reference || demande.numero || demande.id}`;
    const refWidth = bold.widthOfTextAtSize(refText, 14);
    page.drawText(refText, {
        x: marginX + (contentWidth - refWidth) / 2,
        y: cursorY,
        size: 14,
        font: bold,
    });
    cursorY -= 20;

    // Fournisseur centré
    const apFournisseur = (demande.type === 'DRFMS' || demande.type === 'NOTE_FRAIS') && !demande.fournisseur?.nom
        ? `${demande.auteur?.nom || ""} ${demande.auteur?.prenom || ""}`.trim()
        : (demande.fournisseur?.nom || "");
    const fouText = `Fournisseur : ${sanitizeTextForPDF(apFournisseur) || "-"}`;
    const fouWidth = bold.widthOfTextAtSize(fouText, 14);
    page.drawText(fouText, {
        x: marginX + (contentWidth - fouWidth) / 2,
        y: cursorY,
        size: 14,
        font: bold,
    });
    cursorY -= 25;

    page.drawLine({
        start: { x: marginX, y: cursorY },
        end: { x: marginX + contentWidth, y: cursorY },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });
    cursorY -= 25;

    // Informations de paiement
    page.drawText("DÉTAILS DU PAIEMENT", {
        x: marginX,
        y: cursorY,
        size: 12,
        font: bold,
    });
    cursorY -= 18;

    page.drawText(`Objet: ${sanitizeTextForPDF(demande.objet) || "-"}`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font,
    });
    cursorY -= 15;

    page.drawText(`Description:`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font: bold,
    });
    cursorY = drawWrappedText(
        page,
        demande.description || "-",
        marginX + 80,
        cursorY,
        contentWidth - 80,
        12,
        font,
        10
    );

    const apAmount = Number(demande.montant);
    page.drawText(`Montant autorisé: ${apAmount.toLocaleString("fr-FR")} Ar`, {
        x: marginX + contentWidth - 180, // Offset to the right
        y: cursorY,
        size: 11,
        font: bold,
        color: rgb(0, 0.5, 0),
    });

    cursorY -= 18;
    const apLetters = numberToFrenchWords(apAmount);
    page.drawText(`Arrêté à la somme de : ${apLetters} ARIARY`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font: bold
    });

    cursorY -= 30;

    // Informations comptables
    page.drawText("INFORMATIONS COMPTABLES", {
        x: marginX,
        y: cursorY,
        size: 12,
        font: bold,
    });
    cursorY -= 18;

    page.drawText(`Imputation Comptable: ${sanitizeTextForPDF(demande.imputationComptable) || "-"}`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font,
    });
    cursorY -= 15;

    page.drawText(`Activité: ${sanitizeTextForPDF(demande.activite) || "-"}`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font,
    });
    cursorY -= 15;

    page.drawText(`Code TIGER: ${sanitizeTextForPDF(demande.codeTIGER) || "-"}`, {
        x: marginX,
        y: cursorY,
        size: 10,
        font,
    });
    cursorY -= 20;

    // Signatures
    page.drawLine({
        start: { x: marginX, y: cursorY },
        end: { x: marginX + contentWidth, y: cursorY },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });
    cursorY -= 30;

    page.drawText("SIGNATURES", {
        x: marginX,
        y: cursorY,
        size: 12,
        font: bold,
    });
    cursorY -= 20;

    // Direction
    page.drawText("Direction", {
        x: marginX,
        y: cursorY,
        size: 10,
        font: bold,
    });
    page.drawText(`Date : ${formatDate(new Date())}`, {
        x: marginX + contentWidth - 150,
        y: cursorY,
        size: 10,
        font,
    });
    cursorY -= 50;

    page.drawLine({
        start: { x: marginX, y: cursorY },
        end: { x: marginX + 200, y: cursorY },
        thickness: 1,
        color: rgb(0, 0, 0),
    });

    cursorY -= 30;
    // Section Comptabilité pour l'Autorisation de Paiement
    cursorY = drawAccountingSection(page, marginX, cursorY, contentWidth, font, bold);

    // Historique des validations
    cursorY -= 30;
    page.drawText("HISTORIQUE DES VALIDATIONS", {
        x: marginX,
        y: cursorY,
        size: 12,
        font: bold,
    });
    cursorY -= 18;

    if (demande.historique && demande.historique.length > 0) {
        for (const h of demande.historique) {
            if (h.statut === "VALIDEE") {
                const header = `Étape ${h.etape} - ${h.statut} | ${formatDate(h.dateValidation)}`;
                if (h.reference_navette) {
                    page.drawText(`Ref: ${sanitizeTextForPDF(h.reference_navette)}`, { x: marginX, y: cursorY, size: 8, font });
                    cursorY -= 10;
                }
                page.drawText(header, { x: marginX, y: cursorY, size: 10, font: bold });
                cursorY -= 12;
                const valideur = `Validateur: ${(h.valideur?.prenom || "")} ${(h.valideur?.nom || "")} (${h.valideur?.matricule || "-"})`;
                cursorY = drawWrappedText(
                    page,
                    valideur,
                    marginX,
                    cursorY,
                    contentWidth,
                    12,
                    font,
                    10
                );
                cursorY -= 10;
            }
        }
    }

    return await pdfDoc.save();
}

/**
 * Génère un PDF récapitulatif sous forme de liste pour les demandes sélectionnées.
 * Colonnes : N°/TYPE, DESCRIPTION, MOTIF, QTE
 */
export async function generatePDFList(
    demandes: DemandePDFData[],
    options?: { title?: string }
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const bold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Portrait
    const { width, height } = page.getSize();
    const margin = 40;
    let cursorY = height - margin;

    // Titre
    const title = options?.title || "LISTE DES DEMANDES À VALIDER";
    const titleSize = 16;
    const titleWidth = bold.widthOfTextAtSize(title, titleSize);
    page.drawText(title, {
        x: (width - titleWidth) / 2,
        y: cursorY,
        size: titleSize,
        font: bold,
        color: rgb(0, 0, 0),
    });
    cursorY -= 30;

    // Table Header
    const cols = [
        { label: "N°/TYPE", width: 100 },
        { label: "DESCRIPTION", width: 220 },
        { label: "MOTIF", width: 140 },
        { label: "QTE", width: 50 },
    ];

    const rowHeight = 25;
    const headerHeight = 25;

    // Draw Header Background
    page.drawRectangle({
        x: margin,
        y: cursorY - headerHeight,
        width: width - 2 * margin,
        height: headerHeight,
        color: rgb(0.9, 0.9, 0.9),
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    let currentX = margin;
    cols.forEach((col) => {
        const textWidth = bold.widthOfTextAtSize(col.label, 10);
        page.drawText(col.label, {
            x: currentX + (col.width - textWidth) / 2,
            y: cursorY - headerHeight + 8,
            size: 10,
            font: bold,
        });
        currentX += col.width;
    });

    cursorY -= headerHeight;

    // Draw Rows
    for (const d of demandes) {
        if (cursorY < margin + rowHeight) {
            // New Page if needed
            const newPage = pdfDoc.addPage([595.28, 841.89]);
            cursorY = height - margin;
            // Draw header again on new page? Or just continue. Usually, list export repeats header or just continues.
        }

        const rowY = cursorY - rowHeight;

        // Draw row border
        page.drawRectangle({
            x: margin,
            y: rowY,
            width: width - 2 * margin,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 0.5,
        });

        currentX = margin;

        // N°/TYPE
        const idType = `${d.numero || d.id}\n${d.type}`;
        drawWrappedText(page, idType, currentX + 5, rowY + 15, cols[0].width - 10, 10, font, 8);
        currentX += cols[0].width;

        // DESCRIPTION
        drawWrappedText(page, d.description || "-", currentX + 5, rowY + 15, cols[1].width - 10, 10, font, 8);
        currentX += cols[1].width;

        // MOTIF
        drawWrappedText(page, d.motif || "-", currentX + 5, rowY + 15, cols[2].width - 10, 10, font, 8);
        currentX += cols[2].width;

        // QTE
        const qte = d.quantite !== null ? String(d.quantite) : "-";
        const qteWidth = font.widthOfTextAtSize(qte, 8);
        page.drawText(qte, {
            x: currentX + (cols[3].width - qteWidth) / 2,
            y: rowY + 8,
            size: 8,
            font: font,
        });

        cursorY -= rowHeight;
    }

    return await pdfDoc.save();
}