import type { Meta, StoryObj } from "@storybook/react";
import { ChartHeader } from "./ChartHeader";

const meta: Meta<typeof ChartHeader> = {
  title: "Ranking/ChartHeader",
  component: ChartHeader,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    characterCount: {
      control: { type: "range", min: 0, max: 20, step: 1 },
    },
    yearRange: {
      control: { type: "object" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChartHeader>;

export const Default: Story = {
  args: {
    yearRange: { min: 2018, max: 2023 },
    characterCount: 3,
  },
};

export const NoCharacters: Story = {
  args: {
    yearRange: { min: 2020, max: 2023 },
    characterCount: 0,
  },
};

export const SingleCharacter: Story = {
  args: {
    yearRange: { min: 2019, max: 2023 },
    characterCount: 1,
  },
};

export const ManyCharacters: Story = {
  args: {
    yearRange: { min: 2015, max: 2023 },
    characterCount: 12,
  },
};

export const SingleYear: Story = {
  args: {
    yearRange: { min: 2023, max: 2023 },
    characterCount: 5,
  },
};

export const ShortRange: Story = {
  args: {
    yearRange: { min: 2022, max: 2023 },
    characterCount: 4,
  },
};

export const LongRange: Story = {
  args: {
    yearRange: { min: 2010, max: 2023 },
    characterCount: 8,
  },
};

export const OlderRange: Story = {
  args: {
    yearRange: { min: 2000, max: 2010 },
    characterCount: 6,
  },
};

export const RecentYears: Story = {
  args: {
    yearRange: { min: 2021, max: 2024 },
    characterCount: 7,
  },
};

export const CustomClassName: Story = {
  args: {
    yearRange: { min: 2020, max: 2023 },
    characterCount: 5,
    className:
      "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mb-6",
  },
};

export const VariousScenarios = () => (
  <div className="space-y-6 p-4">
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Different Character Counts
      </h3>
      <div className="space-y-4">
        <ChartHeader yearRange={{ min: 2018, max: 2023 }} characterCount={0} />
        <ChartHeader yearRange={{ min: 2018, max: 2023 }} characterCount={1} />
        <ChartHeader yearRange={{ min: 2018, max: 2023 }} characterCount={5} />
        <ChartHeader yearRange={{ min: 2018, max: 2023 }} characterCount={15} />
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Different Year Ranges</h3>
      <div className="space-y-4">
        <ChartHeader yearRange={{ min: 2023, max: 2023 }} characterCount={3} />
        <ChartHeader yearRange={{ min: 2022, max: 2023 }} characterCount={3} />
        <ChartHeader yearRange={{ min: 2018, max: 2023 }} characterCount={3} />
        <ChartHeader yearRange={{ min: 2000, max: 2023 }} characterCount={3} />
      </div>
    </div>
  </div>
);
