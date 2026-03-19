"use client";

import { useEffect, useRef, useState } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;      // 0→1, decreasing
  size: number;
  hue: number;       // 130–170 = emerald → cyan-green
  star: boolean;     // true → draw 4-point star instead of circle
}

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const rafId   = useRef<number>(0);

  const sparkles      = useRef<Sparkle[]>([]);
  const lastSpawnTime = useRef<number>(0);
  const hoveringRef   = useRef(false);

  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas to fill viewport ─────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Spawn sparkle particles ─────────────────────────────
    const spawn = (x: number, y: number, count = 2, burst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst
          ? 1.2 + Math.random() * 2.8
          : 0.3 + Math.random() * 1.2;
        sparkles.current.push({
          x:    x + (Math.random() - 0.5) * 10,
          y:    y + (Math.random() - 0.5) * 10,
          vx:   Math.cos(angle) * speed,
          vy:   Math.sin(angle) * speed - (burst ? 0.8 : 0.5),
          life: 1,
          size: burst
            ? 2 + Math.random() * 3
            : 1.2 + Math.random() * 2.2,
          hue:  130 + Math.random() * 45,
          star: Math.random() > 0.55,
        });
      }
    };

    // ── Draw a 4-point star ─────────────────────────────────
    const drawStar = (
      x: number, y: number, r: number,
      alpha: number, hue: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      for (let pt = 0; pt < 4; pt++) {
        const outerA = (pt / 4) * Math.PI * 2;
        const innerA = outerA + Math.PI / 4;
        if (pt === 0) ctx.moveTo(Math.cos(outerA) * r, Math.sin(outerA) * r);
        else          ctx.lineTo(Math.cos(outerA) * r, Math.sin(outerA) * r);
        ctx.lineTo(Math.cos(innerA) * r * 0.35, Math.sin(innerA) * r * 0.35);
      }
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha})`;
      ctx.shadowBlur  = r * 6;
      ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${alpha * 0.8})`;
      ctx.fill();
      ctx.restore();
    };

    // ── Mouse / click handlers ──────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 3.5}px, ${e.clientY - 3.5}px)`;
      }

      const now = performance.now();
      if (now - lastSpawnTime.current > 32) {
        spawn(e.clientX, e.clientY, hoveringRef.current ? 3 : 2);
        lastSpawnTime.current = now;
      }
    };

    const onClick = (e: MouseEvent) => {
      setClicked(true);
      spawn(e.clientX, e.clientY, 18, true);
      if (slashRef.current) {
        slashRef.current.style.transform =
          `translate(${e.clientX - 20}px, ${e.clientY - 10}px)`;
      }
      setTimeout(() => setClicked(false), 150);
    };

    // ── Hover detection ─────────────────────────────────────
    const onEnter = () => { setHovering(true);  hoveringRef.current = true;  };
    const onLeave = () => { setHovering(false); hoveringRef.current = false; };

    const bindHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    bindHover();

    // ── Main animation loop ─────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth ring follow
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const sz = hoveringRef.current ? 44 : 28;
        ringRef.current.style.transform =
          `translate(${ringPos.current.x - sz / 2}px, ${ringPos.current.y - sz / 2}px)`;
        ringRef.current.style.width   = `${sz}px`;
        ringRef.current.style.height  = `${sz}px`;
        ringRef.current.style.opacity = hoveringRef.current ? "0.25" : "0.45";
      }

      // Sparkle physics + render
      sparkles.current = sparkles.current.filter((s) => {
        s.life -= 0.038;
        if (s.life <= 0) return false;

        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.022;   // gravity
        s.vx *= 0.975;   // friction

        const a  = s.life * 0.9;
        const sz = s.size * s.life;

        if (s.star) {
          drawStar(s.x, s.y, sz * 2.2, a, s.hue);
        } else {
          // Radial glow
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, sz * 4);
          g.addColorStop(0,   `hsla(${s.hue}, 100%, 80%, ${a})`);
          g.addColorStop(0.4, `hsla(${s.hue}, 100%, 55%, ${a * 0.35})`);
          g.addColorStop(1,   `hsla(${s.hue}, 100%, 50%, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, sz * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(s.x, s.y, sz * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 100%, 92%, ${a})`;
          ctx.fill();
        }

        return true;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("resize",    resize);
      cancelAnimationFrame(rafId.current);
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  return (
    <>
      {/* Sparkle canvas — screen blend so it only adds light */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9996]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]
                   w-[7px] h-[7px] rounded-full bg-green-core"
        style={{ boxShadow: "0 0 12px #00ff6a, 0 0 24px rgba(0,255,106,0.35)" }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]
                   rounded-full border border-green-core"
        style={{
          width: 28, height: 28,
          opacity: 0.45,
          boxShadow: hovering
            ? "0 0 16px rgba(0,255,106,0.25), inset 0 0 8px rgba(0,255,106,0.1)"
            : "none",
          transition: "box-shadow 0.2s ease",
        }}
      />

      {/* Click slash */}
      <div
        ref={slashRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]
                   transition-opacity duration-150"
        style={{ opacity: clicked ? 1 : 0 }}
      >
        <div
          className="w-9 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00ff6a, #fff, #00ff6a, transparent)",
            boxShadow: "0 0 10px #00ff6a, 0 0 20px rgba(0,255,106,0.4)",
            transform: "rotate(-35deg)",
          }}
        />
        <div
          className="w-6 h-[1.5px] rounded-full mt-1 ml-1.5"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00ff6a, transparent)",
            transform: "rotate(20deg)",
            opacity: 0.65,
          }}
        />
      </div>
    </>
  );
}
