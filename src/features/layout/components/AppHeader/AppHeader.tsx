import { ThemeToggle } from "../../../theme";

export function AppHeader() {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-sm shadow-lg mb-6 rounded-b-3xl">
      <div className="navbar-start"></div>

      <div className="navbar-center flex-col">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 text-center transition-all duration-300">
          サンリオキャラクターランキング推移
        </h1>
        <p className="text-base opacity-70 text-center mt-2">
          推移のキャラクターを選択して、年次ランキングの推移をトラッキングします
        </p>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
