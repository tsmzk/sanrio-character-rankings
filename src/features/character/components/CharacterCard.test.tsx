import { describe, expect, it, vi } from "vitest";
import { createMockCharacter, render, screen, userEvent } from "../../../test/test-utils";
import { CharacterCard } from "./CharacterCard";

describe("CharacterCard Component", () => {
  const mockCharacter = createMockCharacter({
    id: "hello-kitty",
    name: "ハローキティ",
    nameEn: "Hello Kitty",
    color: "#ff6b9d",
  });

  const defaultProps = {
    character: mockCharacter,
    isSelected: false,
    onToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders character information correctly", () => {
    render(<CharacterCard {...defaultProps} />);

    expect(screen.getByText("ハローキティ")).toBeInTheDocument();
    expect(screen.getByText("Hello Kitty")).toBeInTheDocument();
  });

  it("shows color indicator with correct color", () => {
    render(<CharacterCard {...defaultProps} />);

    // Find color indicator by its visual style attributes
    const colorIndicator =
      document.querySelector('[style*="background-color: rgb(255, 107, 157)"]') ||
      document.querySelector('[style*="background-color: #ff6b9d"]');
    expect(colorIndicator).toBeTruthy();
  });

  it("renders checkbox correctly", () => {
    render(<CharacterCard {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("shows selected state correctly", () => {
    render(<CharacterCard {...defaultProps} isSelected={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    // Should have primary colors when selected
    const card = checkbox.closest("label");
    expect(card).toHaveClass("bg-primary-50");
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();

    render(<CharacterCard {...defaultProps} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith("hello-kitty");
  });

  it("calls onToggle when label is clicked", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();

    render(<CharacterCard {...defaultProps} onToggle={mockOnToggle} />);

    const label = screen.getByText("ハローキティ");
    await user.click(label);

    expect(mockOnToggle).toHaveBeenCalledWith("hello-kitty");
  });

  it("shows checkmark icon when selected", () => {
    render(<CharacterCard {...defaultProps} isSelected={true} />);

    // Look for the checkmark SVG
    const checkmark = screen.getByRole("img", { hidden: true });
    expect(checkmark).toBeInTheDocument();
  });

  it("applies hover effects correctly", () => {
    render(<CharacterCard {...defaultProps} />);

    const card = screen.getByRole("checkbox").closest("label");
    expect(card).toHaveClass("hover:bg-gray-50", "hover:shadow-md", "hover:scale-[1.02]");
  });

  it("handles character without English name", () => {
    const characterNoEn = createMockCharacter({
      nameEn: undefined, // Simulate missing English name
    });

    render(<CharacterCard {...defaultProps} character={characterNoEn} />);

    expect(screen.getByText("テストキャラクター")).toBeInTheDocument();
    expect(screen.queryByText("Test Character")).not.toBeInTheDocument();
  });

  it("truncates long names properly", () => {
    const longNameCharacter = createMockCharacter({
      name: "とても長い名前のキャラクターでテストします",
      nameEn: "Very Long Character Name For Testing Purposes",
    });

    render(<CharacterCard {...defaultProps} character={longNameCharacter} />);

    const nameElement = screen.getByText("とても長い名前のキャラクターでテストします");
    expect(nameElement).toHaveClass("truncate");
  });

  it("has proper accessibility attributes", () => {
    render(<CharacterCard {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAccessibleName();

    const card = checkbox.closest("label");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("cursor-pointer");
  });

  it("applies focus ring correctly", () => {
    render(<CharacterCard {...defaultProps} />);

    const card = screen.getByRole("checkbox").closest("label");
    expect(card).toHaveClass(
      "focus-within:ring-2",
      "focus-within:ring-primary-500",
      "focus-within:ring-offset-2",
    );
  });

  it("uses different styles for light and dark themes", () => {
    const { rerender } = render(<CharacterCard {...defaultProps} />, { theme: "light" });

    let card = screen.getByRole("checkbox").closest("label");
    expect(card).toHaveClass("bg-white", "border-gray-200");

    rerender(
      <div data-theme="dark">
        <CharacterCard {...defaultProps} />
      </div>,
    );

    card = screen.getByRole("checkbox").closest("label");
    expect(card).toHaveClass("dark:bg-gray-800", "dark:border-gray-700");
  });
});
