type MaybeName = {
	prenomUsuelle?: string | null;
	prenom?: string | null;
	nom?: string | null;
	matricule?: string | null;
};

/**
 * Returns the preferred collaborator display name: prenom usuel when available,
 * otherwise fallback to prenom, then nom, finally matricule or the provided fallback.
 */
export const getPreferredName = (entity?: MaybeName | null, fallback = "—") => {
	if (!entity) return fallback;

	const preferred =
		entity.prenomUsuelle?.trim() ||
		entity.prenom?.trim() ||
		entity.nom?.trim() ||
		entity.matricule?.trim();

	return preferred || fallback;
};

