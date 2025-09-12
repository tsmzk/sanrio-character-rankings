/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', // Modern dark mode strategy
  theme: {
    extend: {
      // Use CSS custom properties for dynamic theming
      colors: {
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          900: 'hsl(var(--primary-900))',
        },
        secondary: {
          50: 'hsl(var(--secondary-50))',
          100: 'hsl(var(--secondary-100))',
          500: 'hsl(var(--secondary-500))',
          600: 'hsl(var(--secondary-600))',
          700: 'hsl(var(--secondary-700))',
          900: 'hsl(var(--secondary-900))',
        },
        surface: 'hsl(var(--surface))',
        elevated: 'hsl(var(--elevated))',
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        // Light theme
        light: {
          "primary": "#ff6fb4",         // Pink
          "secondary": "#ffb3c1",       // Light Pink
          "accent": "#ff8fa3",          // Rose
          "neutral": "#fce7f3",         // Very Light Pink
          "base-100": "#ffffff",        // White background
          "base-200": "#fff7f9",        // Light Pink background
          "base-300": "#ffecf0",        // Lighter Pink background
          "info": "#9bb5ff",            // Light Blue
          "success": "#9be9a8",         // Light Green
          "warning": "#ffd93d",         // Yellow
          "error": "#ff6b9d",           // Error Pink
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
        // Dark theme
        dark: {
          "primary": "#b388ff",         // Purple
          "secondary": "#ff6fb4",       // Pink
          "accent": "#d500f9",          // Magenta
          "neutral": "#1a1625",         // Dark Purple
          "base-100": "#000000",        // Black background
          "base-200": "#0a0a0a",        // Very Dark background
          "base-300": "#1a1a1a",        // Dark background
          "info": "#80d8ff",            // Cyan
          "success": "#69f0ae",         // Green
          "warning": "#ffd740",         // Amber
          "error": "#ff5252",           // Red
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        }
      }
    ],
    darkTheme: "dark", // name of the dark theme
    base: true, // applies background color and foreground color for root element
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and config in the console
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  // Optimizations
  future: {
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  corePlugins: {
    // Disable unused utilities for smaller bundle
    touchAction: false,
    scrollSnapType: false,
  }
}