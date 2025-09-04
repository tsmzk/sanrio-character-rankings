import type { Meta, StoryObj } from "@storybook/react";
import { AppErrorState } from "./AppErrorState";

const meta: Meta<typeof AppErrorState> = {
  title: "Shared/AppStates/AppErrorState",
  component: AppErrorState,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "アプリケーション全体のエラー状態を表示するコンポーネント。リトライ機能付き。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "text",
      description: "表示するエラーメッセージ",
    },
    onRetry: {
      action: "retry",
      description: "リトライボタンのクリックハンドラー（オプション）",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppErrorState>;

export const SimpleError: Story = {
  args: {
    error: "ネットワークエラーが発生しました",
  },
};

export const ErrorWithRetry: Story = {
  args: {
    error: "データの取得に失敗しました",
    onRetry: () => console.log("Retrying..."),
  },
};

export const LongErrorMessage: Story = {
  args: {
    error: "サンリオキャラクターのランキングデータを取得する際にエラーが発生しました。ネットワーク接続を確認して、再度お試しください。",
    onRetry: () => console.log("Retrying..."),
  },
};

export const APIError: Story = {
  args: {
    error: "API Error: 500 Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.",
    onRetry: () => console.log("Retrying API call..."),
  },
};

export const NetworkError: Story = {
  args: {
    error: "Failed to fetch data from server",
  },
};

export const ErrorWithCustomClass: Story = {
  args: {
    error: "カスタムスタイルでのエラー表示",
    className: "bg-red-50",
    onRetry: () => console.log("Custom retry..."),
  },
};

export const DarkTheme: Story = {
  args: {
    error: "ダークモードでのエラー表示",
    onRetry: () => console.log("Dark mode retry..."),
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const InteractiveRetry: Story = {
  args: {
    error: "接続がタイムアウトしました",
    onRetry: () => {
      console.log("Retrying connection...");
      alert("再接続を試行中...");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "リトライボタンをクリックしてインタラクティブな動作を確認できます。",
      },
    },
  },
};