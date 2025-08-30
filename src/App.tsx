import { useEffect, useMemo, useState } from "react";
import {
  CharacterDetail,
  CharacterSelector,
  FilterControls,
  RankingChart,
  ThemeToggle,
} from "./components";
import { useCharacterSelection, useRankingData, useTheme } from "./hooks";
import type { Character } from "./types";
import { DataProcessor } from "./utils";
import "./App.css";

function App() {
  const [yearRange, setYearRange] = useState({ min: 1986, max: new Date().getFullYear() });
  const [selectedCharacterForDetail, setSelectedCharacterForDetail] = useState<Character | null>(
    null,
  );

  // Load data
  const { characters, rankings, loading, error } = useRankingData();

  // Get theme for debugging
  const { theme } = useTheme();

  // Character selection
  const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

  // Calculate available ranges for filter controls
  const availableYearRange = useMemo(() => DataProcessor.getYearRange(rankings), [rankings]);
  const availableRankRange = useMemo(() => DataProcessor.getRankRange(rankings), [rankings]);

  // Initialize year range from actual data once loaded
  useEffect(() => {
    if (rankings.length > 0) {
      setYearRange(availableYearRange);
    }
  }, [rankings, availableYearRange]);

  // Filter rankings by year range
  const filteredRankings = useMemo(() => {
    return DataProcessor.filterRankingsByYearRange(rankings, yearRange);
  }, [rankings, yearRange]);

  // Handle character detail display
  const handleCharacterClick = (character: Character) => {
    setSelectedCharacterForDetail(character);
  };

  const handleCloseCharacterDetail = () => {
    setSelectedCharacterForDetail(null);
  };

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

  if (error) {
    return (
      <div className="app error">
        <div className="error-container">
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: 1 }}></div>
            <div style={{ textAlign: "center", flex: 2 }}>
              <h1>サンリオキャラクターランキング推移</h1>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <ThemeToggle compact />
            </div>
          </div>
          <p className="app-description">
            複数のキャラクターを選択して、年次ランキングの推移を比較できます
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="app-layout">
            <aside className="app-sidebar">
              <FilterControls
                rankings={rankings}
                yearRange={yearRange}
                availableYearRange={availableYearRange}
                availableRankRange={availableRankRange}
                onYearRangeChange={setYearRange}
                loading={loading}
              />

              <CharacterSelector
                characters={characters}
                selectedCharacters={selectedCharacters}
                onSelectionChange={handleSelectionChange}
                loading={loading}
              />
            </aside>

            <section className="app-content">
              <RankingChart
                selectedCharacters={selectedCharacters}
                characters={characters}
                rankings={filteredRankings}
                yearRange={yearRange}
                loading={loading}
              />

              {selectedCharacters.length > 0 && (
                <div className="selected-characters-actions">
                  <h3>選択中のキャラクター詳細</h3>
                  <div className="character-buttons">
                    {selectedCharacters.map((characterId) => {
                      const character = characters.find((c) => c.id === characterId);
                      return character ? (
                        <button
                          type="button"
                          key={characterId}
                          onClick={() => handleCharacterClick(character)}
                          className="character-detail-btn"
                          style={{
                            backgroundColor: `${character.color}20`,
                            borderColor: character.color,
                            color: character.color,
                          }}
                        >
                          {character.name}の詳細
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 サンリオキャラクターランキング推移. データは架空のものです。</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "8px" }}>
            現在のテーマ: {theme === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"} | data-theme:{" "}
            {theme}
          </p>
        </div>
      </footer>

      {selectedCharacterForDetail && (
        <CharacterDetail
          character={selectedCharacterForDetail}
          rankings={rankings}
          isOpen={true}
          onClose={handleCloseCharacterDetail}
        />
      )}
    </div>
  );
}

export default App;
