import type React from "react";
import type { RankingEntry } from "../../../shared/types";
import { useFilterLogic } from "../hooks/useFilterLogic";
import { FilterHeader } from "./FilterHeader";
import { FilterEmptyState, FilterLoadingState } from "./FilterLoadingState";
import { FilterSummary } from "./FilterSummary";
import { RankRangeSelector } from "./RankRangeSelector";
import { YearRangeSelector } from "./YearRangeSelector";

interface FilterControlsProps {
  rankings: RankingEntry[] | undefined;
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
  loading = false,
}) => {
  const { localYearRange, rankRange, handleYearRangeChange, handleRankRangeChange, resetFilters } =
    useFilterLogic({
      rankings,
      yearRange,
      availableYearRange,
      availableRankRange,
      onYearRangeChange,
      onRankRangeChange,
    });

  // Loading state
  if (loading) {
    return <FilterLoadingState className="p-4" />;
  }

  // Empty state
  if (!rankings || rankings.length === 0) {
    return <FilterEmptyState className="p-4" />;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header with reset button */}
      <FilterHeader onReset={resetFilters} />

      {/* Year range selector */}
      <YearRangeSelector
        yearRange={localYearRange}
        availableYearRange={availableYearRange}
        onYearRangeChange={handleYearRangeChange}
      />

      {/* Rank range selector (optional) */}
      {onRankRangeChange && (
        <RankRangeSelector
          rankRange={rankRange}
          availableRankRange={availableRankRange}
          onRankRangeChange={handleRankRangeChange}
        />
      )}

      {/* Current filters summary */}
      <FilterSummary
        yearRange={localYearRange}
        rankRange={onRankRangeChange ? rankRange : undefined}
        showRankRange={!!onRankRangeChange}
      />
    </div>
  );
};
