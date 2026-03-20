"use client";

// ============================================================
// DATA MESH CANVAS — Projects section background
// Floating network nodes + connection lines, cursor attraction
// Dense on desktop, sparse on mobile
// ============================================================

import { useEffect, useRef } from "react";

interface Node {
  x:  number; y:  number;
  vx: number; vy: number;
  r:  number;  // radius
}

const MAX_DIST = 160;

export default function DataMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });

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

    const isMobile  = window.innerWidth < 768;
    const nodeCount = isMobile ? 22 : 65;

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x:  Math.random() * (canvas.width  || 800),
      y:  Math.random() * (canvas.height || 700),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  1.5 + Math.random() * 1.5,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMouseMove,  { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave, { passive: true });

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions + cursor attraction
      nodes.forEach((n) => {
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const d  = Math.hypot(dx, dy);
        if (d < 180 && d > 1) {
          n.vx += (dx / d) * 0.015;
          n.vy += (dy / d) * 0.015;
        }
        // Damping
        n.vx *= 0.992;
        n.vy *= 0.992;
        n.x  += n.vx;
        n.y  += n.vy;
        // Bounce walls
        if (n.x < 0)               { n.x = 0;              n.vx *= -1; }
        if (n.x > canvas.width)    { n.x = canvas.width;   n.vx *= -1; }
        if (n.y < 0)               { n.y = 0;              n.vy *= -1; }
        if (n.y > canvas.height)   { n.y = canvas.height;  n.vy *= -1; }
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,255,106,${a})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,106,0.4)";
        ctx.shadowColor  = "rgba(0,255,106,0.5)";
        ctx.shadowBlur   = 4;
        ctx.fill();
        ctx.shadowBlur   = 0;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",      resize);
      canvas.removeEventListener("mousemove",   onMouseMove);
      canvas.removeEventListener("mouseleave",  onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.45, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
