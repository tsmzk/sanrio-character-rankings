import type {
  useCharacterSearch,
  useCharacterSelection,
  useYearRangeFilter,
} from "../../../../hooks";
import { CharacterSelector } from "../../../character";

interface AppSidebarProps {
  yearRangeFilter: ReturnType<typeof useYearRangeFilter>;
  characterSearch: ReturnType<typeof useCharacterSearch>;
  characterSelection: ReturnType<typeof useCharacterSelection>;
}

export function AppSidebar({
  yearRangeFilter,
  characterSearch,
  characterSelection,
}: AppSidebarProps) {
  return (
    <aside className="lg:w-80 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 h-fit shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6 lg:sticky lg:top-6">
      {/* Year Range Filter */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gradient-to-r from-pink-500 to-purple-500">
          ランキング期間
        </h2>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 italic">
            利用可能期間: {yearRangeFilter.availableYearRange.min}年〜
            {yearRangeFilter.availableYearRange.max}年
          </div>
          <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <span className="text-base font-semibold text-pink-600 dark:text-pink-400">
              {yearRangeFilter.yearRange.min}年
            </span>
            <span className="text-gray-400">〜</span>
            <span className="text-base font-semibold text-purple-600 dark:text-purple-400">
              {yearRangeFilter.yearRange.max}年
            </span>
          </div>
          <div className="space-y-3">
            <label className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
              開始年:
              <input
                type="range"
                min={yearRangeFilter.availableYearRange.min}
                max={yearRangeFilter.availableYearRange.max}
                value={yearRangeFilter.yearRange.min}
                onChange={(e) => yearRangeFilter.updateStartYear(Number(e.target.value))}
                className="mt-1 accent-pink-500"
              />
            </label>
            <label className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
              終了年:
              <input
                type="range"
                min={yearRangeFilter.availableYearRange.min}
                max={yearRangeFilter.availableYearRange.max}
                value={yearRangeFilter.yearRange.max}
                onChange={(e) => yearRangeFilter.updateEndYear(Number(e.target.value))}
                className="mt-1 accent-purple-500"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={yearRangeFilter.resetToFullRange}
            disabled={yearRangeFilter.isResetDisabled}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-md disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            全期間にリセット
          </button>
        </div>
      </section>

      {/* Character Selection */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gradient-to-r from-pink-500 to-purple-500">
          キャラクター選択
        </h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="キャラクター検索..."
            value={characterSearch.searchQuery}
            onChange={(e) => characterSearch.setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
          />
          {characterSearch.searchQuery && (
            <button
              type="button"
              onClick={characterSearch.clearSearch}
              aria-label="検索をクリア"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-400 hover:bg-pink-500 text-white rounded-full text-xs flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              ✕
            </button>
          )}
        </div>
        {characterSearch.hasSearchResults && (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 italic">
            {characterSearch.resultCount}件のキャラクターが見つかりました
          </div>
        )}
        <CharacterSelector
          characters={characterSearch.filteredCharacters}
          toggleCharacter={characterSelection.toggleCharacter}
          isSelected={characterSelection.isSelected}
        />
      </section>
    </aside>
  );
}
