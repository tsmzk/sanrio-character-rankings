import type { Character, RankingEntry } from "../../../shared/types";

interface ChartLegendProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  className?: string;
}

export function ChartLegend({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
  className = "",
}: ChartLegendProps) {
  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        選択中のキャラクター
      </h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {selectedCharacters.map((characterId) => {
          const character = characters.find((c) => c.id === characterId);
          if (!character) return null;

          const characterRankings = rankings.filter(
            (r) =>
              r.characterId === characterId && r.year >= yearRange.min && r.year <= yearRange.max,
          );

          const bestRank =
            characterRankings.length > 0 ? Math.min(...characterRankings.map((r) => r.rank)) : null;

          const worstRank =
            characterRankings.length > 0 ? Math.max(...characterRankings.map((r) => r.rank)) : null;

          return (
            <div
              key={characterId}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {/* Color indicator */}
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm border border-gray-200 dark:border-gray-600"
                style={{ backgroundColor: character.color }}
                aria-hidden="true"
              />

              {/* Character info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white truncate">
                  {character.name}
                </div>

                {bestRank && worstRank && (
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        role="img"
                        aria-label="最高順位アイコン"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      最高: {bestRank}位
                    </span>

                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        role="img"
                        aria-label="最低順位アイコン"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      最低: {worstRank}位
                    </span>
                  </div>
                )}

                {characterRankings.length === 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    期間内にデータなし
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
