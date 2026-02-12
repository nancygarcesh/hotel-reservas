import { useUIStore } from "@/store/uiStore";
import { useEffect } from "react";

export default function DarkModeHandler() {
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