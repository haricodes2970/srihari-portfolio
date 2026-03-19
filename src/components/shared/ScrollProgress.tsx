"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[200] h-[2px] pointer-events-none
                 transition-[width] duration-100 ease-linear"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #007a30, #00ff6a)",
        boxShadow: "0 0 8px rgba(0,255,106,0.4)",
      }}
    />
  );
}
