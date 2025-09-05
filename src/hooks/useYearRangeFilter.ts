import { useEffect, useMemo, useState } from "react";
import type { RankingEntry } from "../shared/types";

interface YearRange {
  min: number;
  max: number;
}

const STORAGE_KEY = "sanrio-ranking-year-range";

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

  // Initialize year range with localStorage or default values
  const [yearRange, setYearRange] = useState<YearRange>(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If parsing fails, use default values
        return { min: 2016, max: 2025 };
      }
    }
    return { min: 2016, max: 2025 };
  });

  // Update year range when data loads (but respect saved preferences)
  useEffect(() => {
    if (availableYearRange.min !== 1986 || availableYearRange.max !== 2025) {
      // Only update if there's no saved preference or if saved values are out of bounds
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setYearRange(availableYearRange);
      } else {
        try {
          const savedRange = JSON.parse(saved);
          // Validate that saved range is within available bounds
          const clampedRange = {
            min: Math.max(savedRange.min, availableYearRange.min),
            max: Math.min(savedRange.max, availableYearRange.max),
          };
          setYearRange(clampedRange);
        } catch {
          setYearRange(availableYearRange);
        }
      }
    }
  }, [availableYearRange]);

  // Save to localStorage whenever yearRange changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(yearRange));
  }, [yearRange]);

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

  const isResetDisabled =
    yearRange.min === availableYearRange.min && yearRange.max === availableYearRange.max;

  return {
    yearRange,
    availableYearRange,
    updateStartYear,
    updateEndYear,
    resetToFullRange,
    isResetDisabled,
  };
}
