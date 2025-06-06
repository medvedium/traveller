import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark', // безопасное начальное значение

  setTheme: (mode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', mode);
    }
    set({ mode });
  },

  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
      }
      return { mode: newMode };
    }),
}));
