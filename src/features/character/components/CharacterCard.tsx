import type { Character } from "../../../shared/types";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onToggle: (characterId: string) => void;
  className?: string;
}

export function CharacterCard({
  character,
  isSelected,
  onToggle,
  className = "",
}: CharacterCardProps) {
  return (
    <div
      className={`
        card card-compact bg-base-100 shadow hover:shadow-lg
        transition-all duration-200 ease-in-out hover:scale-[1.02]
        ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
        ${className}
      `}
    >
      <label className="card-body flex-row items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(character.id)}
          className="checkbox checkbox-primary checkbox-sm"
        />

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {/* Character color indicator */}
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: character.color }}
              aria-hidden="true"
            />

            <span className="text-sm font-medium truncate text-gray-900 dark:text-white">
              {character.name}
            </span>
          </div>

          {character.nameEn && (
            <p className="text-xs mt-1 truncate text-gray-500 dark:text-gray-400">
              {character.nameEn}
            </p>
          )}
        </div>

        {isSelected && (
          <div className="ml-2 flex-shrink-0">
            <svg
              className="w-4 h-4 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-label="選択済み"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </label>
    </div>
  );
}
