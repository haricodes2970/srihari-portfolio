"use client";

// ============================================================
// MODE APPLICATOR — srihari-portfolio
// Applies body class so CSS-var calm/zoro themes take effect
// ============================================================

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export default function ModeApplicator() {
  const mode = useUIStore((s) => s.mode);

  useEffect(() => {
    if (mode === "calm") {
      document.body.classList.add("calm-mode");
    } else {
      document.body.classList.remove("calm-mode");
    }
  }, [mode]);

  return null;
}
