import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type React from "react";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { Character, RankingEntry } from "../../../shared/types";
import { CHART_COLOR_PALETTE } from "../utils/chartColors";
import { getMedalCanvas, type MedalRank } from "../utils/medalIcons";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MEDAL_SIZE = 22;
const MEDAL_RADIUS = MEDAL_SIZE / 2;
const MEDAL_HOVER_RADIUS = MEDAL_RADIUS + 2;
const MEDAL_RANKS: ReadonlySet<number> = new Set([1, 2, 3]);

interface RankingChartProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  loading?: boolean;
  className?: string;
}

export const RankingChart: React.FC<RankingChartProps> = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
  loading = false,
  className = "",
}) => {
  const chartData = useMemo(() => {
    if (selectedCharacters.length === 0) return null;

    const years = Array.from(
      { length: yearRange.max - yearRange.min + 1 },
      (_, i) => yearRange.min + i,
    );

    let lowestRank = 1;
    selectedCharacters.forEach((characterId) => {
      const characterRankings = rankings.filter(
        (r) =>
          r.characterId === characterId &&
          r.year >= yearRange.min &&
          r.year <= yearRange.max &&
          r.rank > 0,
      );
      if (characterRankings.length > 0) {
        const maxRank = Math.max(...characterRankings.map((r) => r.rank));
        lowestRank = Math.max(lowestRank, maxRank);
      }
    });

    const outOfRankPosition = lowestRank + 5;

    const datasets = selectedCharacters
      .map((characterId, index) => {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return null;

        const characterRankings = rankings.filter((r) => r.characterId === characterId);
        const firstRankingYear = Math.min(
          ...characterRankings.filter((r) => r.rank > 0).map((r) => r.year),
        );

        const data = years.map((year) => {
          if (year < firstRankingYear) return null;
          const ranking = characterRankings.find((r) => r.year === year);
          if (!ranking) return outOfRankPosition;
          if (ranking.rank === 0 || ranking.rank === null) return outOfRankPosition;
          return ranking.rank;
        });

        const color = CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length];

        return {
          label: character.name,
          data: data,
          borderColor: color,
          backgroundColor: `${color}20`,
          tension: 0.1,
          pointRadius: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return 6;
            if (value !== undefined && MEDAL_RANKS.has(value)) return MEDAL_RADIUS;
            return 4;
          },
          pointHoverRadius: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value !== undefined && MEDAL_RANKS.has(value)) return MEDAL_HOVER_RADIUS;
            return 8;
          },
          pointStyle: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return "crossRot";
            if (value !== undefined && MEDAL_RANKS.has(value)) {
              const medal = getMedalCanvas(value as MedalRank, MEDAL_SIZE);
              if (medal) return medal;
            }
            return "circle";
          },
          pointBorderWidth: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return 3;
            if (value !== undefined && MEDAL_RANKS.has(value)) return 0;
            return 1;
          },
          segment: {
            borderDash: (ctx: {
              p0?: { parsed?: { y: number } };
              p1?: { parsed?: { y: number } };
            }) => {
              const fromValue = ctx.p0?.parsed?.y;
              const toValue = ctx.p1?.parsed?.y;
              return fromValue === outOfRankPosition || toValue === outOfRankPosition
                ? [5, 5]
                : undefined;
            },
          },
          spanGaps: false,
          // 1位メダルが chart area 上端で切れるのを防ぐ（layout.padding 側で吸収）
          clip: false as const,
        };
      })
      .filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== null);

    return {
      labels: years.map((year) => `${year}年`),
      datasets: datasets,
      outOfRankPosition: outOfRankPosition,
      lowestRank: lowestRank,
    };
  }, [selectedCharacters, characters, rankings, yearRange]);

  const options = useMemo(() => {
    if (!chartData) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { reverse: true, min: 1, max: 35 } },
      };
    }

    const outOfRankPosition =
      (chartData as { outOfRankPosition?: number })?.outOfRankPosition || 30;
    const lowestRank = (chartData as { lowestRank?: number })?.lowestRank || 1;
    const maxY = outOfRankPosition + 2;

    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { left: 20, right: 20, top: 20, bottom: 20 },
      },
      plugins: {
        legend: { position: "top" as const },
        title: { display: false },
        tooltip: {
          callbacks: {
            label: (context: { dataset: { label?: string }; parsed: { y: number } }) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y;
              if (value === outOfRankPosition) {
                return `${label}: ランク外`;
              }
              return `${label}: ${value}位`;
            },
          },
        },
      },
      scales: {
        y: {
          reverse: true,
          min: 1,
          max: maxY,
          ticks: {
            stepSize: Math.max(1, Math.ceil(lowestRank / 10)),
            callback: (value: number | string) => {
              const intValue = Math.round(Number(value));
              if (intValue !== Number(value)) return "";
              if (intValue > outOfRankPosition) return "";
              if (intValue === outOfRankPosition) return "ランク外";
              if (intValue < 1) return "";
              return `${intValue}位`;
            },
            maxTicksLimit: 15,
            font: { size: 12 },
          },
          grid: {
            color: (context: { tick: { value: number } }) =>
              context.tick.value === outOfRankPosition
                ? "rgba(255, 107, 157, 0.3)"
                : "rgba(128, 128, 128, 0.1)",
            lineWidth: (context: { tick: { value: number } }) =>
              context.tick.value === outOfRankPosition ? 2 : 1,
          },
          title: { display: true, text: "ランキング順位" },
        },
        x: {
          ticks: { font: { size: 12 } },
          title: { display: true, text: "年" },
        },
      },
    };
  }, [chartData]);

  if (loading) {
    return (
      <div className={`chart-placeholder ${className}`}>
        <p>Loading chart...</p>
      </div>
    );
  }

  if (selectedCharacters.length === 0) {
    return (
      <div className={`chart-placeholder ${className}`}>
        <p>キャラクターを選択してください</p>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className={`chart-placeholder ${className}`}>
        <p>データがありません</p>
      </div>
    );
  }

  const chartJsData = chartData
    ? {
        labels: chartData.labels,
        datasets: chartData.datasets,
      }
    : null;

  return (
    <div className={`chart-wrapper ${className}`}>
      <div className="relative h-[600px] w-full">
        {chartJsData && <Line data={chartJsData} options={options} />}
      </div>
    </div>
  );
};
