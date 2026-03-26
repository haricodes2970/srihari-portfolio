"use client";

// ============================================================
// SOUND SYSTEM — srihari-portfolio
// Web Audio API synthesised sounds — zero external files
// Sounds: hover-tick, click-slash, nav-swish, mode-toggle,
//         easter-egg-boom, card-open, card-close
// Music:  background generative music (zoro / calm modes)
//         section jingles on route change
// ============================================================

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { usePathname } from "next/navigation";

// ── AudioContext singleton ───────────────────────────────
let _ctx: AudioContext | null = null;
let _muted = false;
let _musicMuted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx)
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

// Volume constants
const MASTER    = 0.22;
const MUSIC_VOL = 0.14;

// ── MIDI → frequency ─────────────────────────────────────
function midi(n: number): number {
  return 440 * Math.pow(2, (n - 69) / 12);
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

// ── 2. Click slash — sharp sword impact (kept for compat) ─
export function playClickSlash() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;
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

// ── Mute toggle ──────────────────────────────────────────
export function toggleMute() { _muted = !_muted; return _muted; }
export function isMuted()    { return _muted; }

// ============================================================
// BACKGROUND MUSIC ENGINE
// ============================================================

// Scale definitions
const ZORO_SCALE = [0, 3, 5, 7, 10]; // A minor pentatonic
const CALM_SCALE = [0, 2, 4, 7, 9];  // C major pentatonic

// Pattern type: [scaleIndex, octaveOffset] | null
type MS = [number, number] | null;

// Zoro patterns (root MIDI 57 = A3)
const ZORO_LEAD: MS[] = [
  [0,1],null,[2,1],null, [3,1],null,[4,1],[3,1],
  [2,1],null,[0,1],null, [1,1],[2,1],[3,1],null,
  [4,1],null,[3,1],[2,1],[1,1],null,[2,1],[3,1],
  [0,2],null,[2,1],null, [3,1],[4,1],null,[3,1],
];

const ZORO_BASS: MS[] = [
  [0,0],[0,0],[2,0],null, [3,0],[0,0],[1,0],[2,0],
];

// Calm patterns (root MIDI 60 = C4)
const CALM_LEAD: MS[] = [
  [0,1],null,null,[1,1], null,null,[2,1],null,
  [3,1],null,null,[4,1], null,null,[3,1],null,
  [2,1],null,null,null,  [1,1],null,null,null,
  [0,1],null,null,[1,1], null,[2,1],null,[3,1],
];

const CALM_BASS: MS[] = [
  [0,0],null,[2,0],null, [3,0],null,[2,0],null,
];

// Music engine state
let _musicGain:      GainNode | null                   = null;
let _musicMode:      "zoro" | "calm" | null            = null;
let _musicStarted    = false;
let _musicPaused     = false;
let _schedulerInterval: ReturnType<typeof setInterval> | null = null;
let _nextNoteTime    = 0;
let _currentStep     = 0;

// Session uniqueness — lazily initialised on first music start (not at module top-level → SSR safe)
let _sessionOffset:   number | null = null;
let _sessionBpmDelta: number | null = null;

function getSessionParams(): { offset: number; bpmDelta: number } {
  if (_sessionOffset === null) {
    const offsets = [0, 2, 3, 5, 7, 9, 10];
    _sessionOffset = offsets[Math.floor(Math.random() * offsets.length)];
  }
  if (_sessionBpmDelta === null) {
    _sessionBpmDelta = Math.floor(Math.random() * 17) - 8; // −8 … +8
  }
  return { offset: _sessionOffset, bpmDelta: _sessionBpmDelta };
}

function ensureMusicGain(ctx: AudioContext): GainNode {
  if (!_musicGain) {
    _musicGain = ctx.createGain();
    _musicGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    _musicGain.connect(ctx.destination);
  }
  return _musicGain;
}

function scheduleMusicalNote(
  ctx: AudioContext,
  gain: GainNode,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType,
  vol: number,
) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  const g = ctx.createGain();
  const attack  = 0.01;
  const release = Math.min(0.05, duration * 0.3);
  g.gain.setValueAtTime(0.0001, startTime);
  g.gain.linearRampToValueAtTime(vol, startTime + attack);
  g.gain.setValueAtTime(vol, startTime + duration - release);
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(g);
  g.connect(gain);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

function scheduleDrum(
  ctx: AudioContext,
  gain: GainNode,
  type: "kick" | "snare",
  startTime: number,
) {
  if (type === "kick") {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.1);
    const g = ctx.createGain();
    g.gain.setValueAtTime(MUSIC_VOL * MASTER * 1.5, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.15);
    osc.connect(g); g.connect(gain);
    osc.start(startTime); osc.stop(startTime + 0.18);
  } else {
    const bufLen = ctx.sampleRate * 0.1;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2000, startTime);
    filter.Q.setValueAtTime(1, startTime);
    const g = ctx.createGain();
    g.gain.setValueAtTime(MUSIC_VOL * MASTER * 0.8, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.1);
    noise.connect(filter); filter.connect(g); g.connect(gain);
    noise.start(startTime); noise.stop(startTime + 0.12);
  }
}

