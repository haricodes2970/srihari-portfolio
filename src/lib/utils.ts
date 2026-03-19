// ============================================================
// UTILS — srihari-portfolio
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes cleanly */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Delay helper for async/await flows */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Clamp a number between min and max */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
