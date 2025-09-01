import type { ThemeType } from "../contexts/theme-context";

// Theme utility functions
export const getThemeEmoji = (theme: ThemeType): string => {
  return theme === "light" ? "☀️" : "🌙";
};
