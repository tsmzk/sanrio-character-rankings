import type { Character, RankingEntry } from "../../../shared/types";
import { CharacterSelector } from "../../character/components/CharacterSelector";
import { FilterControls } from "../../filter/components/FilterControls";

interface AppSidebarProps {
  characters: Character[];
  rankings: RankingEntry[];
  selectedCharacters: string[];
  yearRange: { min: number; max: number };
  availableYearRange: { min: number; max: number };
  availableRankRange: { min: number; max: number };
  loading: boolean;
  onYearRangeChange: (range: { min: number; max: number }) => void;
  onSelectionChange: (characterIds: string[]) => void;
  className?: string;
}

export function AppSidebar({
  characters,
  rankings,
  selectedCharacters,
  yearRange,
  availableYearRange,
  availableRankRange,
  loading,
  onYearRangeChange,
  onSelectionChange,
  className = "",
}: AppSidebarProps) {
  return (
    <aside className={`w-full lg:w-96 space-y-6 ${className}`}>
      {/* Filter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <FilterControls
          rankings={rankings}
          yearRange={yearRange}
          availableYearRange={availableYearRange}
          availableRankRange={availableRankRange}
          onYearRangeChange={onYearRangeChange}
          loading={loading}
        />
      </div>

      {/* Character Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <CharacterSelector
          characters={characters}
          selectedCharacters={selectedCharacters}
          onSelectionChange={onSelectionChange}
          loading={loading}
        />
      </div>
    </aside>
  );
}
