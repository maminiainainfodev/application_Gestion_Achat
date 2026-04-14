"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const searchParams = useSearchParams();
  
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const basePageClass =
      "px-3 py-1 text-sm rounded-md border transition-colors";
    const activePageClass = "bg-blue-600 text-white border-blue-600 shadow-sm";
    const inactivePageClass =
      "border-slate-200 text-gray-700 hover:bg-slate-100";

    // Première page
    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={getPageUrl(1)}
          className={`${basePageClass} ${inactivePageClass}`}
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    // Pages visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={getPageUrl(i)}
          className={`${basePageClass} ${
            i === currentPage ? activePageClass : inactivePageClass
          }`}
        >
          {i}
        </Link>
      );
    }

    // Dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      pages.push(
        <Link
          key={totalPages}
          href={getPageUrl(totalPages)}
          className={`${basePageClass} ${inactivePageClass}`}
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold transition-colors ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "hover:bg-slate-300"
        }`}
      >
        Prev
      </Link>
      <div className="flex items-center gap-2 text-sm">
        {renderPageNumbers()}
      </div>
      <Link
        href={getPageUrl(currentPage + 1)}
        className={`py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold transition-colors ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "hover:bg-slate-300"
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
