import { useState } from "react";
import type { Character } from "../../../shared/types";

interface UseCharacterModalReturn {
  selectedCharacter: Character | null;
  isOpen: boolean;
  openModal: (character: Character) => void;
  closeModal: () => void;
}

export const useCharacterModal = (): UseCharacterModalReturn => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const isOpen = selectedCharacter !== null;

  return {
    selectedCharacter,
    isOpen,
    openModal,
    closeModal,
  };
};
