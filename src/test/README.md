# Testing Documentation

## Testing Setup

This project uses **Vitest** with **React Testing Library** for comprehensive component testing.

### Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test environment configuration
│   ├── test-utils.tsx     # Custom render functions and utilities
│   └── README.md          # This file
└── components/
    └── **/*.test.tsx      # Component test files
```

### Available Test Commands

```bash
# Run tests in watch mode (development)
npm run test

# Run tests once (CI/CD)
npm run test:run

# Run tests with UI dashboard
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Testing Utilities

#### Custom Render Function
```typescript
import { render, screen } from '../test/test-utils';

// Renders components with theme context
render(<YourComponent />, { theme: 'dark' });
```

#### Mock Data Generators
```typescript
import { createMockCharacter, createMockRankings } from '../test/test-utils';

const character = createMockCharacter({ name: 'テスト' });
const rankings = createMockRankings(['char1', 'char2'], [2020, 2021]);
```

#### Theme Testing
```typescript
import { testBothThemes } from '../test/test-utils';

testBothThemes((theme) => {
  // Test runs for both light and dark themes
  render(<Component />, { theme });
});
```

### Mocked Dependencies

- **Chart.js**: Replaced with simple div elements
- **react-chartjs-2**: Mocked Line component
- **ResizeObserver**: Mocked for responsive components
- **localStorage**: Mocked for theme persistence
- **matchMedia**: Mocked for theme detection

### Coverage Configuration

- **Minimum Coverage**: 80% for all metrics
- **Excluded**: `node_modules/`, `src/test/`
- **Reports**: Text, JSON, and HTML formats
- **Output**: Coverage reports in `coverage/` directory

### Writing Tests

#### Component Tests
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    
    render(<YourComponent onClick={mockFn} />);
    
    await user.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

#### Testing HeadlessUI Components
```typescript
// HeadlessUI components need special handling
const button = screen.getByRole('button');
await user.click(button); // Opens dropdown

const option = screen.getByText('Option Text');
await user.click(option); // Selects option
```

#### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Common Patterns

#### Async Component Testing
```typescript
import { waitFor } from '@testing-library/react';

it('handles async operations', async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

#### Error Boundary Testing
```typescript
it('handles errors gracefully', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  render(<ComponentThatThrows />);
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  consoleSpy.mockRestore();
});
```

#### Performance Testing
```typescript
import { PerformanceMonitor } from '../utils/performance';

it('renders within performance budget', () => {
  const start = performance.now();
  render(<HeavyComponent />);
  const end = performance.now();
  
  expect(end - start).toBeLessThan(100); // 100ms budget
});
```

### Troubleshooting

#### Common Issues

1. **Chart.js Canvas Errors**: Already mocked in setup.ts
2. **HeadlessUI Portal Issues**: Use `screen.getByRole()` instead of complex selectors
3. **Theme Context Errors**: Use custom render with theme parameter
4. **Async State Issues**: Use `waitFor()` and `findBy*()` queries

#### Debug Tips

```typescript
// Debug component tree
import { screen } from '@testing-library/react';
screen.debug(); // Prints entire DOM
screen.debug(screen.getByRole('button')); // Prints specific element

// Check available roles
screen.getByRole(''); // Error shows all available roles
```

### CI/CD Integration

Tests run automatically on:
- Pre-commit hooks (future enhancement)
- Pull request creation
- Main branch push

Coverage reports are generated in CI and can be viewed in the `coverage/` directory.