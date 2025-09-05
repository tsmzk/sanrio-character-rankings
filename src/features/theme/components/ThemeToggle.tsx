import { useTheme } from "../hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      data-theme={theme}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-icons">
          <span className={`theme-toggle-icon ${theme === "light" ? "active" : "inactive"}`}>
            ☀️
          </span>
          <span className={`theme-toggle-icon ${theme === "dark" ? "active" : "inactive"}`}>
            🌙
          </span>
        </div>
        <div className="theme-toggle-handle"></div>
      </div>
    </button>
  );
}
