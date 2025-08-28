import React from 'react';
import type { Character, RankingEntry } from '../../types';
import { DataProcessor } from '../../utils';
import './CharacterDetail.module.css';

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
  onClose
}) => {
  if (!isOpen) return null;

  const characterRankings = rankings.filter(r => r.characterId === character.id);
  const stats = DataProcessor.getCharacterRankingStats(character.id, rankings);
  const yearRange = DataProcessor.getYearRange(characterRankings);

  const recentRankings = characterRankings
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  const rankingTrend = () => {
    if (characterRankings.length < 2) return 'データ不足';
    
    const sortedRankings = characterRankings.sort((a, b) => a.year - b.year);
    const recentYears = sortedRankings.slice(-3);
    
    if (recentYears.length < 2) return 'データ不足';
    
    const trend = recentYears[recentYears.length - 1].rank - recentYears[0].rank;
    
    if (trend < -2) return '上昇傾向 📈';
    if (trend > 2) return '下降傾向 📉';
    return '安定 ➡️';
  };


  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="character-detail-overlay" onClick={handleBackdropClick}>
      <div className="character-detail">
        <div className="character-detail__header">
          <div className="character-basic-info">
            <div
              className="character-avatar"
              style={{ backgroundColor: character.color }}
            >
              <span className="character-initial">
                {character.name.charAt(0)}
              </span>
            </div>
            <div className="character-names">
              <h2 className="character-name">{character.name}</h2>
              {character.nameEn && (
                <p className="character-name-en">{character.nameEn}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="character-detail__content">
          <div className="character-info-section">
            <div className="info-grid">
              <div className="info-item">
                <label>デビュー年</label>
                <span>{character.debutYear}年</span>
              </div>
              <div className="info-item">
                <label>代表色</label>
                <div className="color-display">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: character.color }}
                  ></div>
                  <span>{character.color}</span>
                </div>
              </div>
            </div>

            <div className="character-description">
              <h3>説明</h3>
              <p>{character.description}</p>
            </div>
          </div>

          <div className="ranking-stats-section">
            <h3>ランキング統計</h3>
            <div className="stats-grid">
              <div className="stat-item best-rank">
                <div className="stat-value">{stats.bestRank}位</div>
                <div className="stat-label">最高順位</div>
              </div>
              <div className="stat-item worst-rank">
                <div className="stat-value">{stats.worstRank}位</div>
                <div className="stat-label">最低順位</div>
              </div>
              <div className="stat-item avg-rank">
                <div className="stat-value">{stats.averageRank}位</div>
                <div className="stat-label">平均順位</div>
              </div>
              <div className="stat-item appearances">
                <div className="stat-value">{stats.appearances}回</div>
                <div className="stat-label">ランクイン回数</div>
              </div>
            </div>

            <div className="trend-indicator">
              <h4>最近の傾向</h4>
              <div className="trend-value">{rankingTrend()}</div>
            </div>

            {yearRange.min && yearRange.max && (
              <div className="data-range">
                <h4>データ期間</h4>
                <p>{yearRange.min}年 〜 {yearRange.max}年</p>
              </div>
            )}
          </div>

          <div className="recent-rankings-section">
            <h3>最近のランキング</h3>
            {recentRankings.length > 0 ? (
              <div className="rankings-timeline">
                {recentRankings.map((ranking, index) => (
                  <div key={ranking.year} className="timeline-item">
                    <div className="timeline-year">{ranking.year}年</div>
                    <div className="timeline-connector">
                      <div className="timeline-dot"></div>
                      {index < recentRankings.length - 1 && (
                        <div className="timeline-line"></div>
                      )}
                    </div>
                    <div className="timeline-rank">
                      <span className="rank-value">{ranking.rank}位</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-rankings">ランキングデータがありません</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};