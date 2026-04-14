import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import FormModal from "@/components/FormModal";
import Image from "next/image";
import Link from "next/link";
import { getPreferredName } from "@/lib/nameFormatter";

type PendingDemande = {
	id: number;
	numero: number | null;
	type: string;
	objet: string | null;
	statut: string;
	dateDepot: Date | string | null;
	auteur: {
		matricule: string | null;
		prenomUsuelle: string | null;
		prenom: string | null;
		nom: string | null;
	} | null;
};

type DashboardStats = {
	total: number;
	enAttente: number;
	validees: number;
	refusees: number;
	enMagasin: number;
};

type CollaborateurWithRelations = {
	id: number;
	matricule: string;
	nom: string | null;
	prenom: string | null;
	prenomUsuelle: string | null;
	civilite: "HOMME" | "FEMME" | null;
	telephone: string | null;
	mailPro: string | null;
	photo: string | null;
	service: { nomService: string | null } | null;
	fonction: { nomFonction: string | null } | null;
	collaborateurRoles: Array<{
		role: { nomRole: string | null } | null;
	}>;
} | null;

type ContextData = {
	collaborateur: CollaborateurWithRelations;
	stats: DashboardStats;
	pendingDemandes: PendingDemande[];
};

async function getContextData(): Promise<ContextData> {
	try {
		const cookieStore = await cookies();
		const matricule = cookieStore.get("matricule")?.value || "";

		if (!matricule) {
			return {
				collaborateur: null,
				stats: { total: 0, enAttente: 0, validees: 0, refusees: 0, enMagasin: 0 },
				pendingDemandes: [] as PendingDemande[],
			};
		}

		const collaborateur = (await prisma.collaborateur.findUnique({
			where: { matricule },
			include: {
				service: true,
				fonction: true,
				collaborateurRoles: {
					include: {
						role: {
							select: { nomRole: true },
						},
					},
				},
			},
		})) as CollaborateurWithRelations;

		const [totalDemandes, enAttenteCount, valideesCount, refuseesCount, enMagasinCount, pendingDemandes] = await Promise.all([
			prisma.demandeur.count(),
			prisma.demandeur.count({ where: { statut: "EN_ATTENTE" } }),
			prisma.demandeur.count({ where: { statut: "VALIDEE" } }),
			prisma.demandeur.count({ where: { statut: "REFUSEE" } }),
			prisma.demandeur.count({ where: { statut: "EN_MAGASIN" } }),
			prisma.demandeur.findMany({
				where: { statut: "EN_ATTENTE" },
				include: {
					auteur: {
						select: {
							matricule: true,
							prenomUsuelle: true,
							prenom: true,
							nom: true,
						},
					},
				},
				orderBy: { dateDepot: "desc" },
				take: 5,
			}),
		]);

		return {
			collaborateur,
			stats: {
				total: totalDemandes,
				enAttente: enAttenteCount,
				validees: valideesCount,
				refusees: refuseesCount,
				enMagasin: enMagasinCount,
			},
			pendingDemandes,
		};
	} catch (error) {
		console.error("Erreur lors de la récupération du contexte:", error);
		return {
			collaborateur: null,
			stats: { total: 0, enAttente: 0, validees: 0, refusees: 0, enMagasin: 0 },
			pendingDemandes: [] as PendingDemande[],
		};
	}
}

