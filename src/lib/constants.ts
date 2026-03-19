// ============================================================
// CONSTANTS — srihari-portfolio
// ============================================================

export const SITE_NAME = "Srihari Prasad S";
export const SITE_TAGLINE = "You Think, I Make It Real";
export const SITE_SUBTITLE = "Thinking is Limitless";
export const SITE_EMAIL = "srihariprasad7078@gmail.com";
export const GITHUB_URL = "https://github.com/haricodes2970";
export const LINKEDIN_URL = "https://linkedin.com/in/haricodes2970";

export const NAV_ITEMS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Skills",       href: "/skills" },
  { label: "Projects",     href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Hobbies",      href: "/hobbies" },
  { label: "Contact",      href: "/contact" },
] as const;

export const PAGE_ORDER = [
  "/",
  "/about",
  "/skills",
  "/projects",
  "/certificates",
  "/hobbies",
  "/contact",
] as const;

export const RANK_COLORS = {
  S: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  A: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  B: {
    bg: "bg-green-core/10",
    text: "text-green-mid",
    border: "border-green-core/20",
  },
} as const;
