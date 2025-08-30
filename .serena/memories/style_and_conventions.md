# Code Style and Conventions

## TypeScript Configuration

### Strict Mode Enabled
- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused function parameters
- `noFallthroughCasesInSwitch: true` - Error on fallthrough cases
- Target: ES2022 with modern JavaScript features

### Type Definitions
- All interfaces and types defined in `src/types/`
- Use interfaces for object shapes (not types unless needed)
- Optional properties marked with `?` where appropriate
- Export interfaces from barrel `src/types/index.ts`

## Naming Conventions

### JavaScript/TypeScript
- **camelCase** for variables, functions, properties
- **PascalCase** for components, interfaces, classes, types
- **UPPER_SNAKE_CASE** for constants
- **kebab-case** for file names and CSS classes

### File Organization
- Component files: `ComponentName.tsx`
- CSS Modules: `ComponentName.module.css`
- Barrel exports: `index.ts`
- Type definitions: `lowercase.ts`
- Hooks: `useHookName.ts`

## Component Conventions

### Component Structure
```typescript
import React from 'react';
import styles from './ComponentName.module.css';
import type { ComponentProps } from '../types';

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
}
```

### CSS Modules Pattern
- Every component has its own `.module.css` file
- Use `styles.className` for styling
- BEM-like naming for complex components
- Theme-aware using CSS custom properties

### Import Organization
1. React imports first
2. External library imports
3. Internal component/hook imports  
4. Type imports (with `type` keyword)
5. CSS imports last

## React Patterns

### Custom Hooks
- Extract all business logic into custom hooks
- Return objects with descriptive property names
- Handle loading and error states
- Follow `useHookName` naming convention

### Context Usage
- Use React Context for global state (theme, etc.)
- Provide type-safe context providers
- Keep contexts focused on single concerns

### Error Handling
- Service layer handles data loading errors
- Components receive error states through hooks
- Graceful loading states with proper UX

## Japanese Language Support

### Comments and Documentation
- Use Japanese comments where it adds clarity for character data
- Example: `imageUrl?: string; // オプション（著作権対応）`
- English for technical/code-related comments
- Japanese for business domain explanations

### Data Structures
- Support Unicode characters in names and descriptions
- Dual language support: `name` (Japanese) and `nameEn` (English)
- UTF-8 encoding throughout the application

## Architecture Principles

### Separation of Concerns
- Components: Pure UI presentation
- Hooks: Business logic and state management
- Services: Data fetching and caching
- Utils: Pure functions and helpers
- Contexts: Global state management

### Performance Considerations
- Use `useMemo` for expensive calculations
- Implement caching in service layer
- Lazy loading where applicable
- CSS Modules for optimized styling