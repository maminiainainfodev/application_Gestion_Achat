"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import FormModal from "./FormModal";

const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

type FullCollaborator = {
	id: number;
	matricule: string;
	nom: string | null;
	prenom: string | null;
	prenomUsuelle: string | null;
	civilite: "HOMME" | "FEMME" | null;
	telephone: string | null;
	mailPro: string | null;
	photo: string | null;
	fonction?: { nomFonction: string } | null;
	service?: { nomService: string } | null;
};

const PersonalInfoPanel = () => {
	const { user, isLoading } = useAuth();
	const [fullCollaborator, setFullCollaborator] = useState<FullCollaborator | null>(null);
	const [loadingUpdateData, setLoadingUpdateData] = useState(false);

	useEffect(() => {
		const loadFull = async () => {
			if (!user?.matricule) return;
			try {
				setLoadingUpdateData(true);
				const res = await fetch(`/api/collaborateurs/${user.matricule}`);
				if (res.ok) {
					const data = await res.json();
					setFullCollaborator(data);
				}
			} catch (error) {
				console.error("Erreur chargement profil collaborateur:", error);
			} finally {
				setLoadingUpdateData(false);
			}
		};
		loadFull();
	}, [user?.matricule]);

	const collaboratorUpdateData = useMemo(() => {
		if (!fullCollaborator) return null;
		return {
			Matricule: fullCollaborator.matricule,
			Nom: fullCollaborator.nom || "",
			Prenom: fullCollaborator.prenom || "",
			PrenomUsuelle: fullCollaborator.prenomUsuelle || "",
			Civilite: fullCollaborator.civilite === "FEMME" ? "Femme" : "Homme",
			Fonction: fullCollaborator.fonction?.nomFonction || "",
			Service: fullCollaborator.service?.nomService || "",
			Telephone: fullCollaborator.telephone || "",
			MailPro: fullCollaborator.mailPro || "",
			PhotoURL: fullCollaborator.photo || "",
			Id_collaborateur: fullCollaborator.id,
			Id: fullCollaborator.id,
		};
	}, [fullCollaborator]);

	const infoItems = user
		? [
			{ label: "Matricule", value: user.matricule || "—", icon: "/user.png" },
			{ label: "Fonction", value: user.fonction || "—", icon: "/lesson.png" },
			{ label: "Service", value: user.service || "—", icon: "/singleBranch.png" },
			{ label: "Téléphone", value: user.telephone || "—", icon: "/phone.png" },
			{ label: "Email pro", value: user.mailPro || "—", icon: "/mail.png" },
			{ label: "Rôle", value: user.role || "—", icon: "/profile.png" },
		]
		: [];

	return (
		<section className="surface-panel relative overflow-hidden min-h-[360px]">
			<div className="absolute -top-16 -right-10 w-56 h-56 bg-indigo-100 blur-3xl rounded-full opacity-60" aria-hidden />
			<div className="absolute inset-px rounded-[1.25rem] border border-white/50 pointer-events-none" aria-hidden />
			<div className="relative">
				<header className="flex items-center justify-between mb-6">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profil</p>
						<h2 className="text-xl font-semibold text-slate-900">Informations personnelles</h2>
					</div>
					<div className="flex items-center gap-2">
						{collaboratorUpdateData && !loadingUpdateData && (
							<FormModal table="Collaborateurs" type="update" data={collaboratorUpdateData} />
						)}
					</div>
				</header>

				{isLoading ? (
					<div className={`relative rounded-2xl bg-slate-100 h-40 ${shimmer}`} />
				) : !user ? (
					<div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
						Impossible de charger les informations du collaborateur.
					</div>
				) : (
					<div className="relative flex flex-col gap-6">
						<div className="flex items-center gap-4">
							<div className="w-16 h-16 rounded-2xl overflow-hidden border border-white shadow-inner bg-white">
								<Image
									src={user.photo || "/avatar.png"}
									alt="Photo de profil"
									width={64}
									height={64}
									className="w-full h-full object-cover"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = "/avatar.png";
									}}
								/>
							</div>
							<div>
								<p className="text-lg font-semibold text-slate-900">{`${user.prenom ?? ""} ${user.nom ?? ""}`.trim() || "Utilisateur"}</p>
								<p className="text-sm text-slate-500">{user.role}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{infoItems.map((item) => (
								<div key={item.label} className="border border-slate-100 rounded-xl p-3 bg-white/70 backdrop-blur-sm flex gap-3 items-start">
									<Image src={item.icon} alt="" width={20} height={20} className="mt-0.5" />
									<div>
										<p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
										<p className="text-sm font-semibold text-slate-900 break-words">{item.value || "—"}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default PersonalInfoPanel;

