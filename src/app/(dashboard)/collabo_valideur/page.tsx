"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import FormModal from "@/components/FormModal";
import { getPreferredName } from "@/lib/nameFormatter";

const StatCard = ({
	icon,
	label,
	value,
	gradient,
	accent,
}: {
	icon: string;
	label: string;
	value: number;
	gradient: string;
	accent: string;
}) => (
	<article className="glass-card relative overflow-hidden p-4 border-white/60 shadow-lg group hover:scale-105 transition-transform duration-300">
		<div className="flex flex-col justify-between h-full gap-4 relative z-10">
			<div>
				<p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 opacity-70">{label}</p>
				<p className={`text-2xl font-black mt-1 ${accent} tracking-tight`}>{value.toLocaleString("fr-FR")}</p>
			</div>
			<div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center border border-white/60 group-hover:shadow-md transition-shadow">
				<Image src={icon} alt="" width={24} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
			</div>
		</div>
	</article>
);

type PreviewItem = {
	id: number;
	numero: number | null;
	type: string;
	objet: string | null;
	statut: string;
	dateDepot: string | null;
	auteur?: {
		matricule: string | null;
		nom: string | null;
		prenom: string | null;
		prenomUsuelle: string | null;
	} | null;
};

type ProfileInfo = {
	matricule: string;
	nom: string | null;
	prenom: string | null;
	prenomUsuelle: string | null;
	service?: { nomService: string | null } | null;
	fonction?: { nomFonction: string | null } | null;
	photo: string | null;
	civilite: "HOMME" | "FEMME" | null;
	telephone: string | null;
	mailPro: string | null;
};

