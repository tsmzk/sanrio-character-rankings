import { ThemeToggle } from "../../../theme";

export function AppHeader() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg py-6 mb-6 rounded-b-3xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 flex flex-col items-center gap-2 relative">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 text-center transition-all duration-300">
          サンリオキャラクターランキング推移
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 text-center">
          推移のキャラクターを選択して、年次ランキングの推移をトラッキングします
        </p>
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
