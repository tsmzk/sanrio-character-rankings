import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from './ChartContainer';
import type { ChartData, ChartOptions } from 'chart.js';

const meta: Meta<typeof ChartContainer> = {
  title: 'Ranking/ChartContainer',
  component: ChartContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChartContainer>;

const mockChartData: ChartData<'line'> = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'ハローキティ',
      data: [2, 1, 3, 1, 2, 1],
      borderColor: '#ff6b9d',
      backgroundColor: 'rgba(255, 107, 157, 0.1)',
      tension: 0.4,
    },
    {
      label: 'マイメロディ',
      data: [3, 2, 1, 2, 1, 2],
      borderColor: '#ffb3d9',
      backgroundColor: 'rgba(255, 179, 217, 0.1)',
      tension: 0.4,
    },
    {
      label: 'クロミ',
      data: [5, 4, 2, 3, 3, 3],
      borderColor: '#9b59b6',
      backgroundColor: 'rgba(155, 89, 182, 0.1)',
      tension: 0.4,
    },
  ],
};

const mockChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'サンリオキャラクターランキング推移',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '年',
      },
    },
    y: {
      title: {
        display: true,
        text: '順位',
      },
      reverse: true,
      min: 1,
      max: 10,
      ticks: {
        stepSize: 1,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

const singleDataset: ChartData<'line'> = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'ハローキティ',
      data: [2, 1, 3, 1, 2, 1],
      borderColor: '#ff6b9d',
      backgroundColor: 'rgba(255, 107, 157, 0.1)',
      tension: 0.4,
    },
  ],
};

const manyDatasetsData: ChartData<'line'> = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'ハローキティ',
      data: [1, 3, 1, 2, 1],
      borderColor: '#ff6b9d',
      backgroundColor: 'rgba(255, 107, 157, 0.1)',
      tension: 0.4,
    },
    {
      label: 'マイメロディ',
      data: [2, 1, 2, 1, 2],
      borderColor: '#ffb3d9',
      backgroundColor: 'rgba(255, 179, 217, 0.1)',
      tension: 0.4,
    },
    {
      label: 'クロミ',
      data: [4, 2, 3, 3, 3],
      borderColor: '#9b59b6',
      backgroundColor: 'rgba(155, 89, 182, 0.1)',
      tension: 0.4,
    },
    {
      label: 'シナモロール',
      data: [3, 4, 4, 5, 4],
      borderColor: '#87ceeb',
      backgroundColor: 'rgba(135, 206, 235, 0.1)',
      tension: 0.4,
    },
    {
      label: 'ポムポムプリン',
      data: [5, 5, 5, 4, 5],
      borderColor: '#ffd700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      tension: 0.4,
    },
  ],
};

export const Default: Story = {
  args: {
    chartData: mockChartData,
    chartOptions: mockChartOptions,
    height: 400,
  },
};

export const SingleDataset: Story = {
  args: {
    chartData: singleDataset,
    chartOptions: mockChartOptions,
    height: 300,
  },
};

export const ManyDatasets: Story = {
  args: {
    chartData: manyDatasetsData,
    chartOptions: mockChartOptions,
    height: 500,
  },
};

export const SmallChart: Story = {
  args: {
    chartData: mockChartData,
    chartOptions: mockChartOptions,
    height: 250,
  },
};

export const LargeChart: Story = {
  args: {
    chartData: mockChartData,
    chartOptions: mockChartOptions,
    height: 600,
  },
};

export const CustomClassName: Story = {
  args: {
    chartData: mockChartData,
    chartOptions: mockChartOptions,
    height: 400,
    className: 'shadow-lg ring-2 ring-purple-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  },
};