import { useEffect, useState } from "react";
import type { RankingEntry } from "../../../shared/types";

interface UseFilterLogicProps {
  rankings: RankingEntry[] | undefined;
  yearRange: { min: number; max: number };
  availableYearRange: { min: number; max: number };
  availableRankRange: { min: number; max: number };
  onYearRangeChange: (range: { min: number; max: number }) => void;
  onRankRangeChange?: (range: { min: number; max: number }) => void;
}

interface UseFilterLogicReturn {
  localYearRange: { min: number; max: number };
  rankRange: { min: number; max: number };
  handleYearRangeChange: (type: "min" | "max", value: number) => void;
  handleRankRangeChange: (type: "min" | "max", value: number) => void;
  resetFilters: () => void;
}

export const useFilterLogic = ({
  rankings,
  yearRange,
  availableYearRange,
  availableRankRange,
  onYearRangeChange,
  onRankRangeChange,
}: UseFilterLogicProps): UseFilterLogicReturn => {
  const [localYearRange, setLocalYearRange] = useState(yearRange);
  const [rankRange, setRankRange] = useState({ min: 1, max: 12 });

  // Update local state when props change
  useEffect(() => {
    setLocalYearRange(yearRange);
  }, [yearRange]);

  // Initialize rank range
  useEffect(() => {
    if (rankings && rankings.length > 0 && availableRankRange) {
      setRankRange(availableRankRange);
    }
  }, [rankings, availableRankRange]);

  const handleYearRangeChange = (type: "min" | "max", value: number) => {
    const newRange = { ...localYearRange, [type]: value };

    // Ensure min is not greater than max
    if (type === "min" && value > localYearRange.max) {
      newRange.max = value;
    }
    if (type === "max" && value < localYearRange.min) {
      newRange.min = value;
    }

    setLocalYearRange(newRange);
    onYearRangeChange(newRange);
  };

  const handleRankRangeChange = (type: "min" | "max", value: number) => {
    const newRange = { ...rankRange, [type]: value };

    // Ensure min is not greater than max
    if (type === "min" && value > rankRange.max) {
      newRange.max = value;
    }
    if (type === "max" && value < rankRange.min) {
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

  return {
    localYearRange,
    rankRange,
    handleYearRangeChange,
    handleRankRangeChange,
    resetFilters,
  };
};
