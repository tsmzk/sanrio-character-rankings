import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type React from "react";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { Character, RankingEntry } from "../../../shared/types";
import { useScrollSync } from "../hooks/useScrollSync";
import { getMedalCanvas, type MedalRank } from "../utils/medalIcons";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const MEDAL_SIZE = 18;
const MEDAL_RADIUS = MEDAL_SIZE / 2;
const MEDAL_RANKS: ReadonlySet<number> = new Set([1, 2, 3]);
// 年あたりの最小幅。これ以上の年数があると横スクロールが発生する
const PX_PER_YEAR = 32;

interface CharacterSparklineProps {
  character: Character;
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  color: string;
  /** 数値指定 = 固定高さ。未指定なら親要素の高さに合わせて伸縮する */
  height?: number;
}

export const CharacterSparkline: React.FC<CharacterSparklineProps> = ({
  character,
  rankings,
  yearRange,
  color,
  height,
}) => {
  const { ref: scrollRef, onScroll } = useScrollSync();

  const data = useMemo(() => {
    const years = Array.from(
      { length: yearRange.max - yearRange.min + 1 },
      (_, i) => yearRange.min + i,
    );
    const characterRankings = rankings.filter((r) => r.characterId === character.id);
    const ranked = characterRankings.filter((r) => r.rank > 0);
    if (ranked.length === 0) return null;

    const firstRankingYear = Math.min(...ranked.map((r) => r.year));
    const inRange = ranked.filter((r) => r.year >= yearRange.min && r.year <= yearRange.max);
    const lowestRank = inRange.length > 0 ? Math.max(...inRange.map((r) => r.rank)) : 1;
    const outOfRankPosition = lowestRank + 5;

    const points = years.map((year) => {
      if (year < firstRankingYear) return null;
      const ranking = characterRankings.find((r) => r.year === year);
      if (!ranking) return outOfRankPosition;
      if (ranking.rank === 0 || ranking.rank === null) return outOfRankPosition;
      return ranking.rank;
    });

    return { years, points, outOfRankPosition };
  }, [character.id, rankings, yearRange]);

  if (!data) {
    return (
      <div
        className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 h-full"
        style={height !== undefined ? { height } : undefined}
      >
        この期間のランキングデータはありません
      </div>
    );
  }

  const innerWidthPx = data.years.length * PX_PER_YEAR;

  const chartData = {
    labels: data.years.map(String),
    datasets: [
      {
        data: data.points,
        borderColor: color,
        backgroundColor: `${color}1f`,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: (ctx: { parsed?: { y: number } }) => {
          const v = ctx.parsed?.y;
          if (v === data.outOfRankPosition) return 4;
          if (v !== undefined && MEDAL_RANKS.has(v)) return MEDAL_RADIUS;
          return 2.5;
        },
        pointHoverRadius: (ctx: { parsed?: { y: number } }) => {
          const v = ctx.parsed?.y;
          if (v !== undefined && MEDAL_RANKS.has(v)) return MEDAL_RADIUS + 1;
          return 5;
        },
        pointStyle: (ctx: { parsed?: { y: number } }) => {
          const v = ctx.parsed?.y;
          if (v === data.outOfRankPosition) return "crossRot";
          if (v !== undefined && MEDAL_RANKS.has(v)) {
            const medal = getMedalCanvas(v as MedalRank, MEDAL_SIZE);
            if (medal) return medal;
          }
          return "circle";
        },
        pointBorderWidth: (ctx: { parsed?: { y: number } }) => {
          const v = ctx.parsed?.y;
          if (v === data.outOfRankPosition) return 2;
          if (v !== undefined && MEDAL_RANKS.has(v)) return 0;
          return 1.5;
        },
        pointBorderColor: color,
        pointBackgroundColor: "#ffffff",
        segment: {
          borderDash: (ctx: {
            p0?: { parsed?: { y: number } };
            p1?: { parsed?: { y: number } };
          }) => {
            const f = ctx.p0?.parsed?.y;
            const t = ctx.p1?.parsed?.y;
            return f === data.outOfRankPosition || t === data.outOfRankPosition
              ? [4, 4]
              : undefined;
          },
        },
        spanGaps: false,
        clip: false as const,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10, bottom: 0, left: 4, right: 4 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => {
            const v = ctx.parsed.y;
            if (v === data.outOfRankPosition) return "ランク外";
            return `${v}位`;
          },
          title: (items: { label?: string }[]) => {
            const label = items[0]?.label;
            return label ? `${label}年` : "";
          },
        },
      },
    },
    scales: {
      y: {
        reverse: true,
        min: 1,
        max: data.outOfRankPosition + 1,
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      x: {
        ticks: {
          display: true,
          font: { size: 9 },
          color: "rgba(120, 120, 120, 0.85)",
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 8,
          padding: 2,
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="relative w-full overflow-x-auto overscroll-x-contain touch-pan-x h-full"
      style={height !== undefined ? { height } : undefined}
    >
      <div
        style={{
          width: `${innerWidthPx}px`,
          minWidth: "100%",
          height: "100%",
        }}
      >
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
