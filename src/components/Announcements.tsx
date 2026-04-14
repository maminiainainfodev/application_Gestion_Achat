"use client";

import { useAuth } from "./AuthProvider";
import { useEffect, useMemo, useState } from "react";

type BudgetItem = {
	id: number;
	codeBudgetaire: string;
	montantDisponible: string | number;
	service?: { id: number; nomService: string; abreviation: string | null } | null;
};

const Announcements = () => {
	const { user } = useAuth();
	const [budgets, setBudgets] = useState<BudgetItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBudgets = async () => {
			try {
				const res = await fetch("/api/budget");
				if (res.ok) {
					const data = await res.json();
					setBudgets(data || []);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchBudgets();
	}, []);

	const budgetsOfService = useMemo(() => {
		if (!user?.fonction && !user) return [] as BudgetItem[];
		return budgets.filter((b) => b.service?.nomService === (user as any)?.service || b.service?.abreviation === (user as any)?.service);
	}, [budgets, user]);

	return (
		<section className="surface-panel">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-gray-900">Budgets du service</h1>
				<span className="text-xs text-gray-400">{user?.service || ""}</span>
			</div>
			<div className="flex flex-col gap-4 mt-4">
				{loading ? (
					<div className="text-sm text-gray-400 py-4 text-center">Chargement...</div>
				) : budgetsOfService.length === 0 ? (
					<div className="rounded-xl p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100">
						<h2 className="font-medium text-gray-900">Aucun budget trouvé</h2>
						<p className="text-sm text-gray-500 mt-1">Aucun budget associé à votre service.</p>
					</div>
				) : (
					budgetsOfService.map((b, idx) => (
						<div
							key={b.id}
							className={`rounded-xl p-4 border border-white/60 shadow-inner ${
								idx % 3 === 0 ? "bg-lamaSkyLight" : idx % 3 === 1 ? "bg-lamaPurpleLight" : "bg-lamaYellowLight"
							}`}
						>
							<div className="flex items-center justify-between">
								<h2 className="font-medium text-gray-900">{b.codeBudgetaire}</h2>
								<span className="text-xs text-gray-600 bg-white rounded-md px-2 py-1">
									{b.service?.abreviation || b.service?.nomService}
								</span>
							</div>
							<p className="text-sm text-gray-700 mt-1 font-semibold">
								{Number(b.montantDisponible).toLocaleString("fr-FR")} Ar
							</p>
						</div>
					))
				)}
			</div>
		</section>
	);
};

export default Announcements;
