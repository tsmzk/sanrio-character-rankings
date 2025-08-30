# Architecture Patterns and Design Guidelines

## Primary Architectural Patterns

### 1. Custom Hooks Pattern (Business Logic Extraction)
**Purpose**: Complete separation of business logic from UI components

#### Implementation Examples
```typescript
// Data management hook
const { characters, rankings, loading, error } = useRankingData();

// Selection state hook  
const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

// Chart configuration hook
const chartConfig = useChartConfig(selectedCharacters, theme);

// Theme management hook
const { theme, setTheme, toggleTheme } = useTheme();
```

#### Guidelines
- All stateful logic must be in custom hooks
- Components should be purely presentational
- Hooks return descriptive object properties, not arrays
- Handle loading, error, and success states in hooks

### 2. Service Layer Pattern with Static Caching
**Purpose**: Abstract data access and implement efficient caching

#### Implementation
```typescript
export class DataService {
  private static charactersCache: Character[] | null = null;
  private static rankingsCache: RankingEntry[] | null = null;
  
  static async loadCharacters(): Promise<Character[]> {
    if (this.charactersCache) return this.charactersCache;
    // Load and cache data...
  }
}
```

#### Guidelines
- Static methods for singleton-like behavior
- In-memory caching for performance
- Error handling at service layer
- Async/await for all data operations

### 3. Context-Based Global State Management
**Purpose**: Manage global state (themes, settings) without prop drilling

#### Implementation Architecture
- **Context Layer**: React Context manages state and provides methods
- **Provider Component**: Wraps application with context value
- **Custom Hook**: Type-safe context consumption
- **Local Storage Integration**: Persistence across sessions

#### Theme Context Example
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 4. CSS Modules with Theme System
**Purpose**: Scoped styling with comprehensive theme support

#### Theme Architecture
- **CSS Custom Properties**: `--color-*` variables for all theme values
- **DOM Attribute Control**: `data-theme` attribute switches themes
- **System Integration**: `prefers-color-scheme` detection
- **Component Scoping**: CSS Modules for style isolation

#### Implementation Pattern
```css
/* themes.css - Global theme variables */
:root, html[data-theme="light"] {
  --color-primary: #ffffff;
  --color-accent: #ff6b9d;
}

html[data-theme="dark"] {
  --color-primary: #000000;
  --color-accent: #9b51e0;
}
```

```typescript
// Component usage
import styles from './Component.module.css';

function Component() {
  const { theme } = useTheme();
  return <div className={styles.container}>{/* content */}</div>;
}
```

### 5. Barrel Export Pattern
**Purpose**: Clean, organized module imports and exports

#### Structure
```typescript
// src/components/index.ts
export { CharacterSelector } from './CharacterSelector';
export { RankingChart } from './RankingChart';
export { FilterControls } from './FilterControls';

// Usage
import { CharacterSelector, RankingChart } from '../components';
```

#### Guidelines
- Every directory with multiple modules has index.ts
- Re-export only public interfaces
- Enables clean import statements
- Facilitates refactoring and module reorganization

### 6. Component Composition Pattern
**Purpose**: Build complex UIs from small, focused components

#### Composition Strategy
- **Single Responsibility**: Each component does one thing well
- **Props Interface**: Clear, typed property definitions
- **Composition over Inheritance**: Combine components vs extending classes
- **Container/Presentational**: Separation of logic and presentation

## Data Flow Architecture

### Primary Data Flow
```
Static JSON Files → DataService (caching) → Custom Hooks → Components → UI
```

### State Management Flow
```
User Action → Custom Hook → Context/Local State → Component Re-render → UI Update
```

### Theme System Flow
```
System Preference → ThemeContext → DOM Attribute → CSS Variables → Visual Update
```

## Error Handling Patterns

### Layered Error Handling
1. **Service Layer**: Catches and transforms data loading errors
2. **Custom Hooks**: Provides error state to components
3. **Components**: Displays user-friendly error messages
4. **App Level**: Error boundaries for unhandled errors

### Error State Management
- Consistent error object shapes across hooks
- Loading states prevent user confusion
- Graceful degradation for missing data
- Clear error messages with actionable information

## Performance Optimization Patterns

### Caching Strategy
- **Static Caching**: Service layer implements memory caching
- **Component Memoization**: Strategic use of `useMemo` and `useCallback`
- **Lazy Loading**: Dynamic imports where applicable
- **Bundle Optimization**: Vite's tree shaking and code splitting

### Rendering Optimization
- Pure functional components
- Minimal re-renders through proper state design
- Efficient Chart.js integration
- CSS-only animations where possible

## Type Safety Patterns

### Comprehensive Type System
- Interface definitions for all data structures
- Strict TypeScript configuration
- Type-safe context consumption
- Generic hooks where appropriate

### Type Organization
```typescript
// Centralized type definitions
src/types/
├── character.ts     - Character domain types
├── ranking.ts       - Ranking data types  
└── index.ts         - Barrel export of all types
```

## Testing Strategy (Future Implementation)

### Recommended Testing Patterns
- **Unit Tests**: Test custom hooks independently
- **Integration Tests**: Test component + hook combinations
- **End-to-End Tests**: Test complete user workflows
- **Visual Tests**: Theme system and responsive design testing

### Testing Architecture (Not Yet Implemented)
- Vitest for unit and integration tests
- React Testing Library for component tests
- Playwright for E2E testing
- Storybook for component documentation and visual testing