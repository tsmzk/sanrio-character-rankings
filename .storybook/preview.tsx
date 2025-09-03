import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import '../src/styles/themes.css';
import { ThemeProvider } from '../src/features/theme/contexts/ThemeContext';

const preview: Preview = {
  parameters: {},
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light theme', right: '☀️' },
          { value: 'dark', title: 'Dark theme', right: '🌛' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      
      const themeClasses = theme === 'dark' 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900';
      
      return (
        <ThemeProvider defaultTheme={theme}>
          <div className={`min-h-screen transition-colors duration-200 ${themeClasses}`}>
            <div className="p-4">
              <Story />
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;