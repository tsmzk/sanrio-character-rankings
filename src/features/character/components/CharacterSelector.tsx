import type React from "react";
import type { Character } from "../../../shared/types";

interface CharacterSelectorProps {
  characters: Character[];
  toggleCharacter: (characterId: string) => void;
  isSelected: (characterId: string) => boolean;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  toggleCharacter,
  isSelected,
}) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-item">
          <label className="character-checkbox">
            <input
              type="checkbox"
              checked={isSelected(character.id)}
              onChange={() => toggleCharacter(character.id)}
            />
            <span className="character-name">{character.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