const AdminPage = async () => {
	const { collaborateur, stats, pendingDemandes } = await getContextData();

	const collaboratorUpdateData = collaborateur
		? {
			Matricule: collaborateur.matricule,
			Nom: collaborateur.nom || "",
			Prenom: collaborateur.prenom || "",
			PrenomUsuelle: collaborateur.prenomUsuelle || "",
			Civilite: collaborateur.civilite === "FEMME" ? "Femme" : "Homme",
			Fonction: collaborateur.fonction?.nomFonction || "",
			Service: collaborateur.service?.nomService || "",
			Telephone: collaborateur.telephone || "",
			MailPro: collaborateur.mailPro || "",
			PhotoURL: collaborateur.photo || "",
			Id_collaborateur: collaborateur.id,
			Id: collaborateur.id,
		}
		: null;

	const statCards = [
		{
			label: "Total (Historique)",
			value: stats.total,
			icon: "/cart.png",
			gradient: "from-slate-50 via-white to-slate-100",
			accent: "text-slate-900",
		},
		{
			label: "En attente",
			value: stats.enAttente,
			icon: "/attente.png",
			gradient: "from-amber-50 via-white to-amber-100",
			accent: "text-amber-600",
		},
		{
			label: "Validées",
			value: stats.validees,
			icon: "/valide.png",
			gradient: "from-emerald-50 via-white to-emerald-100",
			accent: "text-emerald-600",
		},
		{
			label: "Refusées",
			value: stats.refusees,
			icon: "/refuse.png",
			gradient: "from-rose-50 via-white to-rose-100",
			accent: "text-rose-600",
		},
		{
			label: "En magasin",
			value: stats.enMagasin,
			icon: "/magasin.png",
			gradient: "from-sky-50 via-white to-sky-100",
			accent: "text-sky-600",
		},
	];

	const formatDate = (dateInput: Date | string | null | undefined) => {
		if (!dateInput) return "-";
		const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
		return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
	};

	const getStatusBadge = (statut: string) => {
		const statusMap: Record<string, { bg: string; text: string }> = {
			EN_ATTENTE: { bg: "bg-yellow-100", text: "text-yellow-700" },
			VALIDEE: { bg: "bg-green-100", text: "text-green-700" },
			REFUSEE: { bg: "bg-red-100", text: "text-red-700" },
			EN_MAGASIN: { bg: "bg-blue-100", text: "text-blue-700" },
		};
		const status = statusMap[statut] || { bg: "bg-gray-100", text: "text-gray-700" };
		return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>{statut.replace("_", " ")}</span>;
	};

	const previewItems = pendingDemandes.slice(0, 2);

	return (
		<div className="flex-1 p-4 lg:p-6 flex gap-6 flex-col xl:flex-row no-scrollbar">
			<div className="w-full xl:w-2/3 flex flex-col gap-6">
				<section className="glass-panel p-8 relative overflow-hidden shadow-2xl border-white/40 ring-1 ring-black/10">
					<div className="absolute -top-10 -right-8 w-40 h-40 bg-white/30 blur-3xl rounded-full" aria-hidden />
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
						<div>
							<p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Tableau de Bord</p>
							<h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Synthèse des demandes</h1>
							<p className="text-sm text-slate-500 mt-2 font-medium">
								Gardez un œil sur l&apos;évolution des validations de votre équipe.
							</p>
						</div>
						{collaborateur && (
							<div className="px-5 py-2 rounded-xl bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-widest text-slate-600 backdrop-blur-sm shadow-sm">
								{collaborateur.service?.nomService || "N/A"} • {collaborateur.fonction?.nomFonction || "Collaborateur"}
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mt-10 relative z-10">
						{statCards.map((card) => (
							<article
								key={card.label}
								className="glass-card relative overflow-hidden p-4 border-white/60 shadow-lg group hover:scale-105 transition-transform duration-300"
							>
								<div className="flex flex-col justify-between h-full gap-4">
									<div>
										<p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 opacity-70">{card.label}</p>
										<p className={`text-2xl font-black mt-1 ${card.accent} tracking-tight`}>{card.value.toLocaleString("fr-FR")}</p>
									</div>
									<div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center border border-white/60 group-hover:shadow-md transition-shadow">
										<Image src={card.icon} alt={card.label} width={24} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="glass-panel p-6 shadow-xl border-white/40">
					<div className="flex items-center justify-between mb-6">
						<div>
							<p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black opacity-60">Demandes à valider</p>
							<h2 className="text-xl font-black text-slate-800 tracking-tight">Vos actions en attente</h2>
						</div>
						<Link href="/list/attente?scope=to-validate" className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all">
							Voir tout →
						</Link>
					</div>
					{pendingDemandes.length === 0 ? (
						<div className="text-sm text-slate-500 py-10 text-center font-medium italic">Aucune demande en attente de validation</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{previewItems.map((item: PendingDemande) => (
								<div
									key={item.id}
									className="glass-card p-4 border-white/60 transition-all duration-300 cursor-default"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-xs font-black text-slate-800 tracking-tight">{item.numero ? `N°${item.numero}` : `ID ${item.id}`}</span>
												<span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.type}</span>
											</div>
											<p className="text-sm font-semibold text-slate-700 mb-3 line-clamp-1">{item.objet || "Sans objet"}</p>
											<div className="flex items-center gap-3 text-[10px] font-medium text-slate-500">
												{item.auteur && (
													<span className="flex items-center gap-1">
														<Image src="/user.png" alt="" width={12} height={12} className="opacity-40" />
														{getPreferredName(item.auteur, item.auteur.matricule || "-")}
													</span>
												)}
												<span className="flex items-center gap-1">
													<Image src="/calendar.png" alt="" width={12} height={12} className="opacity-40" />
													{formatDate(item.dateDepot)}
												</span>
											</div>
										</div>
										<div className="w-8 h-8 rounded-lg bg-slate-100/50 flex items-center justify-center">
											<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</section>
			</div>

			<div className="w-full xl:w-1/3 flex flex-col gap-6">
				<div className="glass-panel p-8 shadow-2xl border-white/40">
					<div className="flex items-start justify-between mb-8">
						<div>
							<p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black opacity-60">Profil</p>
							<h2 className="text-2xl font-black text-slate-800 tracking-tight">Informations</h2>
						</div>
						{collaboratorUpdateData && (
							<FormModal table="Collaborateurs" type="update" data={collaboratorUpdateData} />
						)}
					</div>
					{collaborateur ? (
						<div className="flex flex-col gap-8">
							<div className="flex items-center gap-5">
								<div className="w-24 h-24 rounded-3xl overflow-hidden glass-card p-1 border-white shadow-xl">
									{collaborateur.photo ? (
										<Image src={collaborateur.photo} alt="avatar" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
									) : (
										<div className="w-full h-full bg-slate-100/50 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Avatar</div>
									)}
								</div>
								<div>
									<p className="text-xl font-black text-slate-800 tracking-tight">
										{collaborateur.prenom || ""} {collaborateur.nom || ""}
									</p>
									<p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">Matricule: {collaborateur.matricule}</p>
								</div>
							</div>
							<div className="space-y-3">
								{[
									{ label: "Prénom usuel", value: collaborateur.prenomUsuelle },
									{ label: "Service", value: collaborateur.service?.nomService },
									{ label: "Fonction", value: collaborateur.fonction?.nomFonction },
									{ label: "Téléphone", value: collaborateur.telephone },
									{ label: "Email", value: collaborateur.mailPro, truncate: true },
								].map((item, idx) => (
									<div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/30 border border-white/50 shadow-sm">
										<span className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-70">{item.label}</span>
										<span className={`text-sm font-bold text-slate-800 ${item.truncate ? 'truncate max-w-[150px]' : ''}`}>
											{item.value || "—"}
										</span>
									</div>
								))}
								<div className="flex flex-wrap gap-2 pt-2">
									<p className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-70 w-full mb-1">Rôles assignés</p>
									{collaborateur.collaborateurRoles?.length ? (
										collaborateur.collaborateurRoles.map((item: any, idx: number) => (
											<span key={`${item.role?.nomRole}-${idx}`} className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-700 rounded-lg border border-indigo-500/20 shadow-sm">
												{item.role?.nomRole}
											</span>
										))
									) : (
										<span className="text-xs font-bold text-slate-400 italic">Aucun rôle</span>
									)}
								</div>
							</div>
						</div>
					) : (
						<p className="text-sm text-slate-500 font-medium italic text-center py-10">Aucune information collaborateur disponible.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
