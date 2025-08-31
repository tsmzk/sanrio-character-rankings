interface FilterSummaryProps {
  yearRange: { min: number; max: number };
  rankRange?: { min: number; max: number };
  showRankRange?: boolean;
  className?: string;
}

export function FilterSummary({
  yearRange,
  rankRange,
  showRankRange = false,
  className = "",
}: FilterSummaryProps) {
  const yearSpan = yearRange.max - yearRange.min + 1;

  return (
    <div
      className={`space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">表示期間:</span>
          <span className="text-sm text-gray-900 dark:text-white">
            {yearRange.min}年 〜 {yearRange.max}年
          </span>
        </div>
        <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
          {yearSpan}年間
        </span>
      </div>

      {showRankRange && rankRange && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">順位範囲:</span>
          <span className="text-sm text-gray-900 dark:text-white">
            {rankRange.min}位 〜 {rankRange.max}位
          </span>
        </div>
      )}
    </div>
  );
}
