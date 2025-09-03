import type { Meta, StoryObj } from "@storybook/react";
import { ChartEmptyState, ChartLoadingState, ChartNoDataState } from "./ChartStates";

const loadingMeta: Meta<typeof ChartLoadingState> = {
  title: "Ranking/ChartStates/ChartLoadingState",
  component: ChartLoadingState,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    height: {
      control: { type: "range", min: 200, max: 800, step: 50 },
    },
  },
  tags: ["autodocs"],
};

const emptyMeta: Meta<typeof ChartEmptyState> = {
  title: "Ranking/ChartStates/ChartEmptyState",
  component: ChartEmptyState,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    height: {
      control: { type: "range", min: 200, max: 800, step: 50 },
    },
  },
  tags: ["autodocs"],
};

const noDataMeta: Meta<typeof ChartNoDataState> = {
  title: "Ranking/ChartStates/ChartNoDataState",
  component: ChartNoDataState,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    height: {
      control: { type: "range", min: 200, max: 800, step: 50 },
    },
  },
  tags: ["autodocs"],
};

// Loading State Stories
type LoadingStory = StoryObj<typeof ChartLoadingState>;

export const LoadingSmall: LoadingStory = {
  ...loadingMeta,
  args: {
    height: 300,
  },
};

export const LoadingMedium: LoadingStory = {
  ...loadingMeta,
  args: {
    height: 400,
  },
};

export const LoadingLarge: LoadingStory = {
  ...loadingMeta,
  args: {
    height: 600,
  },
};

export const LoadingCustomClass: LoadingStory = {
  ...loadingMeta,
  args: {
    height: 400,
    className:
      "shadow-lg ring-2 ring-blue-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900",
  },
};

// Empty State Stories
type EmptyStory = StoryObj<typeof ChartEmptyState>;

export const EmptySmall: EmptyStory = {
  ...emptyMeta,
  args: {
    height: 300,
  },
};

export const EmptyMedium: EmptyStory = {
  ...emptyMeta,
  args: {
    height: 400,
  },
};

export const EmptyLarge: EmptyStory = {
  ...emptyMeta,
  args: {
    height: 600,
  },
};

export const EmptyCustomClass: EmptyStory = {
  ...emptyMeta,
  args: {
    height: 400,
    className:
      "border-dashed border-2 border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
  },
};

// No Data State Stories
type NoDataStory = StoryObj<typeof ChartNoDataState>;

export const NoDataSmall: NoDataStory = {
  ...noDataMeta,
  args: {
    height: 300,
  },
};

export const NoDataMedium: NoDataStory = {
  ...noDataMeta,
  args: {
    height: 400,
  },
};

export const NoDataLarge: NoDataStory = {
  ...noDataMeta,
  args: {
    height: 600,
  },
};

export const NoDataCustomClass: NoDataStory = {
  ...noDataMeta,
  args: {
    height: 400,
    className:
      "border-2 border-orange-200 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20",
  },
};

// Combined view for comparison
export const AllStates = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        Loading State
      </h3>
      <ChartLoadingState height={350} />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        Empty State
      </h3>
      <ChartEmptyState height={350} />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        No Data State
      </h3>
      <ChartNoDataState height={350} />
    </div>
  </div>
);

export const ResponsiveStates = () => (
  <div className="space-y-8 p-4">
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Small Charts (300px)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartLoadingState height={300} />
        <ChartEmptyState height={300} />
        <ChartNoDataState height={300} />
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Medium Charts (450px)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartLoadingState height={450} />
        <ChartEmptyState height={450} />
        <ChartNoDataState height={450} />
      </div>
    </div>
  </div>
);

export default loadingMeta;
