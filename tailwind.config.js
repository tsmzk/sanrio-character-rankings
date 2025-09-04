/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Use CSS custom properties for theme-aware colors
        primary: {
          50: 'var(--color-primary-soft)',
          100: 'var(--color-primary-alt)',
          500: 'var(--color-accent)',
          600: 'var(--color-accent-hover)',
          700: 'var(--color-accent-hover)',
          900: 'var(--color-accent-hover)',
        },
        secondary: {
          50: 'var(--color-primary-alt)',
          500: 'var(--color-secondary)',
          600: 'var(--color-secondary-soft)',
          900: 'var(--color-secondary)',
        },
        // Surface colors
        surface: 'var(--color-bg-surface)',
        elevated: 'var(--color-bg-elevated)',
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
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
}

