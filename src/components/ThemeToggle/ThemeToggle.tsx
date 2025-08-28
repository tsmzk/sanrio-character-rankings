import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { getThemeEmoji } from '../../utils/themeUtils';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = async () => {
    setIsSwitching(true);
    console.log('🔄 Theme toggle clicked! Current theme:', theme);
    toggleTheme();
    
    // Reset switching state after animation
    setTimeout(() => {
      setIsSwitching(false);
      console.log('✨ Theme switch animation complete');
    }, 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const currentThemeEmoji = getThemeEmoji(theme);

  return (
    <div 
      className={`${styles.themeToggle} ${compact ? styles.compact : ''} ${isSwitching ? styles.switching : ''} ${className}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`テーマ切り替えボタン。クリックしてテーマを変更`}
    >
      {/* Screen reader text */}
      <span className={styles.srOnly}>
        テーマ切り替えボタン
      </span>

      {/* Light mode theme label */}
      <div className={`${styles.themeLabel} ${theme === 'light' ? styles.currentTheme : styles.inactiveTheme}`}>
        <div className={styles.themeEmoji}>{getThemeEmoji('light')}</div>
      </div>

      {/* Toggle switch */}
      <div className={styles.toggleSwitch}>
        <div className={styles.toggleHandle}>
          {currentThemeEmoji}
        </div>
      </div>

      {/* Dark mode theme label */}
      <div className={`${styles.themeLabel} ${theme === 'dark' ? styles.currentTheme : styles.inactiveTheme}`}>
        <div className={styles.themeEmoji}>{getThemeEmoji('dark')}</div>
      </div>
    </div>
  );
}