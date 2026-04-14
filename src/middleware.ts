import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Routes publiques (pas de protection)
  const publicRoutes = ["/", "/api/login"];
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // Vérifier les cookies d'authentification
  const matricule = request.cookies.get("matricule")?.value;
  const role = request.cookies.get("role")?.value;

  // Si pas authentifié, rediriger vers la page de login
  if (!matricule || !role) {
    // Ne pas rediriger les routes API publiques
    if (
      pathname.startsWith("/api/login") || 
      pathname.startsWith("/api/logout") ||
      pathname === "/api/auth"
    ) {
      return NextResponse.next();
    }
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protection des routes selon les rôles
  if (pathname.startsWith("/admin")) {
    if (role !== "Administrateur") {
      // Rediriger selon le rôle
      if (role === "Demandeur") {
        return NextResponse.redirect(new URL("/collaborateurs", request.url));
      } else {
        return NextResponse.redirect(new URL("/collabo_valideur", request.url));
      }
    }
  }

  if (pathname.startsWith("/collabo_valideur")) {
    if (role === "Administrateur" || role === "Demandeur") {
      // Rediriger selon le rôle
      if (role === "Administrateur") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/collaborateurs", request.url));
      }
    }
  }

  if (pathname.startsWith("/collaborateurs")) {
    if (role !== "Demandeur") {
      // Rediriger selon le rôle
      if (role === "Administrateur") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/collabo_valideur", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/collabo_valideur/:path*",
    "/collaborateurs/:path*",
    "/list/:path*",
    "/api/:path*",
  ],
};

