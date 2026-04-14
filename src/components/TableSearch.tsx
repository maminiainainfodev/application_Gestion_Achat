"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TableSearchProps {
  baseUrl?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const TableSearch = ({ baseUrl, placeholder = "", onSearch }: TableSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Update URL search params with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentURLSearch = params.get("search") || "";

      if (searchQuery === currentURLSearch) return;

      if (searchQuery.trim()) {
        params.set("search", searchQuery);
        params.delete("page");
      } else {
        params.delete("search");
      }

      const url = baseUrl || pathname;
      router.push(`${url}?${params.toString()}`);
    }, 500); // 500ms debounce for URL

    return () => clearTimeout(timer);
  }, [searchQuery, baseUrl, pathname, router, searchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== searchQuery) {
      setSearchQuery(currentSearch);
    }
  }, [searchParams]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-xl px-4 py-2 neu-pressed">
      {!searchQuery && <Image src="/search.png" alt="" width={14} height={14} className="opacity-50" />}
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-[200px] bg-transparent outline-none text-slate-600 placeholder:text-gray-400"
      />
    </div>
  );
};

export default TableSearch;
