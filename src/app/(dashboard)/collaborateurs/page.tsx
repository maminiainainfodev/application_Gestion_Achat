"use client";

import PersonalInfoPanel from "@/components/PersonalInfoPanel";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type StatCardProps = {
	label: string;
	value: number;
	accent: string;
	gradient: string;
	icon: string;
};

const StatCard = ({ label, value, accent, gradient, icon }: StatCardProps) => (
	<article className="surface-card relative overflow-hidden group cursor-pointer min-w-[220px]">
		<div
			className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100`}
			aria-hidden
		/>
		<div className="absolute inset-px rounded-[1rem] border border-white/60 pointer-events-none" aria-hidden />
		<div className="relative flex items-center gap-4">
			<div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-inner group-hover:shadow-lg transition">
				<Image src={icon} alt={label} width={28} height={28} />
			</div>
			<div>
				<p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
				<p className={`text-3xl font-semibold ${accent}`}>{value.toLocaleString("fr-FR")}</p>
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
	dateDepot: string;
};

const TeacherPage = () => {
	const [stats, setStats] = useState<{ total: number; enAttente: number; validees: number; refusees: number; enMagasin: number } | null>(null);
	const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
	const [loadingPreview, setLoadingPreview] = useState(true);

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
				// Charger les navettes en attente de l'utilisateur
				const res = await fetch("/api/demandeur/attente?scope=mine");
				if (res.ok) {
					const data = await res.json();
					if (data.success && Array.isArray(data.data)) {
						// Prendre les 5 premières
						setPreviewItems(data.data.slice(0, 5));
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

	const statCardData: StatCardProps[] = [
		{
			label: "Total",
			value: stats?.total ?? 0,
			accent: "text-slate-900",
			gradient: "from-slate-100 via-white/60 to-slate-50",
			icon: "/cart.png",
		},
		{
			label: "En attente",
			value: stats?.enAttente ?? 0,
			accent: "text-amber-600",
			gradient: "from-amber-100 via-white/50 to-amber-50",
			icon: "/attente.png",
		},
		{
			label: "Validées",
			value: stats?.validees ?? 0,
			accent: "text-emerald-600",
			gradient: "from-emerald-100 via-white/50 to-emerald-50",
			icon: "/valide.png",
		},
		{
			label: "Refusées",
			value: stats?.refusees ?? 0,
			accent: "text-rose-600",
			gradient: "from-rose-100 via-white/50 to-rose-50",
			icon: "/refuse.png",
		},
		{
			label: "En magasin",
			value: stats?.enMagasin ?? 0,
			accent: "text-indigo-600",
			gradient: "from-indigo-100 via-white/50 to-indigo-50",
			icon: "/magasin.png",
		},
	];

	return (
		<div className="flex-1 p-4 lg:p-6 flex gap-6 flex-col xl:flex-row bg-slate-50/40 min-h-full">
			{/* LEFT: Stats de mes navettes */}
			<div className="w-full xl:w-2/3 flex flex-col gap-6">
				<section className="floating-section">
					<div className="absolute -top-10 -right-8 w-40 h-40 bg-white/30 blur-3xl rounded-full" aria-hidden />
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">Vue d&rsquo;ensemble</p>
							<h1 className="text-2xl lg:text-3xl font-semibold text-slate-900 mt-1">Mes navettes - synthèse</h1>
							<p className="text-sm text-slate-500 mt-1">
								Consultez vos navettes et suivez en temps réel les validations.
							</p>
						</div>
						<Link
							href="/list/historique"
							className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
						>
							Historique complet
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
						{statCardData.map((card) => (
							<StatCard key={card.label} {...card} />
						))}
					</div>
				</section>

				{/* Aperçu des navettes en attente */}
				<section className="surface-panel relative">
					<div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-60 pointer-events-none" aria-hidden />
					<div className="relative flex items-center justify-between mb-6">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-slate-500">Suivi</p>
							<h2 className="text-xl font-semibold text-gray-900">Historique & navettes en attente</h2>
						</div>
						<Link href="/list/attente?scope=mine" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
							Voir tout →
						</Link>
					</div>
					{loadingPreview ? (
						<div className="text-sm text-gray-500 py-6 text-center">Chargement...</div>
					) : previewItems.length === 0 ? (
						<div className="text-sm text-gray-500 py-6 text-center">Aucune navette en attente</div>
					) : (
						<div className="space-y-3">
							{previewItems.map((item) => (
								<Link
									key={item.id}
									href={`/list/historique/${item.id}`}
									className="group block p-4 border border-gray-100 rounded-xl bg-white/70 backdrop-blur-sm hover:-translate-y-0.5 hover:border-indigo-200 transition-all"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex flex-wrap items-center gap-2 mb-2">
												<span className="text-sm font-semibold text-gray-900">{item.numero ? `N°${item.numero}` : `ID ${item.id}`}</span>
												<span className="text-xs text-gray-500">{item.type}</span>
												{getStatusBadge(item.statut)}
											</div>
											<p className="text-sm text-gray-700 mb-1">{item.objet || "Sans objet"}</p>
											<div className="flex items-center gap-4 text-xs text-gray-500">
												<span>{formatDate(item.dateDepot)}</span>
											</div>
										</div>
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="text-indigo-300 group-hover:text-indigo-600 transition"
										>
											<path d="M7 12L11 8L7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
								</Link>
							))}
						</div>
					)}
				</section>
			</div>
			{/* RIGHT: Informations personnelles */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<PersonalInfoPanel />
			</div>
		</div>
	);
};

export default TeacherPage;
