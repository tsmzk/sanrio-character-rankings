import { CharacterDetail, useCharacterModal, useCharacterSelection } from "../../character";
import { useDataFiltering } from "../../filter";
import { useRankingData } from "../../ranking";
import { useAppViewport } from "../hooks/useAppViewport";
import { AppFooter, AppHeader, AppMainContent, AppSidebar } from "./";

export function AppLayout() {
  // Data loading
  const { characters, rankings, loading, error } = useRankingData();

  // Character selection
  const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

  // Viewport management
  const { chartHeight, windowWidth } = useAppViewport();

  // Character detail modal
  const { selectedCharacter, isOpen, openModal, closeModal } = useCharacterModal();

  // Data filtering
  const { yearRange, availableYearRange, availableRankRange, filteredRankings, setYearRange } =
    useDataFiltering({ rankings });

  // Handle character selection changes
  const handleSelectionChange = (characterIds: string[]) => {
    characterIds.forEach((id) => {
      if (!isSelected(id)) {
        toggleCharacter(id);
      }
    });

    selectedCharacters.forEach((id) => {
      if (!characterIds.includes(id)) {
        toggleCharacter(id);
      }
    });
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h1 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-2">
              エラーが発生しました
            </h1>
            <p className="text-red-600 dark:text-red-500 mb-4">{error}</p>
            <button type="button" onClick={() => window.location.reload()} className="btn-primary">
              ページを再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'var(--color-bg-main)'}}>
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <AppSidebar
            characters={characters}
            rankings={rankings}
            selectedCharacters={selectedCharacters}
            yearRange={yearRange}
            availableYearRange={availableYearRange}
            availableRankRange={availableRankRange}
            loading={loading}
            onYearRangeChange={setYearRange}
            onSelectionChange={handleSelectionChange}
          />

          {/* Main Content */}
          <AppMainContent
            characters={characters}
            rankings={filteredRankings}
            selectedCharacters={selectedCharacters}
            yearRange={yearRange}
            chartHeight={chartHeight}
            windowWidth={windowWidth}
            loading={loading}
            onCharacterClick={openModal}
          />
        </div>
      </div>

      {/* Footer */}
      <AppFooter />

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          rankings={rankings}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
