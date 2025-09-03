import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, userEvent } from "../../test/test-utils";
import { Select } from "./Select";

describe("Select Component", () => {
  const mockOptions = [
    { value: 1, label: "2020年" },
    { value: 2, label: "2021年" },
    { value: 3, label: "2022年" },
  ];

  const defaultProps = {
    value: 1,
    onChange: vi.fn(),
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct initial value", () => {
    render(<Select {...defaultProps} />);

    expect(screen.getByText("2020年")).toBeInTheDocument();
  });

  it("renders with label when provided", () => {
    render(<Select {...defaultProps} label="テストラベル" />);

    expect(screen.getByText("テストラベル")).toBeInTheDocument();
  });

  it("renders placeholder when no value selected", () => {
    render(<Select {...defaultProps} value="" placeholder="選択してください" />);

    expect(screen.getByText("選択してください")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Check that the listbox is visible
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // All options should be visible within the listbox
    expect(screen.getAllByText("2020年")).toHaveLength(2); // One in button, one in list
    expect(screen.getByText("2021年")).toBeInTheDocument();
    expect(screen.getByText("2022年")).toBeInTheDocument();
  });

  it("calls onChange when option selected", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<Select {...defaultProps} onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    await user.click(button);

    const option = screen.getByText("2021年");
    await user.click(option);

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it("shows correct selection with checkmark", async () => {
    const user = userEvent.setup();
    render(<Select {...defaultProps} />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Find the option within the listbox using role
    const options = screen.getAllByRole("option");
    const selectedOption = options.find(
      (option) => option.getAttribute("aria-selected") === "true",
    );

    expect(selectedOption).toBeTruthy();
    expect(selectedOption).toHaveAttribute("aria-selected", "true");
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<Select {...defaultProps} onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Navigate with keyboard
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("handles disabled state correctly", () => {
    render(<Select {...defaultProps} disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("handles disabled options correctly", async () => {
    const user = userEvent.setup();
    const optionsWithDisabled = [
      { value: 1, label: "2020年" },
      { value: 2, label: "2021年", disabled: true },
      { value: 3, label: "2022年" },
    ];

    render(<Select {...defaultProps} options={optionsWithDisabled} />);

    const button = screen.getByRole("button");
    await user.click(button);

    const disabledOption = screen.getByText("2021年").closest('[role="option"]');
    expect(disabledOption).toHaveClass("opacity-50 cursor-not-allowed");
  });

  it("has proper accessibility attributes", () => {
    render(<Select {...defaultProps} label="年選択" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup", "listbox");
    expect(button).toHaveAttribute("aria-expanded", "false");

    const label = screen.getByText("年選択");
    expect(label).toBeInTheDocument();
  });
});
