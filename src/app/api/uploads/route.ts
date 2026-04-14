import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { existsSync } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Increase max body size for App Router (though request.formData() is standard)
export const maxDuration = 60; // Increase to 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = path.extname(file.name) || "";
    const safeName = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeName);

    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${safeName}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          url: relativeUrl,
          name: file.name,
          type: file.type,
          size: file.size,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur upload fichier:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Impossible d'uploader le fichier",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

