interface CharacterSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  className?: string;
}

export function CharacterSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
  className = "",
}: CharacterSearchProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="キャラクター名で検索..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full px-3 py-2 text-sm
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-colors duration-200
          "
        />

        {/* Search icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="検索アイコン"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={onClearSearch}
        disabled={searchQuery === ""}
        className="
          px-3 py-2 text-sm rounded-lg
          text-gray-600 dark:text-gray-400
          hover:text-gray-900 dark:hover:text-white
          hover:bg-gray-100 dark:hover:bg-gray-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        検索クリア
      </button>
    </div>
  );
}
