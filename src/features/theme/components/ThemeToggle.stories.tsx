import type { Meta, StoryObj } from "@storybook/react";
import type { ThemeContextType, ThemeType } from "../contexts/theme-context";
import { ThemeContext } from "../contexts/theme-context";
import { ThemeToggle } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Theme/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

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
        <div className="p-4 bg-white text-gray-900 rounded-lg">
          <div className="text-sm mb-2 text-gray-600">現在のテーマ: ライトモード</div>
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="dark">
        <div className="p-4 bg-gray-900 text-white rounded-lg">
          <div className="text-sm mb-2 text-gray-400">現在のテーマ: ダークモード</div>
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};
