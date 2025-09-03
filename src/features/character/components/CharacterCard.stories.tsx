import type { Meta, StoryObj } from "@storybook/react";
import type { Character } from "../../../shared/types";
import { CharacterCard } from "./CharacterCard";

const meta: Meta<typeof CharacterCard> = {
  title: "Character/CharacterCard",
  component: CharacterCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80 max-w-sm">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CharacterCard>;

const mockCharacter: Character = {
  id: "hello-kitty",
  name: "ハローキティ",
  nameEn: "Hello Kitty",
  description: "世界中で愛される白い子猫のキャラクター",
  debutYear: 1974,
  color: "#ff6b9d",
};

export const Default: Story = {
  args: {
    character: mockCharacter,
    isSelected: false,
    onToggle: () => {},
  },
};

export const Selected: Story = {
  args: {
    character: mockCharacter,
    isSelected: true,
    onToggle: () => {},
  },
};

export const WithoutEnglishName: Story = {
  args: {
    character: {
      ...mockCharacter,
      nameEn: undefined,
    },
    isSelected: false,
    onToggle: () => {},
  },
};
