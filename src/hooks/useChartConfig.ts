import { useMemo } from 'react';
import type { ChartOptions, ChartData } from 'chart.js';
import type { Character, RankingEntry } from '../types';

interface UseChartConfigProps {
  selectedCharacters: string[];
  characters: Character[];
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
}

interface UseChartConfigReturn {
  chartData: ChartData<'line'>;
  chartOptions: ChartOptions<'line'>;
}

export const useChartConfig = ({
  selectedCharacters,
  characters,
  rankings,
  yearRange
}: UseChartConfigProps): UseChartConfigReturn => {
  const chartData = useMemo(() => {
    const years = [];
    for (let year = yearRange.min; year <= yearRange.max; year++) {
      years.push(year);
    }

    const datasets = selectedCharacters.map(characterId => {
      const character = characters.find(c => c.id === characterId);
      if (!character) return null;

      const characterRankings = rankings
        .filter(r => r.characterId === characterId)
        .filter(r => r.year >= yearRange.min && r.year <= yearRange.max)
        .sort((a, b) => a.year - b.year);

      return {
        label: character.name,
        data: characterRankings.map(r => ({ x: r.year, y: r.rank })),
        borderColor: character.color,
        backgroundColor: character.color + '20', // Add transparency
        borderWidth: 3,
        pointBackgroundColor: character.color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
        tension: 0.2,
        showLine: true
      };
    }).filter(Boolean);

    return {
      labels: years,
      datasets: datasets.filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== null)
    };
  }, [selectedCharacters, characters, rankings, yearRange]);

  const chartOptions = useMemo<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
        callbacks: {
          title: (context) => {
            const year = Math.round(context[0].parsed.x);
            return `${year}年`;
          },
          label: (context) => {
            const rank = Math.round(context.parsed.y);
            return `${context.dataset.label}: ${rank}位`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: yearRange.min,
        max: yearRange.max,
        ticks: {
          stepSize: 1,
          precision: 0, // 小数点なし
          callback: function(value) {
            const intValue = Math.round(Number(value));
            return intValue + '年';
          }
        },
        title: {
          display: true,
          text: '年度'
        }
      },
      y: {
        type: 'linear',
        reverse: true, // 1位を上に表示
        min: 1,
        max: 15,
        beginAtZero: false,
        ticks: {
          stepSize: 1,
          precision: 0, // 小数点なし
          callback: function(value) {
            const intValue = Math.round(Number(value));
            return intValue + '位';
          }
        },
        title: {
          display: true,
          text: '順位'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    elements: {
      line: {
        tension: 0.1
      },
      point: {
        hoverRadius: 8
      }
    }
  }), [yearRange]);

  return {
    chartData,
    chartOptions
  };
};