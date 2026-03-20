"use client";

// ============================================================
// ISO FLUX CANVAS — Hobbies section background
// Floating isometric cube wireframes + mouse parallax via GSAP
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Cube {
  ox: number; oy: number;   // origin (base position)
  x:  number; y:  number;   // current rendered position
  size:  number;
  phase: number;
  speed: number;
  alpha: number;
}

function drawIsoCube(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  s: number,
  alpha: number,
) {
  const h = s * 0.5;
  const stroke = `rgba(0,255,106,${alpha})`;
  const fillTop   = `rgba(0,255,106,${alpha * 0.10})`;
  const fillLeft  = `rgba(0,200,80, ${alpha * 0.06})`;
  const fillRight = `rgba(0,150,50, ${alpha * 0.14})`;

  // Top face
  ctx.beginPath();
  ctx.moveTo(x,       y - h);
  ctx.lineTo(x + s,   y);
  ctx.lineTo(x,       y + h);
  ctx.lineTo(x - s,   y);
  ctx.closePath();
  ctx.fillStyle = fillTop;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 0.6;
  ctx.fill(); ctx.stroke();

  // Left face
  ctx.beginPath();
  ctx.moveTo(x - s,  y);
  ctx.lineTo(x,      y + h);
  ctx.lineTo(x,      y + h + s);
  ctx.lineTo(x - s,  y + s);
  ctx.closePath();
  ctx.fillStyle = fillLeft;
  ctx.fill(); ctx.stroke();

  // Right face
  ctx.beginPath();
  ctx.moveTo(x + s,  y);
  ctx.lineTo(x,      y + h);
  ctx.lineTo(x,      y + h + s);
  ctx.lineTo(x + s,  y + s);
  ctx.closePath();
  ctx.fillStyle = fillRight;
  ctx.fill(); ctx.stroke();
}

export default function IsoFluxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const isMobile = window.innerWidth < 768;
    const count    = isMobile ? 8 : 20;

    const cubes: Cube[] = Array.from({ length: count }, () => ({
      ox: Math.random() * (canvas.width  || 800),
      oy: Math.random() * (canvas.height || 600),
      x:  0, y: 0,
      size:  10 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.004,
      alpha: 0.06 + Math.random() * 0.10,
    }));

    // Mouse parallax via GSAP quickTo for smooth damping
    const mx = gsap.quickTo(mouse.current, "x", { duration: 0.8, ease: "power2.out" });
    const my = gsap.quickTo(mouse.current, "y", { duration: 0.8, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      mx(e.clientX / window.innerWidth);
      my(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let time = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const parallaxX = (mouse.current.x - 0.5) * 24;
      const parallaxY = (mouse.current.y - 0.5) * 14;

      cubes.forEach((c) => {
        c.x = c.ox + Math.sin(time * c.speed + c.phase) * 14 + parallaxX;
        c.y = c.oy + Math.cos(time * c.speed * 0.8 + c.phase) * 9 + parallaxY;
        drawIsoCube(ctx, c.x, c.y, c.size, c.alpha);
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",      resize);
      window.removeEventListener("mousemove",   onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55, zIndex: 0 }}
    />
  );
}
