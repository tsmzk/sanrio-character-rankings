import { useEffect, useState } from "react";

interface UseCharacterSelectionReturn {
  selectedCharacters: string[];
  toggleCharacter: (characterId: string) => void;
  addCharacter: (characterId: string) => void;
  removeCharacter: (characterId: string) => void;
  clearSelection: () => void;
  isSelected: (characterId: string) => boolean;
}

const STORAGE_KEY = "sanrio-ranking-selected-characters";

export const useCharacterSelection = (
  initialSelection: string[] = [],
): UseCharacterSelectionReturn => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(() => {
    // Try to load from localStorage first
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn("Failed to load selection from localStorage:", error);
    }
    return initialSelection;
  });

  // Save to localStorage whenever selection changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCharacters));
    } catch (error) {
      console.warn("Failed to save selection to localStorage:", error);
    }
  }, [selectedCharacters]);

  const toggleCharacter = (characterId: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(characterId) ? prev.filter((id) => id !== characterId) : [...prev, characterId],
    );
  };

  const addCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => (prev.includes(characterId) ? prev : [...prev, characterId]));
  };

  const removeCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => prev.filter((id) => id !== characterId));
  };

  const clearSelection = () => {
    setSelectedCharacters([]);
  };

  const isSelected = (characterId: string) => {
    return selectedCharacters.includes(characterId);
  };

  return {
    selectedCharacters,
    toggleCharacter,
    addCharacter,
    removeCharacter,
    clearSelection,
    isSelected,
  };
};
