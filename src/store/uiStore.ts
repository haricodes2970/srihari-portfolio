// ============================================================
// ZUSTAND UI STORE — srihari-portfolio
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Mode } from "@/types";

interface UIState {
  // Mode
  mode: Mode;
  toggleMode: () => void;

  // Loading
  isLoading: boolean;
  setLoading: (v: boolean) => void;

  // Easter egg
  easterEggActive: boolean;
  triggerEasterEgg: () => void;

  // Slash effect
  slashActive: boolean;
  triggerSlash: () => void;

  // Modal
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;

  // Mobile menu
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // ── Mode ──────────────────────────────────────────
      mode: "zoro",
      toggleMode: () =>
        set((s) => ({ mode: s.mode === "zoro" ? "calm" : "zoro" })),

      // ── Loading ───────────────────────────────────────
      isLoading: true,
      setLoading: (v) => set({ isLoading: v }),

      // ── Easter egg ────────────────────────────────────
      easterEggActive: false,
      triggerEasterEgg: () => {
        set({ easterEggActive: true });
        setTimeout(() => set({ easterEggActive: false }), 800);
      },

      // ── Slash ─────────────────────────────────────────
      slashActive: false,
      triggerSlash: () => {
        if (get().slashActive) return;
        set({ slashActive: true });
        setTimeout(() => set({ slashActive: false }), 700);
      },

      // ── Modal ─────────────────────────────────────────
      activeModal: null,
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),

      // ── Mobile menu ───────────────────────────────────
      menuOpen: false,
      setMenuOpen: (v) => set({ menuOpen: v }),
    }),
    {
      name: "srihari-portfolio-ui",
      // Only persist mode preference
      partialize: (s) => ({ mode: s.mode }),
    }
  )
);
