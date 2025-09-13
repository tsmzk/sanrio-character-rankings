import { CharacterDetailModal, useCharacterSelection } from "../features/character";
import { AppHeader, AppMainContent, AppSidebar } from "../features/layout";
import { useRankingData } from "../features/ranking";
import { useCharacterModal, useCharacterSearch, useYearRangeFilter } from "../hooks";
import { AppErrorState, AppLoadingState } from "../shared/components";

function App() {
  const { characters, rankings, loading, error } = useRankingData();
  const characterSelection = useCharacterSelection();
  const yearRangeFilter = useYearRangeFilter(rankings);
  const characterSearch = useCharacterSearch(characters, rankings);
  const characterModal = useCharacterModal();

  if (loading) {
    return <AppLoadingState message="データを読み込み中..." />;
  }

  if (error) {
    return <AppErrorState error={error} />;
  }

  // Get selected character objects for display
  const selectedCharacterObjects = characters.filter((char) =>
    characterSelection.selectedCharacters.includes(char.id),
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-300">
      <AppHeader />

      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-6 px-5 pb-8 lg:flex-row flex-col">
        <AppSidebar
          yearRangeFilter={yearRangeFilter}
          characterSearch={characterSearch}
          characterSelection={characterSelection}
          allCharacters={characters}
        />

        <AppMainContent
          rankings={rankings}
          characters={characters}
          selectedCharacterObjects={selectedCharacterObjects}
          characterSelection={characterSelection}
          yearRangeFilter={yearRangeFilter}
          characterModal={characterModal}
        />
      </div>

      <CharacterDetailModal characterModal={characterModal} rankings={rankings} />
    </div>
  );
}

export default App;
