import type { Meta, StoryObj } from "@storybook/react";
import type { Character, RankingEntry } from "../../../shared/types";
import { ChartLegend } from "./ChartLegend";

const meta: Meta<typeof ChartLegend> = {
  title: "Ranking/ChartLegend",
  component: ChartLegend,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChartLegend>;

const mockCharacters: Character[] = [
  {
    id: "hello-kitty",
    name: "ハローキティ",
    nameEn: "Hello Kitty",
    description: "世界中で愛される白い子猫のキャラクター",
    debutYear: 1974,
    color: "#ff6b9d",
  },
  {
    id: "my-melody",
    name: "マイメロディ",
    nameEn: "My Melody",
    description: "白いうさぎの女の子",
    debutYear: 1975,
    color: "#ffb3d9",
  },
  {
    id: "kuromi",
    name: "クロミ",
    nameEn: "Kuromi",
    description: "ちょっぴり悪魔っ子な白いうさぎ",
    debutYear: 2005,
    color: "#9b59b6",
  },
  {
    id: "cinnamoroll",
    name: "シナモロール",
    nameEn: "Cinnamoroll",
    description: "空を飛べる白い子犬",
    debutYear: 2001,
    color: "#87ceeb",
  },
  {
    id: "pompompurin",
    name: "ポムポムプリン",
    nameEn: "Pompompurin",
    description: "プリンが大好きな黄色い子犬",
    debutYear: 1996,
    color: "#ffd700",
  },
];

const mockRankings: RankingEntry[] = [
  { characterId: "hello-kitty", year: 2018, rank: 2, votes: 14000 },
  { characterId: "hello-kitty", year: 2019, rank: 1, votes: 17000 },
  { characterId: "hello-kitty", year: 2020, rank: 3, votes: 13000 },
  { characterId: "hello-kitty", year: 2021, rank: 1, votes: 16000 },
  { characterId: "hello-kitty", year: 2022, rank: 2, votes: 14500 },
  { characterId: "hello-kitty", year: 2023, rank: 1, votes: 15000 },

  { characterId: "my-melody", year: 2018, rank: 3, votes: 12000 },
  { characterId: "my-melody", year: 2019, rank: 2, votes: 14500 },
  { characterId: "my-melody", year: 2020, rank: 1, votes: 15500 },
  { characterId: "my-melody", year: 2021, rank: 2, votes: 14000 },
  { characterId: "my-melody", year: 2022, rank: 1, votes: 15500 },
  { characterId: "my-melody", year: 2023, rank: 2, votes: 14200 },

  { characterId: "kuromi", year: 2018, rank: 5, votes: 9000 },
  { characterId: "kuromi", year: 2019, rank: 4, votes: 10500 },
  { characterId: "kuromi", year: 2020, rank: 2, votes: 14000 },
  { characterId: "kuromi", year: 2021, rank: 3, votes: 12500 },
  { characterId: "kuromi", year: 2022, rank: 3, votes: 13000 },
  { characterId: "kuromi", year: 2023, rank: 3, votes: 12800 },

  { characterId: "cinnamoroll", year: 2020, rank: 4, votes: 11000 },
  { characterId: "cinnamoroll", year: 2021, rank: 4, votes: 11500 },
  { characterId: "cinnamoroll", year: 2022, rank: 5, votes: 10000 },
  { characterId: "cinnamoroll", year: 2023, rank: 4, votes: 10800 },

  { characterId: "pompompurin", year: 2018, rank: 4, votes: 10000 },
  { characterId: "pompompurin", year: 2019, rank: 5, votes: 9500 },
  { characterId: "pompompurin", year: 2022, rank: 4, votes: 9800 },
  { characterId: "pompompurin", year: 2023, rank: 5, votes: 9200 },
];

export const NoSelection: Story = {
  args: {
    selectedCharacters: [],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const SingleCharacter: Story = {
  args: {
    selectedCharacters: ["hello-kitty"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const TwoCharacters: Story = {
  args: {
    selectedCharacters: ["hello-kitty", "my-melody"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const ManyCharacters: Story = {
  args: {
    selectedCharacters: ["hello-kitty", "my-melody", "kuromi", "cinnamoroll", "pompompurin"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2023 },
  },
};

export const LimitedYearRange: Story = {
  args: {
    selectedCharacters: ["hello-kitty", "my-melody", "kuromi"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2020, max: 2022 },
  },
};

export const NoDataInRange: Story = {
  args: {
    selectedCharacters: ["cinnamoroll"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2019 }, // Cinnamoroll has no data in this range
  },
};

export const MixedDataAvailability: Story = {
  args: {
    selectedCharacters: ["hello-kitty", "cinnamoroll"], // Hello Kitty has data, Cinnamoroll doesn't in 2018-2019
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2018, max: 2019 },
  },
};

export const CustomClassName: Story = {
  args: {
    selectedCharacters: ["hello-kitty", "kuromi"],
    characters: mockCharacters,
    rankings: mockRankings,
    yearRange: { min: 2020, max: 2023 },
    className:
      "bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-700",
  },
};
