import React, { useState, useEffect } from 'react';
import type { RankingEntry } from '../../types';
import './FilterControls.module.css';

interface FilterControlsProps {
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  availableYearRange: { min: number; max: number };
  availableRankRange: { min: number; max: number };
  onYearRangeChange: (range: { min: number; max: number }) => void;
  onRankRangeChange?: (range: { min: number; max: number }) => void;
  loading?: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  rankings,
  yearRange,
  availableYearRange,
  availableRankRange,
  onYearRangeChange,
  onRankRangeChange,
  loading = false
}) => {
  const [localYearRange, setLocalYearRange] = useState(yearRange);
  const [rankRange, setRankRange] = useState({ min: 1, max: 12 });

  // Update local state when props change
  useEffect(() => {
    setLocalYearRange(yearRange);
  }, [yearRange]);

  // Initialize rank range
  useEffect(() => {
    if (rankings.length > 0) {
      setRankRange(availableRankRange);
    }
  }, [rankings, availableRankRange]);

  const handleYearRangeChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...localYearRange, [type]: value };
    
    // Ensure min is not greater than max
    if (type === 'min' && value > localYearRange.max) {
      newRange.max = value;
    }
    if (type === 'max' && value < localYearRange.min) {
      newRange.min = value;
    }
    
    setLocalYearRange(newRange);
    onYearRangeChange(newRange);
  };

  const handleRankRangeChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...rankRange, [type]: value };
    
    // Ensure min is not greater than max
    if (type === 'min' && value > rankRange.max) {
      newRange.max = value;
    }
    if (type === 'max' && value < rankRange.min) {
      newRange.min = value;
    }
    
    setRankRange(newRange);
    onRankRangeChange?.(newRange);
  };

  const resetFilters = () => {
    const fullYearRange = availableYearRange;
    const fullRankRange = availableRankRange;
    
    setLocalYearRange(fullYearRange);
    setRankRange(fullRankRange);
    
    onYearRangeChange(fullYearRange);
    onRankRangeChange?.(fullRankRange);
  };

  const getYearMarks = () => {
    const marks = [];
    const step = Math.ceil((availableYearRange.max - availableYearRange.min) / 5);
    
    for (let year = availableYearRange.min; year <= availableYearRange.max; year += step) {
      marks.push(year);
    }
    
    if (!marks.includes(availableYearRange.max)) {
      marks.push(availableYearRange.max);
    }
    
    return marks;
  };

  if (loading) {
    return (
      <div className="filter-controls loading">
        <div className="loading-spinner"></div>
        <p>フィルターを読み込み中...</p>
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="filter-controls empty">
        <p>フィルター設定できません（データがありません）</p>
      </div>
    );
  }

  return (
    <div className="filter-controls">
      <div className="filter-controls__header">
        <h3>表示設定</h3>
        <button 
          onClick={resetFilters}
          className="reset-filters-btn"
        >
          リセット
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">表示期間</label>
          <div className="year-range-controls">
            <div className="range-input-group">
              <label htmlFor="year-min">開始年</label>
              <select
                id="year-min"
                value={localYearRange.min}
                onChange={(e) => handleYearRangeChange('min', parseInt(e.target.value))}
                className="year-select"
              >
                {Array.from(
                  { length: availableYearRange.max - availableYearRange.min + 1 },
                  (_, i) => availableYearRange.min + i
                ).map(year => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
            </div>
            
            <span className="range-separator">〜</span>
            
            <div className="range-input-group">
              <label htmlFor="year-max">終了年</label>
              <select
                id="year-max"
                value={localYearRange.max}
                onChange={(e) => handleYearRangeChange('max', parseInt(e.target.value))}
                className="year-select"
              >
                {Array.from(
                  { length: availableYearRange.max - availableYearRange.min + 1 },
                  (_, i) => availableYearRange.min + i
                ).map(year => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="range-slider-container">
            <input
              type="range"
              min={availableYearRange.min}
              max={availableYearRange.max}
              value={localYearRange.min}
              onChange={(e) => handleYearRangeChange('min', parseInt(e.target.value))}
              className="range-slider range-slider-min"
            />
            <input
              type="range"
              min={availableYearRange.min}
              max={availableYearRange.max}
              value={localYearRange.max}
              onChange={(e) => handleYearRangeChange('max', parseInt(e.target.value))}
              className="range-slider range-slider-max"
            />
            <div className="range-track">
              <div 
                className="range-highlight"
                style={{
                  left: `${((localYearRange.min - availableYearRange.min) / (availableYearRange.max - availableYearRange.min)) * 100}%`,
                  width: `${((localYearRange.max - localYearRange.min) / (availableYearRange.max - availableYearRange.min)) * 100}%`
                }}
              ></div>
            </div>
            <div className="range-marks">
              {getYearMarks().map(year => (
                <div
                  key={year}
                  className="range-mark"
                  style={{
                    left: `${((year - availableYearRange.min) / (availableYearRange.max - availableYearRange.min)) * 100}%`
                  }}
                >
                  <span className="range-mark-label">{year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {onRankRangeChange && (
          <div className="filter-group">
            <label className="filter-label">順位範囲</label>
            <div className="rank-range-controls">
              <div className="range-input-group">
                <label htmlFor="rank-min">最高順位</label>
                <select
                  id="rank-min"
                  value={rankRange.min}
                  onChange={(e) => handleRankRangeChange('min', parseInt(e.target.value))}
                  className="rank-select"
                >
                  {Array.from(
                    { length: availableRankRange.max - availableRankRange.min + 1 },
                    (_, i) => availableRankRange.min + i
                  ).map(rank => (
                    <option key={rank} value={rank}>
                      {rank}位
                    </option>
                  ))}
                </select>
              </div>
              
              <span className="range-separator">〜</span>
              
              <div className="range-input-group">
                <label htmlFor="rank-max">最低順位</label>
                <select
                  id="rank-max"
                  value={rankRange.max}
                  onChange={(e) => handleRankRangeChange('max', parseInt(e.target.value))}
                  className="rank-select"
                >
                  {Array.from(
                    { length: availableRankRange.max - availableRankRange.min + 1 },
                    (_, i) => availableRankRange.min + i
                  ).map(rank => (
                    <option key={rank} value={rank}>
                      {rank}位
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="filter-help-text">
              この順位範囲に入ったことがあるキャラクターのみを表示します
            </p>
          </div>
        )}
      </div>

      <div className="current-filters">
        <div className="current-filter">
          <strong>表示期間:</strong> {localYearRange.min}年 〜 {localYearRange.max}年
          <span className="filter-count">
            ({localYearRange.max - localYearRange.min + 1}年間)
          </span>
        </div>
        {onRankRangeChange && (
          <div className="current-filter">
            <strong>順位範囲:</strong> {rankRange.min}位 〜 {rankRange.max}位
          </div>
        )}
      </div>
    </div>
  );
};