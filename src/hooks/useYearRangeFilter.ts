import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../shared/firebase";
import type { RankingEntry } from "../shared/types";
import { useDebouncedEffect } from "../shared/utils";

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

  // ユーザー操作による変更だけを GA に送りたいので、ハンドラ呼び出し時にフラグを立てる。
  //
  // 注意: 現状のアプリではデータ再フェッチが発生しないため問題ないが、
  // 将来 stale-while-revalidate 等の再ロード機構を入れる際は、
  // userInteractedRef のリセットタイミングを再評価する必要がある。
  const userInteractedRef = useRef(false);

  useDebouncedEffect(
    () => {
      if (!userInteractedRef.current) return;
      userInteractedRef.current = false;
      trackEvent({
        name: "year_range_change",
        params: { start_year: yearRange.min, end_year: yearRange.max },
      });
    },
    [yearRange.min, yearRange.max],
    500,
  );

  const updateStartYear = (value: number) => {
    if (value <= yearRange.max) {
      userInteractedRef.current = true;
      setYearRange({ ...yearRange, min: value });
    }
  };

  const updateEndYear = (value: number) => {
    if (value >= yearRange.min) {
      userInteractedRef.current = true;
      setYearRange({ ...yearRange, max: value });
    }
  };

  const resetToFullRange = () => {
    userInteractedRef.current = true;
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
