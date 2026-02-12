import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export default function ThemeProvider() {
  const dark = useUIStore((s) => s.dark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return null;
}