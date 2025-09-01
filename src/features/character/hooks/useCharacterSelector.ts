import { useMemo, useState } from "react";
import type { Character } from "../../../shared/types";
import { DataProcessor } from "../../../shared/utils";

interface UseCharacterSelectorProps {
  characters: Character[];
  selectedCharacters: string[];
  onSelectionChange: (characterIds: string[]) => void;
}

interface UseCharacterSelectorReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCharacters: Character[];
  handleCharacterToggle: (characterId: string) => void;
  clearSelection: () => void;
  clearSearch: () => void;
  selectedCount: number;
}

export function useCharacterSelector({
  characters,
  selectedCharacters,
  onSelectionChange,
}: UseCharacterSelectorProps): UseCharacterSelectorReturn {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    return DataProcessor.filterCharacters(characters, {
      searchQuery,
    });
  }, [characters, searchQuery]);

  const handleCharacterToggle = (characterId: string) => {
    const newSelection = selectedCharacters.includes(characterId)
      ? selectedCharacters.filter((id) => id !== characterId)
      : [...selectedCharacters, characterId];
    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const selectedCount = selectedCharacters.length;

  return {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    handleCharacterToggle,
    clearSelection,
    clearSearch,
    selectedCount,
  };
}
