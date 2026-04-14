"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      router.push("/");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center justify-center lg:justify-start gap-4 text-white/60 py-3 px-3 lg:px-5 rounded-full hover:bg-white/10 hover:text-red-400 transition-all duration-300 w-full group"
      >
        <div className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
          <Image
            src="/logout.png"
            alt="logout"
            width={20}
            height={20}
            style={{ filter: 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }}
          />
        </div>
        <span className="hidden lg:block text-[14px]">Déconnexion</span>
      </button>

      {mounted && showConfirm && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn" style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-scaleIn border border-slate-200 relative">
            <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Confirmer la déconnexion</h2>
            <p className="text-slate-600 mb-8 font-medium">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-bold text-sm hover:scale-105 active:scale-95"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold text-sm shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LogoutButton;

