import { Select } from "../../../shared/components/Select";

interface RankRangeSelectorProps {
  rankRange: { min: number; max: number };
  availableRankRange: { min: number; max: number };
  onRankRangeChange: (type: "min" | "max", value: number) => void;
  className?: string;
}

export function RankRangeSelector({
  rankRange,
  availableRankRange,
  onRankRangeChange,
  className = "",
}: RankRangeSelectorProps) {
  const generateRankOptions = () => {
    return Array.from(
      { length: availableRankRange.max - availableRankRange.min + 1 },
      (_, i) => availableRankRange.min + i,
    ).map((rank) => ({
      value: rank,
      label: `${rank}位`,
    }));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">順位範囲</span>
      </div>

      {/* Rank Selection Dropdowns */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select
            label="最高順位"
            value={rankRange.min}
            onChange={(value) => onRankRangeChange("min", value as number)}
            options={generateRankOptions()}
            className="w-full"
          />
        </div>

        <span className="text-gray-400 dark:text-gray-600 mt-6">〜</span>

        <div className="flex-1">
          <Select
            label="最低順位"
            value={rankRange.max}
            onChange={(value) => onRankRangeChange("max", value as number)}
            options={generateRankOptions()}
            className="w-full"
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          この順位範囲に入ったことがあるキャラクターのみを表示します
        </p>
      </div>
    </div>
  );
}
