import type { ThemeType } from '../contexts/ThemeContext';

// Theme utility functions
export const getThemeEmoji = (theme: ThemeType): string => {
  return theme === 'light' ? '☀️' : '🌙';
};