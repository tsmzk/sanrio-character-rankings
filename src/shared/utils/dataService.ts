import charactersData from "../data/characters.json";
import rankingsData from "../data/rankings.json";
import type { Character, RankingEntry } from "../types";
import { debug } from "./debug";

// Cache variables
let charactersCache: Character[] | null = null;
let rankingsCache: RankingEntry[] | null = null;

export const loadCharacters = async (): Promise<Character[]> => {
  if (charactersCache) {
    return charactersCache;
  }

  try {
    // In a real app, this would be an API call
    // For now, we're using imported JSON data
    charactersCache = charactersData as Character[];
    return charactersCache;
  } catch (error) {
    debug.error("Failed to load characters:", error);
    throw new Error("Failed to load character data");
  }
};

export const loadRankings = async (): Promise<RankingEntry[]> => {
  if (rankingsCache) {
    return rankingsCache;
  }

  try {
    // In a real app, this would be an API call
    // For now, we're using imported JSON data
    rankingsCache = rankingsData as RankingEntry[];
    return rankingsCache;
  } catch (error) {
    debug.error("Failed to load rankings:", error);
    throw new Error("Failed to load ranking data");
  }
};

export const getCharacterById = async (id: string): Promise<Character | undefined> => {
  const characters = await loadCharacters();
  return characters.find((character) => character.id === id);
};

export const getRankingsByCharacter = async (characterId: string): Promise<RankingEntry[]> => {
  const rankings = await loadRankings();
  return rankings
    .filter((ranking) => ranking.characterId === characterId)
    .sort((a, b) => a.year - b.year);
};

export const getRankingsByYear = async (year: number): Promise<RankingEntry[]> => {
  const rankings = await loadRankings();
  return rankings.filter((ranking) => ranking.year === year).sort((a, b) => a.rank - b.rank);
};

export const filterCharactersByRankRange = async (
  minRank: number,
  maxRank: number,
): Promise<Character[]> => {
  const characters = await loadCharacters();
  const rankings = await loadRankings();

  // Get character IDs that have appeared in the specified rank range
  const characterIds = new Set(
    rankings
      .filter((ranking) => ranking.rank >= minRank && ranking.rank <= maxRank)
      .map((ranking) => ranking.characterId),
  );

  return characters.filter((character) => characterIds.has(character.id));
};

export const getAvailableYears = async (): Promise<number[]> => {
  const rankings = await loadRankings();
  const years = [...new Set(rankings.map((ranking) => ranking.year))];
  return years.sort((a, b) => a - b);
};

export const clearCache = (): void => {
  charactersCache = null;
  rankingsCache = null;
};

// Legacy compatibility - provide class-style access for backward compatibility
export const DataService = {
  loadCharacters,
  loadRankings,
  getCharacterById,
  getRankingsByCharacter,
  getRankingsByYear,
  filterCharactersByRankRange,
  getAvailableYears,
  clearCache,
};
