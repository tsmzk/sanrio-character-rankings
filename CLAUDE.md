# Sanrio Character Rankings - Development Guide

Interactive React TypeScript application for visualizing Sanrio character ranking trends with dual theme system (Light/Dark mode).

## Quick Start Commands

```bash
# Development server
npm run dev

# Production build with TypeScript compilation
npm run build

# Code linting
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Core Technology Stack
- **React 19** with TypeScript for modern component architecture
- **Vite** for fast development and optimized builds
- **Chart.js + react-chartjs-2** for interactive data visualization
- **CSS Modules** for component-scoped styling
- **ESLint** with TypeScript integration for code quality

### Key Architectural Patterns

#### 1. Business Logic Extraction via Custom Hooks
All stateful logic is extracted from components into specialized hooks:

```typescript
// Data loading with error handling and caching
const { characters, rankings, loading, error } = useRankingData();

// Multi-character selection state management
const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

// Dynamic chart configuration based on theme/data
const chartConfig = useChartConfig(selectedCharacters, theme);

// Theme switching with localStorage persistence and system preference detection
const { theme, setTheme, toggleTheme } = useTheme();
```

#### 2. Service Layer Pattern with Static Class Caching
`DataService` implements efficient data loading with built-in memory caching:

```typescript
// Singleton pattern with static methods and private cache
export class DataService {
  private static charactersCache: Character[] | null = null;
  private static rankingsCache: RankingEntry[] | null = null;
  
  static async loadCharacters(): Promise<Character[]> {
    if (this.charactersCache) return this.charactersCache;
    // Load and cache data...
  }
}
```

#### 3. Context-Based Theme Architecture
Theme system uses React Context with CSS custom properties:

- **Context Layer**: `ThemeContext` manages theme state and localStorage persistence
- **CSS Layer**: `themes.css` defines comprehensive CSS custom property system
- **Auto-Detection**: Respects `prefers-color-scheme` for initial theme selection
- **Real-time Switching**: DOM attribute `data-theme` triggers instant visual updates

```typescript
// Theme provider with system preference detection
const [theme, setTheme] = useState<ThemeType>(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) return savedTheme;
  
  // Fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' : 'light';
});
```

#### 4. Utility-First Data Processing
Separation of pure functions for data manipulation:

- **DataProcessor**: Year filtering, ranking calculations, trend analysis
- **ChartHelpers**: Chart.js configuration generation, color management
- **ThemeUtils**: Theme-aware styling utilities

#### 5. Barrel Export Pattern
Organized module exports through `index.ts` files:

```typescript
// src/components/index.ts
export { CharacterSelector } from './CharacterSelector';
export { RankingChart } from './RankingChart';
// ... clean component imports

// src/hooks/index.ts  
export { useRankingData } from './useRankingData';
export { useCharacterSelection } from './useCharacterSelection';
// ... organized hook exports
```

## Data Flow Architecture

### Primary Data Flow
1. **App.tsx** orchestrates all data loading via `useRankingData()`
2. **Service Layer** (`DataService`) provides cached data access
3. **Components** receive filtered data through props
4. **Custom Hooks** manage component-specific state transformations

### Character Selection Flow
```
User selects character → useCharacterSelection hook updates state → 
App.tsx receives updated selection → Components re-render with new data
```

### Theme Switching Flow
```
User toggles theme → ThemeContext updates → document.documentElement.setAttribute() → 
CSS custom properties switch → All components re-style instantly
```

### Chart Data Transformation
```
Raw Rankings Data → DataProcessor.filterByYearRange() → 
ChartHelpers.generateDatasets() → Chart.js configuration → RankingChart renders
```

## Component Architecture Patterns

### CSS Modules Integration
Each component follows consistent CSS Module pattern:

```typescript
import styles from './ComponentName.module.css';

export function ComponentName() {
  return <div className={styles.container}>...</div>;
}
```

### Theme-Aware Components
Components access theme through context and apply conditional styling:

```typescript
const { theme } = useTheme();

