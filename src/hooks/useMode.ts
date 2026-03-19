// ============================================================
// useMode — reads mode from store, applies class to body
// ============================================================

"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export function useMode() {
  const mode = useUIStore((s) => s.mode);

  useEffect(() => {
    document.body.classList.toggle("calm-mode", mode === "calm");
  }, [mode]);

  return mode;
}
