"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type UserInfo = {
  matricule: string;
  nom: string | null;
  prenom: string | null;
  prenomUsuelle?: string | null;
  photo: string | null;
  fonction: string;
  fonctionAbbrev?: string | null;
  service?: string | null;
  serviceAbbrev?: string | null;
  telephone?: string | null;
  mailPro?: string | null;
  role: string;
  authenticated: boolean;
};

type AuthContextType = {
  user: UserInfo | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth");

      if (response.status === 401) {
        setUser(null);
        setIsLoading(false);
        // Avoid redirection loop if already on login page
        if (window.location.pathname !== "/") {
          router.push("/");
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.authenticated) {
        setUser({
          matricule: data.matricule,
          nom: data.nom,
          prenom: data.prenom,
          prenomUsuelle: data.prenomUsuelle,
          photo: data.photo || null,
          fonction: data.fonction,
          fonctionAbbrev: data.fonctionAbbrev,
          service: data.service,
          serviceAbbrev: data.serviceAbbrev,
          telephone: data.telephone,
          mailPro: data.mailPro,
          role: data.role,
          authenticated: true,
        });
      } else {
        setUser(null);
        if (window.location.pathname !== "/") {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      // On transient errors (e.g. 500), we don't clear the user or redirect
      // to avoid annoying refreshes/kicks. We just log it.
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

