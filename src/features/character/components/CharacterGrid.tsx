import type { Character } from "../../../shared/types";
import { CharacterCard } from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[];
  selectedCharacters: string[];
  onCharacterToggle: (characterId: string) => void;
  className?: string;
}

export function CharacterGrid({
  characters,
  selectedCharacters,
  onCharacterToggle,
  className = "",
}: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-8 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="キャラクターが見つかりません"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1019.07 8.929 8 8 0 106.343 6.343v0z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          該当するキャラクターが見つかりません
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={selectedCharacters.includes(character.id)}
          onToggle={onCharacterToggle}
        />
      ))}
    </div>
  );
}
