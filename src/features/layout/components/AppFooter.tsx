import { useTheme } from "../../theme/hooks/useTheme";

interface AppFooterProps {
  className?: string;
}

export function AppFooter({ className = "" }: AppFooterProps) {
  const { theme } = useTheme();

  return (
    <footer
      className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 サンリオキャラクターランキング推移. データは架空のものです。
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            現在のテーマ: {theme === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"} | data-theme:{" "}
            {theme}
          </p>
        </div>
      </div>
    </footer>
  );
}
