"use client";

import { useAuth } from "./AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LogoutButton from "./LogoutButton";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Accueil",
        href: "/admin",
        visible: ["admin", "collaborateurs", "collabo_valideur", "charge_achats", "directrice"],
      },
      {
        icon: "/collaboration.png",
        label: "Collaborateurs",
        href: "/list/collaborateurs",
        visible: ["admin"],
      },
      {
        icon: "/interview.png",
        label: "Fonction",
        href: "/list/fonction",
        visible: ["admin"],
      },
      {
        icon: "/workplace.png",
        label: "Service",
        href: "/list/service",
        visible: ["admin"],
      },
      {
        icon: "/delivery-box.png",
        label: "Fournisseurs",
        href: "/list/fournisseur",
        visible: ["admin", "charge_achats"],
      },
      {
        icon: "/earning.png",
        label: "Budgets",
        href: "/list/budget",
        visible: ["admin"],
      },
      {
        icon: "/user.png",
        label: "Roles",
        href: "/list/CollaborateurRoles",
        visible: ["admin"],
      },
      {
        icon: "/password.png",
        label: "Mot de passe",
        href: "/list/motdepasse",
        visible: ["admin"],
      },
      {
        icon: "/assignment.png",
        label: "Bon de commande",
        href: "/list/bon-de-commande",
        visible: ["charge_achats"],
      },
      {
        icon: "/approval.png",
        label: "Autorisation de paiement",
        href: "/list/autorisation-paiement",
        visible: ["charge_achats", "directrice"],
      },
      {
        icon: "/file.png",
        label: "Historiques",
        href: "/list/historique",
        visible: ["admin", "collaborateurs", "collabo_valideur", "charge_achats", "directrice"],
      },
      {
        icon: "/attente.png",
        label: "En attente",
        href: "/list/attente",
        visible: ["admin", "collaborateurs", "directrice"],
      },
      {
        icon: "/demande.png",
        label: "Mes navettes en attente",
        href: "/list/attente?scope=mine",
        visible: ["collabo_valideur", "charge_achats", "directrice"],
      },
      {
        icon: "/attente.png",
        label: "À valider",
        href: "/list/attente?scope=to-validate",
        visible: ["collabo_valideur", "charge_achats", "directrice"],
      },
      {
        icon: "/cart.png",
        label: "Demande",
        href: "/list/demande",
        visible: ["admin", "collaborateurs", "collabo_valideur", "charge_achats", "directrice"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "collaborateurs", "collabo_valideur", "charge_achats", "directrice"],
      },
    ],
  },
];

const Menu = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Mapper le rôle de la base de données au format utilisé dans le menu
  const getRoleKey = (u: typeof user): string => {
    if (!u) return "";
    // Priorité à la fonction explicite si le role ne matche pas directement "Chargé des Achats" par le string exact
    if (u.role === "Administrateur") return "admin";
    if (u.role === "Demandeur") return "collaborateurs";
    if (u.role === "Chargé des Achats" || u.fonction === "Chargé des Achats") return "charge_achats";
    if (u.role === "Directrice") return "directrice";
    return "collabo_valideur";
  };

  const currentRole = getRoleKey(user);

  // Fonction pour vérifier si un lien est actif
  const isActive = (href: string): boolean => {
    // Si l'élément de menu a des paramètres de requête spécifiques (ex: ?scope=mine)
    if (href.includes("?")) {
      const [path, query] = href.split("?");
      const targetParams = new URLSearchParams(query);
      const targetScope = targetParams.get("scope");
      const currentScope = searchParams.get("scope");

      // Vérifier si le chemin correspond ET si le scope correspond (exactement ou avec la variante to_validate)
      if (pathname === path) {
        if (targetScope) {
          if (targetScope === "to-validate" && (currentScope === "to-validate" || currentScope === "to_validate")) return true;
          return currentScope === targetScope;
        }
        return searchParams.toString() === query;
      }
      return false;
    }

    // Pour les liens génériques (sans query params, ex: /list/attente)
    // Si la page actuelle a un paramètre 'scope' (qui définit un autre élément de menu),
    // alors ce lien générique NE DOIT PAS être actif, sauf si l'URL exacte matche sans scope.
    if (pathname === href) {
      const currentScope = searchParams.get("scope");
      // Si on est sur /list/attente mais avec ?scope=mine, l'élément générique (/list/attente) ne doit pas être actif
      if (currentScope && (currentScope === "mine" || currentScope === "to-validate" || currentScope === "to_validate")) {
        return false;
      }
      return true;
    }

    // Vérification simple pour les autres liens et sous-chemins
    if (href === "/admin" && (pathname === "/admin" || pathname === "/collaborateurs" || pathname === "/collabo_valideur")) {
      return true;
    }

    // Si href est un parent du path actuel (ex: /list/fournisseur vs /list/fournisseur/123)
    return pathname.startsWith(href + "/");
  };

  if (isLoading) {
    return (
      <div className="mt-4 text-sm text-center text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col justify-start gap-8 px-1 lg:px-2 overflow-y-auto no-scrollbar mt-6">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-3" key={i.title}>
          {i.title !== "OTHER" && (
            <span className="hidden lg:block text-white/25 font-bold text-[11px] uppercase tracking-[0.2em] px-4">
              {i.title}
            </span>
          )}
          <div className="flex flex-col gap-1.5 w-full">
            {i.items.map((item) => {
              if (item.visible.includes(currentRole)) {
                if (item.label === "Logout") {
                  return (
                    <div key={item.label} className="mt-4 pt-6 border-t border-white/10 w-full">
                      <LogoutButton />
                    </div>
                  );
                }
                const active = isActive(item.href);
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    prefetch={true}
                    className={`flex items-center justify-center lg:justify-start gap-4 py-3 px-3 lg:px-5 rounded-full transition-all duration-300 group w-full ${active
                      ? "bg-white text-[#584446] font-bold shadow-xl transform scale-[1.02]"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <div className={`transition-all duration-300 flex-shrink-0 flex items-center justify-center ${active ? "scale-110" : "group-hover:scale-110"}`}>
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        style={{ filter: active ? 'none' : 'brightness(0) invert(1) opacity(0.8)' }}
                      />
                    </div>
                    <span className="hidden lg:block text-[14px] truncate">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
