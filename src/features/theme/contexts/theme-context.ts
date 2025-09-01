import { createContext } from "react";

export type ThemeType = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const THEME_STORAGE_KEY = "app-theme";
