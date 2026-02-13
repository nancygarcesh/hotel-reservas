import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      dark: false,

      toggle: () => {
        const newTheme = !get().dark;

        document.documentElement.classList.toggle("dark", newTheme);

        set({ dark: newTheme });
      }
    }),
    {
      name: "theme-storage"
    }
  )
);