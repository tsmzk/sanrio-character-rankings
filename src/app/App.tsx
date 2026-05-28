import { useCallback, useEffect, useState } from "react";
import {
  CharacterDetailModal,
  CharacterSelectionPanel,
  useCharacterSelection,
} from "../features/character";
import { AnalyticsConsentBanner } from "../features/consent";
import {
  AppFooter,
  AppHeader,
  AppMainContent,
  AppSidebar,
  MobileBottomBar,
} from "../features/layout";
import { DisclaimerPage, IntroModal, PrivacyPolicyPage } from "../features/legal";
import { useRankingData, YearRangeFilterPanel } from "../features/ranking";
import {
  useCharacterModal,
  useCharacterSearch,
  useIsDesktop,
  useRoute,
  useYearRangeFilter,
} from "../hooks";
import { AppErrorState, AppLoadingState, BottomSheet } from "../shared/components";
import { trackEvent } from "../shared/firebase";

type MobileSheet = "characters" | "year" | null;

const INTRO_MODAL_STORAGE_KEY = "hasSeenIntroModal_v1";

function App() {
  const { path, navigate } = useRoute();
  const { characters, rankings, loading, error } = useRankingData();
  const characterSelection = useCharacterSelection();
  const yearRangeFilter = useYearRangeFilter(rankings);
  const characterSearch = useCharacterSearch(characters, rankings);
  const characterModal = useCharacterModal();
  const isDesktop = useIsDesktop();
  const [activeSheet, setActiveSheet] = useState<MobileSheet>(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  // Show the intro modal once the initial content is on screen (not during loading)
  useEffect(() => {
    if (loading) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(INTRO_MODAL_STORAGE_KEY)) return;
    setIsIntroModalOpen(true);
  }, [loading]);

  const closeIntroModal = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(INTRO_MODAL_STORAGE_KEY, "true");
    }
    setIsIntroModalOpen(false);
    trackEvent({ name: "intro_modal_dismiss", params: {} });
  }, []);

  const renderHome = () => {
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
      <>
        <div className="flex flex-1 min-h-0 max-w-7xl mx-auto w-full gap-6 px-5 pb-2 lg:pb-8 lg:flex-row flex-col">
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
      </>
    );
  };

  const isHome = path === "/";
  const containerClass = isHome
    ? "h-[100dvh] lg:h-auto lg:min-h-screen flex flex-col overflow-hidden lg:overflow-visible bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-300"
    : "min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-300";

  return (
    <div className={containerClass}>
      <AppHeader onNavigateHome={() => navigate("/")} />

      {isHome && renderHome()}
      {path === "/privacy" && <PrivacyPolicyPage onNavigate={navigate} />}
      {path === "/disclaimer" && <DisclaimerPage onNavigate={navigate} />}

      <AppFooter currentPath={path} onNavigate={navigate} />

      <IntroModal isOpen={isIntroModalOpen} onClose={closeIntroModal} onNavigate={navigate} />
      {!loading && !isIntroModalOpen && <AnalyticsConsentBanner onNavigate={navigate} />}
    </div>
  );
}

export default App;
