import React, { useState, useMemo } from 'react';
import type { Character } from '../../types';
import { DataProcessor } from '../../utils';
import './CharacterSelector.module.css';

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
  loading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');


  const filteredCharacters = useMemo(() => {
    return DataProcessor.filterCharacters(characters, {
      searchQuery,
    });
  }, [characters, searchQuery]);

  const handleCharacterToggle = (characterId: string) => {
    const newSelection = selectedCharacters.includes(characterId)
      ? selectedCharacters.filter(id => id !== characterId)
      : [...selectedCharacters, characterId];
    onSelectionChange(newSelection);
  };


  const clearSelection = () => {
    onSelectionChange([]);
  };

  const clearFilters = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="character-selector loading">
        <div className="loading-spinner"></div>
        <p>キャラクターを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="character-selector">
      <div className="character-selector__header">
        <h2>キャラクター選択</h2>
        <div className="character-selector__actions">
          <span className="selected-count">
            {selectedCharacters.length}件選択中
          </span>
          <button 
            onClick={clearSelection}
            disabled={selectedCharacters.length === 0}
            className="clear-selection-btn"
          >
            選択解除
          </button>
        </div>
      </div>

      <div className="character-selector__filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="キャラクター名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          onClick={clearFilters}
          className="clear-filters-btn"
          disabled={searchQuery === ''}
        >
          検索クリア
        </button>
      </div>

      <div className="character-selector__grid">
        {filteredCharacters.length === 0 ? (
          <div className="no-results">
            <p>該当するキャラクターが見つかりません</p>
          </div>
        ) : (
          filteredCharacters.map(character => (
            <div
              key={character.id}
              className={`character-item ${
                selectedCharacters.includes(character.id) ? 'selected' : ''
              }`}
              onClick={() => handleCharacterToggle(character.id)}
            >
              <div
                className="character-color"
                style={{ backgroundColor: character.color }}
              ></div>
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                {character.nameEn && (
                  <p className="character-name-en">{character.nameEn}</p>
                )}
                <p className="character-debut">{character.debutYear}年デビュー</p>
              </div>
              <div className="character-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCharacters.includes(character.id)}
                  onChange={() => handleCharacterToggle(character.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {selectedCharacters.length > 0 && (
        <div className="selected-characters-summary">
          <h3>選択中のキャラクター:</h3>
          <div className="selected-characters-list">
            {selectedCharacters.map(characterId => {
              const character = characters.find(c => c.id === characterId);
              return character ? (
                <span
                  key={characterId}
                  className="selected-character-tag"
                  style={{ backgroundColor: character.color + '20', borderColor: character.color }}
                >
                  {character.name}
                  <button
                    onClick={() => handleCharacterToggle(characterId)}
                    className="remove-character-btn"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};