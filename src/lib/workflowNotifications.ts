import { TypeNavette } from "@/lib/types";

type PrismaLike = any;

type CollaborateurContact = {
	matricule: string;
	nom?: string | null;
	prenom?: string | null;
	mail: string;
};

type AuteurContext = {
	matricule?: string | null;
	nom?: string | null;
	prenom?: string | null;
	mailPro?: string | null;
	serviceId?: number | null;
	serviceAbbrev?: string | null;
};

type DemandeContext = {
	id: number;
	type: TypeNavette | string;
	objet?: string | null;
	auteur?: AuteurContext;
};

const ROLE_VARIANTS: Record<string, string[]> = {
	ChefService: ["ChefService", "Chef de Service", "Chef_de_Service", "Chef Service"],
	AssistanteLogistique: [
		"AssistanteLogistique",
		"Assistante Logistique",
		"Assistante_Logistique",
	],
	ChargeeAchat: ["ChargeeAchat", "Chargée Achat", "Chargee Achat", "ChargéeAchat"],
	ResponsableFinancier: [
		"ResponsableFinancier",
		"Responsable Financier",
		"Responsable_Financier",
	],
	ControleurGestion: [
		"ControleurGestion",
		"Contrôleur de Gestion",
		"Controleur de Gestion",
		"Controleur_Gestion",
	],
	Direction: ["Direction"],
};

const ROLE_DISPLAY_NAMES: Record<string, string> = {
	ChefService: "Chef de Service",
	AssistanteLogistique: "Assistante Logistique",
	ChargeeAchat: "Chargée d'Achat",
	ResponsableFinancier: "Responsable Financier",
	ControleurGestion: "Contrôleur de Gestion",
	Direction: "Direction",
};

const ROLE_LOOKUP: Record<string, string> = {};

for (const [canonical, variants] of Object.entries(ROLE_VARIANTS)) {
	for (const variant of variants) {
		ROLE_LOOKUP[toRoleKey(variant)] = canonical;
	}
	ROLE_LOOKUP[toRoleKey(canonical)] = canonical;
}

const NAVETTE_LABELS: Record<string, string> = {
	ACHAT: "Navette Achat",
	PAIEMENT: "Navette Paiement",
	NOTE_FRAIS: "Navette Note de Frais",
	DRFMS: "Demande DRFMS",
	DRFME: "Demande DRFME",
};

function toRoleKey(value: string): string {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z]/gi, "")
		.toLowerCase();
}

export function canonicalizeRole(role: string): string {
	return ROLE_LOOKUP[toRoleKey(role)] ?? role;
}

export function getRoleVariants(role: string): string[] {
	const canonical = canonicalizeRole(role);
	const variants = ROLE_VARIANTS[canonical];
	if (variants) {
		return Array.from(new Set([canonical, ...variants]));
	}
	return Array.from(new Set([role, canonical]));
}

export function getRoleDisplayName(role: string): string {
	const canonical = canonicalizeRole(role);
	return ROLE_DISPLAY_NAMES[canonical] ?? role;
}

export function formatNavetteType(type: TypeNavette | string): string {
	const key = typeof type === "string" ? type.toUpperCase() : type;
	return NAVETTE_LABELS[key] ?? key;
}

export function formatPersonName(person?: { nom?: string | null; prenom?: string | null }): string {
	if (!person) return "Utilisateur";
	const parts = [person.prenom?.trim(), person.nom?.trim()].filter(Boolean);
	return parts.length > 0 ? parts.join(" ") : "Utilisateur";
}

function dedupeContacts(contacts: CollaborateurContact[]): CollaborateurContact[] {
	const seen = new Set<string>();
	const result: CollaborateurContact[] = [];
	for (const contact of contacts) {
		const mail = contact.mail.trim().toLowerCase();
		if (!mail || seen.has(mail)) continue;
		seen.add(mail);
		result.push(contact);
	}
	return result;
}

export async function findValidatorsForRole(
	client: PrismaLike,
	role: string,
	ctx: { demande: DemandeContext }
): Promise<CollaborateurContact[]> {
	const canonical = canonicalizeRole(role);

	if (canonical === "ChefService") {
		const service = await resolveServiceForAuteur(client, ctx.demande.auteur);
		if (service?.chef?.mailPro) {
			return dedupeContacts([
				{
					matricule: service.chef.matricule,
					nom: service.chef.nom,
					prenom: service.chef.prenom,
					mail: service.chef.mailPro,
				},
			]);
		}
		// Fallback to role-based lookup if no chef or email
	}

	const roleVariants = getRoleVariants(role);

	const collaborateurs = await client.collaborateur.findMany({
		where: {
			collaborateurRoles: {
				some: {
					role: {
						nomRole: {
							in: roleVariants,
						},
					},
				},
			},
			mailPro: {
				not: null,
			},
		},
		select: {
			matricule: true,
			nom: true,
			prenom: true,
			mailPro: true,
		},
	});

	const contacts = collaborateurs
		.filter((collab) => collab.mailPro && collab.mailPro.trim() !== "")
		.map((collab) => ({
			matricule: collab.matricule,
			nom: collab.nom,
			prenom: collab.prenom,
			mail: collab.mailPro!.trim(),
		}));

	return dedupeContacts(contacts);
}

export function formatDateTime(date: Date | string | null | undefined): string {
	if (!date) return "Non renseignée";
	const value = typeof date === "string" ? new Date(date) : date;
	if (Number.isNaN(value.getTime())) return "Non renseignée";
	return value.toLocaleString("fr-FR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}

async function resolveServiceForAuteur(
	client: PrismaLike,
	auteur?: AuteurContext
) {
	if (!auteur) return null;

	const where: any = auteur.serviceId
		? { id: auteur.serviceId }
		: auteur.serviceAbbrev
			? { abreviation: auteur.serviceAbbrev }
			: null;

	if (!where) return null;

	return client.service.findFirst({
		where,
		include: {
			chef: true,
		},
	});
}

export type { CollaborateurContact, DemandeContext };

