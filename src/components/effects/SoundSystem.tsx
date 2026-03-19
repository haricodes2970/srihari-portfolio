"use client";

// ============================================================
// SOUND SYSTEM — srihari-portfolio
// Web Audio API synthesised sounds — zero external files
// Sounds: hover-tick, click-slash, nav-swish, mode-toggle,
//         easter-egg-boom, card-open, card-close
// ============================================================

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { usePathname } from "next/navigation";

// ── AudioContext singleton ───────────────────────────────
let _ctx: AudioContext | null = null;
let _muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  // Resume on user interaction
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

// Master volume (0–1)
const MASTER = 0.22;

// ── Utility: connect to dest with master gain ───────────
function connect(node: AudioNode, vol = 1): GainNode {
  const ctx = getCtx()!;
  const g = ctx.createGain();
  g.gain.setValueAtTime(MASTER * vol, ctx.currentTime);
  node.connect(g);
  g.connect(ctx.destination);
  return g;
}

// ── 1. Hover tick — tiny high click ─────────────────────
export function playHoverTick() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.04);
  const g = ctx.createGain();
  g.gain.setValueAtTime(MASTER * 0.35, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.05);
}

// ── 2. Click slash — sharp sword impact ─────────────────
export function playClickSlash() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;

  // White noise burst (metallic)
  const bufLen = ctx.sampleRate * 0.12;
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);
  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(3000, t);
  filter.frequency.exponentialRampToValueAtTime(800, t + 0.1);
  filter.Q.setValueAtTime(2, t);

  const g = ctx.createGain();
  g.gain.setValueAtTime(MASTER * 0.6, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

  noise.connect(filter); filter.connect(g); g.connect(ctx.destination);
  noise.start(t); noise.stop(t + 0.14);

  // Tone layer
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(440, t);
  osc.frequency.exponentialRampToValueAtTime(110, t + 0.1);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(MASTER * 0.25, t);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.connect(g2); g2.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.12);
}

// ── 3. Nav swish — sword leaving sheath ─────────────────
export function playNavSwish() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;

  // Long noise sweep
  const bufLen = ctx.sampleRate * 0.35;
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);
  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4000, t);
  filter.frequency.exponentialRampToValueAtTime(400, t + 0.3);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(MASTER * 0.45, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

  noise.connect(filter); filter.connect(g); g.connect(ctx.destination);
  noise.start(t); noise.stop(t + 0.4);

  // Pitch sweep on top
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, t + 0.02);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.3);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(MASTER * 0.18, t + 0.02);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  osc.connect(g2); g2.connect(ctx.destination);
  osc.start(t + 0.02); osc.stop(t + 0.35);
}

// ── 4a. Zoro mode — sword unsheath ──────────────────────
export function playZoroMode() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;

  // Three quick blade notes
  [0, 0.08, 0.16].forEach((offset, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600 - i * 80, t + offset);
    osc.frequency.exponentialRampToValueAtTime(200 - i * 30, t + offset + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(MASTER * (0.5 - i * 0.08), t + offset);
    g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.2);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t + offset); osc.stop(t + offset + 0.22);
  });

  // Ring
  const ring = ctx.createOscillator();
  ring.type = "sine";
  ring.frequency.setValueAtTime(2400, t + 0.22);
  const rg = ctx.createGain();
  rg.gain.setValueAtTime(MASTER * 0.3, t + 0.22);
  rg.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  ring.connect(rg); rg.connect(ctx.destination);
  ring.start(t + 0.22); ring.stop(t + 0.75);
}

// ── 4b. Calm mode — zen bell ────────────────────────────
export function playCalmMode() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;

  // Bell tone: sine with quick attack, long decay
  [523.25, 784, 1046.5].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t + i * 0.05);
    const g = ctx.createGain();
    g.gain.setValueAtTime(MASTER * (0.4 - i * 0.08), t + i * 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.05 + 1.2);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t + i * 0.05); osc.stop(t + i * 0.05 + 1.3);
  });
}

