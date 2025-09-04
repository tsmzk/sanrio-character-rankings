interface AppErrorStateProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export function AppErrorState({ error, onRetry, className = "" }: AppErrorStateProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-6">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="エラーアイコン"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            エラーが発生しました
          </h2>
          <div className="text-red-500 text-base mb-4 break-words">{error}</div>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          >
            再試行
          </button>
        )}
      </div>
    </div>
  );
}
