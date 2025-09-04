interface AppLoadingStateProps {
  message?: string;
  className?: string;
}

export function AppLoadingState({
  message = "読み込み中...",
  className = "",
}: AppLoadingStateProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
        <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">{message}</div>
      </div>
    </div>
  );
}
