import type React from "react";
import { useEffect, useState } from "react";
import { debug } from "../../../shared/utils/debug";
import type { ThemeContextType, ThemeType } from "./theme-context";
import { THEME_STORAGE_KEY, ThemeContext } from "./theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Try to get theme from localStorage first
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType;
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }

      // Fallback to system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    return defaultTheme;
  });

  // Apply theme to document element
  useEffect(() => {
    if (typeof document !== "undefined") {
      debug.theme("setting", theme);

      // Remove old classes and data-theme attribute
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.removeAttribute("data-theme");

      // Add new theme class (Tailwind standard)
      document.documentElement.classList.add(theme);

      // Set data-theme for custom CSS compatibility
      document.documentElement.setAttribute("data-theme", theme);

      localStorage.setItem(THEME_STORAGE_KEY, theme);
      debug.log("✅ Theme set to:", theme, "Classes:", document.documentElement.className);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no theme has been manually selected
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
