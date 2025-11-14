"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  debounceTime?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  debounceTime = 300,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce function
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), debounceTime),
    [setSearchQuery, debounceTime]
  );

  useEffect(() => {
    debouncedSetSearch(localQuery);
  }, [localQuery, debouncedSetSearch]);

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <Input
            placeholder="Search trips, destinations..."
            className="pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-base focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            aria-label="Search trips or destinations"
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2 md:mt-0">
          {FILTERS.map(({ label, value }) => (
            <Button
              key={value}
              type="button"
              variant={filterStatus === value ? "primary" : "outline"}
              size="sm"
              className={`rounded-full px-5 py-2 font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-blue-300`}
              onClick={() => setFilterStatus(value)}
              aria-pressed={filterStatus === value}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;

// Utility debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
