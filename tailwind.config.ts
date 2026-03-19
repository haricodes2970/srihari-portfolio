import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds (CSS-var driven for calm-mode swap) ──
        void:    "var(--color-void,    #040a06)",
        deep:    "var(--color-deep,    #060d08)",
        surface: "var(--color-surface, #0a1510)",
        card:    "var(--color-card,    #0d1a12)",
        "card-h":"var(--color-card-h,  #112018)",

        // ── Accent ───────────────────────────────────────────
        green: {
          core:  "var(--color-accent,       #00ff6a)",
          mid:   "var(--color-accent-mid,   #1aff7a)",
          dim:   "var(--color-accent-dim,   #00c44f)",
          dark:  "var(--color-accent-dark,  #007a30)",
          ghost: "var(--color-accent-ghost, rgba(0,255,106,0.06))",
          glow:  "var(--color-accent-glow,  rgba(0,255,106,0.18))",
        },

        // ── Text ─────────────────────────────────────────────
        text: {
          primary:   "var(--color-text-primary,   #dff2e8)",
          secondary: "var(--color-text-secondary, #7ab890)",
          muted:     "var(--color-text-muted,     #6a9a7e)", // was #3a6648 — raised
          dim:       "var(--color-text-dim,       #4a7a60)", // was #1c3326 — raised
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        ui:      ["var(--font-rajdhani)", "sans-serif"],
        mono:    ["var(--font-share-tech-mono)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "sword-rise": "swordRise 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "slash-run":  "slashRun 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
        "blink":      "blink 1.4s ease infinite",
        "float":      "float 3s ease-in-out infinite",
        "wip-pulse":  "wipPulse 2s ease infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { opacity: "0.5", transform: "translate(-50%,-50%) scale(1)" },
          "50%":     { opacity: "1",   transform: "translate(-50%,-50%) scale(1.06)" },
        },
        swordRise: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slashRun: {
          "0%":   { left: "-105%", opacity: "0" },
          "40%":  { opacity: "1" },
          "100%": { left: "105%",  opacity: "0" },
        },
        blink: {
          "0%,100%": { opacity: "0.3" },
          "50%":     { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        wipPulse: {
          "0%,100%": { opacity: "0.6" },
          "50%":     { opacity: "1" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,255,106,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,106,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "64px 64px",
      },
    },
  },
  plugins: [],
};

export default config;
