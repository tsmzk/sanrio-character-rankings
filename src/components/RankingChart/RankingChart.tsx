import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useChartConfig } from "../../hooks";
import type { Character, RankingEntry } from "../../types";
import { ChartHelpers } from "../../utils";
import "./RankingChart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RankingChartProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  height?: number;
  loading?: boolean;
}

export const RankingChart: React.FC<RankingChartProps> = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
  height = 400,
  loading = false,
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const { chartData, chartOptions } = useChartConfig({
    selectedCharacters,
    characters,
    rankings,
    yearRange,
  });

  // Merge with responsive options based on container width - メモ化して無限ループを防ぐ
  const responsiveOptions: ChartOptions<"line"> = useMemo(
    () => ({
      ...ChartHelpers.getOptimalChartOptions(containerWidth),
      ...chartOptions,
    }),
    [chartOptions, containerWidth],
  );

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      setContainerWidth(containerRef.current.offsetWidth);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="ranking-chart loading" style={{ height }}>
        <div className="loading-spinner"></div>
        <p>チャートを読み込み中...</p>
      </div>
    );
  }

  if (selectedCharacters.length === 0) {
    return (
      <div className="ranking-chart empty" style={{ height }}>
        <div className="empty-state">
          <h3>キャラクターを選択してください</h3>
          <p>左側からキャラクターを選択すると、ランキング推移が表示されます。</p>
        </div>
      </div>
    );
  }

  const hasData = chartData.datasets.some((dataset) => dataset.data.length > 0);

  if (!hasData) {
    return (
      <div className="ranking-chart no-data" style={{ height }}>
        <div className="no-data-state">
          <h3>データがありません</h3>
          <p>選択されたキャラクターの指定期間内のランキングデータが見つかりません。</p>
          <p>別の期間を選択するか、他のキャラクターを選んでください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ranking-chart" ref={containerRef}>
      <div className="ranking-chart__header">
        <h2>ランキング推移</h2>
        <div className="chart-info">
          <span className="year-range">
            {yearRange.min}年 - {yearRange.max}年
          </span>
          <span className="character-count">{selectedCharacters.length}キャラクター</span>
        </div>
      </div>

      <div className="chart-container" style={{ height }}>
        <Line ref={chartRef} data={chartData} options={responsiveOptions} />
      </div>

      <div className="chart-legend">
        {selectedCharacters.map((characterId) => {
          const character = characters.find((c) => c.id === characterId);
          if (!character) return null;

          const characterRankings = rankings.filter(
            (r) =>
              r.characterId === characterId && r.year >= yearRange.min && r.year <= yearRange.max,
          );

          const bestRank =
            characterRankings.length > 0 ? Math.min(...characterRankings.map((r) => r.rank)) : null;

          const worstRank =
            characterRankings.length > 0 ? Math.max(...characterRankings.map((r) => r.rank)) : null;

          return (
            <div key={characterId} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: character.color }}></div>
              <div className="legend-info">
                <span className="legend-name">{character.name}</span>
                {bestRank && worstRank && (
                  <span className="legend-stats">
                    最高: {bestRank}位 | 最低: {worstRank}位
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
