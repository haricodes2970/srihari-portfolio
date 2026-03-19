"use client";

// ============================================================
// PARTICLE CANVAS — Sword trail following cursor
// Elongated sword-slash particles that stream behind cursor
// Only active in Zoro mode
// ============================================================

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/uiStore";

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;   // 0→1 decreasing
  width: number;
  hue: number;
  angle: number;
}

export default function ParticleCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafId      = useRef<number>(0);
  const trail      = useRef<TrailPoint[]>([]);
  const mousePos   = useRef({ x: -500, y: -500 });
  const prevMouse  = useRef({ x: -500, y: -500 });
  const lastSpawn  = useRef<number>(0);
  const mode       = useUIStore((s) => s.mode);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      prevMouse.current  = { ...mousePos.current };
      mousePos.current   = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only spawn trail in Zoro mode
      if (mode === "zoro") {
        const now  = performance.now();
        const dx   = mousePos.current.x - prevMouse.current.x;
        const dy   = mousePos.current.y - prevMouse.current.y;
        const spd  = Math.sqrt(dx * dx + dy * dy);
        const ang  = Math.atan2(dy, dx);

        if (spd > 1.5 && now - lastSpawn.current > 18) {
          const count = Math.min(Math.floor(spd / 6), 4);
          for (let i = 0; i < count; i++) {
            trail.current.push({
              x:     mousePos.current.x + (Math.random() - 0.5) * 4,
              y:     mousePos.current.y + (Math.random() - 0.5) * 4,
              vx:    -Math.cos(ang) * (0.3 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.4,
              vy:    -Math.sin(ang) * (0.3 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.4,
              life:  1,
              width: 1.5 + Math.random() * 2,
              hue:   130 + Math.random() * 40,
              angle: ang,
            });
          }
          lastSpawn.current = now;
        }
      }

      // Render trail particles
      trail.current = trail.current.filter((p) => {
        p.life -= 0.045;
        if (p.life <= 0) return false;

        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        const a     = p.life * 0.75;
        const len   = (20 + p.width * 6) * p.life;
        const thick = p.width * p.life;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Glow layer
        const glow = ctx.createLinearGradient(-len, 0, len * 0.3, 0);
        glow.addColorStop(0,   `hsla(${p.hue}, 100%, 70%, 0)`);
        glow.addColorStop(0.4, `hsla(${p.hue}, 100%, 70%, ${a * 0.5})`);
        glow.addColorStop(0.8, `hsla(${p.hue}, 100%, 90%, ${a})`);
        glow.addColorStop(1,   `hsla(${p.hue}, 100%, 100%, ${a * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(-len, 0);
        ctx.lineTo(len * 0.3, 0);
        ctx.lineWidth   = thick + 3;
        ctx.strokeStyle = glow;
        ctx.shadowBlur  = thick * 8;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${a})`;
        ctx.stroke();

        // Sharp core
        const core = ctx.createLinearGradient(-len * 0.6, 0, len * 0.3, 0);
        core.addColorStop(0, `hsla(${p.hue}, 100%, 80%, 0)`);
        core.addColorStop(1, `hsla(${p.hue}, 100%, 95%, ${a})`);
        ctx.beginPath();
        ctx.moveTo(-len * 0.6, 0);
        ctx.lineTo(len * 0.3, 0);
        ctx.lineWidth   = thick;
        ctx.strokeStyle = core;
        ctx.shadowBlur  = 0;
        ctx.stroke();

        ctx.restore();
        return true;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9994]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
