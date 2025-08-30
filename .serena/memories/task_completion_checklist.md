# Task Completion Checklist

## Before Committing Code

### 1. Code Quality Checks
```bash
# REQUIRED: Run linter and fix all issues
npm run lint

# REQUIRED: Ensure TypeScript compilation succeeds  
npm run build
```

### 2. Manual Testing
- [ ] Test in development server (`npm run dev`)
- [ ] Verify theme switching (light/dark mode) works
- [ ] Test responsive design on mobile/desktop
- [ ] Check character selection and chart updates
- [ ] Verify Japanese text renders correctly

### 3. Build Verification
- [ ] Production build completes successfully (`npm run build`)
- [ ] Preview build works correctly (`npm run preview`)
- [ ] No console errors in production build
- [ ] All static assets load properly

## Code Review Checklist

### Architecture Compliance
- [ ] Business logic extracted to custom hooks
- [ ] Components are purely presentational
- [ ] CSS Modules used for all styling
- [ ] Proper TypeScript interfaces defined
- [ ] Barrel exports updated if new files added

### Pattern Adherence
- [ ] Follow established naming conventions
- [ ] Import organization follows project standards
- [ ] Error handling implemented properly
- [ ] Loading states provided where needed

### Performance Considerations
- [ ] No unnecessary re-renders
- [ ] Expensive calculations memoized
- [ ] Service layer caching working properly
- [ ] Bundle size impact considered

## Documentation Updates

### When Adding New Features
- [ ] Update CLAUDE.md if architectural patterns change
- [ ] Update type definitions in `src/types/`
- [ ] Add barrel exports to `index.ts` files
- [ ] Document any new conventions or patterns

### When Modifying Data Structures
- [ ] Update Character or RankingEntry interfaces
- [ ] Verify data compatibility with existing JSON files
- [ ] Update service layer methods if needed

## Deployment Readiness

### Final Verification
- [ ] All dependencies properly declared in package.json
- [ ] No development-only code in production build
- [ ] Environment-specific configurations handled
- [ ] All static assets included in build output

### Performance Check
- [ ] Bundle size within reasonable limits
- [ ] No memory leaks in data service caching
- [ ] Chart rendering performance acceptable
- [ ] Theme switching smooth and responsive

## Important Notes

- **No Testing Framework**: Currently no automated tests to run
- **Manual QA Required**: Thorough manual testing essential
- **Theme System Critical**: Always test both light and dark themes
- **Japanese Support**: Verify Unicode characters render correctly
- **TypeScript Strict**: All code must pass strict type checking

## Common Issues to Check

### TypeScript Issues
- Unused imports or variables (strict mode will fail)
- Missing type definitions for new interfaces
- Incorrect type annotations on function parameters

### CSS Module Issues
- Missing CSS class references
- Theme variable usage (--color-* properties)
- Responsive design breakpoints

### Data Flow Issues
- Service layer caching working correctly
- Custom hooks returning proper state
- Context providers wrapping components correctly