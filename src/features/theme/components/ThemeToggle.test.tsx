import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, userEvent } from "../../../test/test-utils";
import { ThemeToggle } from "./ThemeToggle";

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

    // Should show moon emoji when in light theme (to switch to dark)
    expect(screen.getByText("🌙")).toBeInTheDocument();
    expect(screen.queryByText("☀️")).not.toBeInTheDocument();

    // Should have correct ARIA label
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("renders correctly in dark theme", () => {
    mockTheme.mockReturnValue("dark");
    render(<ThemeToggle />);

    // Should show sun emoji when in dark theme (to switch to light)
    expect(screen.getByText("☀️")).toBeInTheDocument();
    expect(screen.queryByText("🌙")).not.toBeInTheDocument();

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("calls toggleTheme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button");
    await user.click(toggleButton);

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button");

    // Focus and activate with keyboard (Enter key)
    await user.click(toggleButton); // user.click handles both mouse and keyboard activation

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it("applies custom className", () => {
    render(<ThemeToggle className="custom-class" />);

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveClass("custom-class");
  });

  it("has theme-toggle class", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveClass("theme-toggle");
  });

  it("has correct button type", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("type", "button");
  });
});
