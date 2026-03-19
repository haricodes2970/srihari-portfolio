"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

const TRIPLE_LINES = [
  { top: "30%", rotate: "-10deg", delay: 0    },
  { top: "50%", rotate: "-4deg",  delay: 0.12 },
  { top: "70%", rotate:  "4deg",  delay: 0.24 },
];

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-6 sm:right-10 z-[9000]
                     font-mono text-[9px] tracking-[3px] uppercase
                     text-green-core bg-card border border-green-core/20
                     px-5 py-3 rounded-sm pointer-events-none"
          style={{ boxShadow: "0 0 20px rgba(0,255,106,0.1)" }}
        >
          ⚔ SANTORYU — THREE SWORD STYLE ⚔
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EasterEgg() {
  const easterEggActive  = useUIStore((s) => s.easterEggActive);
  const triggerEasterEgg = useUIStore((s) => s.triggerEasterEgg);
  const [toast, setToast] = useState(false);

  // Listen for Z key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "z" || e.key === "Z") {
        triggerEasterEgg();
        setToast(true);
        setTimeout(() => setToast(false), 2400);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerEasterEgg]);

  return (
    <>
      {/* Triple slash + flash */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            key="easter-egg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.55 }}
            className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden"
          >
            {/* Screen flash */}
            <motion.div
              initial={{ opacity: 0.08 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-green-core"
            />

            {/* Three slash lines */}
            {TRIPLE_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ left: "-105%", opacity: 0 }}
                animate={{ left: "105%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.5,
                  delay: line.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-full h-[3px]"
                style={{
                  top: line.top,
                  transform: `rotate(${line.rotate})`,
                  background:
                    "linear-gradient(90deg, transparent 0%, #00ff6a 30%, #fff 50%, #00ff6a 70%, transparent 100%)",
                  boxShadow: "0 0 30px #00ff6a, 0 0 60px rgba(0,255,106,0.4)",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg hint — shows once on first load, fades out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80]
                   pointer-events-none"
      >
        <motion.p
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: 3, times: [0, 0.1, 0.8, 1] }}
          className="font-mono text-[8px] tracking-[4px] uppercase text-text-dim
                     bg-card border border-green-core/8 px-5 py-2 rounded-sm
                     whitespace-nowrap"
        >
          Press Z — Three Sword Style
        </motion.p>
      </motion.div>

      {/* Toast notification */}
      <Toast visible={toast} />
    </>
  );
}
