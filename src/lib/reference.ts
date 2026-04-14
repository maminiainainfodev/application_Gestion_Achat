function getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function generateNavetteReference(demande: {
    id: number;
    type: string;
    dateDepot: Date | string | null;
    auteur?: {
        nom?: string | null;
        prenom?: string | null;
        prenomUsuelle?: string | null;
        service?: {
            abreviation?: string | null;
            nomService?: string | null;
        } | null;
    } | null;
}) {
    const date = demande.dateDepot ? new Date(demande.dateDepot) : new Date();
    const weekNumber = getWeekNumber(date);

    // Partie utilisateur : PrenomUsuelle ou premier mot du Prenom ou Nom
    let userPart = 'UNK';
    if (demande.auteur?.prenomUsuelle) {
        userPart = demande.auteur.prenomUsuelle;
    } else if (demande.auteur?.prenom) {
        userPart = demande.auteur.prenom.split(' ')[0];
    } else if (demande.auteur?.nom) {
        userPart = demande.auteur.nom;
    }

    // Abréviation du service
    const serviceAbbrev = demande.auteur?.service?.abreviation ||
        demande.auteur?.service?.nomService?.substring(0, 3).toUpperCase() ||
        'UNK';

    // Préfixe selon le type
    let prefix = 'NAV';
    const typeUpper = demande.type ? demande.type.toUpperCase() : '';

    if (typeUpper === 'ACHAT') prefix = 'NA';
    else if (typeUpper === 'PAIEMENT') prefix = 'NP';
    else if (typeUpper === 'NOTEFRAIS' || typeUpper === 'NOTE_FRAIS') prefix = 'NDF';
    else if (typeUpper === 'DRFMS') prefix = 'DRFMS';
    else if (typeUpper === 'DRFME') prefix = 'DRFME';

    return `${prefix}-${userPart}-${serviceAbbrev}-S${weekNumber}`;
}
