import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

const mockOptions = [
  { value: 'hello-kitty', label: 'Hello Kitty' },
  { value: 'my-melody', label: 'My Melody' },
  { value: 'kuromi', label: 'Kuromi' },
];

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    options: mockOptions,
    placeholder: 'キャラクターを選択してください',
  },
};

export const WithLabel: Story = {
  args: {
    value: '',
    onChange: () => {},
    options: mockOptions,
    placeholder: 'キャラクターを選択してください',
    label: 'お気に入りのキャラクター',
  },
};

export const Selected: Story = {
  args: {
    value: 'hello-kitty',
    onChange: () => {},
    options: mockOptions,
    placeholder: 'キャラクターを選択してください',
    label: 'お気に入りのキャラクター',
  },
};