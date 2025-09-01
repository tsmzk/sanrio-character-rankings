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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
            return value === outOfRankPosition ? 6 : 4; // ランク外は大きめのポイント
          },
          pointHoverRadius: 8,
          pointStyle: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            return value === outOfRankPosition ? "crossRot" : "circle"; // ランク外は×印
          },
          pointBorderWidth: (context: { parsed?: { y: number } }) => {
            const value = context.parsed?.y;
            return value === outOfRankPosition ? 3 : 1; // ランク外は太いボーダー
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
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
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
            maxTicksLimit: 15,
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
            display: true,
            text: "ランキング順位",
          },
        },
        x: {
          title: {
            display: true,
            text: "年",
          },
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

  // Extract only the chart data for Chart.js (remove our custom properties)
  const chartJsData = chartData
    ? {
        labels: chartData.labels,
        datasets: chartData.datasets,
      }
    : null;

  return (
    <div className={`chart-wrapper ${className}`}>
      <div style={{ height: "600px", width: "100%", position: "relative" }}>
        {chartJsData && <Line data={chartJsData} options={options} />}
      </div>
    </div>
  );
};
