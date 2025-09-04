import type { Meta, StoryObj } from "@storybook/react";
import type { ThemeContextType, ThemeType } from "../../../theme/contexts/theme-context";
import { ThemeContext } from "../../../theme/contexts/theme-context";
import { AppHeader } from "./AppHeader";

const meta: Meta<typeof AppHeader> = {
  title: "Layout/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "アプリケーションのヘッダーコンポーネント。タイトル、説明、テーマ切り替えボタンを含みます。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

function MockThemeProvider({ children, theme }: { children: React.ReactNode; theme: ThemeType }) {
  const mockContextValue: ThemeContextType = {
    theme,
    setTheme: () => {},
    toggleTheme: () => {},
  };

  return <ThemeContext.Provider value={mockContextValue}>{children}</ThemeContext.Provider>;
}

export const LightMode: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="light">
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <Story />
          <div className="p-8 text-center text-sm text-gray-600">
            ライトモードでのヘッダー表示
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="dark">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 dark">
          <Story />
          <div className="p-8 text-center text-sm text-gray-400">
            ダークモードでのヘッダー表示
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
};

export const Responsive: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="light">
        <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <Story />
          <div className="p-4 text-center text-xs text-gray-500">
            画面サイズを変更してレスポンシブ対応を確認できます
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
};