import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  dark: boolean;
  toggleDark: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      dark: false,
      toggleDark: () => set({ dark: !get().dark })
    }),
    { name: "ui-storage" }
  )
);