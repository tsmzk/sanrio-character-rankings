import { useState, useMemo } from 'react';
import type { Character } from '../shared/types';

export function useCharacterSearch(characters: Character[]) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter characters by search query
  const filteredCharacters = useMemo(() => {
    if (!searchQuery) return characters;
    
    const query = searchQuery.toLowerCase();
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(query) ||
        char.nameEn?.toLowerCase().includes(query)
    );
  }, [characters, searchQuery]);

  const clearSearch = () => setSearchQuery('');

  return {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    clearSearch,
    hasSearchResults: searchQuery.length > 0,
    resultCount: filteredCharacters.length,
  };
}