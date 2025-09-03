import type { Meta, StoryObj } from '@storybook/react';
import { RankingChart } from './RankingChart';
import type { Character, RankingEntry } from '../../../shared/types';

const meta: Meta<typeof RankingChart> = {
  title: 'Ranking/RankingChart',
  component: RankingChart,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RankingChart>;

const mockCharacters: Character[] = [
  {
    id: 'hello-kitty',
    name: 'ハローキティ',
    nameEn: 'Hello Kitty',
    description: '世界中で愛される白い子猫のキャラクター',
    debutYear: 1974,
    color: '#ff6b9d',
  },
  {
    id: 'my-melody',
    name: 'マイメロディ',
    nameEn: 'My Melody',
    description: '白いうさぎの女の子',
    debutYear: 1975,
    color: '#ffb3d9',
  },
  {
    id: 'kuromi',
    name: 'クロミ',
    nameEn: 'Kuromi',
    description: 'ちょっぴり悪魔っ子な白いうさぎ',
    debutYear: 2005,
    color: '#9b59b6',
  },
  {
    id: 'cinnamoroll',
    name: 'シナモロール',
    nameEn: 'Cinnamoroll',
    description: '空を飛べる白い子犬',
    debutYear: 2001,
    color: '#87ceeb',
  },
  {
    id: 'pompompurin',
    name: 'ポムポムプリン',
    nameEn: 'Pompompurin',
    description: 'プリンが大好きな黄色い子犬',
    debutYear: 1996,
    color: '#ffd700',
  },
  {
    id: 'badtz-maru',
    name: 'バッドばつ丸',
    nameEn: 'Badtz-Maru',
    description: 'いたずら好きなペンギン',
    debutYear: 1993,
    color: '#2c3e50',
  },
];

const mockRankings: RankingEntry[] = [
  // Hello Kitty - consistent top performer
  { characterId: 'hello-kitty', year: 2018, rank: 2, votes: 14000 },
  { characterId: 'hello-kitty', year: 2019, rank: 1, votes: 17000 },
  { characterId: 'hello-kitty', year: 2020, rank: 3, votes: 13000 },
  { characterId: 'hello-kitty', year: 2021, rank: 1, votes: 16000 },
  { characterId: 'hello-kitty', year: 2022, rank: 2, votes: 14500 },
  { characterId: 'hello-kitty', year: 2023, rank: 1, votes: 15000 },

  // My Melody - rising star
  { characterId: 'my-melody', year: 2018, rank: 3, votes: 12000 },
  { characterId: 'my-melody', year: 2019, rank: 2, votes: 14500 },
  { characterId: 'my-melody', year: 2020, rank: 1, votes: 15500 },
  { characterId: 'my-melody', year: 2021, rank: 2, votes: 14000 },
  { characterId: 'my-melody', year: 2022, rank: 1, votes: 15500 },
  { characterId: 'my-melody', year: 2023, rank: 2, votes: 14200 },

  // Kuromi - steady performance
  { characterId: 'kuromi', year: 2019, rank: 4, votes: 10500 },
  { characterId: 'kuromi', year: 2020, rank: 2, votes: 14000 },
  { characterId: 'kuromi', year: 2021, rank: 3, votes: 12500 },
  { characterId: 'kuromi', year: 2022, rank: 3, votes: 13000 },
  { characterId: 'kuromi', year: 2023, rank: 3, votes: 12800 },

  // Cinnamoroll - occasional ranking with gaps
  { characterId: 'cinnamoroll', year: 2020, rank: 4, votes: 11000 },
  { characterId: 'cinnamoroll', year: 2021, rank: 4, votes: 11500 },
  // Missing 2022 data (should show as out of rank)
  { characterId: 'cinnamoroll', year: 2023, rank: 4, votes: 10800 },

  // Pompompurin - declining performance with gaps
  { characterId: 'pompompurin', year: 2018, rank: 4, votes: 10000 },
  { characterId: 'pompompurin', year: 2019, rank: 5, votes: 9500 },
  // Missing 2020-2021 data
  { characterId: 'pompompurin', year: 2022, rank: 4, votes: 9800 },
  { characterId: 'pompompurin', year: 2023, rank: 5, votes: 9200 },

  // Badtz-maru - only recent data
  { characterId: 'badtz-maru', year: 2022, rank: 6, votes: 8500 },
  { characterId: 'badtz-maru', year: 2023, rank: 7, votes: 8000 },
];

export const NoCharactersSelected: Story = {
  args: {
    selectedCharacters: [],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const SingleCharacter: Story = {
  args: {
    selectedCharacters: ['hello-kitty'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const TwoCharacters: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const ManyCharacters: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody', 'kuromi', 'cinnamoroll', 'pompompurin'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const AllCharacters: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody', 'kuromi', 'cinnamoroll', 'pompompurin', 'badtz-maru'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const LimitedYearRange: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody', 'kuromi'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2020, max: 2022 },
  },
};

export const RecentYears: Story = {
  args: {
    selectedCharacters: ['kuromi', 'cinnamoroll', 'badtz-maru'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2022, max: 2023 },
  },
};

export const CharactersWithGaps: Story = {
  args: {
    selectedCharacters: ['cinnamoroll', 'pompompurin'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const LoadingState: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
    loading: true,
  },
};

export const NoRankingData: Story = {
  args: {
    selectedCharacters: ['hello-kitty'],
    characters: mockCharacters,
    rankings: [], // No ranking data at all
    yearRange: { min: 2018, max: 2023 },
  },
};

export const ShortTimeRange: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'my-melody'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2022, max: 2022 }, // Just one year
  },
};

export const CustomClassName: Story = {
  args: {
    selectedCharacters: ['hello-kitty', 'kuromi'],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2020, max: 2023 },
    className: 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-pink-300 dark:border-pink-700 rounded-xl shadow-lg p-4',
  },
};