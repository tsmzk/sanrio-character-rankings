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
  // キャラクターを選択済みと未選択に分ける
  const selectedCharacters = characters.filter((character) => isSelected(character.id));
  const unselectedCharacters = characters.filter((character) => !isSelected(character.id));

  return (
    <div className="character-list">
      {/* 選択済みキャラクター */}
      {selectedCharacters.length > 0 && (
        <>
          <div className="text-sm font-semibold text-pink-400 mb-2">
            選択済み ({selectedCharacters.length})
          </div>
          {selectedCharacters.map((character) => (
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
          <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>
        </>
      )}

      {/* 未選択キャラクター */}
      {unselectedCharacters.map((character) => (
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
