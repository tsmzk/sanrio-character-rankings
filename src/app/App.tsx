import { CharacterSelector, useCharacterSelection } from "../features/character";
import { RankingChart, useRankingData } from "../features/ranking";
import { ThemeToggle } from "../features/theme";
import { useCharacterModal, useCharacterSearch, useYearRangeFilter } from "../hooks";

function App() {
  const { characters, rankings, loading, error } = useRankingData();
  const characterSelection = useCharacterSelection();
  const yearRangeFilter = useYearRangeFilter(rankings);
  const characterSearch = useCharacterSearch(characters);
  const characterModal = useCharacterModal();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;

  // Get selected character objects for display
  const selectedCharacterObjects = characters.filter((char) =>
    characterSelection.selectedCharacters.includes(char.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg py-6 mb-6 rounded-b-3xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 flex flex-col items-center gap-2 relative">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 text-center transition-all duration-300">
            サンリオキャラクターランキング推移
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 text-center">
            推移のキャラクターを選択して、年次ランキングの推移をトラッキングします
          </p>
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-6 px-5 pb-8 lg:flex-row flex-col">
        {/* Sidebar */}
        <aside className="lg:w-80 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 h-fit shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6 lg:sticky lg:top-6">
          {/* Year Range Filter */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gradient-to-r from-pink-500 to-purple-500">
              ランキング期間
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 italic">
                利用可能期間: {yearRangeFilter.availableYearRange.min}年〜{yearRangeFilter.availableYearRange.max}年
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

        {/* Main Content Area */}
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
      </div>

      {/* Character Detail Modal */}
      {characterModal.isOpen && characterModal.selectedCharacter && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-default"
          onClick={characterModal.closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') characterModal.closeModal();
          }}
          aria-label="Close modal"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl cursor-auto"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {characterModal.selectedCharacter.name}
              </h2>
              <button
                type="button"
                onClick={characterModal.closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                {characterModal.selectedCharacter.description}
              </p>
              <div className="space-y-3 mb-6">
                {characterModal.selectedCharacter.nameEn && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">英語名:</span>{' '}
                    {characterModal.selectedCharacter.nameEn}
                  </p>
                )}
                {characterModal.selectedCharacter.debutYear && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">デビュー年:</span>{' '}
                    {characterModal.selectedCharacter.debutYear}年
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">ランキング履歴</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                  {rankings
                    .filter((r) => r.characterId === characterModal.selectedCharacter?.id)
                    .sort((a, b) => b.year - a.year)
                    .slice(0, 10)
                    .map((ranking) => (
                      <div
                        key={ranking.year}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-center text-gray-700 dark:text-gray-200"
                      >
                        {ranking.year}年: {ranking.rank}位
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;