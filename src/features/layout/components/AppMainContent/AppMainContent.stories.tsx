import type { Meta, StoryObj } from "@storybook/react";
import type {
  useCharacterModal,
  useCharacterSelection,
  useYearRangeFilter,
} from "../../../../hooks";
import type { Character, RankingEntry } from "../../../../shared/types";
import { AppMainContent } from "./AppMainContent";

const meta: Meta<typeof AppMainContent> = {
  title: "Layout/AppMainContent",
  component: AppMainContent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "アプリケーションのメインコンテンツエリア。チャート表示と選択中のキャラクター詳細を含みます。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppMainContent>;

// Mock data
const mockCharacters: Character[] = [
  {
    id: "hello-kitty",
    name: "ハローキティ",
    nameEn: "Hello Kitty",
    description: "1974年にデビューした世界的に人気のキャラクター",
    debutYear: 1974,
    color: "#FF6B9D",
  },
  {
    id: "my-melody",
    name: "マイメロディ",
    nameEn: "My Melody",
    description: "うさぎの女の子のキャラクター",
    debutYear: 1975,
    color: "#FFB6C1",
  },
  {
    id: "kuromi",
    name: "クロミ",
    nameEn: "Kuromi",
    description: "白いうさぎの悪魔的キャラクター",
    debutYear: 2005,
    color: "#9B59B6",
  },
];

const mockRankings: RankingEntry[] = [
  { characterId: "hello-kitty", year: 2023, rank: 1 },
  { characterId: "my-melody", year: 2023, rank: 3 },
  { characterId: "kuromi", year: 2023, rank: 2 },
  { characterId: "hello-kitty", year: 2022, rank: 1 },
  { characterId: "my-melody", year: 2022, rank: 2 },
  { characterId: "kuromi", year: 2022, rank: 4 },
];

const mockSelectedCharacters = [mockCharacters[0], mockCharacters[1]];

// Mock hook return values
const mockYearRangeFilter: ReturnType<typeof useYearRangeFilter> = {
  yearRange: { min: 2020, max: 2023 },
  availableYearRange: { min: 1986, max: 2025 },
  updateStartYear: (value: number) => console.log("Update start year:", value),
  updateEndYear: (value: number) => console.log("Update end year:", value),
  resetToFullRange: () => console.log("Reset to full range"),
  isResetDisabled: false,
};

const mockCharacterSelection: ReturnType<typeof useCharacterSelection> = {
  selectedCharacters: ["hello-kitty", "my-melody"],
  toggleCharacter: (id: string) => console.log("Toggle character:", id),
  isSelected: (id: string) => ["hello-kitty", "my-melody"].includes(id),
};

const mockCharacterModal: ReturnType<typeof useCharacterModal> = {
  selectedCharacter: null,
  openModal: (character: Character) => console.log("Open modal:", character.name),
  closeModal: () => console.log("Close modal"),
  isOpen: false,
};

export const WithSelectedCharacters: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: mockSelectedCharacters,
    characterSelection: mockCharacterSelection,
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const NoCharactersSelected: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: [],
    characterSelection: {
      ...mockCharacterSelection,
      selectedCharacters: [],
    },
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const SingleCharacterSelected: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: [mockCharacters[0]],
    characterSelection: {
      ...mockCharacterSelection,
      selectedCharacters: ["hello-kitty"],
    },
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const AllCharactersSelected: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: mockCharacters,
    characterSelection: {
      ...mockCharacterSelection,
      selectedCharacters: mockCharacters.map((c) => c.id),
    },
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: mockSelectedCharacters,
    characterSelection: mockCharacterSelection,
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Responsive: Story = {
  args: {
    rankings: mockRankings,
    characters: mockCharacters,
    selectedCharacterObjects: mockSelectedCharacters,
    characterSelection: mockCharacterSelection,
    yearRangeFilter: mockYearRangeFilter,
    characterModal: mockCharacterModal,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1200px", height: "800px" } },
      },
    },
  },
};
