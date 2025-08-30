import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { getThemeEmoji } from "../../utils/themeUtils";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = async () => {
    setIsSwitching(true);
    console.log("🔄 Theme toggle clicked! Current theme:", theme);
    toggleTheme();

    // Reset switching state after animation
    setTimeout(() => {
      setIsSwitching(false);
      console.log("✨ Theme switch animation complete");
    }, 300);
  };

  const currentThemeEmoji = getThemeEmoji(theme);

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${compact ? styles.compact : ""} ${isSwitching ? styles.switching : ""} ${className}`}
      onClick={handleToggle}
      aria-label={`テーマ切り替えボタン。クリックしてテーマを変更`}
    >
      {/* Screen reader text */}
      <span className={styles.srOnly}>テーマ切り替えボタン</span>

      {/* Light mode theme label */}
      <div
        className={`${styles.themeLabel} ${theme === "light" ? styles.currentTheme : styles.inactiveTheme}`}
      >
        <div className={styles.themeEmoji}>{getThemeEmoji("light")}</div>
      </div>

      {/* Toggle switch */}
      <div className={styles.toggleSwitch}>
        <div className={styles.toggleHandle}>{currentThemeEmoji}</div>
      </div>

      {/* Dark mode theme label */}
      <div
        className={`${styles.themeLabel} ${theme === "dark" ? styles.currentTheme : styles.inactiveTheme}`}
      >
        <div className={styles.themeEmoji}>{getThemeEmoji("dark")}</div>
      </div>
    </button>
  );
}
