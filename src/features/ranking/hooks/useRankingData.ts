import { useCallback, useEffect, useState } from "react";
import type { Character, RankingEntry } from "../../../shared/types";
import { DataService } from "../../../shared/utils/dataService";

interface UseRankingDataReturn {
  characters: Character[];
  rankings: RankingEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRankingData = (): UseRankingDataReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [charactersData, rankingsData] = await Promise.all([
      DataService.loadCharacters(),
      DataService.loadRankings(),
    ]);

    setCharacters(charactersData);
    setRankings(rankingsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    characters,
    rankings,
    loading,
    error,
    refetch: loadData,
  };
};
