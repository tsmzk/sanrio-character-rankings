import type { Meta, StoryObj } from "@storybook/react";
import type {
  useCharacterSearch,
  useCharacterSelection,
  useYearRangeFilter,
} from "../../../../hooks";
import type { Character } from "../../../../shared/types";
import { AppSidebar } from "./AppSidebar";

const meta: Meta<typeof AppSidebar> = {
  title: "Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "アプリケーションのサイドバーコンポーネント。年範囲フィルターとキャラクター検索・選択機能を提供します。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

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
  {
    id: "pochacco",
    name: "ポチャッコ",
    nameEn: "Pochacco",
    description: "元気な白い犬のキャラクター",
    debutYear: 1989,
    color: "#4A90E2",
  },
  {
    id: "cinnamoroll",
    name: "シナモロール",
    nameEn: "Cinnamoroll",
    description: "雲のような白い子犬",
    debutYear: 2001,
    color: "#87CEEB",
  },
];

// Mock hook return values
const mockYearRangeFilter: ReturnType<typeof useYearRangeFilter> = {
  yearRange: { min: 2000, max: 2023 },
  availableYearRange: { min: 1986, max: 2025 },
  updateStartYear: (value: number) => console.log("Update start year:", value),
  updateEndYear: (value: number) => console.log("Update end year:", value),
  resetToFullRange: () => console.log("Reset to full range"),
  isResetDisabled: false,
};

const mockCharacterSearch: ReturnType<typeof useCharacterSearch> = {
  searchQuery: "",
  setSearchQuery: (query: string | ((prevState: string) => string)) => {
    const queryValue = typeof query === "function" ? query("") : query;
    console.log("Set search query:", queryValue);
  },
  filteredCharacters: mockCharacters,
  clearSearch: () => console.log("Clear search"),
  hasSearchResults: false,
  resultCount: mockCharacters.length,
};

const mockCharacterSelection: ReturnType<typeof useCharacterSelection> = {
  selectedCharacters: ["hello-kitty", "my-melody"],
  toggleCharacter: (id: string) => console.log("Toggle character:", id),
  addCharacter: (id: string) => console.log("Add character:", id),
  removeCharacter: (id: string) => console.log("Remove character:", id),
  clearSelection: () => console.log("Clear selection"),
  isSelected: (id: string) => ["hello-kitty", "my-melody"].includes(id),
};

export const Default: Story = {
  args: {
    yearRangeFilter: mockYearRangeFilter,
    characterSearch: mockCharacterSearch,
    characterSelection: mockCharacterSelection,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const WithSearchResults: Story = {
  args: {
    yearRangeFilter: mockYearRangeFilter,
    characterSearch: {
      ...mockCharacterSearch,
      searchQuery: "キティ",
      filteredCharacters: [mockCharacters[0]],
      hasSearchResults: true,
      resultCount: 1,
    },
    characterSelection: mockCharacterSelection,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const FullYearRange: Story = {
  args: {
    yearRangeFilter: {
      ...mockYearRangeFilter,
      yearRange: { min: 1986, max: 2025 },
      isResetDisabled: true,
    },
    characterSearch: mockCharacterSearch,
    characterSelection: mockCharacterSelection,
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const NoCharactersSelected: Story = {
  args: {
    yearRangeFilter: mockYearRangeFilter,
    characterSearch: mockCharacterSearch,
    characterSelection: {
      ...mockCharacterSelection,
      selectedCharacters: [],
      isSelected: () => false,
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 min-h-screen">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    yearRangeFilter: mockYearRangeFilter,
    characterSearch: mockCharacterSearch,
    characterSelection: mockCharacterSelection,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 p-4 min-h-screen">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Responsive: Story = {
  args: {
    yearRangeFilter: mockYearRangeFilter,
    characterSearch: mockCharacterSearch,
    characterSelection: mockCharacterSelection,
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
