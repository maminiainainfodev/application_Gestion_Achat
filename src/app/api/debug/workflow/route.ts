
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const steps = await prisma.workflowEtapes.findMany({
        orderBy: { etape: 'asc' }
    });
    return NextResponse.json(steps);
}
