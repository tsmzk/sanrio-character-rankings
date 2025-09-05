import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacterSelection } from "./useCharacterSelection";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useCharacterSelection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it("initializes with empty selection by default", () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.selectedCharacters).toEqual([]);
    expect(result.current.isSelected("hello-kitty")).toBe(false);
  });

  it("initializes with provided initial selection", () => {
    const { result } = renderHook(() => useCharacterSelection(["hello-kitty", "my-melody"]));

    expect(result.current.selectedCharacters).toEqual(["hello-kitty", "my-melody"]);
    expect(result.current.isSelected("hello-kitty")).toBe(true);
  });

  it("loads selection from localStorage", () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(["hello-kitty"]));

    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.selectedCharacters).toEqual(["hello-kitty"]);
  });

  it("toggles character selection", () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.toggleCharacter("hello-kitty");
    });

    expect(result.current.selectedCharacters).toEqual(["hello-kitty"]);
    expect(result.current.isSelected("hello-kitty")).toBe(true);

    act(() => {
      result.current.toggleCharacter("hello-kitty");
    });

    expect(result.current.selectedCharacters).toEqual([]);
    expect(result.current.isSelected("hello-kitty")).toBe(false);
  });

  it("adds character", () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.addCharacter("hello-kitty");
    });

    expect(result.current.selectedCharacters).toEqual(["hello-kitty"]);

    // Adding the same character again should not duplicate
    act(() => {
      result.current.addCharacter("hello-kitty");
    });

    expect(result.current.selectedCharacters).toEqual(["hello-kitty"]);
  });

  it("removes character", () => {
    const { result } = renderHook(() => useCharacterSelection(["hello-kitty", "my-melody"]));

    act(() => {
      result.current.removeCharacter("hello-kitty");
    });

    expect(result.current.selectedCharacters).toEqual(["my-melody"]);
    expect(result.current.isSelected("hello-kitty")).toBe(false);
  });

  it("clears selection", () => {
    const { result } = renderHook(() => useCharacterSelection(["hello-kitty", "my-melody"]));

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedCharacters).toEqual([]);
  });

  it("saves to localStorage on changes", () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.addCharacter("hello-kitty");
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "sanrio-ranking-selected-characters",
      JSON.stringify(["hello-kitty"]),
    );
  });
});
