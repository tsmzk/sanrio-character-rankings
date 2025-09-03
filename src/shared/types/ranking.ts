import type { Character } from "./character";

export interface RankingEntry {
  year: number;
  rank: number;
  characterId: string;
  votes?: number; // Optional field for story/test data
}

export interface RankingData {
  characters: Character[];
  rankings: RankingEntry[];
}

export interface ChartDataPoint {
  x: number; // year
  y: number; // rank
  characterId: string;
  characterName: string;
  color: string;
}

export interface FilterOptions {
  yearRange: {
    min: number;
    max: number;
  };
  rankRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}
