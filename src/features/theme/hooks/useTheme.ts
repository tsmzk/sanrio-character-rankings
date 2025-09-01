import { useContext } from "react";
import type { ThemeContextType } from "../contexts/theme-context";
import { ThemeContext } from "../contexts/theme-context";

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
