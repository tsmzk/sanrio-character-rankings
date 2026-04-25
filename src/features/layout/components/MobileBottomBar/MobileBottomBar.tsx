interface MobileBottomBarProps {
  selectedCount: number;
  onOpenCharacters: () => void;
  onOpenYearFilter: () => void;
}

export function MobileBottomBar({
  selectedCount,
  onOpenCharacters,
  onOpenYearFilter,
}: MobileBottomBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden pointer-events-none px-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)" }}
    >
      <div className="mx-auto flex w-fit max-w-full items-stretch gap-1 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-1.5 shadow-2xl border border-gray-200/60 dark:border-gray-700/60 pointer-events-auto">
        <button
          type="button"
          onClick={onOpenCharacters}
          className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-pink-600 hover:to-purple-700 active:scale-95"
          aria-label={`キャラクター選択 (${selectedCount}件選択中)`}
        >
          <span aria-hidden="true">✨</span>
          <span>キャラ選択</span>
          {selectedCount > 0 && (
            <span
              className="ml-0.5 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-white/95 px-1.5 text-xs font-bold text-pink-600"
              aria-hidden="true"
            >
              {selectedCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onOpenYearFilter}
          className="flex items-center gap-1 rounded-full px-3.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
          aria-label="期間設定"
        >
          <span aria-hidden="true">📅</span>
          <span>期間</span>
        </button>
      </div>
    </div>
  );
}
