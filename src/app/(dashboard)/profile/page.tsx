"use client";

import { useAuth } from "@/components/AuthProvider";
import FormModal from "@/components/FormModal";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type FullCollab = {
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

const ProfilePage = () => {
	const { user } = useAuth();
	const [full, setFull] = useState<FullCollab | null>(null);

	useEffect(() => {
		const load = async () => {
			if (!user?.matricule) return;
			const res = await fetch(`/api/collaborateurs/${user.matricule}`);
			if (res.ok) setFull(await res.json());
		};
		load();
	}, [user?.matricule]);

	const collaboratorUpdateData = useMemo(() => {
		if (!full) return null as any;
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
			Id_collaborateur: 0,
		};
	}, [full]);

	return (
		<div className="flex-1 p-4 flex justify-center items-start">
			<div className="w-full max-w-5xl bg-white p-6 rounded-2xl border border-gray-200">
				<div className="flex items-start gap-6">
					<div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
						{full?.photo ? (
							<img src={full.photo} alt="avatar" className="w-full h-full object-cover" />
						) : (
							<span>Your pic</span>
						)}
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-lg md:text-xl font-bold text-gray-900">Nom : {full?.nom?.toUpperCase() || ""}</p>
								<p className="text-lg md:text-xl font-bold text-gray-900 mt-1">Prenom : {full?.prenom || ""}</p>
							</div>
							{collaboratorUpdateData && (
								<div className="shrink-0">
									<FormModal table="Collaborateurs" type="update" data={collaboratorUpdateData} />
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-sm md:text-base">
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-700">Matricule :</span>
								<span className="font-medium text-gray-900">{full?.matricule || ""}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-700">email :</span>
								<span className="font-medium text-gray-900">{full?.mailPro || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-700">Contact :</span>
								<span className="font-medium text-gray-900">{full?.telephone || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4">
								<span className="text-gray-700">Code Nom :</span>
								<span className="font-medium text-gray-900">{full?.service?.abreviation || "-"}</span>
							</div>
							<div className="flex items-center justify-between md:justify-start md:gap-4 md:col-span-2">
								<span className="text-gray-700">Genre :</span>
								<span className="font-medium text-gray-900">{full?.civilite === "FEMME" ? "Femme" : "Homme"}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
