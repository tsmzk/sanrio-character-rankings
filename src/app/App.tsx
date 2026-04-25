import { useState } from "react";
import {
  CharacterDetailModal,
  CharacterSelectionPanel,
  useCharacterSelection,
} from "../features/character";
import { AppHeader, AppMainContent, AppSidebar, MobileBottomBar } from "../features/layout";
import { useRankingData, YearRangeFilterPanel } from "../features/ranking";
import { useCharacterModal, useCharacterSearch, useIsDesktop, useYearRangeFilter } from "../hooks";
import { AppErrorState, AppLoadingState, BottomSheet } from "../shared/components";

type MobileSheet = "characters" | "year" | null;

function App() {
  const { characters, rankings, loading, error } = useRankingData();
  const characterSelection = useCharacterSelection();
  const yearRangeFilter = useYearRangeFilter(rankings);
  const characterSearch = useCharacterSearch(characters, rankings);
  const characterModal = useCharacterModal();
  const isDesktop = useIsDesktop();
  const [activeSheet, setActiveSheet] = useState<MobileSheet>(null);

  if (loading) {
    return <AppLoadingState message="データを読み込み中..." />;
  }

  if (error) {
    return <AppErrorState error={error} />;
  }

  const selectedCharacterObjects = characters.filter((char) =>
    characterSelection.selectedCharacters.includes(char.id),
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-300">
      <AppHeader />

      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-6 px-5 pb-8 lg:flex-row flex-col">
        {isDesktop && (
          <AppSidebar
            yearRangeFilter={yearRangeFilter}
            characterSearch={characterSearch}
            characterSelection={characterSelection}
            allCharacters={characters}
          />
        )}

        <AppMainContent
          rankings={rankings}
          characters={characters}
          selectedCharacterObjects={selectedCharacterObjects}
          characterSelection={characterSelection}
          yearRangeFilter={yearRangeFilter}
          characterModal={characterModal}
        />
      </div>

      {/* Mobile spacer so the bottom bar never overlaps content */}
      {!isDesktop && <div aria-hidden="true" className="h-24" />}

      {!isDesktop && (
        <>
          <MobileBottomBar
            selectedCount={characterSelection.selectedCharacters.length}
            onOpenCharacters={() => setActiveSheet("characters")}
            onOpenYearFilter={() => setActiveSheet("year")}
          />
          <BottomSheet
            isOpen={activeSheet === "characters"}
            onClose={() => setActiveSheet(null)}
            title={`キャラクター選択${
              characterSelection.selectedCharacters.length > 0
                ? `（${characterSelection.selectedCharacters.length}件）`
                : ""
            }`}
            snapPoints={[0.55, 0.9]}
          >
            <CharacterSelectionPanel
              characterSearch={characterSearch}
              characterSelection={characterSelection}
              allCharacters={characters}
            />
          </BottomSheet>
          <BottomSheet
            isOpen={activeSheet === "year"}
            onClose={() => setActiveSheet(null)}
            title="ランキング期間"
            snapPoints={[0.5]}
          >
            <YearRangeFilterPanel yearRangeFilter={yearRangeFilter} />
          </BottomSheet>
        </>
      )}

      <CharacterDetailModal characterModal={characterModal} rankings={rankings} />
    </div>
  );
}

export default App;
