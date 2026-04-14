import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("matricule");
    cookieStore.delete("role");

    return NextResponse.json(
      { success: true, message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}

