import type {
  useCharacterModal,
  useCharacterSelection,
  useYearRangeFilter,
} from "../../../../hooks";
import type { Character, RankingEntry } from "../../../../shared/types";
import { RankingChart } from "../../../ranking";

interface AppMainContentProps {
  rankings: RankingEntry[];
  characters: Character[];
  selectedCharacterObjects: Character[];
  characterSelection: ReturnType<typeof useCharacterSelection>;
  yearRangeFilter: ReturnType<typeof useYearRangeFilter>;
  characterModal: ReturnType<typeof useCharacterModal>;
}

export function AppMainContent({
  rankings,
  characters,
  selectedCharacterObjects,
  characterSelection,
  yearRangeFilter,
  characterModal,
}: AppMainContentProps) {
  return (
    <main className="flex-1 space-y-6">
      {/* Chart Section */}
      <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 min-h-[700px]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          ランキング推移
        </h2>
        <RankingChart
          rankings={rankings}
          characters={characters}
          selectedCharacters={characterSelection.selectedCharacters}
          yearRange={yearRangeFilter.yearRange}
        />
      </section>

      {/* Character Stats Section */}
      <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          選択中のキャラクター詳細
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCharacterObjects.map((character) => (
            <button
              key={character.id}
              type="button"
              onClick={() => characterModal.openModal(character)}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-pink-300 dark:hover:border-pink-600 cursor-pointer group"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                {character.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {character.description}
              </p>
              <span className="text-xs text-pink-500 dark:text-pink-400 italic block mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                クリックで詳細表示
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
