import { NextResponse } from "next/server";

/**
 * Ce handler intercepte les requêtes vers /uploads/* qui ne correspondent 
 * à aucun fichier physique dans le dossier public/uploads.
 * Cela évite que Next.js n'essaie de compiler une page dynamique pour une image manquante,
 * ce qui cause des lenteurs et des rafraîchissements d'interface.
 */
export async function GET() {
    return new NextResponse(null, {
        status: 404,
        statusText: "File Not Found (Uploads Interceptor)"
    });
}
