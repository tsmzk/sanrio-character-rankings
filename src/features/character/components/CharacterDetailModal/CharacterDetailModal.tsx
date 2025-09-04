import type { useCharacterModal } from "../../../hooks";
import type { RankingEntry } from "../../../shared/types";

interface CharacterDetailModalProps {
  characterModal: ReturnType<typeof useCharacterModal>;
  rankings: RankingEntry[];
}

export function CharacterDetailModal({ characterModal, rankings }: CharacterDetailModalProps) {
  if (!characterModal.isOpen || !characterModal.selectedCharacter) {
    return null;
  }

  return (
    <button
      type="button"
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-default"
      onClick={characterModal.closeModal}
      onKeyDown={(e) => {
        if (e.key === "Escape") characterModal.closeModal();
      }}
      aria-label="Close modal"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl cursor-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {characterModal.selectedCharacter.name}
          </h2>
          <button
            type="button"
            onClick={characterModal.closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
            {characterModal.selectedCharacter.description}
          </p>
          <div className="space-y-3 mb-6">
            {characterModal.selectedCharacter.nameEn && (
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-gray-100">英語名:</span>{" "}
                {characterModal.selectedCharacter.nameEn}
              </p>
            )}
            {characterModal.selectedCharacter.debutYear && (
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-gray-100">デビュー年:</span>{" "}
                {characterModal.selectedCharacter.debutYear}年
              </p>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">ランキング履歴</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {rankings
                .filter((r) => r.characterId === characterModal.selectedCharacter?.id)
                .sort((a, b) => b.year - a.year)
                .slice(0, 10)
                .map((ranking) => (
                  <div
                    key={ranking.year}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-center text-gray-700 dark:text-gray-200"
                  >
                    {ranking.year}年: {ranking.rank}位
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
