import { useEffect, useMemo, useState } from 'react';
import type { RankingEntry } from '../shared/types';

interface YearRange {
  min: number;
  max: number;
}

export function useYearRangeFilter(rankings: RankingEntry[]) {
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
  const [yearRange, setYearRange] = useState<YearRange>({ min: 1986, max: 2025 });

  // Update year range when data loads
  useEffect(() => {
    if (availableYearRange.min !== 1986 || availableYearRange.max !== 2025) {
      setYearRange(availableYearRange);
    }
  }, [availableYearRange]);

  const updateStartYear = (value: number) => {
    if (value <= yearRange.max) {
      setYearRange({ ...yearRange, min: value });
    }
  };

  const updateEndYear = (value: number) => {
    if (value >= yearRange.min) {
      setYearRange({ ...yearRange, max: value });
    }
  };

  const resetToFullRange = () => {
    setYearRange(availableYearRange);
  };

  const isResetDisabled = yearRange.min === availableYearRange.min && 
                          yearRange.max === availableYearRange.max;

  return {
    yearRange,
    availableYearRange,
    updateStartYear,
    updateEndYear,
    resetToFullRange,
    isResetDisabled,
  };
}