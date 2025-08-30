import type { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import type { Character, RankingEntry } from "../types";

interface UseChartConfigProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
}

interface UseChartConfigReturn {
  chartData: ChartData<"line">;
  chartOptions: ChartOptions<"line">;
}

export const useChartConfig = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange,
}: UseChartConfigProps): UseChartConfigReturn => {
  const chartData = useMemo(() => {
    const years = [];
    for (let year = yearRange.min; year <= yearRange.max; year++) {
      years.push(year);
    }

    const datasets = selectedCharacters
      .map((characterId) => {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return null;

        const characterRankings = rankings
          .filter((r) => r.characterId === characterId)
          .filter((r) => r.year >= yearRange.min && r.year <= yearRange.max)
          .sort((a, b) => a.year - b.year);

        // 全ての年に対してデータポイントを作成（ランク外は51に設定）
        const dataPoints = years.map((year) => {
          const rankData = characterRankings.find((r) => r.year === year);
          return {
            x: year,
            y: rankData ? rankData.rank : 51, // ランク外は51に設定
            isOutOfRank: !rankData,
          };
        });

        return {
          label: character.name,
          data: dataPoints.map((p) => ({ x: p.x, y: p.y })),
          borderColor: character.color,
          backgroundColor: `${character.color}20`, // Add transparency
          borderWidth: 3,
          pointBackgroundColor: dataPoints.map((p) =>
            p.isOutOfRank ? "transparent" : character.color,
          ),
          pointBorderColor: dataPoints.map((p) => (p.isOutOfRank ? "transparent" : "#ffffff")),
          pointBorderWidth: dataPoints.map((p) => (p.isOutOfRank ? 0 : 2)),
          pointRadius: dataPoints.map((p) => (p.isOutOfRank ? 0 : 6)),
          pointHoverRadius: dataPoints.map((p) => (p.isOutOfRank ? 0 : 8)),
          fill: false,
          tension: 0.2,
          showLine: true,
        };
      })
      .filter(Boolean);

    return {
      labels: years,
      datasets: datasets.filter(
        (dataset): dataset is NonNullable<typeof dataset> => dataset !== null,
      ),
    };
  }, [selectedCharacters, characters, rankings, yearRange.min, yearRange.max]);

  const chartOptions = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      clip: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: 1,
          callbacks: {
            title: (context) => {
              const year = Math.round(context[0].parsed.x);
              return `${year}年`;
            },
            label: (context) => {
              const rank = Math.round(context.parsed.y);
              if (rank === 51) {
                return `${context.dataset.label}: ランク外`;
              }
              return `${context.dataset.label}: ${rank}位`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: yearRange.min,
          max: yearRange.max,
          ticks: {
            stepSize: 1,
            precision: 0, // 小数点なし
            callback: (value) => {
              const intValue = Math.round(Number(value));
              return `${intValue}年`;
            },
          },
          title: {
            display: true,
            text: "年度",
          },
        },
        y: {
          type: "linear",
          reverse: true, // 1位を上に表示
          min: 0.8,
          max: 51.5,
          ticks: {
            stepSize: 5,
            precision: 0, // 小数点なし
            callback: (value) => {
              const intValue = Math.round(Number(value));
              // 1位以上のみ表示
              if (intValue >= 1 && intValue <= 50) {
                return `${intValue}位`;
              } else if (intValue === 51) {
                return "ランク外";
              }
              return ""; // その他は空文字
            },
          },
          title: {
            display: true,
            text: "順位",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
      elements: {
        line: {
          tension: 0.1,
        },
        point: {
          hoverRadius: 8,
        },
      },
    }),
    [yearRange.min, yearRange.max],
  );

  return {
    chartData,
    chartOptions,
  };
};
