"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/uiStore";

const SLASH_LINES = [
  { top: "38%", rotate: "-6deg", delay: 0,    opacity: 1   },
  { top: "44%", rotate: "-3deg", delay: 0.08, opacity: 0.5 },
  { top: "56%", rotate: "-1deg", delay: 0.16, opacity: 0.25 },
];

export default function SwordSlash() {
  const pathname      = usePathname();
  const slashActive   = useUIStore((s) => s.slashActive);
  const triggerSlash  = useUIStore((s) => s.triggerSlash);

  // Trigger on every route change
  useEffect(() => {
    triggerSlash();
  }, [pathname, triggerSlash]);

  return (
    <AnimatePresence>
      {slashActive && (
        <motion.div
          key="slash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.45 }}
          className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden"
        >
          {SLASH_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ left: "-105%", opacity: 0 }}
              animate={{ left: "105%",  opacity: [0, line.opacity, 0] }}
              transition={{
                duration: 0.45,
                delay: line.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute w-full h-[2px]"
              style={{
                top: line.top,
                transform: `rotate(${line.rotate})`,
                background:
                  "linear-gradient(90deg, transparent 0%, #00ff6a 35%, #fff 50%, #00ff6a 65%, transparent 100%)",
                boxShadow: "0 0 20px #00ff6a, 0 0 40px rgba(0,255,106,0.3)",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