function runScheduler() {
  const ctx = _ctx;
  if (!ctx || !_musicGain || !_musicMode || _musicPaused) return;

  const { offset, bpmDelta } = getSessionParams();
  const baseBpm  = _musicMode === "zoro" ? 150 : 80;
  const bpm      = baseBpm + bpmDelta;
  const sixteenth = 60 / bpm / 4;
  const eighth    = sixteenth * 2;
  const lookahead = 0.1;

  while (_nextNoteTime < ctx.currentTime + lookahead) {
    const step     = _currentStep % 32;
    const bassStep = Math.floor(step / 4) % 8;

    if (_musicMode === "zoro") {
      const rootMidi = 57 + offset;

      // Lead
      const lead = ZORO_LEAD[step];
      if (lead) {
        const noteMidi = rootMidi + ZORO_SCALE[lead[0]] + lead[1] * 12;
        scheduleMusicalNote(ctx, _musicGain, midi(noteMidi), _nextNoteTime, sixteenth * 0.8, "square", MUSIC_VOL * MASTER);
      }

      // Bass (every 4 sixteenth steps = one eighth)
      if (step % 4 === 0) {
        const bass = ZORO_BASS[bassStep];
        if (bass) {
          const bassMidi = (rootMidi - 12) + ZORO_SCALE[bass[0]] + bass[1] * 12;
          scheduleMusicalNote(ctx, _musicGain, midi(bassMidi), _nextNoteTime, eighth * 0.7, "sawtooth", MUSIC_VOL * MASTER * 0.8);
        }
      }

      // Drums — repeating kick@0,8 + snare@4,12 within each 16-step bar
      if ([0, 8, 16, 24].includes(step)) scheduleDrum(ctx, _musicGain, "kick",  _nextNoteTime);
      if ([4, 12, 20, 28].includes(step)) scheduleDrum(ctx, _musicGain, "snare", _nextNoteTime);

    } else {
      const rootMidi = 60 + offset;

      // Lead
      const lead = CALM_LEAD[step];
      if (lead) {
        const noteMidi = rootMidi + CALM_SCALE[lead[0]] + lead[1] * 12;
        scheduleMusicalNote(ctx, _musicGain, midi(noteMidi), _nextNoteTime, sixteenth * 1.2, "sine", MUSIC_VOL * MASTER * 0.9);
      }

      // Bass
      if (step % 4 === 0) {
        const bass = CALM_BASS[bassStep];
        if (bass) {
          const bassMidi = (rootMidi - 12) + CALM_SCALE[bass[0]] + bass[1] * 12;
          scheduleMusicalNote(ctx, _musicGain, midi(bassMidi), _nextNoteTime, eighth * 0.9, "triangle", MUSIC_VOL * MASTER * 0.7);
        }
      }
    }

    _nextNoteTime += sixteenth;
    _currentStep   = (_currentStep + 1) % 32;
  }
}

export function startMusic(mode: "zoro" | "calm") {
  const ctx = getCtx();
  if (!ctx || _musicMuted) return;

  // Stop existing scheduler
  if (_schedulerInterval !== null) {
    clearInterval(_schedulerInterval);
    _schedulerInterval = null;
  }

  _musicMode    = mode;
  _musicStarted = true;
  _musicPaused  = false;
  _currentStep  = 0;

  const gain = ensureMusicGain(ctx);

  // Crossfade in (0.6 s)
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(MUSIC_VOL, ctx.currentTime + 0.6);

  _nextNoteTime      = ctx.currentTime + 0.05;
  _schedulerInterval = setInterval(runScheduler, 25);
}

export function stopMusic() {
  if (_schedulerInterval !== null) {
    clearInterval(_schedulerInterval);
    _schedulerInterval = null;
  }
  if (_musicGain && _ctx) {
    const now = _ctx.currentTime;
    const cur = Math.max(_musicGain.gain.value, 0.0001);
    _musicGain.gain.cancelScheduledValues(now);
    _musicGain.gain.setValueAtTime(cur, now);
    _musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  }
}

