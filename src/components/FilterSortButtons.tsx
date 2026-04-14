"use client";

import { useState } from "react";
import Image from "next/image";
import FilterModal from "./FilterModal";
import SortButton from "./SortModal";

interface FilterSortButtonsProps {
  baseUrl: string;
  showFilter?: boolean;
}

const FilterSortButtons = ({ baseUrl, showFilter = false }: FilterSortButtonsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      {showFilter && (
        <>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-500 transition-colors"
          >
            <Image src="/filter.png" alt="Filtrer" width={14} height={14} />
          </button>
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            baseUrl={baseUrl}
          />
        </>
      )}
      <SortButton baseUrl={baseUrl} />
    </>
  );
};

export default FilterSortButtons;

