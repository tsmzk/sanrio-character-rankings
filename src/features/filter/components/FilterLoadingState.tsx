interface FilterLoadingStateProps {
  className?: string;
}

export function FilterLoadingState({ className = "" }: FilterLoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className="loading-spinner mb-3" />
      <p className="text-sm text-gray-600 dark:text-gray-400">フィルターを読み込み中...</p>
    </div>
  );
}

interface FilterEmptyStateProps {
  className?: string;
}

export function FilterEmptyState({ className = "" }: FilterEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
        <span className="text-2xl text-gray-400 dark:text-gray-600">📊</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        フィルター設定できません
        <br />
        （データがありません）
      </p>
    </div>
  );
}
