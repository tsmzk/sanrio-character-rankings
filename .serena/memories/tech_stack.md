# Technology Stack Details

## Core Frontend Framework

### React 19.1.1
- **Modern React Features**: Latest stable version with new features
- **Function Components**: Exclusively using function components with hooks
- **JSX**: react-jsx transformer for optimized builds
- **Context API**: For global state management (theme system)

### TypeScript 5.8.3
- **Strict Mode**: All strict type-checking options enabled
- **Modern Target**: ES2022 compilation target
- **Module System**: ESNext modules with bundler resolution
- **Type Definitions**: Comprehensive interfaces for all data structures

## Build System & Development

### Vite 7.1.2
- **Fast HMR**: Hot Module Replacement for rapid development
- **Optimized Builds**: Modern JavaScript bundling and tree shaking
- **Asset Handling**: Automatic optimization of images, CSS, and other assets
- **Development Server**: Fast development server with instant reloads

### Build Configuration
- **TypeScript First**: Compilation before Vite build (`tsc -b && vite build`)
- **Modern Output**: ES2022 target for modern browsers
- **Bundle Analysis**: Built-in optimization and code splitting
- **Static Assets**: Proper handling of images, fonts, and other resources

## Data Visualization

### Chart.js 4.5.0
- **Interactive Charts**: Line charts for ranking trends
- **Responsive Design**: Automatic resizing and mobile optimization
- **Custom Styling**: Theme-aware chart colors and styling
- **Performance**: Efficient rendering for large datasets

### react-chartjs-2 5.3.0
- **React Integration**: Proper React wrapper for Chart.js
- **Hook-Based**: Custom hooks for chart configuration
- **Type Safety**: TypeScript definitions for chart options
- **Dynamic Data**: Real-time chart updates based on selections

## Styling System

### CSS Modules
- **Scoped Styles**: Component-level style isolation
- **TypeScript Integration**: Type-safe CSS class names
- **Theme System**: CSS custom properties for dual themes
- **Responsive Design**: Mobile-first breakpoints

### Theme Architecture
- **CSS Custom Properties**: `--color-*` variables for theme switching
- **DOM Attributes**: `data-theme` attribute for theme selection
- **System Integration**: `prefers-color-scheme` detection
- **LocalStorage Persistence**: Theme preferences saved across sessions

## Code Quality

### ESLint 9.33.0
- **TypeScript Support**: `typescript-eslint` integration
- **React Rules**: React Hooks and React Refresh compliance
- **Modern Config**: Flat config format (eslint.config.js)
- **Browser Globals**: Proper browser environment configuration

### Configuration Files
```
eslint.config.js      - ESLint configuration
tsconfig.json         - TypeScript project references
tsconfig.app.json     - Application TypeScript config
tsconfig.node.json    - Node.js TypeScript config
vite.config.ts        - Vite build configuration
```

## Development Dependencies

### Core Dev Tools
- `@vitejs/plugin-react` - React support for Vite
- `@types/react` & `@types/react-dom` - TypeScript definitions
- `globals` - Browser environment globals
- Various ESLint plugins for React and TypeScript

### TypeScript Configuration Details
- **Strict Mode**: All strict options enabled
- **No Unused Code**: Errors on unused locals and parameters
- **Module Resolution**: Bundler mode for optimal Vite integration
- **JSX Transform**: Modern react-jsx transform

## Runtime Dependencies

### Production Dependencies
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1", 
  "chart.js": "^4.5.0",
  "react-chartjs-2": "^5.3.0"
}
```

### Notable Omissions
- **No Testing Framework**: No Jest, Vitest, or other test runners
- **No Router**: Single-page application without routing
- **No State Management**: Uses React Context instead of Redux/Zustand
- **No UI Library**: Custom components with CSS Modules

## Platform Considerations

### Darwin (macOS) Optimized
- Development primarily on macOS platform
- Commands and paths optimized for macOS environment
- Terminal commands use macOS-specific utilities

### Browser Support
- **Modern Browsers**: ES2022 target requires recent browser versions
- **CSS Grid/Flexbox**: Modern CSS layout techniques
- **CSS Custom Properties**: Full CSS variable support required
- **JavaScript Modules**: Native ES modules support

## Performance Characteristics

### Bundle Size
- Minimal dependencies for small bundle size
- Tree shaking eliminates unused code
- Code splitting for optimal loading

### Runtime Performance
- React 19 optimizations
- Efficient data caching in service layer
- Memoized expensive chart calculations
- CSS Modules for optimized styling

## Security Considerations

### Build Security
- Dependencies regularly updated
- No runtime code evaluation
- Static asset handling only
- Client-side only (no server-side concerns)