# Codebase Structure and File Organization

## Root Directory Structure

```
sanrio-character-rankings/
├── .serena/              # Serena MCP configuration
├── .kiro/                # Additional tooling configuration
├── public/               # Static assets served by Vite
├── src/                  # Source code (main application)
├── CLAUDE.md             # Development guide and architecture docs
├── README.md             # Project documentation (Japanese)
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite build configuration
├── tsconfig.*.json       # TypeScript configurations
├── eslint.config.js      # ESLint configuration
└── .gitignore            # Git ignore patterns
```

## Source Code Organization (`src/`)

### Component Architecture
```
src/components/
├── CharacterSelector/        # Character selection interface
│   ├── CharacterSelector.tsx       # Component implementation
│   ├── CharacterSelector.module.css # Scoped styles
│   └── index.ts                     # Barrel export
├── RankingChart/             # Chart visualization component
│   ├── RankingChart.tsx
│   ├── RankingChart.module.css
│   └── index.ts
├── FilterControls/           # Year filtering and controls
│   ├── FilterControls.tsx
│   ├── FilterControls.module.css
│   └── index.ts
├── CharacterDetail/          # Character information display
│   ├── CharacterDetail.tsx
│   ├── CharacterDetail.module.css
│   └── index.ts
├── ThemeToggle/             # Light/dark mode toggle
│   ├── ThemeToggle.tsx
│   ├── ThemeToggle.module.css
│   └── index.ts
└── index.ts                 # Central component exports
```

### Business Logic Layer
```
src/hooks/
├── useRankingData.ts        # Data loading and caching hook
├── useCharacterSelection.ts # Character selection state
├── useChartConfig.ts        # Chart.js configuration hook
├── useTheme.ts             # Theme management hook
└── index.ts                # Hook exports
```

### Data and Service Layer
```
src/services/
└── dataService.ts          # Static data loading with caching

src/data/
├── characters.json         # Sanrio character definitions
└── rankings.json           # Historical ranking data
```

### Type Definitions
```
src/types/
├── character.ts            # Character interface definitions
├── ranking.ts              # Ranking data type definitions
└── index.ts                # Type exports
```

### Global State and Context
```
src/contexts/
└── ThemeContext.tsx        # Global theme state management
```

### Utility Functions
```
src/utils/
├── chartHelpers.ts         # Chart.js configuration utilities
├── dataProcessor.ts        # Data transformation functions
├── themeUtils.ts          # Theme-related utilities
└── index.ts               # Utility exports
```

### Styling and Assets
```
src/styles/
├── themes.css             # Global theme variable definitions
└── index.css              # Base application styles

src/assets/
├── react.svg              # React logo
└── (other static assets)

src/
├── App.css               # Main application styles
├── App.tsx               # Root application component
├── main.tsx              # Application entry point
└── vite-env.d.ts         # Vite type definitions
```

## File Naming Conventions

### Component Files
- **Component**: `ComponentName.tsx` (PascalCase)
- **Styles**: `ComponentName.module.css` (PascalCase + .module)
- **Exports**: `index.ts` (barrel export pattern)

### Non-Component Files
- **Hooks**: `useHookName.ts` (camelCase with 'use' prefix)
- **Services**: `serviceName.ts` (camelCase)
- **Types**: `typename.ts` (lowercase)
- **Utilities**: `utilityName.ts` (camelCase)
- **Data**: `dataname.json` (lowercase)

## Import/Export Patterns

### Barrel Exports
Every directory containing multiple modules includes an `index.ts` file:
```typescript
// src/components/index.ts
export { CharacterSelector } from './CharacterSelector';
export { RankingChart } from './RankingChart';
// ... other exports

// Usage
import { CharacterSelector, RankingChart } from './components';
```

### Import Organization Standard
All files follow consistent import ordering:
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. External library imports  
import { Chart as ChartJS } from 'chart.js';

// 3. Internal component/hook imports
import { useRankingData } from '../hooks';

// 4. Type imports (with 'type' keyword)
import type { Character, RankingEntry } from '../types';

// 5. CSS imports
import styles from './Component.module.css';
```

## Directory Responsibility Boundaries

### `/components` - Pure UI Presentation
- React functional components only
- No business logic (delegated to hooks)
- CSS Modules for styling
- TypeScript interfaces for props
- Responsive design implementation

### `/hooks` - Business Logic and State
- All stateful logic extracted from components
- Data fetching and caching coordination
- Complex state management
- API integration points
- Error handling and loading states

### `/services` - Data Access Layer
- Static data loading from JSON files
- Caching implementation
- Error handling for data operations
- Future API integration point
- Data transformation and validation

### `/types` - Type Definitions
- TypeScript interfaces for all data structures
- Shared types across modules
- Domain model definitions
- API contract definitions

### `/contexts` - Global State Management
- React Context providers
- Global application state
- Theme management
- Cross-component state sharing

### `/utils` - Pure Functions
- Data processing utilities
- Helper functions
- Chart configuration generators
- Theme-related calculations
- No side effects or state

### `/styles` - Global Styling
- CSS custom property definitions
- Theme variable declarations
- Global reset styles
- Base typography and layout

## Asset Management

### Static Assets (`/public`)
- Served directly by Vite
- Favicon, robots.txt, etc.
- Assets referenced by absolute paths

### Bundled Assets (`/src/assets`)
- Processed by Vite bundler
- Optimized and versioned in build
- Imported as modules in components

## Configuration Files

### TypeScript Configuration
- `tsconfig.json` - Project references
- `tsconfig.app.json` - Application configuration
- `tsconfig.node.json` - Node.js tooling configuration

### Build and Development
- `vite.config.ts` - Vite bundler configuration
- `eslint.config.js` - Code quality rules
- `package.json` - Dependencies and scripts

## Scalability Considerations

### Adding New Components
1. Create component directory under `/src/components`
2. Implement `.tsx`, `.module.css`, and `index.ts`
3. Add export to `/src/components/index.ts`
4. Define types in `/src/types` if needed

### Adding New Features
1. Create custom hook for business logic
2. Add service methods for data access
3. Define types for new data structures
4. Implement UI components
5. Update global exports

### Refactoring Guidelines
- Maintain barrel export structure
- Keep component/hook/service boundaries clear
- Update type definitions when changing data structures
- Test theme system with any CSS changes