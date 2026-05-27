import { useState } from "react";
import { trackEvent } from "../shared/firebase";
import type { Character } from "../shared/types";

export function useCharacterModal() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const openModal = (character: Character) => {
    trackEvent({
      name: "character_detail_open",
      params: { character_id: character.id },
    });
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
