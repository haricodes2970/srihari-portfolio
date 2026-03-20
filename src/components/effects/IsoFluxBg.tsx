"use client";

// ============================================================
// ISO FLUX BACKGROUND — Hobbies section
// Canvas isometric cubes with cursor attraction + autonomous drift
// ============================================================

import { useEffect, useRef } from "react";

interface IsoFluxBgProps { isCalm?: boolean; }

interface Cube {
  x: number; y: number;           // current position
  bx: number; by: number;         // base position
  size: number;
  alpha: number;
  targetAlpha: number;
  phase: number;                  // for sin/cos drift
  speed: number;
  orbitR: number;                 // orbital radius
  orbitAngle: number;             // current angle
  orbitSpeed: number;
  spawnTimer: number;             // countdown to respawn
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, s: number, alpha: number,
  isCalm: boolean
) {
  if (alpha <= 0) return;

  const h  = s * 0.58;    // isometric height factor
  const w2 = s / 2;

  // Face colors
  const top   = isCalm ? `rgba(245,240,232,${alpha * 0.9})` : `rgba(212,212,212,${alpha * 0.9})`;
  const left  = isCalm ? `rgba(212,201,184,${alpha * 0.7})` : `rgba(154,154,154,${alpha * 0.7})`;
  const right = isCalm ? `rgba(168,152,128,${alpha * 0.55})` : `rgba(102,102,102,${alpha * 0.55})`;

  // Top face: diamond
  ctx.beginPath();
  ctx.moveTo(cx,      cy - h);
  ctx.lineTo(cx + w2, cy - h / 2);
  ctx.lineTo(cx,      cy);
  ctx.lineTo(cx - w2, cy - h / 2);
  ctx.closePath();
  ctx.fillStyle = top;
  ctx.fill();

  // Left face
  ctx.beginPath();
  ctx.moveTo(cx - w2, cy - h / 2);
  ctx.lineTo(cx,      cy);
  ctx.lineTo(cx,      cy + h / 2);
  ctx.lineTo(cx - w2, cy);
  ctx.closePath();
  ctx.fillStyle = left;
  ctx.fill();

  // Right face
  ctx.beginPath();
  ctx.moveTo(cx + w2, cy - h / 2);
  ctx.lineTo(cx,      cy);
  ctx.lineTo(cx,      cy + h / 2);
  ctx.lineTo(cx + w2, cy);
  ctx.closePath();
  ctx.fillStyle = right;
  ctx.fill();
}

export default function IsoFluxBg({ isCalm = false }: IsoFluxBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);
  const isTouch   = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cubes: Cube[] = [];
    let W = 0, H = 0;

    const buildCubes = (w: number, h: number) => {
      const isMobile = w < 768;
      const isTablet = w < 1024 && !isMobile;
      const n = isMobile ? 8 : isTablet ? 14 : 22;

      cubes = Array.from({ length: n }, () => {
        const size = 20 + Math.random() * 60;
        const bx   = size + Math.random() * (w - size * 2);
        const by   = size + Math.random() * (h - size * 2);
        return {
          x: bx, y: by, bx, by,
          size,
          alpha:       0.25 + Math.random() * 0.55,
          targetAlpha: 0.25 + Math.random() * 0.55,
          phase:       Math.random() * Math.PI * 2,
          speed:       0.0004 + Math.random() * 0.0006,
          orbitR:      15 + Math.random() * 25,
          orbitAngle:  Math.random() * Math.PI * 2,
          orbitSpeed:  (0.003 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
          spawnTimer:  -1, // -1 = active
        };
      });
    };

    const resize = () => {
      const p = canvas.parentElement;
      const w = p ? p.clientWidth  : window.innerWidth;
      const h = p ? p.clientHeight : window.innerHeight;
      if (w <= 0 || h <= 0) return;
      const first = W === 0;
      canvas.width = w; canvas.height = h;
      W = w; H = h;
      if (first) buildCubes(W, H);
    };
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const onMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    const ATTRACT_R = 250;
    let lastTs = 0;

    const tick = (ts: number) => {
      if (W === 0 || cubes.length === 0) {
        rafRef.current = requestAnimationFrame(tick); return;
      }
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const c of cubes) {
        // Spawn timer
        if (c.spawnTimer > 0) {
          c.spawnTimer -= dt;
          if (c.spawnTimer <= 0) {
            // Respawn at new position
            c.bx = c.size + Math.random() * (W - c.size * 2);
            c.by = c.size + Math.random() * (H - c.size * 2);
            c.x  = c.bx; c.y = c.by;
            c.spawnTimer   = -1;
            c.targetAlpha  = 0.25 + Math.random() * 0.55;
          }
          continue;
        }

        // Orbital drift (figure-8 style)
        c.orbitAngle += c.orbitSpeed;
        const ox = Math.cos(c.orbitAngle) * c.orbitR;
        const oy = Math.sin(c.orbitAngle * 1.4) * c.orbitR * 0.6;

        // Cursor attraction
        let ax = 0, ay = 0;
        if (!isTouch.current && mx > -999) {
          const dx = mx - c.bx;
          const dy = my - c.by;
          const d  = Math.hypot(dx, dy);
          if (d < ATTRACT_R && d > 1) {
            const f = (1 - d / ATTRACT_R) * 0.18;
            ax = (dx / d) * f * c.size * 0.4;
            ay = (dy / d) * f * c.size * 0.4;
          }
        }

        c.x = c.bx + ox + ax;
        c.y = c.by + oy + ay;

        // Alpha pulse
        c.phase += c.speed;
        const pulse = Math.sin(c.phase) * 0.12;
        c.alpha = Math.max(0.1, Math.min(0.9, c.targetAlpha + pulse));

        drawCube(ctx, c.x, c.y, c.size, c.alpha, isCalm);
      }

      // Occasionally respawn one cube (fade out)
      if (Math.random() < 0.0008 * dt) {
        const active = cubes.filter((c) => c.spawnTimer < 0);
        if (active.length > 0) {
          const victim = active[Math.floor(Math.random() * active.length)];
          victim.targetAlpha = 0;
          victim.spawnTimer  = 4000 + Math.random() * 3000;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isCalm]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isCalm ? 0.55 : 0.65, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
