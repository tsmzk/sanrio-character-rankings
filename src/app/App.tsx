import { useEffect, useMemo, useState } from "react";
import { CharacterSelector, useCharacterSelection } from "../features/character";
import { RankingChart, useRankingData } from "../features/ranking";
import { ThemeToggle } from "../features/theme";
import type { Character } from "../shared/types";
import "./App.css";

function App() {
  const { characters, rankings, loading, error } = useRankingData();
  const characterSelection = useCharacterSelection();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacterForDetail, setSelectedCharacterForDetail] = useState<Character | null>(
    null,
  );

  // Calculate available year range from actual data
  const availableYearRange = useMemo(() => {
    if (!rankings || rankings.length === 0) {
      return { min: 1986, max: 2025 };
    }
    const years = rankings.map((r) => r.year);
    return {
      min: Math.min(...years),
      max: Math.max(...years),
    };
  }, [rankings]);

  // Initialize year range with default values first
  const [yearRange, setYearRange] = useState({ min: 1986, max: 2025 });

  // Update year range when data loads
  useEffect(() => {
    if (availableYearRange.min !== 1986 || availableYearRange.max !== 2025) {
      setYearRange(availableYearRange);
    }
  }, [availableYearRange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get selected character objects for display
  const selectedCharacterObjects = characters.filter((char) =>
    characterSelection.selectedCharacters.includes(char.id),
  );

  // Filter characters by search query
  const filteredCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>サンリオキャラクターランキング推移</h1>
          <p>推移のキャラクターを選択して、年次ランキングの推移をトラッキングします</p>
          <ThemeToggle />
        </div>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <section className="filter-section">
            <h2>ランキング期間</h2>
            <div className="year-range-selector">
              <div className="available-range-info">
                利用可能期間: {availableYearRange.min}年〜{availableYearRange.max}年
              </div>
              <div className="year-display">
                <span className="year-value">{yearRange.min}年</span>
                <span className="year-separator">〜</span>
                <span className="year-value">{yearRange.max}年</span>
              </div>
              <div className="year-sliders">
                <label className="slider-label">
                  開始年:
                  <input
                    type="range"
                    min={availableYearRange.min}
                    max={availableYearRange.max}
                    value={yearRange.min}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value <= yearRange.max) {
                        setYearRange({ ...yearRange, min: value });
                      }
                    }}
                    className="year-slider"
                  />
                </label>
                <label className="slider-label">
                  終了年:
                  <input
                    type="range"
                    min={availableYearRange.min}
                    max={availableYearRange.max}
                    value={yearRange.max}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= yearRange.min) {
                        setYearRange({ ...yearRange, max: value });
                      }
                    }}
                    className="year-slider"
                  />
                </label>
              </div>
              <button
                type="button"
                className="reset-range-button"
                onClick={() => setYearRange(availableYearRange)}
                disabled={
                  yearRange.min === availableYearRange.min &&
                  yearRange.max === availableYearRange.max
                }
              >
                全期間にリセット
              </button>
            </div>
          </section>

          <section className="character-section">
            <h2>キャラクター選択</h2>
            <div className="character-search">
              <input
                type="text"
                placeholder="キャラクター検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="検索をクリア"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-results-info">
                {filteredCharacters.length}件のキャラクターが見つかりました
              </div>
            )}
            <CharacterSelector
              characters={filteredCharacters}
              toggleCharacter={characterSelection.toggleCharacter}
              isSelected={characterSelection.isSelected}
            />
          </section>
        </div>

        <main className="main-content">
          <section className="chart-section">
            <h2>ランキング推移</h2>
            <RankingChart
              rankings={rankings}
              characters={characters}
              selectedCharacters={characterSelection.selectedCharacters}
              yearRange={yearRange}
            />
          </section>

          <section className="stats-section">
            <h3>選択中のキャラクター詳細</h3>
            <div className="character-stats">
              {selectedCharacterObjects.map((character) => (
                <button
                  key={character.id}
                  type="button"
                  className="character-card clickable"
                  onClick={() => setSelectedCharacterForDetail(character)}
                  style={{ border: "none", textAlign: "left", width: "100%" }}
                >
                  <h4>{character.name}</h4>
                  <p>{character.description}</p>
                  <span className="click-hint">クリックで詳細表示</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Character Detail Modal */}
      {selectedCharacterForDetail && (
        <button
          type="button"
          className="modal-overlay"
          onClick={() => setSelectedCharacterForDetail(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSelectedCharacterForDetail(null);
            }
          }}
          aria-label="Close modal"
          style={{ border: "none", background: "transparent", padding: 0 }}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              // Just prevent event propagation, don't close modal
              e.stopPropagation();
            }}
          >
            <div className="modal-header">
              <h2>{selectedCharacterForDetail.name}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedCharacterForDetail(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="character-description">{selectedCharacterForDetail.description}</p>
              <div className="character-details">
                {selectedCharacterForDetail.nameEn && (
                  <p>
                    <strong>英語名:</strong> {selectedCharacterForDetail.nameEn}
                  </p>
                )}
                {selectedCharacterForDetail.debutYear && (
                  <p>
                    <strong>デビュー年:</strong> {selectedCharacterForDetail.debutYear}年
                  </p>
                )}
              </div>
              <div className="character-rankings">
                <h4>ランキング履歴</h4>
                <div className="ranking-history">
                  {rankings
                    .filter((r) => r.characterId === selectedCharacterForDetail.id)
                    .sort((a, b) => b.year - a.year)
                    .slice(0, 10)
                    .map((ranking) => (
                      <div key={ranking.year} className="ranking-entry">
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
