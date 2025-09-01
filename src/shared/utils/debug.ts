/**
 * 開発環境でのみ動作するデバッグユーティリティ
 * 本番環境では何も出力されません
 */

const isDev = import.meta.env.DEV;

export const debug = {
  log: (message: string, ...args: unknown[]) => {
    if (isDev) console.log(message, ...args);
  },

  warn: (message: string, ...args: unknown[]) => {
    if (isDev) console.warn(message, ...args);
  },

  error: (message: string, ...args: unknown[]) => {
    if (isDev) console.error(message, ...args);
  },

  info: (message: string, ...args: unknown[]) => {
    if (isDev) console.info(message, ...args);
  },

  theme: (action: string, theme: string) => {
    if (isDev) console.log(`🎨 Theme ${action}:`, theme);
  },

  toggle: (theme: string) => {
    if (isDev) console.log("🔄 Theme toggle clicked! Current theme:", theme);
  },

  animation: (action: string) => {
    if (isDev) console.log(`✨ ${action} animation complete`);
  },

  performance: (message: string, ...args: unknown[]) => {
    if (isDev) console.log(`⚡ ${message}`, ...args);
  },

  component: (componentName: string, action: string, ...args: unknown[]) => {
    if (isDev) console.log(`🧩 ${componentName} ${action}`, ...args);
  },

  data: (operation: string, data: unknown) => {
    if (isDev) console.log(`📊 ${operation}:`, data);
  },
};