const ParentPage = () => {
	const { user } = useAuth();
	const [stats, setStats] = useState<{ total: number; enAttente: number; validees: number; refusees: number; enMagasin: number } | null>(null);
	const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
	const [loadingPreview, setLoadingPreview] = useState(true);
	const [showAll, setShowAll] = useState(false);
	const [profile, setProfile] = useState<ProfileInfo | null>(null);
	const [loadingProfile, setLoadingProfile] = useState(false);

	useEffect(() => {
		const load = async () => {
			const res = await fetch("/api/demandes/stats/me");
			if (res.ok) {
				const json = await res.json();
				if (json.success) setStats(json.data);
			}
		};
		load();
	}, []);

	useEffect(() => {
		const loadPreview = async () => {
			try {
				setLoadingPreview(true);
				const res = await fetch("/api/demandeur/attente?scope=to-validate");
				if (res.ok) {
					const data = await res.json();
					if (data.success && Array.isArray(data.data)) {
						const sorted = [...data.data].sort((a: PreviewItem, b: PreviewItem) => {
							const timeA = a.dateDepot ? new Date(a.dateDepot).getTime() : 0;
							const timeB = b.dateDepot ? new Date(b.dateDepot).getTime() : 0;
							return timeB - timeA;
						});
						setPreviewItems(sorted);
						setShowAll(false);
					}
				}
			} catch (error) {
				console.error("Erreur chargement aperçu:", error);
			} finally {
				setLoadingPreview(false);
			}
		};
		loadPreview();
	}, []);

	useEffect(() => {
		const loadProfile = async () => {
			if (!user?.matricule) return;
			try {
				setLoadingProfile(true);
				const res = await fetch(`/api/collaborateurs/${user.matricule}`);
				if (res.ok) {
					const json = await res.json();
					setProfile(json ?? null);
				}
			} catch (error) {
				console.error("Erreur chargement profil:", error);
			} finally {
				setLoadingProfile(false);
			}
		};
		loadProfile();
	}, [user?.matricule]);

	const collaboratorUpdateData = useMemo(() => {
		if (!profile) return null;
		return {
			Matricule: profile.matricule,
			Nom: profile.nom || "",
			Prenom: profile.prenom || "",
			PrenomUsuelle: profile.prenomUsuelle || "",
			Civilite: profile.civilite === "FEMME" ? "Femme" : "Homme",
			Fonction: profile.fonction?.nomFonction || "",
			Service: profile.service?.nomService || "",
			Telephone: profile.telephone || "",
			MailPro: profile.mailPro || "",
			PhotoURL: profile.photo || "",
			Id_collaborateur: 0,
		};
	}, [profile]);

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
	};

	const getStatusBadge = (statut: string) => {
		const statusMap: Record<string, { bg: string; text: string }> = {
			EN_ATTENTE: { bg: "bg-yellow-100", text: "text-yellow-700" },
			VALIDEE: { bg: "bg-green-100", text: "text-green-700" },
			REFUSEE: { bg: "bg-red-100", text: "text-red-700" },
			EN_MAGASIN: { bg: "bg-blue-100", text: "text-blue-700" },
		};
		const status = statusMap[statut] || { bg: "bg-gray-100", text: "text-gray-700" };
		return (
			<span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
				{statut.replace("_", " ")}
			</span>
		);
	};

	const statCards = [
		{
			label: "Total (Historique)",
			value: stats?.total ?? 0,
			icon: "/cart.png",
			gradient: "from-slate-50 via-white to-slate-100",
			accent: "text-slate-900",
		},
		{
			label: "En attente",
			value: stats?.enAttente ?? 0,
			icon: "/attente.png",
			gradient: "from-amber-50 via-white to-amber-100",
			accent: "text-amber-600",
		},
		{
			label: "Validées",
			value: stats?.validees ?? 0,
			icon: "/valide.png",
			gradient: "from-emerald-50 via-white to-emerald-100",
			accent: "text-emerald-600",
		},
		{
			label: "Refusées",
			value: stats?.refusees ?? 0,
			icon: "/refuse.png",
			gradient: "from-rose-50 via-white to-rose-100",
			accent: "text-rose-600",
		},
		{
			label: "En magasin",
			value: stats?.enMagasin ?? 0,
			icon: "/cart.png",
			gradient: "from-sky-50 via-white to-sky-100",
			accent: "text-sky-600",
		},
	];

	const displayedItems = showAll ? previewItems : previewItems.slice(0, 2);
	const canTogglePreview = previewItems.length > 2;

	return (
		<div className="flex-1 p-4 lg:p-6 flex gap-6 flex-col xl:flex-row no-scrollbar">
			{/* LEFT: Stats & demandes */}
			<div className="w-full xl:w-2/3 flex flex-col gap-6">
				<div className="glass-panel p-8 relative overflow-hidden shadow-2xl border-white/40 ring-1 ring-black/10">
					<div className="absolute -top-10 -right-8 w-40 h-40 bg-white/30 blur-3xl rounded-full" aria-hidden />
					<div className="relative z-10">
						<p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black opacity-60">Mes navettes</p>
						<h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Synthèse des demandes</h1>
						<p className="text-sm text-slate-500 mt-2 font-medium">Gardez un œil sur l&apos;évolution de vos validations.</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mt-10 relative z-10">
						{statCards.map((card) => (
							<StatCard key={card.label} {...card} />
						))}
					</div>
				</div>

				{/* Aperçu des validations */}
				<div className="glass-panel p-6 shadow-xl border-white/40">
					<div className="flex items-center justify-between mb-6">
						<div>
							<p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black opacity-60">Demandes à valider</p>
							<h2 className="text-xl font-black text-slate-800 tracking-tight">À Valider</h2>
						</div>
						{canTogglePreview && (
							<button
								type="button"
								onClick={() => setShowAll((prev) => !prev)}
								className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"
							>
								{showAll ? "Réduire" : "Voir tout →"}
							</button>
						)}
					</div>
					{loadingPreview ? (
						<div className="py-10 flex flex-col items-center gap-3">
							<div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
							<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chargement...</span>
						</div>
					) : previewItems.length === 0 ? (
						<div className="text-sm text-slate-500 py-10 text-center font-medium italic opacity-60">
							Aucune demande en attente de validation
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{displayedItems.map((item) => (
								<div
									key={item.id}
									className="glass-card p-4 border-white/60 transition-all duration-300 cursor-default"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
													{item.type}
												</span>
												<span className="text-xs font-black text-slate-800 tracking-tight">#{item.numero}</span>
												{getStatusBadge(item.statut)}
											</div>
											<h3 className="text-sm font-semibold text-slate-700 line-clamp-1">{item.objet || "Sans objet"}</h3>
											<div className="flex items-center gap-3 text-[10px] font-medium text-slate-500">
												<div className="flex items-center gap-1">
													<Image src="/user.png" alt="" width={12} height={12} className="opacity-40" />
													<span>{item.auteur && getPreferredName(item.auteur, item.auteur.matricule || "-")}</span>
												</div>
												{item.dateDepot && (
													<span className="flex items-center gap-1">
														<Image src="/calendar.png" alt="" width={12} height={12} className="opacity-40" />
														{formatDate(item.dateDepot)}
													</span>
												)}
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
				</div>
			</div>
			{/* RIGHT: Profil */}
			<div className="w-full xl:w-1/3 flex flex-col gap-6">
				<div className="glass-panel p-8 shadow-2xl border-white/40">
					<div className="flex items-start justify-between mb-8">
						<div>
							<p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black opacity-60">Profil</p>
							<h2 className="text-2xl font-black text-slate-800 tracking-tight">Mon Profil</h2>
						</div>
						{collaboratorUpdateData && (
							<FormModal table="Collaborateurs" type="update" data={collaboratorUpdateData} />
						)}
					</div>

					{loadingProfile ? (
						<div className="py-10 flex flex-col items-center gap-3">
							<div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
							<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chargement...</span>
						</div>
					) : !profile ? (
						<div className="text-sm text-slate-500 py-10 text-center font-medium italic">Aucune information profil disponible.</div>
					) : (
						<div className="flex flex-col gap-8">
							<div className="flex items-center gap-5">
								<div className="w-24 h-24 rounded-3xl overflow-hidden glass-card p-1 border-white shadow-xl">
									{profile.photo ? (
										<Image src={profile.photo} alt="avatar" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
									) : (
										<div className="w-full h-full bg-slate-100/50 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Avatar</div>
									)}
								</div>
								<div>
									<h3 className="text-lg font-black text-slate-800 tracking-tight">{profile.prenom || ""} {profile.nom || ""}</h3>
									<p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">{profile.matricule}</p>
									<div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 shadow-sm">
										<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
										<span className="text-[9px] font-black text-blue-700 uppercase tracking-widest">En ligne</span>
									</div>
								</div>
							</div>
							<div className="space-y-3">
								{[
									{ label: "Prénom usuel", value: profile.prenomUsuelle },
									{ label: "Service", value: profile.service?.nomService },
									{ label: "Fonction", value: profile.fonction?.nomFonction },
									{ label: "Téléphone", value: profile.telephone },
									{ label: "Email", value: profile.mailPro, truncate: true },
								].map((item, idx) => (
									<div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/30 border border-white/50 shadow-sm">
										<span className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-70">{item.label}</span>
										<span className={`text-sm font-bold text-slate-800 ${item.truncate ? 'truncate max-w-[150px]' : ''}`}>
											{item.value || "—"}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ParentPage;