// ── 5. Easter egg — Santoryu three-sword boom ───────────
export function playEasterEggBoom() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;

  // 3 massive slashes
  [0, 0.12, 0.24].forEach((offset) => {
    const bufLen = ctx.sampleRate * 0.25;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const env = 1 - i / bufLen;
      data[i] = (Math.random() * 2 - 1) * env * env;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, t + offset);
    filter.Q.setValueAtTime(0.8, t + offset);

    const g = ctx.createGain();
    g.gain.setValueAtTime(MASTER * 0.9, t + offset);
    g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.25);

    noise.connect(filter); filter.connect(g); g.connect(ctx.destination);
    noise.start(t + offset); noise.stop(t + offset + 0.28);

    // Tone
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220 - offset * 80, t + offset);
    osc.frequency.exponentialRampToValueAtTime(55, t + offset + 0.25);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(MASTER * 0.5, t + offset);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.25);
    osc.connect(g2); g2.connect(ctx.destination);
    osc.start(t + offset); osc.stop(t + offset + 0.28);
  });

  // Reverb tail — long ring
  const reverb = ctx.createOscillator();
  reverb.type = "sine";
  reverb.frequency.setValueAtTime(110, t + 0.3);
  const rg = ctx.createGain();
  rg.gain.setValueAtTime(MASTER * 0.25, t + 0.3);
  rg.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
  reverb.connect(rg); rg.connect(ctx.destination);
  reverb.start(t + 0.3); reverb.stop(t + 1.6);
}

// ── 6. Card open — whoosh up ────────────────────────────
export function playCardOpen() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(MASTER * 0.3, t + 0.07);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.22);
}

// ── 7. Card close — whoosh down ─────────────────────────
export function playCardClose() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.14);
  const g = ctx.createGain();
  g.gain.setValueAtTime(MASTER * 0.25, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.18);
}

// ── Mute toggle export ───────────────────────────────────
export function toggleMute() { _muted = !_muted; return _muted; }
export function isMuted() { return _muted; }

// ── Main component — wires sounds to UI events ───────────
export default function SoundSystem() {
  const pathname     = usePathname();
  const prevPath     = useRef(pathname);
  const mode         = useUIStore((s) => s.mode);
  const prevMode     = useRef(mode);
  const easterEgg    = useUIStore((s) => s.easterEggActive);
  const prevEaster   = useRef(easterEgg);
  const activeModal  = useUIStore((s) => s.activeModal);
  const prevModal    = useRef(activeModal);

  // Wake AudioContext on first user interaction
  useEffect(() => {
    const wake = () => getCtx();
    window.addEventListener("click",     wake, { once: true });
    window.addEventListener("keydown",   wake, { once: true });
    window.addEventListener("mousemove", wake, { once: true });
  }, []);

  // ── Nav swish on route change ──────────────────────────
  useEffect(() => {
    if (pathname !== prevPath.current) {
      playNavSwish();
      prevPath.current = pathname;
    }
  }, [pathname]);

  // ── Mode toggle sound ──────────────────────────────────
  useEffect(() => {
    if (mode !== prevMode.current) {
      if (mode === "zoro") playZoroMode();
      else                 playCalmMode();
      prevMode.current = mode;
    }
  }, [mode]);

  // ── Easter egg boom ────────────────────────────────────
  useEffect(() => {
    if (easterEgg && !prevEaster.current) playEasterEggBoom();
    prevEaster.current = easterEgg;
  }, [easterEgg]);

  // ── Modal open/close sounds ────────────────────────────
  useEffect(() => {
    if (activeModal && !prevModal.current) playCardOpen();
    if (!activeModal && prevModal.current) playCardClose();
    prevModal.current = activeModal;
  }, [activeModal]);

  // ── Global hover tick + click slash ───────────────────
  useEffect(() => {
    const onEnter = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.matches("a, button, [role='button']")) playHoverTick();
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.matches("a, button, [role='button'], input, textarea")) playClickSlash();
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("click",     onClick);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("click",     onClick);
    };
  }, []);

  return null;
}
