import type { Meta, StoryObj } from "@storybook/react";
import { AppLoadingState } from "./AppLoadingState";

const meta: Meta<typeof AppLoadingState> = {
  title: "Shared/AppStates/AppLoadingState",
  component: AppLoadingState,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "アプリケーション全体のローディング状態を表示するコンポーネント。フルスクリーンで表示されます。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "ローディング中に表示するメッセージ",
      defaultValue: "読み込み中...",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppLoadingState>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: "データを読み込み中...",
  },
};

export const LongMessage: Story = {
  args: {
    message: "サンリオキャラクターのランキングデータを取得しています...",
  },
};

export const WithCustomClass: Story = {
  args: {
    message: "カスタムスタイル適用中...",
    className: "bg-purple-50",
  },
};

export const DarkTheme: Story = {
  args: {
    message: "ダークモードで読み込み中...",
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  args: {
    message: "インタラクティブローディング...",
  },
  parameters: {
    docs: {
      description: {
        story: "実際のローディング体験をシミュレートします。",
      },
    },
  },
};
