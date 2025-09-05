import { describe, expect, it } from "vitest";
import type { Character, RankingEntry } from "../types";
import {
  filterCharacters,
  filterRankingsByYearRange,
  getCharacterRankingStats,
  getCharactersByRankRange,
  getRankRange,
  getYearRange,
} from "./DataProcessor";

const mockCharacters: Character[] = [
  {
    id: "hello-kitty",
    name: "ハローキティ",
    nameEn: "Hello Kitty",
    description: "Test character",
    debutYear: 1974,
    color: "#ff6b9d",
  },
  {
    id: "my-melody",
    name: "マイメロディ",
    nameEn: "My Melody",
    description: "Test character 2",
    debutYear: 1975,
    color: "#ffb3d9",
  },
];

const mockRankings: RankingEntry[] = [
  { characterId: "hello-kitty", year: 2020, rank: 1, votes: 1000 },
  { characterId: "hello-kitty", year: 2021, rank: 2, votes: 800 },
  { characterId: "hello-kitty", year: 2022, rank: 1, votes: 1200 },
  { characterId: "my-melody", year: 2020, rank: 3, votes: 600 },
  { characterId: "my-melody", year: 2021, rank: 1, votes: 1100 },
];

describe("DataProcessor", () => {
  describe("filterCharacters", () => {
    it("filters characters by search query", () => {
      const filtered = filterCharacters(mockCharacters, {
        searchQuery: "hello",
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe("hello-kitty");
    });

    it("filters by English name", () => {
      const filtered = filterCharacters(mockCharacters, {
        searchQuery: "melody",
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe("my-melody");
    });

    it("returns all characters when no filter", () => {
      const filtered = filterCharacters(mockCharacters, {});

      expect(filtered).toHaveLength(2);
    });
  });

  describe("filterRankingsByYearRange", () => {
    it("filters rankings within year range", () => {
      const filtered = filterRankingsByYearRange(mockRankings, {
        min: 2020,
        max: 2021,
      });

      expect(filtered).toHaveLength(4);
      expect(filtered.every((r) => r.year >= 2020 && r.year <= 2021)).toBe(true);
    });

    it("returns empty array for invalid range", () => {
      const filtered = filterRankingsByYearRange(mockRankings, {
        min: 2025,
        max: 2026,
      });

      expect(filtered).toHaveLength(0);
    });
  });

  describe("getCharactersByRankRange", () => {
    it("returns characters within rank range", () => {
      const filtered = getCharactersByRankRange(mockCharacters, mockRankings, {
        min: 1,
        max: 2,
      });

      expect(filtered.length).toBeGreaterThan(0);
      // Both characters have rankings in the 1-2 range
      expect(filtered).toContainEqual(expect.objectContaining({ id: "hello-kitty" }));
    });
  });

  describe("getYearRange", () => {
    it("returns correct year range", () => {
      const range = getYearRange(mockRankings);

      expect(range.min).toBe(2020);
      expect(range.max).toBe(2022);
    });

    it("returns default range for empty rankings", () => {
      const range = getYearRange([]);

      expect(range.min).toBe(1986);
      expect(range.max).toBeGreaterThan(2020);
    });
  });

  describe("getRankRange", () => {
    it("returns correct rank range", () => {
      const range = getRankRange(mockRankings);

      expect(range.min).toBe(1);
      expect(range.max).toBe(3);
    });

    it("returns default range for empty rankings", () => {
      const range = getRankRange([]);

      expect(range.min).toBe(1);
      expect(range.max).toBe(12);
    });
  });

  describe("getCharacterRankingStats", () => {
    it("calculates correct stats for character", () => {
      const stats = getCharacterRankingStats("hello-kitty", mockRankings);

      expect(stats.bestRank).toBe(1);
      expect(stats.worstRank).toBe(2);
      expect(stats.averageRank).toBe(1.3); // (1 + 2 + 1) / 3 = 1.33... rounded to 1.3
      expect(stats.appearances).toBe(3);
    });

    it("returns zero stats for unknown character", () => {
      const stats = getCharacterRankingStats("unknown", mockRankings);

      expect(stats.bestRank).toBe(0);
      expect(stats.worstRank).toBe(0);
      expect(stats.averageRank).toBe(0);
      expect(stats.appearances).toBe(0);
    });
  });
});
