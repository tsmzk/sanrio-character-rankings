import charactersData from "../data/characters.json";
import type { Character, RankingEntry } from "../types";
import { debug } from "./debug";

// Cache variables
let charactersCache: Character[] | null = null;
let rankingsCache: RankingEntry[] | null = null;
const yearlyRankingsCache: Map<number, RankingEntry[]> = new Map();

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

// Load rankings for a specific year
export const loadRankingsForYear = async (year: number): Promise<RankingEntry[]> => {
  const cachedData = yearlyRankingsCache.get(year);
  if (cachedData) {
    return cachedData;
  }

  try {
    const rankingModule = await import(`../data/rankings/rankings-${year}.json`);
    const yearRankings = rankingModule.default as RankingEntry[];
    yearlyRankingsCache.set(year, yearRankings);
    return yearRankings;
  } catch (error) {
    debug.error(`Failed to load rankings for year ${year}:`, error);
    throw new Error(`Failed to load ranking data for year ${year}`);
  }
};

// Load rankings for multiple years
export const loadRankingsForYears = async (years: number[]): Promise<RankingEntry[]> => {
  const allRankings: RankingEntry[] = [];

  for (const year of years) {
    const yearRankings = await loadRankingsForYear(year);
    allRankings.push(...yearRankings);
  }

  return allRankings;
};

// Load rankings for a year range
export const loadRankingsForYearRange = async (
  startYear: number,
  endYear: number,
): Promise<RankingEntry[]> => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return loadRankingsForYears(years);
};

// Legacy method - loads all rankings (backwards compatibility)
export const loadRankings = async (): Promise<RankingEntry[]> => {
  if (rankingsCache) {
    return rankingsCache;
  }

  try {
    // Get available years first
    const availableYears = await getAvailableYears();
    const allRankings = await loadRankingsForYears(availableYears);
    rankingsCache = allRankings;
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
  // Use the efficient year-specific loading
  const yearRankings = await loadRankingsForYear(year);
  return yearRankings.sort((a, b) => a.rank - b.rank);
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
  // Pre-defined available years based on our data structure
  // In a real app, this could be fetched from an API or directory listing
  const availableYears = [
    1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
    2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  ];
  return availableYears;
};

export const clearCache = (): void => {
  charactersCache = null;
  rankingsCache = null;
  yearlyRankingsCache.clear();
};

// Legacy compatibility - provide class-style access for backward compatibility
export const DataService = {
  loadCharacters,
  loadRankings,
  loadRankingsForYear,
  loadRankingsForYears,
  loadRankingsForYearRange,
  getCharacterById,
  getRankingsByCharacter,
  getRankingsByYear,
  filterCharactersByRankRange,
  getAvailableYears,
  clearCache,
};
