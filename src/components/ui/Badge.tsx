// ============================================================
// BADGE — srihari-portfolio
// TODO: Rank badge (S/A/B) + WIP badge
// Uses: RANK_COLORS from constants
// Props: rank, wip
// ============================================================

"use client";

import type { Rank } from "@/types";

interface BadgeProps {
  rank?: Rank;
  wip?: boolean;
}

export default function Badge({ rank, wip }: BadgeProps) {
  // TODO: Implement with RANK_COLORS
  return <span>{rank || (wip ? "WIP" : "")}</span>;
}
