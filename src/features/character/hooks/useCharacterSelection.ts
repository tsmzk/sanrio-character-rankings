import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "../../../shared/firebase";

interface UseCharacterSelectionReturn {
  selectedCharacters: string[];
  toggleCharacter: (characterId: string) => void;
  addCharacter: (characterId: string) => void;
  removeCharacter: (characterId: string) => void;
  clearSelection: () => void;
  isSelected: (characterId: string) => boolean;
}

const STORAGE_KEY = "sanrio-ranking-selected-characters";

export const useCharacterSelection = (
  initialSelection: string[] = [],
): UseCharacterSelectionReturn => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return initialSelection;
  });

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCharacters));
  }, [selectedCharacters]);

  /**
   * 計測用の最新値参照。useEffect でコミット後に更新される。
   * trackEvent を functional setState の updater の外で1回だけ呼びつつ
   * 「更新後の件数」を求めるために使う(StrictMode の updater 二重実行による
   * イベント二重発火を避けるため、計測は updater の外に置く)。
   *
   * 注意: 同一イベント内で連続して toggleCharacter('A'); toggleCharacter('B');
   * のように呼ぶと、2 回目の wasSelected 判定と nextCount 計算が古い ref を参照する。
   * functional setState 側の state は正しく更新されるため state は壊れないが、
   * trackEvent の selected_count が 1 ズレる可能性がある。
   *
   * 現状の UI では同期連続呼び出しのケースが無いため実害なし。将来「複数選択」
   * のような同期一括 API(selectMany(ids) 等)を追加する際は、ref ベースの計測を
   * 再評価すること。
   */
  const selectedRef = useRef<string[]>(selectedCharacters);
  useEffect(() => {
    selectedRef.current = selectedCharacters;
  }, [selectedCharacters]);

  const toggleCharacter = useCallback((characterId: string) => {
    const wasSelected = selectedRef.current.includes(characterId);
    const nextCount = wasSelected ? selectedRef.current.length - 1 : selectedRef.current.length + 1;
    setSelectedCharacters((prev) =>
      prev.includes(characterId) ? prev.filter((id) => id !== characterId) : [...prev, characterId],
    );
    trackEvent({
      name: wasSelected ? "character_deselect" : "character_select",
      params: { character_id: characterId, selected_count: nextCount },
    });
  }, []);

  const addCharacter = useCallback((characterId: string) => {
    if (selectedRef.current.includes(characterId)) return;
    const nextCount = selectedRef.current.length + 1;
    setSelectedCharacters((prev) => (prev.includes(characterId) ? prev : [...prev, characterId]));
    trackEvent({
      name: "character_select",
      params: { character_id: characterId, selected_count: nextCount },
    });
  }, []);

  const removeCharacter = useCallback((characterId: string) => {
    if (!selectedRef.current.includes(characterId)) return;
    const nextCount = selectedRef.current.length - 1;
    setSelectedCharacters((prev) => prev.filter((id) => id !== characterId));
    trackEvent({
      name: "character_deselect",
      params: { character_id: characterId, selected_count: nextCount },
    });
  }, []);

  const clearSelection = useCallback(() => {
    const previousCount = selectedRef.current.length;
    setSelectedCharacters([]);
    if (previousCount > 0) {
      trackEvent({
        name: "character_deselect_all",
        params: { previous_count: previousCount },
      });
    }
  }, []);

  const isSelected = (characterId: string) => {
    return selectedCharacters.includes(characterId);
  };

  return {
    selectedCharacters,
    toggleCharacter,
    addCharacter,
    removeCharacter,
    clearSelection,
    isSelected,
  };
};
