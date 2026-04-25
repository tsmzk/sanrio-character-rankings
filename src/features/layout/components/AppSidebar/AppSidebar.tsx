import type {
  useCharacterSearch,
  useCharacterSelection,
  useYearRangeFilter,
} from "../../../../hooks";
import type { Character } from "../../../../shared/types";
import { CharacterSelectionPanel } from "../../../character";
import { YearRangeFilterPanel } from "../../../ranking";

interface AppSidebarProps {
  yearRangeFilter: ReturnType<typeof useYearRangeFilter>;
  characterSearch: ReturnType<typeof useCharacterSearch>;
  characterSelection: ReturnType<typeof useCharacterSelection>;
  allCharacters: Character[];
}

export function AppSidebar({
  yearRangeFilter,
  characterSearch,
  characterSelection,
  allCharacters,
}: AppSidebarProps) {
  return (
    <aside className="lg:w-80 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 h-fit shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6 lg:sticky lg:top-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gradient-to-r from-pink-500 to-purple-500">
          ランキング期間
        </h2>
        <YearRangeFilterPanel yearRangeFilter={yearRangeFilter} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gradient-to-r from-pink-500 to-purple-500">
          キャラクター選択
        </h2>
        <CharacterSelectionPanel
          characterSearch={characterSearch}
          characterSelection={characterSelection}
          allCharacters={allCharacters}
        />
      </section>
    </aside>
  );
}
