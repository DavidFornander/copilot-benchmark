"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchFilterProps {
  onFilter: (query: string) => void;
  className?: string;
}

export function SearchFilter({ onFilter, className = "" }: SearchFilterProps) {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onFilter(value);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search nodes..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
    </div>
  );
}