export function setMusicMuted(v: boolean) {
  _musicMuted = v;
  if (v) {
    stopMusic();
  } else {
    if (_musicStarted && _musicMode) startMusic(_musicMode);
  }
}

export function getMusicMuted(): boolean {
  return _musicMuted;
}

// ── Section Jingles ──────────────────────────────────────
type JingleNote = { freq: number; t: number; d: number };

const JINGLES: Record<string, JingleNote[]> = {
  "/":              [{freq:523,t:0,d:0.10},{freq:659,t:0.10,d:0.10},{freq:784,t:0.20,d:0.10},{freq:1047,t:0.32,d:0.40}],
  "/about":         [{freq:880,t:0,d:0.16},{freq:784,t:0.16,d:0.16},{freq:659,t:0.32,d:0.16},{freq:587,t:0.50,d:0.38}],
  "/skills":        [{freq:523,t:0,d:0.07},{freq:587,t:0.07,d:0.07},{freq:659,t:0.14,d:0.07},{freq:698,t:0.21,d:0.07},{freq:784,t:0.28,d:0.07},{freq:880,t:0.35,d:0.07},{freq:1047,t:0.44,d:0.35}],
  "/projects":      [{freq:392,t:0,d:0.10},{freq:523,t:0.10,d:0.10},{freq:523,t:0.22,d:0.05},{freq:659,t:0.28,d:0.12},{freq:784,t:0.42,d:0.38}],
  "/ai-toolkit":    [{freq:1175,t:0,d:0.05},{freq:880,t:0.07,d:0.05},{freq:1175,t:0.14,d:0.05},{freq:1397,t:0.21,d:0.05},{freq:880,t:0.28,d:0.05},{freq:1760,t:0.38,d:0.28}],
  "/certificates":  [{freq:523,t:0,d:0.09},{freq:659,t:0.09,d:0.09},{freq:784,t:0.18,d:0.09},{freq:659,t:0.30,d:0.09},{freq:784,t:0.40,d:0.09},{freq:1047,t:0.52,d:0.38}],
  "/hobbies":       [{freq:784,t:0,d:0.08},{freq:880,t:0.09,d:0.08},{freq:784,t:0.18,d:0.08},{freq:659,t:0.27,d:0.08},{freq:784,t:0.36,d:0.08},{freq:988,t:0.46,d:0.30}],
  "/contact":       [{freq:880,t:0,d:0.07},{freq:880,t:0.12,d:0.07},{freq:1175,t:0.24,d:0.14},{freq:1047,t:0.42,d:0.38}],
};

export function playSectionJingle(route: string) {
  const notes = JINGLES[route];
  if (!notes?.length) return;
  const ctx = getCtx();
  if (!ctx) return;

  const jingleVol = MASTER * 0.45;

  // Pause background music with 0.12 s fade-out
  _musicPaused = true;
  if (_musicGain) {
    const now = ctx.currentTime;
    const cur = Math.max(_musicGain.gain.value, 0.0001);
    _musicGain.gain.cancelScheduledValues(now);
    _musicGain.gain.setValueAtTime(cur, now);
    _musicGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
  }

  // Play jingle notes
  const now = ctx.currentTime;
  notes.forEach(({ freq, t, d }) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, now + t);
    const g = ctx.createGain();
    const attack  = 0.005;
    const release = Math.min(0.03, d * 0.2);
    g.gain.setValueAtTime(0.0001, now + t);
    g.gain.linearRampToValueAtTime(jingleVol, now + t + attack);
    g.gain.setValueAtTime(jingleVol, now + t + d - release);
    g.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(now + t);
    osc.stop(now + t + d + 0.01);
  });

  // Resume after jingle ends + 250 ms buffer
  const last        = notes[notes.length - 1];
  const totalMs     = (last.t + last.d + 0.25) * 1000;
  setTimeout(() => {
    if (!_musicMuted && _musicStarted && _musicMode && _ctx) {
      _musicPaused   = false;
      _nextNoteTime  = _ctx.currentTime + 0.05; // prevent burst
      if (_musicGain) {
        _musicGain.gain.cancelScheduledValues(_ctx.currentTime);
        _musicGain.gain.setValueAtTime(0.0001, _ctx.currentTime);
        _musicGain.gain.linearRampToValueAtTime(MUSIC_VOL, _ctx.currentTime + 0.5);
      }
    }
  }, totalMs);
}

// ── Click Sound Variants ─────────────────────────────────
type ClickVariant = { freq: number; end: number; nf: number; type: OscillatorType; v: number };

