import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, userEvent } from "../test/test-utils";
import { ThemeToggle } from "./ThemeToggle";

// Mock the theme utilities
vi.mock("../utils/themeUtils", () => ({
  getThemeEmoji: vi.fn((theme: string) => (theme === "light" ? "☀️" : "🌙")),
}));

// Mock the debug utility
vi.mock("../utils/debug", () => ({
  debug: {
    toggle: vi.fn(),
    animation: vi.fn(),
    theme: vi.fn(),
  },
}));

// Mock the useTheme hook
const mockToggleTheme = vi.fn();
const mockTheme = vi.fn();

vi.mock("../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: mockTheme(),
    toggleTheme: mockToggleTheme,
  }),
}));

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme.mockReturnValue("light");
  });

  it("renders correctly in light theme", () => {
    mockTheme.mockReturnValue("light");
    render(<ThemeToggle />);

    // Should show light theme indicators
    expect(screen.getByText("☀️")).toBeInTheDocument();
    expect(screen.getByText("🌙")).toBeInTheDocument();

    // Should have correct ARIA label
    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).not.toBeChecked(); // Light theme = not checked
  });

  it("renders correctly in dark theme", () => {
    mockTheme.mockReturnValue("dark");
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toBeChecked(); // Dark theme = checked
  });

  it("calls toggleTheme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");
    await user.click(toggleSwitch);

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it("handles switching animation state", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");

    // Initial state should not have switching class
    expect(toggleSwitch).not.toHaveClass("scale-95");

    await user.click(toggleSwitch);

    // After click, should trigger the toggle
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("renders in compact mode", () => {
    render(<ThemeToggle compact />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveClass("px-1", "py-1");
  });

  it("renders in normal mode by default", () => {
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveClass("px-3", "py-2");
  });

  it("applies custom className", () => {
    render(<ThemeToggle className="custom-class" />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveClass("custom-class");
  });

  it("shows correct emoji in toggle handle", () => {
    mockTheme.mockReturnValue("light");
    render(<ThemeToggle />);

    // The handle should show the current theme emoji
    const handles = screen.getAllByText("☀️");
    expect(handles.length).toBeGreaterThan(1); // Should appear in both indicator and handle
  });

  it("shows current theme emoji in handle for dark theme", () => {
    mockTheme.mockReturnValue("dark");
    render(<ThemeToggle />);

    // The handle should show the current theme emoji
    const handles = screen.getAllByText("🌙");
    expect(handles.length).toBeGreaterThan(1); // Should appear in both indicator and handle
  });

  it("has proper accessibility attributes", () => {
    mockTheme.mockReturnValue("light");
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveAttribute("aria-checked", "false");

    // Should have screen reader text
    expect(screen.getByText(/テーマ切り替えボタン/)).toBeInTheDocument();
  });

  it("updates accessibility attributes for dark theme", () => {
    mockTheme.mockReturnValue("dark");
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveAttribute("aria-checked", "true");
  });

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");

    // Focus and activate with keyboard
    toggleSwitch.focus();
    await user.keyboard("{Space}");

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it("has proper focus management", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");

    await user.tab(); // Tab to the toggle
    expect(toggleSwitch).toHaveFocus();

    // Should have focus ring classes
    expect(toggleSwitch).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-primary-500",
    );
  });

  it("shows different styles for light and dark themes", () => {
    const { rerender } = render(<ThemeToggle />, { theme: "light" });

    let toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveClass("bg-gray-100");

    rerender(
      <div data-theme="dark">
        <ThemeToggle />
      </div>,
    );

    toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toHaveClass("dark:bg-gray-800");
  });

  it("handles rapid clicks gracefully", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleSwitch = screen.getByRole("switch");

    // Rapid clicks
    await user.click(toggleSwitch);
    await user.click(toggleSwitch);
    await user.click(toggleSwitch);

    expect(mockToggleTheme).toHaveBeenCalledTimes(3);
  });
});
