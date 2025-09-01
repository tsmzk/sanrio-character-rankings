import { Select } from "../../../shared/components/Select";

interface YearRangeSelectorProps {
  yearRange: { min: number; max: number };
  availableYearRange: { min: number; max: number };
  onYearRangeChange: (type: "min" | "max", value: number) => void;
  className?: string;
}

export function YearRangeSelector({
  yearRange,
  availableYearRange,
  onYearRangeChange,
  className = "",
}: YearRangeSelectorProps) {
  const generateYearOptions = () => {
    return Array.from(
      { length: availableYearRange.max - availableYearRange.min + 1 },
      (_, i) => availableYearRange.min + i,
    ).map((year) => ({
      value: year,
      label: `${year}年`,
    }));
  };

  const calculateSliderPosition = () => {
    const minPercent =
      ((yearRange.min - availableYearRange.min) /
        (availableYearRange.max - availableYearRange.min)) *
      100;
    const widthPercent =
      ((yearRange.max - yearRange.min) / (availableYearRange.max - availableYearRange.min)) * 100;
    return { left: `${minPercent}%`, width: `${widthPercent}%` };
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">表示期間</span>
      </div>

      {/* Year Selection Dropdowns */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select
            label="開始年"
            value={yearRange.min}
            onChange={(value) => onYearRangeChange("min", value as number)}
            options={generateYearOptions()}
            className="w-full"
          />
        </div>

        <span className="text-gray-400 dark:text-gray-600 mt-6">〜</span>

        <div className="flex-1">
          <Select
            label="終了年"
            value={yearRange.max}
            onChange={(value) => onYearRangeChange("max", value as number)}
            options={generateYearOptions()}
            className="w-full"
          />
        </div>
      </div>

      {/* Dual Range Slider */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        {/* Highlight Track */}
        <div
          className="absolute h-full bg-primary-500 rounded-full"
          style={calculateSliderPosition()}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={availableYearRange.min}
          max={availableYearRange.max}
          value={yearRange.min}
          onChange={(e) => onYearRangeChange("min", parseInt(e.target.value, 10))}
          className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider-min"
          style={{ pointerEvents: "auto" }}
        />

        {/* Max Slider */}
        <input
          type="range"
          min={availableYearRange.min}
          max={availableYearRange.max}
          value={yearRange.max}
          onChange={(e) => onYearRangeChange("max", parseInt(e.target.value, 10))}
          className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider-max"
          style={{ pointerEvents: "auto" }}
        />
      </div>

      {/* Range Labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{availableYearRange.min}年</span>
        <span>{availableYearRange.max}年</span>
      </div>
    </div>
  );
}
