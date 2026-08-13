import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Client-state store for the light/dark theme preference, persisted to
 * localStorage. Applying the theme to the DOM (CSS custom properties,
 * `data-theme` attribute, etc.) is deferred to Phase 5 — this milestone
 * only establishes the Zustand store pattern used across the app.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'finance-dashboard:theme' },
  ),
);