<button 
  className={`${styles.button} ${theme === 'dark' ? styles.dark : styles.light}`}
>
```

### Responsive Design Pattern
Mobile-first responsive design with CSS custom properties:

```css
.component {
  /* Mobile styles */
  width: 100%;
  
  /* Desktop breakpoint */
  @media (min-width: 768px) {
    width: 50%;
  }
}
```

## Theme System Architecture

### CSS Custom Properties Strategy
Two complete theme definitions using CSS custom properties:

```css
/* Light Theme */
:root,
html[data-theme="light"] {
  --color-primary: #ffffff;
  --color-accent: #ff6b9d;
  --color-bg-body: #fef7ff;
}

/* Dark Theme */
html[data-theme="dark"] {
  --color-primary: #000000;
  --color-accent: #9b51e0;
  --color-bg-body: #000000;
}
```

### Theme Context Implementation
- **State Management**: React Context with localStorage persistence
- **System Integration**: Automatic detection of `prefers-color-scheme`
- **DOM Manipulation**: Direct `data-theme` attribute updates
- **Transition Effects**: CSS transitions for smooth theme switching

### Theme-Specific Visual Effects
Dark theme includes special visual enhancements:
- Glow effects: `--dark-glow`, `--dark-border-glow`
- Enhanced shadows and borders
- Different scrollbar styling

## Development Patterns

### TypeScript Integration
Comprehensive type system with centralized type definitions:

```typescript
// src/types/character.ts
export interface Character {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  debutYear: number;
  color: string;
}

// src/types/ranking.ts
export interface RankingEntry {
  characterId: string;
  year: number;
  rank: number;
  votes?: number;
}
```

### Error Handling Strategy
- Service layer wraps data loading in try-catch blocks
- Custom hooks provide error states to components
- App-level error boundary for unhandled errors
- Graceful loading states with skeleton UI

### Performance Optimizations
- **Data Caching**: Service layer implements static caching
- **Component Memoization**: Strategic use of `useMemo` for expensive calculations
- **Lazy Loading**: Dynamic imports where applicable
- **Bundle Optimization**: Vite's built-in tree shaking and code splitting

## File Organization Principles

### Feature-Based Component Structure
```
components/
├── CharacterDetail/     # Feature-complete component module
│   ├── CharacterDetail.tsx
│   ├── CharacterDetail.module.css
│   └── index.ts        # Barrel export
```

### Separation of Concerns
- **`/components`**: Pure UI components with CSS modules
- **`/hooks`**: Business logic and state management
- **`/services`**: Data fetching and caching layer
- **`/utils`**: Pure functions and helpers
- **`/contexts`**: Global state management
- **`/types`**: TypeScript type definitions
- **`/styles`**: Global CSS and theme definitions
- **`/data`**: Static JSON data files

### Import Organization
Consistent import order in all files:
1. React imports
2. External library imports  
3. Internal component/hook imports
4. Type imports (with `type` keyword)
5. CSS imports

## Important Development Notes

### Chart.js Integration Specifics
- Uses `react-chartjs-2` wrapper for React integration
- Custom chart configuration through `useChartConfig` hook
- Dynamic color generation based on character data
- Responsive chart sizing with container queries

### Japanese Language Support
- UTF-8 encoding for Japanese character names and descriptions
- Proper font loading for Japanese text rendering
- Consistent Japanese/English dual naming convention

### Theme System Debugging
Built-in theme debugging with visual indicators:
- Corner badges show active theme in development
- Console logging for theme changes
- DOM attribute inspection for troubleshooting

### Vite-Specific Configurations
- TypeScript compilation before build process
- Modern JavaScript output for optimal performance
- Hot Module Replacement (HMR) for fast development cycles
- Optimized asset handling and bundling

### Data Structure Assumptions
- Character IDs are stable across years
- Ranking data is complete for all years
- Color codes are valid CSS color values
- Character names support Unicode (Japanese) characters

This architecture promotes maintainability through clear separation of concerns, type safety, and consistent patterns while providing smooth user experience through efficient data management and responsive design.