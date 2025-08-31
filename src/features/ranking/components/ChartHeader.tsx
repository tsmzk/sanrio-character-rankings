interface ChartHeaderProps {
  yearRange: { min: number; max: number };
  characterCount: number;
  className?: string;
}

export function ChartHeader({ yearRange, characterCount, className = "" }: ChartHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">ランキング推移</h2>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="期間アイコン"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-600 dark:text-gray-400">
            {yearRange.min}年 - {yearRange.max}年
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="キャラクター数アイコン"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-gray-600 dark:text-gray-400">{characterCount}キャラクター</span>
        </div>
      </div>
    </div>
  );
}
