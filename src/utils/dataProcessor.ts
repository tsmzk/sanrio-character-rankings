import type { Character, RankingEntry, ChartDataPoint, FilterOptions } from '../types';

export class DataProcessor {
  static filterCharacters(
    characters: Character[],
    options: Partial<FilterOptions>
  ): Character[] {
    let filtered = [...characters];

    // Filter by search query
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(character => 
        character.name.toLowerCase().includes(query) ||
        (character.nameEn && character.nameEn.toLowerCase().includes(query))
      );
    }


    return filtered;
  }

  static filterRankingsByYearRange(
    rankings: RankingEntry[],
    yearRange: { min: number; max: number }
  ): RankingEntry[] {
    return rankings.filter(ranking => 
      ranking.year >= yearRange.min && ranking.year <= yearRange.max
    );
  }

  static getCharactersByRankRange(
    characters: Character[],
    rankings: RankingEntry[],
    rankRange: { min: number; max: number }
  ): Character[] {
    const characterIds = new Set(
      rankings
        .filter(ranking => ranking.rank >= rankRange.min && ranking.rank <= rankRange.max)
        .map(ranking => ranking.characterId)
    );

    return characters.filter(character => characterIds.has(character.id));
  }

  static createChartDataPoints(
    characterIds: string[],
    characters: Character[],
    rankings: RankingEntry[]
  ): ChartDataPoint[] {
    const dataPoints: ChartDataPoint[] = [];

    characterIds.forEach(characterId => {
      const character = characters.find(c => c.id === characterId);
      if (!character) return;

      const characterRankings = rankings
        .filter(r => r.characterId === characterId)
        .sort((a, b) => a.year - b.year);

      characterRankings.forEach(ranking => {
        dataPoints.push({
          x: ranking.year,
          y: ranking.rank,
          characterId: ranking.characterId,
          characterName: character.name,
          color: character.color
        });
      });
    });

    return dataPoints;
  }

  static getYearRange(rankings: RankingEntry[]): { min: number; max: number } {
    if (rankings.length === 0) {
      return { min: 2014, max: 2023 };
    }

    const years = rankings.map(r => r.year);
    return {
      min: Math.min(...years),
      max: Math.max(...years)
    };
  }

  static getRankRange(rankings: RankingEntry[]): { min: number; max: number } {
    if (rankings.length === 0) {
      return { min: 1, max: 12 };
    }

    const ranks = rankings.map(r => r.rank);
    return {
      min: Math.min(...ranks),
      max: Math.max(...ranks)
    };
  }

  static getCharacterRankingStats(
    characterId: string,
    rankings: RankingEntry[]
  ): {
    bestRank: number;
    worstRank: number;
    averageRank: number;
    appearances: number;
  } {
    const characterRankings = rankings.filter(r => r.characterId === characterId);
    
    if (characterRankings.length === 0) {
      return { bestRank: 0, worstRank: 0, averageRank: 0, appearances: 0 };
    }

    const ranks = characterRankings.map(r => r.rank);
    const bestRank = Math.min(...ranks);
    const worstRank = Math.max(...ranks);
    const averageRank = ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length;

    return {
      bestRank,
      worstRank,
      averageRank: Math.round(averageRank * 10) / 10, // Round to 1 decimal
      appearances: characterRankings.length
    };
  }

  static sortCharactersByPopularity(
    characters: Character[],
    rankings: RankingEntry[]
  ): Character[] {
    return characters
      .map(character => {
        const stats = this.getCharacterRankingStats(character.id, rankings);
        return { character, averageRank: stats.averageRank || 999 };
      })
      .sort((a, b) => a.averageRank - b.averageRank)
      .map(item => item.character);
  }
}