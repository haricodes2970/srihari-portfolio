// ============================================================
// GLOBAL TYPES — srihari-portfolio
// ============================================================

export type Rank = "S" | "A" | "B";
export type SkillCategory = "ai" | "frontend" | "backend" | "tools";
export type Mode = "zoro" | "calm";

export interface Project {
  id: string;
  num: string;
  rank: Rank;
  title: string;
  overview: string;
  detail: string;
  tech: string[];
  github?: string;
  githubLabel?: string;
  live?: string;
  note?: string;
  wip?: boolean;
}

export interface Skill {
  styleName: string;
  name: string;
  category: SkillCategory;
  level: number;       // 0–100
  why: string;         // why this %, honest narrative
  tools: string[];     // specific libs / frameworks within this skill
  usedIn: string[];    // project names where applied
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  image?: string;
  link?: string;
}

export interface Hobby {
  icon: string;
  name: string;
  desc: string;
}

export interface NavItem {
  label: string;
  href: string;
}
