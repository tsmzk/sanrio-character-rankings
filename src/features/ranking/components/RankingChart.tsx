import type React from "react";
import { useMemo } from "react";
import type { Character, RankingEntry } from "../../../shared/types";
import { useChartConfig } from "../hooks/useChartConfig";
import { useChartResize } from "../hooks/useChartResize";
import { ChartHelpers } from "../utils/ChartHelpers";
import { ChartContainer } from "./ChartContainer";
import { ChartHeader } from "./ChartHeader";
import { ChartLegend } from "./ChartLegend";
import { ChartEmptyState, ChartLoadingState, ChartNoDataState } from "./ChartStates";

interface RankingChartProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  height?: number;
  windowWidth?: number;
  loading?: boolean;
  className?: string;
}

export const RankingChart: React.FC<RankingChartProps> = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
  height = 400,
  windowWidth = window.innerWidth,
  loading = false,
  className = "",
}) => {
  const { containerRef, containerWidth } = useChartResize();

  const { chartData, chartOptions } = useChartConfig({
    selectedCharacters,
    characters,
    rankings,
    yearRange,
    windowWidth,
  });

  // Merge with responsive options based on container width
  const responsiveOptions = useMemo(
    () => ({
      ...ChartHelpers.getOptimalChartOptions(containerWidth),
      ...chartOptions,
    }),
    [chartOptions, containerWidth],
  );

  // Loading state
  if (loading) {
    return <ChartLoadingState height={height} className={className} />;
  }

  // Empty state - no characters selected
  if (selectedCharacters.length === 0) {
    return <ChartEmptyState height={height} className={className} />;
  }

  // No data state - characters selected but no data available
  const hasData = chartData.datasets.some((dataset) => dataset.data.length > 0);
  if (!hasData) {
    return <ChartNoDataState height={height} className={className} />;
  }

  return (
    <div ref={containerRef} className={`space-y-4 ${className}`}>
      {/* Chart header with metadata */}
      <ChartHeader yearRange={yearRange} characterCount={selectedCharacters.length} />

      {/* Main chart container */}
      <ChartContainer chartData={chartData} chartOptions={responsiveOptions} height={height} />

      {/* Character legend with statistics */}
      <ChartLegend
        selectedCharacters={selectedCharacters}
        characters={characters}
        rankings={rankings}
        yearRange={yearRange}
      />
    </div>
  );
};
