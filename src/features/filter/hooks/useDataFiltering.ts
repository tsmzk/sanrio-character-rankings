import { useEffect, useMemo, useState } from "react";
import type { RankingEntry } from "../../../shared/types";
import { DataProcessor } from "../../../shared/utils";

interface UseDataFilteringProps {
  rankings: RankingEntry[];
}

interface UseDataFilteringReturn {
  yearRange: { min: number; max: number };
  availableYearRange: { min: number; max: number };
  availableRankRange: { min: number; max: number };
  filteredRankings: RankingEntry[];
  setYearRange: (range: { min: number; max: number }) => void;
}

export const useDataFiltering = ({ rankings }: UseDataFilteringProps): UseDataFilteringReturn => {
  const [yearRange, setYearRange] = useState({
    min: 1986,
    max: new Date().getFullYear(),
  });

  // Calculate available ranges from data
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

  return {
    yearRange,
    availableYearRange,
    availableRankRange,
    filteredRankings,
    setYearRange,
  };
};
