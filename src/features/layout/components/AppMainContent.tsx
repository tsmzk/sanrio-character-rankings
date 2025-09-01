import type { Character, RankingEntry } from "../../../shared/types";
import { RankingChart } from "../../ranking/components/RankingChart";

interface AppMainContentProps {
  characters: Character[];
  rankings: RankingEntry[];
  selectedCharacters: string[];
  yearRange: { min: number; max: number };
  chartHeight: number;
  windowWidth: number;
  loading: boolean;
  onCharacterClick: (character: Character) => void;
  className?: string;
}

export function AppMainContent({
  characters,
  rankings,
  selectedCharacters,
  yearRange,
  chartHeight,
  windowWidth,
  loading,
  onCharacterClick,
  className = "",
}: AppMainContentProps) {
  return (
    <main className={`flex-1 space-y-6 ${className}`}>
      {/* Ranking Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <RankingChart
          selectedCharacters={selectedCharacters}
          characters={characters}
          rankings={rankings}
          yearRange={yearRange}
          height={chartHeight}
          windowWidth={windowWidth}
          loading={loading}
        />
      </div>

      {/* Selected Characters Actions */}
      {selectedCharacters.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            選択中のキャラクター詳細
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedCharacters.map((characterId) => {
              const character = characters.find((c) => c.id === characterId);
              if (!character) return null;

              return (
                <button
                  type="button"
                  key={characterId}
                  onClick={() => onCharacterClick(character)}
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  style={{
                    borderColor: character.color,
                    backgroundColor: `${character.color}15`,
                    color: character.color,
                  }}
                >
                  <span className="font-medium truncate">{character.name}</span>
                  <span className="text-xs opacity-75">詳細</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
