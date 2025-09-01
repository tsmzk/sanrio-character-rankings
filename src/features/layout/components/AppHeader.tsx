import { ThemeToggle } from "../../theme/components/ThemeToggle";

interface AppHeaderProps {
  className?: string;
}

export function AppHeader({ className = "" }: AppHeaderProps) {
  return (
    <header
      className={`backdrop-blur-sm border-b ${className}`}
      style={{
        backgroundColor: "var(--color-bg-overlay)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Empty space for balance */}
          <div className="flex-1" />

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              サンリオキャラクター
            </h1>
            <h2
              className="text-lg sm:text-xl font-medium -mt-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              ランキング推移
            </h2>
          </div>

          {/* Theme Toggle */}
          <div className="flex-1 flex justify-end">
            <ThemeToggle compact />
          </div>
        </div>

        {/* Description */}
        <div className="pb-4">
          <p
            className="text-center text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            複数のキャラクターを選択して、年次ランキングの推移を比較できます
          </p>
        </div>
      </div>
    </header>
  );
}
