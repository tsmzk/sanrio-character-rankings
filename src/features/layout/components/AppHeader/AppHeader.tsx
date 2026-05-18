import { ThemeToggle } from "../../../theme";

type AppHeaderProps = {
  onNavigateHome?: () => void;
};

export function AppHeader({ onNavigateHome }: AppHeaderProps = {}) {
  const titleClass =
    "text-base sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 transition-all duration-300 break-words";

  return (
    <div className="relative bg-base-100/80 backdrop-blur-sm shadow-lg mb-6 rounded-b-3xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center text-center pr-20 sm:pr-20">
        {onNavigateHome ? (
          <a
            href="/"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              event.preventDefault();
              onNavigateHome();
            }}
            className="no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <h1 className={titleClass}>サンリオキャラ歴代順位ウォッチ</h1>
          </a>
        ) : (
          <h1 className={titleClass}>サンリオキャラ歴代順位ウォッチ</h1>
        )}
        <p className="text-xs sm:text-sm md:text-base opacity-70 mt-1 sm:mt-2">
          推移のキャラクターを選択して、年次ランキングの推移をトラッキングします
        </p>
      </div>
    </div>
  );
}
