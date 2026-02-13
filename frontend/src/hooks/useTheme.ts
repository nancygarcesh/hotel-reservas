import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export const useTheme = () => {
  const { dark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
};