"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface SortButtonProps {
  baseUrl: string;
}

const SortButton = ({ baseUrl }: SortButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

  const handleToggleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    
    params.set("sortBy", "date");
    params.set("sortOrder", newOrder);
    params.delete("page"); // Reset to page 1 when sorting
    
    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <button 
      onClick={handleToggleSort}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-500 transition-colors relative"
      title={currentOrder === "asc" ? "Trier: Plus anciens d'abord (cliquer pour voir les plus récents)" : "Trier: Plus récents d'abord (cliquer pour voir les plus anciens)"}
    >
      <Image src="/sort.png" alt="Trier" width={14} height={14} />
      <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-lamaSky text-white rounded-full w-4 h-4 flex items-center justify-center">
        {currentOrder === "asc" ? "↑" : "↓"}
      </span>
    </button>
  );
};

export default SortButton;

