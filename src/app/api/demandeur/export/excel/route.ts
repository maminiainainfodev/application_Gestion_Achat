import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { generateExcelList } from "@/lib/excel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const matricule = cookieStore.get("matricule")?.value;
        const role = cookieStore.get("role")?.value;

        if (!matricule || !role) {
            return NextResponse.json(
                { success: false, message: "Non authentifié" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const ids: number[] = Array.isArray(body?.ids) ? body.ids : [];

        if (!ids.length) {
            return NextResponse.json(
                { success: false, message: "Aucun ID fourni" },
                { status: 400 }
            );
        }

        const demandes = await prisma.demandeur.findMany({
            where: { id: { in: ids } },
            include: {
                auteur: {
                    select: {
                        nom: true,
                        prenom: true,
                    },
                },
                fournisseur: {
                    select: {
                        nom: true,
                    }
                },
                budget: {
                    select: {
                        codeBudgetaire: true,
                    },
                },
            },
            orderBy: { dateDepot: "desc" },
        });

        if (!demandes.length) {
            return NextResponse.json(
                { success: false, message: "Aucune demande trouvée" },
                { status: 404 }
            );
        }

        const excelBuffer = generateExcelList(demandes as any);

        return new NextResponse(new Uint8Array(excelBuffer) as any, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="export_excel_${new Date().toISOString().split('T')[0]}.xlsx"`,
            },
        });
    } catch (error: any) {
        console.error("Erreur génération Excel:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Erreur lors de la génération du fichier Excel",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
