import type React from "react";
import { useMemo, useState } from "react";
import type { Character } from "../../types";
import { DataProcessor } from "../../utils";
import styles from "./CharacterSelector.module.css";

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacters: string[];
  onSelectionChange: (characterIds: string[]) => void;
  loading?: boolean;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  selectedCharacters,
  onSelectionChange,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    return DataProcessor.filterCharacters(characters, {
      searchQuery,
    });
  }, [characters, searchQuery]);

  const handleCharacterToggle = (characterId: string) => {
    const newSelection = selectedCharacters.includes(characterId)
      ? selectedCharacters.filter((id) => id !== characterId)
      : [...selectedCharacters, characterId];
    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const clearFilters = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className={`${styles.characterSelector} ${styles.loading}`}>
        <div className={styles.loadingSpinner}></div>
        <p>キャラクターを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className={styles.characterSelector}>
      <div className={styles.characterSelector__header}>
        <h2>キャラクター選択</h2>
        <div className={styles.characterSelector__actions}>
          <span className={styles.selectedCount}>{selectedCharacters.length}件選択中</span>
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedCharacters.length === 0}
            className={styles.clearSelectionBtn}
          >
            選択解除
          </button>
        </div>
      </div>

      <div className={styles.characterSelector__filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="キャラクター名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className={styles.clearFiltersBtn}
          disabled={searchQuery === ""}
        >
          検索クリア
        </button>
      </div>

      <div className={styles.characterSelector__list}>
        {filteredCharacters.length === 0 ? (
          <div className={styles.noResults}>
            <p>該当するキャラクターが見つかりません</p>
          </div>
        ) : (
          filteredCharacters.map((character) => (
            <label key={character.id} className={styles.characterItem}>
              <input
                type="checkbox"
                checked={selectedCharacters.includes(character.id)}
                onChange={() => handleCharacterToggle(character.id)}
                className={styles.characterCheckbox}
              />
              <span className={styles.characterName}>{character.name}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
};
