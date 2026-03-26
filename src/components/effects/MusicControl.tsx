"use client";

import { useState } from "react";
import { setMusicMuted, getMusicMuted } from "@/components/effects/SoundSystem";

export default function MusicControl() {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const n = !muted;
    setMuted(n);
    setMusicMuted(n);
  };
  return (
    <button
      onClick={toggle}
      suppressHydrationWarning
      className="fixed top-4 right-4 z-[60] w-9 h-9 flex items-center justify-center
                 bg-surface/80 border border-green-core/20 rounded-sm backdrop-blur-sm
                 text-green-core hover:border-green-core/50 transition-all duration-200
                 hover:shadow-[0_0_12px_rgba(0,255,106,0.2)]"
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Unmute music" : "Mute music"}
    >
      <span className="font-mono text-sm leading-none">{muted ? "✕" : "♪"}</span>
    </button>
  );
}
