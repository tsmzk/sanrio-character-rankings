import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import type { Character, RankingEntry } from "../../../shared/types";
import { CHART_COLOR_PALETTE } from "../utils/chartColors";
import { getMedalCanvas, type MedalRank } from "../utils/medalIcons";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const MEDAL_SIZE = 18;
const MEDAL_RADIUS = MEDAL_SIZE / 2;
const MEDAL_RANKS: ReadonlySet<number> = new Set([1, 2, 3]);
// 1年あたりの最小幅。これより年数が多いと横スクロールが発生する
const PX_PER_YEAR = 40;

interface RankingChartMobileProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
}

export const RankingChartMobile: React.FC<RankingChartMobileProps> = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
}) => {
  // ハイライト中のキャラID（タップ済み）。null の時は全線通常表示。
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);
  // 初回表示および年範囲変更時は最新年が見えるよう右端へスクロール。
  // scrollWidth は yearRange の変化により再計算されるため両端を依存に入れる。
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll target depends on rendered width derived from yearRange
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [yearRange.max, yearRange.min]);

  const chartData = useMemo(() => {
    if (selectedCharacters.length === 0) return null;

    const years = Array.from(
      { length: yearRange.max - yearRange.min + 1 },
      (_, i) => yearRange.min + i,
    );

    let lowestRank = 1;
    selectedCharacters.forEach((characterId) => {
      const charRanks = rankings.filter(
        (r) =>
          r.characterId === characterId &&
          r.year >= yearRange.min &&
          r.year <= yearRange.max &&
          r.rank > 0,
      );
      if (charRanks.length > 0) {
        lowestRank = Math.max(lowestRank, Math.max(...charRanks.map((r) => r.rank)));
      }
    });
    const outOfRankPosition = lowestRank + 5;

    const datasets = selectedCharacters
      .map((characterId, index) => {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return null;

        const charRanks = rankings.filter((r) => r.characterId === characterId);
        const ranked = charRanks.filter((r) => r.rank > 0);
        if (ranked.length === 0) return null;
        const firstRankingYear = Math.min(...ranked.map((r) => r.year));

        const data = years.map((year) => {
          if (year < firstRankingYear) return null;
          const ranking = charRanks.find((r) => r.year === year);
          if (!ranking) return outOfRankPosition;
          if (ranking.rank === 0 || ranking.rank === null) return outOfRankPosition;
          return ranking.rank;
        });

        const color = CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length];
        const isHighlighted = highlightedId === characterId;
        const isDimmed = highlightedId !== null && !isHighlighted;

        return {
          label: character.name,
          data,
          borderColor: isDimmed ? `${color}33` : color,
          backgroundColor: `${color}15`,
          borderWidth: isHighlighted ? 3 : 2,
          tension: 0.3,
          pointRadius: (ctx: { parsed?: { y: number } }) => {
            const v = ctx.parsed?.y;
            if (v === outOfRankPosition) return isDimmed ? 0 : 4;
            if (v !== undefined && MEDAL_RANKS.has(v)) return isDimmed ? 0 : MEDAL_RADIUS;
            return isDimmed ? 0 : 3;
          },
          pointHoverRadius: (ctx: { parsed?: { y: number } }) => {
            const v = ctx.parsed?.y;
            if (v !== undefined && MEDAL_RANKS.has(v)) return MEDAL_RADIUS + 1;
            return 6;
          },
          pointStyle: (ctx: { parsed?: { y: number } }) => {
            const v = ctx.parsed?.y;
            if (v === outOfRankPosition) return "crossRot";
            if (v !== undefined && MEDAL_RANKS.has(v)) {
              const medal = getMedalCanvas(v as MedalRank, MEDAL_SIZE);
              if (medal) return medal;
            }
            return "circle";
          },
          pointBorderWidth: (ctx: { parsed?: { y: number } }) => {
            const v = ctx.parsed?.y;
            if (v === outOfRankPosition) return 2;
            if (v !== undefined && MEDAL_RANKS.has(v)) return 0;
            return 1;
          },
          pointBorderColor: isDimmed ? `${color}33` : color,
          pointBackgroundColor: isDimmed ? `${color}33` : "#ffffff",
          segment: {
            borderDash: (ctx: {
              p0?: { parsed?: { y: number } };
              p1?: { parsed?: { y: number } };
            }) => {
              const f = ctx.p0?.parsed?.y;
              const t = ctx.p1?.parsed?.y;
              return f === outOfRankPosition || t === outOfRankPosition ? [4, 4] : undefined;
            },
          },
          spanGaps: false,
          clip: false as const,
          // ハイライト中の線を最前面に重ねる
          order: isHighlighted ? -1 : 1,
        };
      })
      .filter((d): d is NonNullable<typeof d> => d !== null);

    return { labels: years.map(String), datasets, outOfRankPosition, lowestRank };
  }, [selectedCharacters, characters, rankings, yearRange, highlightedId]);

  const options = useMemo(() => {
    const outOfRankPosition = chartData?.outOfRankPosition ?? 30;
    const lowestRank = chartData?.lowestRank ?? 1;
    const maxY = outOfRankPosition + 1;

    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 250 },
      layout: {
        padding: { top: 14, right: 8, bottom: 0, left: 0 },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: true,
          callbacks: {
            label: (ctx: { dataset: { label?: string }; parsed: { y: number } }) => {
              const label = ctx.dataset.label || "";
              const v = ctx.parsed.y;
              if (v === outOfRankPosition) return `${label}: ランク外`;
              return `${label}: ${v}位`;
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
            stepSize: Math.max(1, Math.ceil(lowestRank / 5)),
            maxTicksLimit: 6,
            font: { size: 10 },
            color: "rgba(120, 120, 120, 0.85)",
            padding: 4,
            callback: (value: number | string) => {
              const n = Math.round(Number(value));
              if (n !== Number(value)) return "";
              if (n === outOfRankPosition) return "圏外";
              if (n < 1 || n > outOfRankPosition) return "";
              return `${n}位`;
            },
          },
          grid: {
            color: (ctx: { tick: { value: number } }) =>
              ctx.tick.value === outOfRankPosition
                ? "rgba(255, 107, 157, 0.25)"
                : "rgba(128, 128, 128, 0.08)",
            lineWidth: (ctx: { tick: { value: number } }) =>
              ctx.tick.value === outOfRankPosition ? 1.5 : 1,
          },
          border: { display: false },
          title: { display: false },
        },
        x: {
          ticks: {
            font: { size: 10 },
            color: "rgba(120, 120, 120, 0.85)",
            maxRotation: 0,
            autoSkip: true,
            autoSkipPadding: 6,
          },
          grid: { display: false },
          border: { display: false },
          title: { display: false },
        },
      },
    };
  }, [chartData]);

  if (chartData === null || chartData.datasets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
        この期間のランキングデータはありません
      </div>
    );
  }

  type Chip = { id: string; name: string; color: string };
  const chips = selectedCharacters
    .map((characterId, index): Chip | null => {
      const character = characters.find((c) => c.id === characterId);
      if (!character) return null;
      const color = CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length];
      return { id: characterId, name: character.name, color };
    })
    .filter((c): c is Chip => c !== null);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-wrap gap-1.5 pb-2 flex-shrink-0">
        {chips.map((chip) => {
          const active = highlightedId === chip.id;
          const dimmed = highlightedId !== null && !active;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setHighlightedId(active ? null : chip.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-all ${
                active
                  ? "border-pink-400 bg-pink-50 text-pink-700 shadow-sm dark:border-pink-500/60 dark:bg-pink-500/15 dark:text-pink-200"
                  : dimmed
                    ? "border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: dimmed ? `${chip.color}55` : chip.color }}
              />
              <span className="max-w-[7rem] truncate">{chip.name}</span>
            </button>
          );
        })}
      </div>
      <div
        ref={scrollerRef}
        className="flex-1 min-h-0 overflow-x-auto overscroll-x-contain touch-pan-x"
      >
        <div
          style={{
            width: `${chartData.labels.length * PX_PER_YEAR}px`,
            minWidth: "100%",
            height: "100%",
          }}
        >
          <Line
            data={{ labels: chartData.labels, datasets: chartData.datasets }}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};
