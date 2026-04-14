import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const matricule = cookieStore.get("matricule")?.value;
		if (!matricule) {
			return NextResponse.json({ success: false, message: "Non authentifié" }, { status: 401 });
		}

		const [total, enAttente, validees, refusees, enMagasin] = await Promise.all([
			prisma.demandeur.count({ where: { auteurMatricule: matricule } }),
			prisma.demandeur.count({ where: { auteurMatricule: matricule, statut: "EN_ATTENTE" } }),
			prisma.demandeur.count({ where: { auteurMatricule: matricule, statut: "VALIDEE" } }),
			prisma.demandeur.count({ where: { auteurMatricule: matricule, statut: "REFUSEE" } }),
			prisma.demandeur.count({ where: { auteurMatricule: matricule, statut: "EN_MAGASIN" } }),
		]);

		return NextResponse.json({
			success: true,
			data: { total, enAttente, validees, refusees, enMagasin },
		});
	} catch (error: any) {
		console.error("Erreur stats:", error);
		return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 });
	}
}
