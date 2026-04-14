"use client";

import { useAuth } from "./AuthProvider";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import FormModal from "./FormModal";

type FullCollab = {
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
	service?: { nomService: string; abreviation: string | null } | null;
};

type ProfileModalProps = {
	open: boolean;
	onClose: () => void;
};

const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
	const { user } = useAuth();
	const [full, setFull] = useState<FullCollab | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const load = async () => {
			if (!open || !user?.matricule) return;
			setLoading(true);
			try {
				const res = await fetch(`/api/collaborateurs/${user.matricule}`);
				if (res.ok) {
					setFull(await res.json());
				}
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [open, user?.matricule]);

	const collaboratorUpdateData = useMemo(() => {
		if (!full) return null;
		return {
			Matricule: full.matricule,
			Nom: full.nom || "",
			Prenom: full.prenom || "",
			PrenomUsuelle: full.prenomUsuelle || "",
			Civilite: full.civilite === "FEMME" ? "Femme" : "Homme",
			Fonction: full.fonction?.nomFonction || "",
			Service: full.service?.nomService || "",
			Telephone: full.telephone || "",
			MailPro: full.mailPro || "",
			PhotoURL: full.photo || "",
			Id_collaborateur: full.id,
			Id: full.id,
		};
	}, [full]);

	if (!open) return null;

	return (
		<div className="w-screen h-screen fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
			<div className="bg-white p-6 rounded-[20px] border border-gray-200 relative w-full max-w-3xl animate-scaleIn">
				<button className="absolute top-4 right-4" onClick={onClose}>
					<Image src="/close.png" alt="Fermer" width={18} height={18} />
				</button>

				<div className="flex flex-col md:flex-row md:items-start gap-6">
					<div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 text-sm mx-auto md:mx-0">
						{full?.photo ? (
							<img src={full.photo} alt="avatar" className="w-full h-full object-cover" />
						) : (
							<Image src="/avatar.png" alt="Avatar" width={64} height={64} />
						)}
					</div>
					<div className="flex-1 w-full">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<p className="text-2xl font-bold text-gray-900">{full?.prenom || ""} {full?.nom?.toUpperCase() || ""}</p>
								<p className="text-sm text-gray-500 mt-1">{full?.fonction?.nomFonction} • {full?.service?.nomService}</p>
							</div>
							{collaboratorUpdateData && (
								<FormModal table="Collaborateurs" type="update" data={collaboratorUpdateData} />
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-sm md:text-base">
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-600">Matricule</span>
								<span className="font-semibold text-gray-900">{full?.matricule || ""}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-600">Email</span>
								<span className="font-semibold text-gray-900 break-all">{full?.mailPro || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-600">Téléphone</span>
								<span className="font-semibold text-gray-900">{full?.telephone || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-600">Code Nom</span>
								<span className="font-semibold text-gray-900">{full?.service?.abreviation || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4 md:col-span-2">
								<span className="text-gray-600">Genre</span>
								<span className="font-semibold text-gray-900">{full?.civilite === "FEMME" ? "Femme" : "Homme"}</span>
							</div>
						</div>
						{loading && (
							<p className="text-xs text-gray-400 mt-4">Chargement...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileModal;
