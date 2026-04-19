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
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import type { Character, RankingEntry } from "../../../shared/types";
import { getMedalCanvas, type MedalRank } from "../utils/medalIcons";

const MOBILE_MEDIA_QUERY = "(max-width: 640px)";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window === "undefined" ? false : window.matchMedia(MOBILE_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

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
  const isMobile = useIsMobile();

  const chartData = useMemo(() => {
    if (selectedCharacters.length === 0) return null;

    // Generate years array
    const years = Array.from(
      { length: yearRange.max - yearRange.min + 1 },
      (_, i) => yearRange.min + i,
    );

    // Get colors for characters
    const colors = [
      "#ff6b9d",
      "#9b51e0",
      "#4fc3f7",
      "#66bb6a",
      "#ffa726",
      "#ef5350",
      "#ab47bc",
      "#5c6bc0",
      "#26a69a",
      "#ffca28",
    ];

    // Calculate the lowest rank among selected characters for out-of-rank positioning
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

    // Set out-of-rank position as lowest rank + 5
    const outOfRankPosition = lowestRank + 5;

    const datasets = selectedCharacters
      .map((characterId, index) => {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return null;

        const characterRankings = rankings.filter((r) => r.characterId === characterId);

        // 初めてランクインした年を取得
        const firstRankingYear = Math.min(
          ...characterRankings.filter((r) => r.rank > 0).map((r) => r.year),
        );

        const data = years.map((year) => {
          // 初めてランクインした年より前は非表示（null）
          if (year < firstRankingYear) return null;

          const ranking = characterRankings.find((r) => r.year === year);
          // データがない場合はランク外（最下位+5位）
          if (!ranking) return outOfRankPosition;
          // rank が 0 または null の場合もランク外（最下位+5位）
          if (ranking.rank === 0 || ranking.rank === null) return outOfRankPosition;
          // 正常なランクの場合はそのまま返す
          return ranking.rank;
        });

        return {
          label: character.name,
          data: data,
          borderColor: colors[index % colors.length],
          backgroundColor: `${colors[index % colors.length]}20`,
          tension: 0.1,
          pointRadius: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return 6; // ランク外は大きめのポイント
            if (value !== undefined && MEDAL_RANKS.has(value)) return MEDAL_RADIUS; // 1〜3位はメダル
            return 4;
          },
          pointHoverRadius: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value !== undefined && MEDAL_RANKS.has(value)) return MEDAL_HOVER_RADIUS;
            return 8;
          },
          pointStyle: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return "crossRot"; // ランク外は×印
            if (value !== undefined && MEDAL_RANKS.has(value)) {
              const medal = getMedalCanvas(value as MedalRank, MEDAL_SIZE);
              if (medal) return medal;
            }
            return "circle";
          },
          pointBorderWidth: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            if (value === outOfRankPosition) return 3; // ランク外は太いボーダー
            if (value !== undefined && MEDAL_RANKS.has(value)) return 0; // メダル画像に縁線は不要
            return 1;
          },
          segment: {
            borderDash: (ctx: {
              p0?: { parsed?: { y: number } };
              p1?: { parsed?: { y: number } };
            }) => {
              // ランク外への線は点線
              const fromValue = ctx.p0?.parsed?.y;
              const toValue = ctx.p1?.parsed?.y;
              return fromValue === outOfRankPosition || toValue === outOfRankPosition
                ? [5, 5]
                : undefined;
            },
          },
          spanGaps: false, // null値では線を繋がない
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
        padding: {
          left: isMobile ? 4 : 20,
          right: isMobile ? 8 : 20,
          top: isMobile ? 12 : 20,
          bottom: isMobile ? 4 : 20,
        },
      },
      plugins: {
        legend: {
          position: isMobile ? ("bottom" as const) : ("top" as const),
          labels: isMobile
            ? {
                usePointStyle: true,
                boxWidth: 8,
                boxHeight: 8,
                padding: 8,
                font: { size: 10 },
              }
            : undefined,
        },
        title: {
          display: false,
        },
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
              if (intValue === outOfRankPosition) {
                return "ランク外";
              }
              if (intValue < 1) return "";
              return `${intValue}位`;
            },
            maxTicksLimit: isMobile ? 8 : 15,
            font: {
              size: isMobile ? 10 : 12,
            },
          },
          grid: {
            color: (context: { tick: { value: number } }) => {
              if (context.tick.value === outOfRankPosition) {
                return "rgba(255, 107, 157, 0.3)"; // ランク外の線を強調
              }
              return "rgba(128, 128, 128, 0.1)";
            },
            lineWidth: (context: { tick: { value: number } }) => {
              if (context.tick.value === outOfRankPosition) {
                return 2;
              }
              return 1;
            },
          },
          title: {
            display: !isMobile,
            text: "ランキング順位",
          },
        },
        x: {
          ticks: {
            font: {
              size: isMobile ? 10 : 12,
            },
            maxRotation: isMobile ? 45 : 0,
            autoSkip: true,
            autoSkipPadding: isMobile ? 8 : 4,
          },
          title: {
            display: !isMobile,
            text: "年",
          },
        },
      },
    };
  }, [chartData, isMobile]);

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

  // Extract only the chart data for Chart.js (remove our custom properties)
  const chartJsData = chartData
    ? {
        labels: chartData.labels,
        datasets: chartData.datasets,
      }
    : null;

  return (
    <div className={`chart-wrapper ${className}`}>
      <div className="overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="relative h-[80dvh] min-h-[440px] sm:h-[600px] sm:min-h-0 w-full min-w-[640px] sm:min-w-0">
          {chartJsData && <Line data={chartJsData} options={options} />}
        </div>
      </div>
    </div>
  );
};
