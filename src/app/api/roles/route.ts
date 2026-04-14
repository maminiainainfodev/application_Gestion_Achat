import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const roles = await prisma.roles.findMany({
      select: {
        id: true,
        nomRole: true,
      },
      orderBy: {
        nomRole: 'asc',
      },
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des rôles" },
      { status: 500 }
    );
  }
}

