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
    <label
      className={`
        relative flex items-center p-3 rounded-lg border cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isSelected
            ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 shadow-sm"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
        }
        hover:shadow-md hover:scale-[1.02]
        focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900
        ${className}
      `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(character.id)}
        className="
          w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700
          border-gray-300 dark:border-gray-600 rounded
          focus:ring-primary-500 focus:ring-2
          transition-colors duration-200
        "
      />

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {/* Character color indicator */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
            style={{ backgroundColor: character.color }}
            aria-hidden="true"
          />

          <span
            className={`
            text-sm font-medium truncate
            ${
              isSelected
                ? "text-primary-700 dark:text-primary-300"
                : "text-gray-900 dark:text-white"
            }
          `}
          >
            {character.name}
          </span>
        </div>

        {character.nameEn && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {character.nameEn}
          </p>
        )}
      </div>

      {isSelected && (
        <div className="ml-2 flex-shrink-0">
          <svg
            className="w-4 h-4 text-primary-600 dark:text-primary-400"
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
  );
}
