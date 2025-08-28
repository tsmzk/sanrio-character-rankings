import type { Character, RankingEntry } from '../types';
import charactersData from '../data/characters.json';
import rankingsData from '../data/rankings.json';

export class DataService {
  private static charactersCache: Character[] | null = null;
  private static rankingsCache: RankingEntry[] | null = null;

  static async loadCharacters(): Promise<Character[]> {
    if (this.charactersCache) {
      return this.charactersCache;
    }
    
    try {
      // In a real app, this would be an API call
      // For now, we're using imported JSON data
      this.charactersCache = charactersData as Character[];
      return this.charactersCache;
    } catch (error) {
      console.error('Failed to load characters:', error);
      throw new Error('Failed to load character data');
    }
  }

  static async loadRankings(): Promise<RankingEntry[]> {
    if (this.rankingsCache) {
      return this.rankingsCache;
    }
    
    try {
      // In a real app, this would be an API call
      // For now, we're using imported JSON data
      this.rankingsCache = rankingsData as RankingEntry[];
      return this.rankingsCache;
    } catch (error) {
      console.error('Failed to load rankings:', error);
      throw new Error('Failed to load ranking data');
    }
  }

  static async getCharacterById(id: string): Promise<Character | undefined> {
    const characters = await this.loadCharacters();
    return characters.find(character => character.id === id);
  }

  static async getRankingsByCharacter(characterId: string): Promise<RankingEntry[]> {
    const rankings = await this.loadRankings();
    return rankings.filter(ranking => ranking.characterId === characterId)
                  .sort((a, b) => a.year - b.year);
  }

  static async getRankingsByYear(year: number): Promise<RankingEntry[]> {
    const rankings = await this.loadRankings();
    return rankings.filter(ranking => ranking.year === year)
                  .sort((a, b) => a.rank - b.rank);
  }

  static async filterCharactersByRankRange(minRank: number, maxRank: number): Promise<Character[]> {
    const characters = await this.loadCharacters();
    const rankings = await this.loadRankings();
    
    // Get character IDs that have appeared in the specified rank range
    const characterIds = new Set(
      rankings
        .filter(ranking => ranking.rank >= minRank && ranking.rank <= maxRank)
        .map(ranking => ranking.characterId)
    );
    
    return characters.filter(character => characterIds.has(character.id));
  }

  static async getAvailableYears(): Promise<number[]> {
    const rankings = await this.loadRankings();
    const years = [...new Set(rankings.map(ranking => ranking.year))];
    return years.sort((a, b) => a - b);
  }


  static clearCache(): void {
    this.charactersCache = null;
    this.rankingsCache = null;
  }
}