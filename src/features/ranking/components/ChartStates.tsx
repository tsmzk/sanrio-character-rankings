interface ChartLoadingStateProps {
  height: number;
  className?: string;
}

export function ChartLoadingState({ height, className = "" }: ChartLoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height }}
    >
      <div className="loading-spinner mb-3" />
      <p className="text-sm text-gray-600 dark:text-gray-400">チャートを読み込み中...</p>
    </div>
  );
}

interface ChartEmptyStateProps {
  height: number;
  className?: string;
}

export function ChartEmptyState({ height, className = "" }: ChartEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height }}
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-label="チャートアイコン"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        キャラクターを選択してください
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
        左側からキャラクターを選択すると、ランキング推移が表示されます。
      </p>
    </div>
  );
}

interface ChartNoDataStateProps {
  height: number;
  className?: string;
}

export function ChartNoDataState({ height, className = "" }: ChartNoDataStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height }}
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-label="警告アイコン"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        データがありません
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-sm space-y-1">
        <p>選択されたキャラクターの指定期間内のランキングデータが見つかりません。</p>
        <p>別の期間を選択するか、他のキャラクターを選んでください。</p>
      </div>
    </div>
  );
}
