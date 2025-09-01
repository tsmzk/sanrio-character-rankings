interface CharacterSelectorHeaderProps {
  selectedCount: number;
  onClearSelection: () => void;
  className?: string;
}

export function CharacterSelectorHeader({
  selectedCount,
  onClearSelection,
  className = "",
}: CharacterSelectorHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">キャラクター選択</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCount}件選択中</span>

        <button
          type="button"
          onClick={onClearSelection}
          disabled={selectedCount === 0}
          className="
            text-sm px-3 py-1 rounded
            text-gray-600 dark:text-gray-400 
            hover:text-red-600 dark:hover:text-red-400
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          選択解除
        </button>
      </div>
    </div>
  );
}
