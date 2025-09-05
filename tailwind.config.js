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
  ],
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