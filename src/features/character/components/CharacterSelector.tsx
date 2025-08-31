import type React from "react";
import type { Character } from "../../../shared/types";
import { useCharacterSelector } from "../hooks/useCharacterSelector";
import { CharacterGrid } from "./CharacterGrid";
import { CharacterSearch } from "./CharacterSearch";
import { CharacterSelectorHeader } from "./CharacterSelectorHeader";
import { CharacterLoadingState } from "./CharacterSelectorStates";

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacters: string[];
  onSelectionChange: (characterIds: string[]) => void;
  loading?: boolean;
  className?: string;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  selectedCharacters,
  onSelectionChange,
  loading = false,
  className = "",
}) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    handleCharacterToggle,
    clearSelection,
    clearSearch,
    selectedCount,
  } = useCharacterSelector({
    characters,
    selectedCharacters,
    onSelectionChange,
  });

  if (loading) {
    return (
      <div className={`p-4 ${className}`}>
        <CharacterLoadingState />
      </div>
    );
  }

  return (
    <div className={`p-4 space-y-4 ${className}`}>
      {/* Header with selection count and clear button */}
      <CharacterSelectorHeader selectedCount={selectedCount} onClearSelection={clearSelection} />

      {/* Search input and filters */}
      <CharacterSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
      />

      {/* Character grid */}
      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <CharacterGrid
          characters={filteredCharacters}
          selectedCharacters={selectedCharacters}
          onCharacterToggle={handleCharacterToggle}
        />
      </div>
    </div>
  );
};
