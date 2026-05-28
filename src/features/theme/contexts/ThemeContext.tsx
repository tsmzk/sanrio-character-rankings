import type React from "react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../../shared/firebase";
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

      // Set data-theme for DaisyUI
      // Map light/dark to our custom DaisyUI themes
      const daisyTheme = theme === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", daisyTheme);

      localStorage.setItem(THEME_STORAGE_KEY, theme);
      debug.log(
        "✅ Theme set to:",
        theme,
        "DaisyUI theme:",
        daisyTheme,
        "Classes:",
        document.documentElement.className,
      );
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

  // 最新テーマを保持する ref。functional setState の updater 外で計測を1回だけ
  // 行うために使う(StrictMode の updater 二重実行による二重発火を避ける)。
  //
  // 注意: useCharacterSelection の selectedRef と同じ batched-update 上の限界がある。
  // 同一イベント内で toggleTheme を連続呼びすると 2 回目が古い ref を参照しうるが、
  // theme は light/dark の二値かつ同期連続切り替えの UI が無いため実害は更に低い。
  // 同期一括でテーマを切り替える API を追加する際は再評価すること。
  const themeRef = useRef<ThemeType>(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next: ThemeType = themeRef.current === "light" ? "dark" : "light";
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    trackEvent({ name: "theme_change", params: { theme: next } });
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
