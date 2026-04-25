import { useMemo } from "react";
import type { useCharacterSearch, useCharacterSelection } from "../../../hooks";
import type { Character } from "../../../shared/types";
import { CharacterSelector } from "./CharacterSelector";

interface CharacterSelectionPanelProps {
  characterSearch: ReturnType<typeof useCharacterSearch>;
  characterSelection: ReturnType<typeof useCharacterSelection>;
  allCharacters: Character[];
}

export function CharacterSelectionPanel({
  characterSearch,
  characterSelection,
  allCharacters,
}: CharacterSelectionPanelProps) {
  const displayCharacters = useMemo(() => {
    const selectedIds = new Set(characterSelection.selectedCharacters);
    const selectedChars = allCharacters.filter((char) => selectedIds.has(char.id));
    const unselectedSearchResults = characterSearch.filteredCharacters.filter(
      (char) => !selectedIds.has(char.id),
    );
    return [...selectedChars, ...unselectedSearchResults];
  }, [allCharacters, characterSelection.selectedCharacters, characterSearch.filteredCharacters]);

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="キャラクター検索..."
          value={characterSearch.searchQuery}
          onChange={(e) => characterSearch.setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
        />
        {characterSearch.searchQuery && (
          <button
            type="button"
            onClick={characterSearch.clearSearch}
            aria-label="検索をクリア"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-400 hover:bg-pink-500 text-white rounded-full text-xs flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>
        )}
      </div>
      {characterSearch.hasSearchResults ? (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 italic">
          {displayCharacters.length}件のキャラクターが見つかりました
        </div>
      ) : (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 italic">
          最新ランキングTOP10
        </div>
      )}
      <CharacterSelector
        characters={displayCharacters}
        toggleCharacter={characterSelection.toggleCharacter}
        isSelected={characterSelection.isSelected}
      />
    </div>
  );
}
