import type React from "react";
import { useId } from "react";
import type { Character, RankingEntry } from "../../../../shared/types";

// import "./CharacterDetail.module.css"; // TODO: Convert to Tailwind

interface CharacterDetailProps {
  character: Character;
  rankings: RankingEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  rankings,
  isOpen,
  onClose,
}) => {
  const headerId = useId();

  if (!isOpen) return null;

  const characterRankings = rankings.filter((r) => r.characterId === character.id);

  const recentRankings = characterRankings.sort((a, b) => b.year - a.year).slice(0, 5);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headerId}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id={headerId}>{character.name}</h2>
          <button type="button" onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="character-description">
            <p>{character.description}</p>
          </div>

          <div className="character-details">
            <p>
              <strong>デビュー年:</strong> {character.debutYear}年
            </p>
            <p>
              <strong>代表色:</strong> {character.color}
            </p>
          </div>

          <div className="character-rankings">
            <h4>ランキング履歴</h4>
            {recentRankings.length > 0 ? (
              <div className="ranking-history">
                {recentRankings.map((ranking) => (
                  <div key={ranking.year} className="ranking-entry">
                    {ranking.year}年: {ranking.rank}位
                  </div>
                ))}
              </div>
            ) : (
              <p>ランキングデータがありません</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
