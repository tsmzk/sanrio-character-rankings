interface FilterHeaderProps {
  onReset: () => void;
  className?: string;
}

export function FilterHeader({ onReset, className = "" }: FilterHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">表示設定</h3>
      <button
        type="button"
        onClick={onReset}
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
      >
        リセット
      </button>
    </div>
  );
}
