import { FiSearch } from "react-icons/fi";

import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8">
      {/* Platform Buttons */}
      <div className="flex justify-center gap-3 mb-5">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selected === p
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by username or full name..."
            className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            // className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}