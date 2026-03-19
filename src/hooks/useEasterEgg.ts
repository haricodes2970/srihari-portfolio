// ============================================================
// useEasterEgg — keyboard trigger for Three Sword Style
// ============================================================

"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export function useEasterEgg() {
  const triggerEasterEgg = useUIStore((s) => s.triggerEasterEgg);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "z" || e.key === "Z") {
        triggerEasterEgg();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerEasterEgg]);
}
