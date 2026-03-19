// ============================================================
// usePageTransition — triggers slash on route change
// ============================================================

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/uiStore";

export function usePageTransition() {
  const pathname = usePathname();
  const triggerSlash = useUIStore((s) => s.triggerSlash);

  useEffect(() => {
    triggerSlash();
  }, [pathname, triggerSlash]);
}
