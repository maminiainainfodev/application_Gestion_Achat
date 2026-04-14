"use client";

import Image from "next/image";
import { useAuth } from "./AuthProvider";
import NotificationsBell from "./NotificationsBell";

const Navbar = () => {
  const { user, isLoading } = useAuth();

  const displayName = user
    ? `${user.prenom || ""} ${user.nom || ""}`.trim() || "Utilisateur"
    : "Chargement...";

  const displayFonction = user?.fonction || "Chargement...";

  return (
    <div className='sticky top-0 z-50 p-4 pb-2 backdrop-blur-sm shadow-lg'>
      <div className='glass-panel flex items-center justify-between p-4 px-8 shadow-none border-none ring-0 rounded-3xl'>
        <div className='flex items-center gap-6 justify-end w-full'>
          <NotificationsBell />
          <div className='flex flex-col text-right'>
            <span className="text-xs leading-3 font-bold text-slate-800">{displayName}</span>
            <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
              {displayFonction}
            </span>
          </div>
          <div className="rounded-full border-2 border-white/80 shadow-lg overflow-hidden w-11 h-11 ring-1 ring-black/5 flex-shrink-0">
            <Image
              src={user?.photo || "/avatar.png"}
              alt="Profil"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              unoptimized
              style={{ aspectRatio: '1/1' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;