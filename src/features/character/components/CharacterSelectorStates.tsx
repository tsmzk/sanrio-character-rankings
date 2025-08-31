interface CharacterLoadingStateProps {
  className?: string;
}

export function CharacterLoadingState({ className = "" }: CharacterLoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className="loading-spinner mb-3" />
      <p className="text-sm text-gray-600 dark:text-gray-400">キャラクターを読み込み中...</p>
    </div>
  );
}

interface CharacterEmptyStateProps {
  message?: string;
  className?: string;
}

export function CharacterEmptyState({
  message = "キャラクターデータがありません",
  className = "",
}: CharacterEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
        <span className="text-2xl text-gray-400 dark:text-gray-600">👥</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}
