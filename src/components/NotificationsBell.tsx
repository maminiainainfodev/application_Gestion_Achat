"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

type NotificationItem = {
  id: number;
  type: string;
  typeLabel: string;
  numero: number | null;
  objet: string | null;
  statut: string;
  dateDepot: string;
  auteur: {
    matricule: string;
    nom: string | null;
    prenom: string | null;
  } | null;
  isAuteur: boolean;
  isCurrentValidator: boolean;
  roleAttendu: string | null;
};



const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getBadgeLabel = (item: NotificationItem) => {
  if (item.isCurrentValidator) return "À valider";
  if (item.isAuteur) return "Suivi";
  return "Information";
};

const badgeClasses = (item: NotificationItem) => {
  if (item.isCurrentValidator) {
    return "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700";
  }
  if (item.isAuteur) {
    return "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700";
  }
  return "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600";
};

const NotificationsBell = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousSnapshotRef = useRef<string[]>([]);
  const firstLoadRef = useRef(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNotificationSound = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      const now = ctx.currentTime;
      const tones = [
        { frequency: 880, delay: 0, duration: 0.14 },
        { frequency: 660, delay: 0.16, duration: 0.2 },
      ];
      tones.forEach(({ frequency, delay, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(frequency, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.22, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + duration + 0.05);
      });
    } catch (soundError) {
      console.warn("[NotificationsBell] impossible de jouer le son", soundError);
    }
  }, []);

  const handleNotificationsUpdate = useCallback(
    async (items: NotificationItem[]) => {
      const signature = items.map(
        (item) => `${item.id}-${item.statut}-${item.roleAttendu ?? ""}-${item.isCurrentValidator ? "v" : "a"}`
      );
      if (!firstLoadRef.current) {
        const previousSet = new Set(previousSnapshotRef.current);
        const hasNewItem =
          signature.length > previousSnapshotRef.current.length ||
          signature.some((token) => !previousSet.has(token));
        if (hasNewItem) {
          await playNotificationSound();
        }
      } else {
        firstLoadRef.current = false;
      }
      previousSnapshotRef.current = signature;
      setNotifications(items);
    },
    [playNotificationSound]
  );

  const fetchNotifications = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/demandeur/notifications");
      if (!res.ok) {
        throw new Error("Impossible de récupérer les notifications");
      }
      const data = await res.json();
      if (data.success) {
        await handleNotificationsUpdate(data.data ?? []);
      } else {
        throw new Error(data.message || "Erreur inattendue");
      }
    } catch (err: any) {
      console.error("[NotificationsBell] fetch error:", err);
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, [handleNotificationsUpdate]);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const countLabel = useMemo(() => {
    if (loading) return "";
    if (!notifications.length) return "";
    return notifications.length > 9 ? "9+" : String(notifications.length);
  }, [notifications.length, loading]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Afficher les notifications"
      >
        <Image src="/bell.png" alt="Notifications" width={20} height={20} />
        {countLabel && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] px-1 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full text-center">
            {countLabel}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Notifications</p>
              <p className="text-xs text-gray-500">
                {loading ? "Chargement..." : `${notifications.length} demande(s)`}
              </p>
            </div>
            <button
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={fetchNotifications}
            >
              Rafraîchir
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {error && (
              <div className="px-4 py-3 text-xs text-red-600 bg-red-50 border-b border-red-100">
                {error}
              </div>
            )}
            {!error && notifications.length === 0 && !loading && (
              <div className="px-4 py-6 text-center text-xs text-gray-500">
                Aucune notification pour le moment
              </div>
            )}
            {!error &&
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-800">
                      {item.numero ? `N°${item.numero}` : `ID ${item.id}`} — {item.typeLabel}
                    </p>
                    <span className={badgeClasses(item)}>{getBadgeLabel(item)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {item.objet || "Objet non renseigné"}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {item.auteur
                      ? `Demandeur : ${(item.auteur.prenom || "") +
                        " " +
                        (item.auteur.nom || "")}`.trim()
                      : "Demandeur inconnu"}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                    <span>{formatDate(item.dateDepot)}</span>
                    <span className="font-semibold text-gray-700 uppercase tracking-wide">
                      {item.statut.replace("_", " ")}
                    </span>
                  </div>
                  {item.roleAttendu && item.isCurrentValidator && (
                    <p className="text-[10px] text-indigo-600 mt-1">
                      Rôle attendu : {item.roleAttendu}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;

