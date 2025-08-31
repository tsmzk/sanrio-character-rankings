import { Switch } from "@headlessui/react";
import { useState } from "react";
import { debug } from "../../../shared/utils/debug";
import { useTheme } from "../hooks/useTheme";
import { getThemeEmoji } from "../utils/themeUtils";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = async () => {
    setIsSwitching(true);
    debug.toggle(theme);
    toggleTheme();

    // Reset switching state after animation
    setTimeout(() => {
      setIsSwitching(false);
      debug.animation("Theme switch");
    }, 300);
  };

  const currentThemeEmoji = getThemeEmoji(theme);

  return (
    <Switch
      checked={theme === "dark"}
      onChange={handleToggle}
      className={`
        relative flex items-center gap-2 p-2 rounded-lg
        bg-gray-100 dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${compact ? "px-1 py-1" : "px-3 py-2"}
        ${isSwitching ? "scale-95" : "hover:scale-105"}
        ${className}
      `}
    >
      {/* Screen reader text */}
      <span className="sr-only">
        テーマ切り替えボタン - 現在: {theme === "light" ? "ライトモード" : "ダークモード"}
      </span>

      {/* Light mode indicator */}
      <div
        className={`
          flex items-center justify-center text-lg transition-all duration-300
          ${compact ? "w-6 h-6" : "w-8 h-8"}
          ${
            theme === "light"
              ? "text-yellow-500 scale-110 drop-shadow-sm"
              : "text-gray-400 dark:text-gray-600 scale-90 opacity-60"
          }
        `}
      >
        {getThemeEmoji("light")}
      </div>

      {/* Toggle switch track */}
      <div
        className={`
          relative rounded-full transition-all duration-300 ease-in-out
          ${compact ? "w-12 h-6" : "w-16 h-8"}
          ${
            theme === "dark"
              ? "bg-primary-500 shadow-lg shadow-primary-500/25"
              : "bg-gray-300 dark:bg-gray-600"
          }
        `}
      >
        {/* Toggle switch handle */}
        <div
          className={`
            absolute top-0.5 flex items-center justify-center
            bg-white dark:bg-gray-100 rounded-full shadow-lg text-sm
            transition-all duration-300 ease-in-out
            ${compact ? "w-5 h-5" : "w-7 h-7"}
            ${theme === "dark" ? (compact ? "translate-x-6" : "translate-x-8") : "translate-x-0.5"}
          `}
        >
          <span className="transition-transform duration-300">{currentThemeEmoji}</span>
        </div>
      </div>

      {/* Dark mode indicator */}
      <div
        className={`
          flex items-center justify-center text-lg transition-all duration-300
          ${compact ? "w-6 h-6" : "w-8 h-8"}
          ${
            theme === "dark"
              ? "text-purple-400 scale-110 drop-shadow-sm"
              : "text-gray-400 dark:text-gray-600 scale-90 opacity-60"
          }
        `}
      >
        {getThemeEmoji("dark")}
      </div>
    </Switch>
  );
}
