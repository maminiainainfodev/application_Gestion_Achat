import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import Image from "next/image";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="h-screen flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[16%] xl:w-[14%] p-3 lg:p-4 bg-[#584446]/60 rounded-r-[2.5rem] shadow-2xl flex flex-col items-center flex-shrink-0 z-20 backdrop-blur-md border-r border-white/10">
          <div className="flex items-center justify-center mb-10 w-full pt-4 group transition-transform hover:scale-105">
            <Image src="/logo.jpg" alt="logo" width={54} height={54} className="flex-shrink-0 object-contain rounded-xl shadow-lg border border-white/20" />
            <span className="hidden lg:block font-black text-white ml-3 tracking-[0.2em] text-sm group-hover:text-amber-200 transition-colors">CERES</span>
          </div>
          <Menu />
        </div>
        {/* RIGHT CONTENT */}
        <div className="relative w-[84%] xl:w-[86%] bg-white overflow-hidden flex flex-col">

          <div className="relative z-10 flex flex-col h-full overflow-y-auto no-scrollbar">
            <Navbar />
            <main className="flex-1 pb-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
