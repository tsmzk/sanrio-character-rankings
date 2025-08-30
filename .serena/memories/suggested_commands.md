# Essential Development Commands

## Core Development Commands

### Development Server
```bash
npm run dev
```
- Starts Vite development server with hot module replacement
- Runs on default Vite port (usually http://localhost:5173)
- Includes TypeScript checking and React Fast Refresh

### Production Build  
```bash
npm run build
```
- Compiles TypeScript (`tsc -b`) then builds with Vite
- Outputs to `dist/` directory
- Includes bundling, minification, and optimization
- **Always run before deployment**

### Code Quality
```bash
npm run lint
```
- Runs ESLint with TypeScript support
- Checks React Hooks rules and React Refresh compliance
- Configuration in `eslint.config.js`
- **Must pass before committing code**

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally for testing
- Use to verify production build works correctly

## System Commands (macOS/Darwin)

### Git Operations
```bash
git status              # Check working directory status
git add .               # Stage all changes
git commit -m "message" # Commit with message
git push                # Push to remote
git pull                # Pull from remote
```

### File System Navigation
```bash
ls -la                  # List files with details
find . -name "*.tsx"    # Find TypeScript React files
grep -r "pattern" src/  # Search in source files
cd src/components       # Navigate to components
```

### Package Management
```bash
npm install             # Install dependencies
npm install package     # Add new dependency
npm install -D package  # Add dev dependency
npm outdated           # Check outdated packages
```

## Important Notes

- **No Testing Framework**: Project currently has no test setup (no Jest, Vitest, etc.)
- **TypeScript Strict Mode**: All code must pass TypeScript strict compilation
- **No Auto-Deployment**: Manual build and deployment process
- **Development Platform**: Optimized for Darwin (macOS) environment