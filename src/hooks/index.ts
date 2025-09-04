// Export all hooks from the new feature-based structure
export { useCharacterSelection } from "../features/character/hooks/useCharacterSelection";
export { useRankingData } from "../features/ranking/hooks/useRankingData";
export { useTheme } from "../features/theme/hooks/useTheme";

// App-specific hooks
export { useCharacterModal } from "./useCharacterModal";
export { useCharacterSearch } from "./useCharacterSearch";
export { useYearRangeFilter } from "./useYearRangeFilter";
