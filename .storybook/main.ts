import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/features/theme/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/features/character/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/features/ranking/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/features/layout/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;