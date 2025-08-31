import "./App.css";
import { CharacterDetail, useCharacterModal, useCharacterSelection } from "../features/character";
import { FilterControls, useDataFiltering } from "../features/filter";
import { RankingChart, useRankingData } from "../features/ranking";
import { ThemeToggle } from "../features/theme";

function App() {
  // Data loading
  const { characters, rankings, loading, error } = useRankingData();

  // Character selection
  const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

  // Character detail modal
  const { selectedCharacter, isOpen, openModal, closeModal } = useCharacterModal();

  // Data filtering
  const { yearRange, availableYearRange, availableRankRange, filteredRankings, setYearRange } = useDataFiltering({ rankings });

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
      <div className="error-container">
        <div className="error-content">
          <h1>エラーが発生しました</h1>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            ページを再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>サンリオキャラクターランキング推移</h1>
          <p>複数のキャラクターを選択して、年次ランキングの推移を比較できます</p>
          <ThemeToggle />
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="controls">
            <div className="character-selection">
              <FilterControls
                characters={characters}
                selectedCharacters={selectedCharacters}
                yearRange={yearRange}
                availableYearRange={availableYearRange}
                availableRankRange={availableRankRange}
                onYearRangeChange={setYearRange}
                onSelectionChange={handleSelectionChange}
                loading={loading}
              />
            </div>
          </div>

          <div className="chart-container">
            {loading ? (
              <div className="loading">データを読み込んでいます...</div>
            ) : (
              <RankingChart
                rankings={filteredRankings}
                characters={characters}
                selectedCharacters={selectedCharacters}
                yearRange={yearRange}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>

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

export default App;
