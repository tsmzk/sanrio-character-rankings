import type { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import type { Character, RankingEntry } from "../../../shared/types";

interface UseChartConfigProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  windowWidth?: number;
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
  windowWidth = window.innerWidth,
}: UseChartConfigProps): UseChartConfigReturn => {
  // 選択されたキャラクターの実際の最下位順位を計算
  const maxRankInData = useMemo(() => {
    // 選択されたキャラクターのランキングデータのみを対象にする
    const selectedCharacterRankings = rankings.filter(
      (r) =>
        selectedCharacters.includes(r.characterId) &&
        r.year >= yearRange.min &&
        r.year <= yearRange.max,
    );

    if (selectedCharacterRankings.length === 0) {
      return 50; // デフォルト値
    }

    const maxRank = Math.max(...selectedCharacterRankings.map((r) => r.rank));
    return Math.max(maxRank, 10); // 最低でも10位まで表示
  }, [rankings, yearRange.min, yearRange.max, selectedCharacters]);

  // ランク外の値は実際の最下位＋5位
  const outOfRankValue = maxRankInData + 5;

  const chartData = useMemo(() => {
    const years: number[] = [];
    for (let year = yearRange.min; year <= yearRange.max; year++) {
      years.push(year);
    }

    const datasets = selectedCharacters
      .map((characterId) => {
        const character = characters.find((c) => c.id === characterId);
        if (!character) {
          return null;
        }

        const characterRankings = rankings
          .filter((r) => r.characterId === characterId)
          .filter((r) => r.year >= yearRange.min && r.year <= yearRange.max)
          .sort((a, b) => a.year - b.year);

        // 初ランクイン年を計算（全期間のランキングデータから最も早い年を取得）
        const allCharacterRankings = rankings
          .filter((r) => r.characterId === characterId)
          .sort((a, b) => a.year - b.year);
        const firstRankYear = allCharacterRankings.length > 0 ? allCharacterRankings[0].year : null;

        // データポイントを作成（初ランクイン前はスキップ、初ランクイン後でデータがない場合は51）
        const validDataPoints = years
          .map((year) => {
            // 初ランクイン前の年はnullにする
            if (firstRankYear === null || year < firstRankYear) {
              return null;
            }

            const rankData = characterRankings.find((r) => r.year === year);
            return {
              x: year,
              y: rankData ? rankData.rank : outOfRankValue, // ランク外は動的な値に設定
              isOutOfRank: !rankData,
            };
          })
          .filter((point) => point !== null); // nullデータを完全に除外

        if (validDataPoints.length === 0) {
          return null;
        }

        const isMobile = windowWidth <= 768;

        const dataset = {
          label: character.name,
          data: validDataPoints.map((p) => ({ x: p.x, y: p.y })),
          borderColor: character.color,
          backgroundColor: `${character.color}20`, // Add transparency
          borderWidth: isMobile ? 2 : 3,
          pointBackgroundColor: validDataPoints.map((p) =>
            p.isOutOfRank ? "transparent" : character.color,
          ),
          pointBorderColor: validDataPoints.map((p) => (p.isOutOfRank ? "transparent" : "#ffffff")),
          pointBorderWidth: validDataPoints.map((p) => (p.isOutOfRank ? 0 : 2)),
          pointRadius: validDataPoints.map((p) => (p.isOutOfRank ? 0 : isMobile ? 4 : 6)),
          pointHoverRadius: validDataPoints.map((p) => (p.isOutOfRank ? 0 : isMobile ? 6 : 8)),
          fill: false,
          tension: 0.2,
          showLine: true,
          spanGaps: false, // 連続でないデータでも線で繋がない
        };

        return dataset;
      })
      .filter(Boolean);

    return {
      labels: years,
      datasets: datasets.filter(
        (dataset): dataset is NonNullable<typeof dataset> => dataset !== null,
      ),
    };
  }, [
    selectedCharacters,
    characters,
    rankings,
    yearRange.min,
    yearRange.max,
    windowWidth,
    outOfRankValue,
  ]);

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
          position: windowWidth <= 768 ? "bottom" : "top",
          labels: {
            usePointStyle: true,
            padding: windowWidth <= 768 ? 15 : 20,
            font: {
              size: windowWidth <= 768 ? 11 : 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: 1,
          titleFont: {
            size: windowWidth <= 768 ? 12 : 14,
          },
          bodyFont: {
            size: windowWidth <= 768 ? 11 : 13,
          },
          padding: windowWidth <= 768 ? 8 : 12,
          callbacks: {
            title: (context) => {
              const year = Math.round(context[0].parsed.x);
              return `${year}年`;
            },
            label: (context) => {
              const rank = Math.round(context.parsed.y);
              if (rank === outOfRankValue) {
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
            maxTicksLimit: windowWidth <= 768 ? 6 : yearRange.max - yearRange.min + 1,
            callback: (value) => {
              const intValue = Math.round(Number(value));
              return `${intValue}年`;
            },
            font: {
              size: windowWidth <= 768 ? 10 : 12,
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
          max: outOfRankValue + 0.5,
          ticks: {
            stepSize: windowWidth <= 768 ? 10 : 5,
            precision: 0, // 小数点なし
            callback: (value) => {
              const intValue = Math.round(Number(value));
              // 1位以上のみ表示
              if (intValue >= 1 && intValue <= maxRankInData) {
                return `${intValue}位`;
              } else if (intValue === outOfRankValue) {
                return "ランク外";
              }
              return ""; // その他は空文字
            },
            font: {
              size: windowWidth <= 768 ? 10 : 12,
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
          borderWidth: windowWidth <= 768 ? 2 : 3,
        },
        point: {
          radius: windowWidth <= 768 ? 4 : 6,
          hoverRadius: windowWidth <= 768 ? 6 : 8,
        },
      },
    }),
    [yearRange.min, yearRange.max, windowWidth, maxRankInData, outOfRankValue],
  );

  return {
    chartData,
    chartOptions,
  };
};
