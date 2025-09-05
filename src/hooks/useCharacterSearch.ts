import { useMemo, useState } from "react";
import type { Character, RankingEntry } from "../shared/types";

export function useCharacterSearch(characters: Character[], rankings: RankingEntry[]) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get latest TOP 10 rankings with rank order
  const latestTop10Rankings = useMemo(() => {
    if (!rankings || rankings.length === 0) return new Map<string, number>();

    // Get the latest year from rankings
    const latestYear = Math.max(...rankings.map((r) => r.year));

    // Create a map of characterId to rank for ordering
    const rankMap = new Map<string, number>();
    rankings
      .filter((r) => r.year === latestYear)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10)
      .forEach((r) => {
        rankMap.set(r.characterId, r.rank);
      });

    return rankMap;
  }, [rankings]);

  // Filter and sort characters based on search query
  const filteredCharacters = useMemo(() => {
    if (!searchQuery) {
      // When search is empty, show only latest TOP 10 characters in ranking order
      const top10Characters = characters.filter((char) => latestTop10Rankings.has(char.id));
      // Sort by rank (ascending)
      return top10Characters.sort((a, b) => {
        const rankA = latestTop10Rankings.get(a.id) ?? Infinity;
        const rankB = latestTop10Rankings.get(b.id) ?? Infinity;
        return rankA - rankB;
      });
    }

    // When searching, filter by query and keep original order (alphabetical)
    const query = searchQuery.toLowerCase();
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(query) || char.nameEn?.toLowerCase().includes(query),
    );
  }, [characters, searchQuery, latestTop10Rankings]);

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    clearSearch,
    hasSearchResults: searchQuery.length > 0,
    resultCount: filteredCharacters.length,
  };
}