const CLICK_VARIANTS: ClickVariant[] = [
  { freq: 440, end: 110, nf: 3000, type: "sawtooth", v: 0.60 },
  { freq: 523, end: 130, nf: 3500, type: "sawtooth", v: 0.55 },
  { freq: 392, end: 100, nf: 2500, type: "sawtooth", v: 0.65 },
  { freq: 587, end: 150, nf: 4000, type: "square",   v: 0.50 },
  { freq: 349, end:  90, nf: 2200, type: "sawtooth", v: 0.68 },
  { freq: 659, end: 165, nf: 4500, type: "square",   v: 0.45 },
];

export function playClickVariant() {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const v = CLICK_VARIANTS[Math.floor(Math.random() * CLICK_VARIANTS.length)];

  // Noise burst
  const bufLen = ctx.sampleRate * 0.12;
  const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data   = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);
  const noise  = ctx.createBufferSource();
  noise.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type  = "bandpass";
  filter.frequency.setValueAtTime(v.nf, t);
  filter.frequency.exponentialRampToValueAtTime(800, t + 0.1);
  filter.Q.setValueAtTime(2, t);
  const g = ctx.createGain();
  g.gain.setValueAtTime(MASTER * v.v, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  noise.connect(filter); filter.connect(g); g.connect(ctx.destination);
  noise.start(t); noise.stop(t + 0.14);

  // Tone layer
  const osc = ctx.createOscillator();
  osc.type  = v.type;
  osc.frequency.setValueAtTime(v.freq, t);
  osc.frequency.exponentialRampToValueAtTime(v.end, t + 0.1);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(MASTER * 0.25, t);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.connect(g2); g2.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.12);
}

// ============================================================
// SOUND SYSTEM COMPONENT
// ============================================================

export default function SoundSystem() {
  const pathname    = usePathname();
  const prevPath    = useRef(pathname);
  const mode        = useUIStore((s) => s.mode);
  const modeRef     = useRef(mode);
  const prevMode    = useRef(mode);
  const easterEgg   = useUIStore((s) => s.easterEggActive);
  const prevEaster  = useRef(easterEgg);
  const activeModal = useUIStore((s) => s.activeModal);
  const prevModal   = useRef(activeModal);
  const musicEverStarted = useRef(false);

  // Keep modeRef current for wake handler
  useEffect(() => { modeRef.current = mode; }, [mode]);

  // Wake AudioContext + start music on first user interaction
  useEffect(() => {
    const wake = () => {
      const ctx = getCtx();
      if (ctx && !musicEverStarted.current) {
        musicEverStarted.current = true;
        startMusic(modeRef.current as "zoro" | "calm");
      }
    };
    window.addEventListener("click",     wake, { once: true });
    window.addEventListener("keydown",   wake, { once: true });
    window.addEventListener("mousemove", wake, { once: true });
    return () => {
      window.removeEventListener("click",     wake);
      window.removeEventListener("keydown",   wake);
      window.removeEventListener("mousemove", wake);
    };
  }, []);

  // Cleanup music on unmount
  useEffect(() => { return () => stopMusic(); }, []);

  // ── Section jingle on route change ────────────────────
  useEffect(() => {
    if (pathname !== prevPath.current) {
      playSectionJingle(pathname);
      prevPath.current = pathname;
    }
  }, [pathname]);

  // ── Mode toggle sound + music mode switch ──────────────
  useEffect(() => {
    if (mode !== prevMode.current) {
      if (mode === "zoro") playZoroMode();
      else                 playCalmMode();
      prevMode.current = mode;
      if (musicEverStarted.current) startMusic(mode as "zoro" | "calm");
    }
  }, [mode]);

  // ── Easter egg boom ────────────────────────────────────
  useEffect(() => {
    if (easterEgg && !prevEaster.current) playEasterEggBoom();
    prevEaster.current = easterEgg;
  }, [easterEgg]);

  // ── Modal open / close ─────────────────────────────────
  useEffect(() => {
    if (activeModal && !prevModal.current)  playCardOpen();
    if (!activeModal && prevModal.current)  playCardClose();
    prevModal.current = activeModal;
  }, [activeModal]);

  // ── Hover tick + click variant ─────────────────────────
  useEffect(() => {
    const ACTION = "nav a, [data-sound='hover'], .cta-btn";
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest(ACTION)) playHoverTick();
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.matches("input, textarea, select")) return;
      if (el.closest("button:not([disabled]), a[href]")) playClickVariant();
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
