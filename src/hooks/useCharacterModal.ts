import { useState } from "react";
import type { Character } from "../shared/types";

export function useCharacterModal() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return {
    selectedCharacter,
    openModal,
    closeModal,
    isOpen: selectedCharacter !== null,
  };
}
