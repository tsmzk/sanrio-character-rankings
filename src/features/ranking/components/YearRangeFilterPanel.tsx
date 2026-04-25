import type { useYearRangeFilter } from "../../../hooks";

interface YearRangeFilterPanelProps {
  yearRangeFilter: ReturnType<typeof useYearRangeFilter>;
}

export function YearRangeFilterPanel({ yearRangeFilter }: YearRangeFilterPanelProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 italic">
        利用可能期間: {yearRangeFilter.availableYearRange.min}年～
        {yearRangeFilter.availableYearRange.max}年
      </div>
      {yearRangeFilter.yearRange.min < 2015 && (
        <div className="text-xs text-amber-600 dark:text-amber-400 text-center mb-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-2">
          <span className="font-bold mr-1">！</span>
          2015年以前のデータは公式サイト以外の媒体から入手した情報をもとにランキングを出力しています
        </div>
      )}
      <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="text-base font-semibold text-pink-600 dark:text-pink-400">
          {yearRangeFilter.yearRange.min}年
        </span>
        <span className="text-gray-400">～</span>
        <span className="text-base font-semibold text-purple-600 dark:text-purple-400">
          {yearRangeFilter.yearRange.max}年
        </span>
      </div>
      <div className="space-y-3">
        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
          開始年:
          <input
            type="range"
            min={yearRangeFilter.availableYearRange.min}
            max={yearRangeFilter.availableYearRange.max}
            value={yearRangeFilter.yearRange.min}
            onChange={(e) => yearRangeFilter.updateStartYear(Number(e.target.value))}
            className="mt-1 accent-pink-500"
          />
        </label>
        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
          終了年:
          <input
            type="range"
            min={yearRangeFilter.availableYearRange.min}
            max={yearRangeFilter.availableYearRange.max}
            value={yearRangeFilter.yearRange.max}
            onChange={(e) => yearRangeFilter.updateEndYear(Number(e.target.value))}
            className="mt-1 accent-purple-500"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={yearRangeFilter.resetToFullRange}
        disabled={yearRangeFilter.isResetDisabled}
        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-md disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        全期間にリセット
      </button>
    </div>
  );
}
