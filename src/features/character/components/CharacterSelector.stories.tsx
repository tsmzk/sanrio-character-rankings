import type { Meta, StoryObj } from '@storybook/react';
import { CharacterSelector } from './CharacterSelector';
import type { Character } from '../../../shared/types';

const meta: Meta<typeof CharacterSelector> = {
  title: 'Character/CharacterSelector',
  component: CharacterSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CharacterSelector>;

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
];

export const Default: Story = {
  args: {
    characters: mockCharacters,
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: () => false,
  },
};

export const WithSomeSelected: Story = {
  args: {
    characters: mockCharacters,
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: (id: string) => ['hello-kitty', 'kuromi'].includes(id),
  },
};

export const AllSelected: Story = {
  args: {
    characters: mockCharacters,
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: () => true,
  },
};

export const SingleCharacter: Story = {
  args: {
    characters: [mockCharacters[0]],
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: (id: string) => id === 'hello-kitty',
  },
};

export const TwoCharacters: Story = {
  args: {
    characters: mockCharacters.slice(0, 2),
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: (id: string) => id === 'my-melody',
  },
};

export const EmptyList: Story = {
  args: {
    characters: [],
    toggleCharacter: (id: string) => console.log(`Toggled character: ${id}`),
    isSelected: () => false,
  },
};