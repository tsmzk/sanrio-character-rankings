import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "../features/theme/contexts/ThemeContext";
import type { Character, RankingEntry } from "../shared/types";

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  theme?: "light" | "dark";
}

function customRender(ui: ReactElement, { theme = "light", ...options }: CustomRenderOptions = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    // Mock theme context value
    const mockThemeValue = {
      theme,
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    };

    return (
      <div data-theme={theme}>
        <ThemeProvider value={mockThemeValue}>{children}</ThemeProvider>
      </div>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// Mock data generators
export const createMockCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: "test-character-1",
  name: "テストキャラクター",
  nameEn: "Test Character",
  description: "テスト用のキャラクターです",
  debutYear: 2020,
  color: "#ff6b9d",
  ...overrides,
});

export const createMockCharacters = (count: number): Character[] =>
  Array.from({ length: count }, (_, i) =>
    createMockCharacter({
      id: `test-character-${i + 1}`,
      name: `テストキャラクター${i + 1}`,
      nameEn: `Test Character ${i + 1}`,
      color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`, // Generate distinct colors
    }),
  );

export const createMockRanking = (overrides: Partial<RankingEntry> = {}): RankingEntry => ({
  characterId: "test-character-1",
  year: 2023,
  rank: 5,
  votes: 1000,
  ...overrides,
});

export const createMockRankings = (characterIds: string[], years: number[]): RankingEntry[] => {
  const rankings: RankingEntry[] = [];
  characterIds.forEach((characterId) => {
    years.forEach((year) => {
      rankings.push(
        createMockRanking({
          characterId,
          year,
          rank: Math.floor(Math.random() * 12) + 1, // Random rank 1-12
          votes: Math.floor(Math.random() * 5000) + 1000, // Random votes
        }),
      );
    });
  });
  return rankings;
};

// Component testing utilities
export const waitForChartLoad = async () => {
  // Wait for chart components to stabilize
  await new Promise((resolve) => setTimeout(resolve, 100));
};

export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });

  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

// Theme testing utilities
export const testBothThemes = (testFn: (theme: "light" | "dark") => void) => {
  describe("light theme", () => testFn("light"));
  describe("dark theme", () => testFn("dark"));
};

// Accessibility testing helpers
export const axeConfig = {
  rules: {
    // Disable color contrast checking for mock components
    "color-contrast": { enabled: false },
    // Allow regions without accessible names in tests
    region: { enabled: false },
  },
};

// Re-export everything from testing-library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// Override render with our custom version
export { customRender as render };
