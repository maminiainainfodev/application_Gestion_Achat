"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const LoginPage = () => {
  const [code4, setCode4] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMatricule = localStorage.getItem("rememberedMatricule");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      if (savedMatricule) setCode4(savedMatricule);
      if (savedPassword) setMotDePasse(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleMatriculeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\s/g, "").toUpperCase();
    if (val.startsWith("PCRS") && val.length > 8) {
      val = val.substring(0, 8);
    }
    setCode4(val);
  };

  const formatMatricule = (val: string) => {
    if (val.startsWith("PCRS") && val.length > 4) {
      return val.slice(0, 4) + " " + val.slice(4);
    }
    return val;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code4 || !motDePasse) {
      toast.error("Veuillez saisir le matricule et le mot de passe");
      return;
    }
    if (code4.trim().length < 3) {
      toast.error("Le matricule semble trop court");
      return;
    }

    setIsLoading(true);

    try {
      const matricule = code4;
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricule, motDePasse }),
      });

      const data = await response.json();

      if (data.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedMatricule", code4);
          localStorage.setItem("rememberedPassword", motDePasse);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedMatricule");
          localStorage.removeItem("rememberedPassword");
          localStorage.setItem("rememberMe", "false");
        }

        toast.success("Connexion réussie!");
        setTimeout(() => {
          if (data.role === "Administrateur") {
            router.push("/admin");
          } else if (data.role === "Demandeur") {
            router.push("/collaborateurs");
          } else {
            router.push("/collabo_valideur");
          }
        }, 500);
      } else {
        toast.error(data.message || "Identifiants invalides");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fbfa] p-4 font-sans relative overflow-hidden">

      {/* BACKGROUND DECORATIONS - Symmetrical fluid layers */}
      {/* Top Right Group */}
      <div className="absolute top-[-25%] right-[-15%] w-[900px] h-[900px] bg-[#43B02A]/10 rounded-full pointer-events-none z-0 rotate-12 opacity-70"></div>
      <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] border border-[#43B02A]/20 rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#43B02A]/10 rounded-full blur-[80px] pointer-events-none z-0 opacity-70"></div>

      {/* Bottom Left Group - Matching the complexity of the top right */}
      <div className="absolute bottom-[-30%] left-[-20%] w-[1000px] h-[1000px] bg-[#43B02A]/10 rounded-full pointer-events-none z-0 -rotate-12 opacity-70"></div>
      <div className="absolute bottom-[-20%] left-[-15%] w-[800px] h-[800px] border border-[#43B02A]/10 rounded-full pointer-events-none z-0 opacity-70"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#43B02A]/10 rounded-full blur-[60px] pointer-events-none z-0 opacity-70"></div>
      <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] border border-[#43B02A]/20 rounded-full pointer-events-none z-0 opacity-70"></div>

      {/* ABOUT MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAboutModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={() => setIsAboutModalOpen(false)}
        ></div>
        <div
          className={`bg-white rounded-[32px] p-10 max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 transform transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isAboutModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
        >
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="space-y-6 pt-2">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#43B02A]/10 rounded-2xl flex items-center justify-center mx-auto text-[#43B02A]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">À propos</h3>
            </div>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Bienvenue sur cette application conçue et développée par <span className="font-bold text-gray-900">Lorniot Marcel</span>.
                Passionné par la création de solutions numériques innovantes, j&apos;ai conçu cet outil pour répondre à vos besoins avec efficacité.
              </p>

              <p>
                Vous avez un projet ou une proposition de collaboration ? Je suis à votre écoute.
              </p>

              <div className="pt-4 space-y-2 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-gray-900">
                  <div className="text-[#43B02A]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <span className="font-medium">lorniotmarcel@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-900">
                  <div className="text-[#43B02A]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <span className="font-medium">+261 38 99 792 86</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px] relative z-10">

        {/* LEFT PANEL - Branding */}
        <div className="w-full md:w-[40%] bg-[#43B02A]/70 p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-sm font-medium opacity-80 uppercase tracking-widest">Bienvenue sur</h2>

            <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={112}
                height={112}
                className="object-contain p-2"
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Gestion Navette</h1>

            <p className="max-w-[180px] mx-auto text-white/80 text-xs leading-relaxed">
              Simplifiez la gestion de vos navettes et optimisez vos processus administratifs.
            </p>
          </div>

          {/* Footer link in the left panel */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center text-[9px] font-bold tracking-widest uppercase">
            <span
              onClick={() => setIsAboutModalOpen(true)}
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 bg-white/10 px-4 py-1.5 rounded-full"
            >
              À propos
            </span>
          </div>

          {/* Wavy border separator only on desktop */}
          <div className="hidden md:block absolute top-0 -right-1 h-full w-12 pointer-events-none">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full fill-white">
              <path d="M0,0 C30,200 70,400 30,600 C0,750 0,850 30,1000 L100,1000 L100,0 Z" />
            </svg>
          </div>
        </div>

        {/* RIGHT PANEL - Form */}
        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-xs mx-auto w-full space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left tracking-tight">Connexion</h2>
              <p className="text-gray-400 text-xs text-center md:text-left">Identifiez-vous pour accéder à l&apos;interface</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Matricule</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#43B02A] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <input
                    type="text"
                    value={formatMatricule(code4)}
                    onChange={handleMatriculeChange}
                    placeholder="Ex: PCRS 1234"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#43B02A]/20 focus:border-[#43B02A] focus:bg-white transition-all outline-none text-sm text-gray-800 placeholder:text-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#43B02A] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <input
                    type="password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#43B02A]/20 focus:border-[#43B02A] focus:bg-white transition-all outline-none text-sm text-gray-800 placeholder:text-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center px-0.5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#43B02A] focus:ring-[#43B02A] cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 font-medium">Rester connecté</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#43B02A] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#43B02A]/20 hover:shadow-xl hover:shadow-[#43B02A]/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-sm mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

