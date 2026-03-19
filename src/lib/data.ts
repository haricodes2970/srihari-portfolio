// ============================================================
// PORTFOLIO DATA — srihari-portfolio
// All content lives here. Edit this file to update the site.
// ============================================================

import type { Project, Skill, Hobby } from "@/types";

// ── PROJECTS (S → B order) ────────────────────────────────
export const projects: Project[] = [
  {
    id: "deepfake",
    num: "001",
    rank: "S",
    title: "Deepfake Detection + Perpetrator Tracking System",
    overview:
      "A two-phase AI forensic pipeline operating at the intersection of computer vision, signal processing, unsupervised clustering, and distributed systems engineering.",
    detail: `Phase 1 builds an offline forensic pipeline that analyzes any video file and outputs: a manipulation probability score, fake-region heatmaps via Grad-CAM++, face identity clusters via ArcFace + HDBSCAN, and a suspected perpetrator network graph via NetworkX + Neo4j.\n\nPhase 2 scales this into a real-time social media monitoring system. Apache Kafka handles event streaming, Redis caches hot identities, Kubernetes orchestrates the detection pods, and FastAPI exposes the forensic endpoints.\n\nWhy it's S-rank: It combines 5 distinct engineering disciplines into a single coherent, production-grade pipeline. Few student projects operate at this architectural depth.`,
    tech: ["PyTorch 2.2", "EfficientNet-B2", "ArcFace", "MTCNN", "Grad-CAM++", "HDBSCAN", "NetworkX", "Neo4j", "FastAPI", "Docker", "Apache Kafka", "Redis", "Kubernetes"],
    github: "https://github.com/haricodes2970",
    githubLabel: "Private — View GitHub Profile",
  },
  {
    id: "vtu",
    num: "002",
    rank: "S",
    title: "VTU Smart Scheduler Chatbot",
    overview:
      "An end-to-end RAG system that transforms how VTU students access exam schedules and circulars — from 10 minutes of PDF hunting to under 5 seconds.",
    detail: `The system auto-scrapes the VTU website on a 6-hour cron, extracts text from PDFs, runs spaCy NLP to identify schedule entities, converts them into vector embeddings stored in Pinecone, and retrieves them semantically when a student asks a question.\n\nLangChain routes the query to Groq's Llama 3, which generates a structured, human-readable answer. A PostgreSQL-backed notification system pushes Email and Telegram alerts the moment a new circular is indexed.\n\nWhy it's S-rank: 12 integrated components, ~147 hours of engineering, and a full production deployment pipeline.`,
    tech: ["Python", "FastAPI", "LangChain", "Groq Llama 3", "Pinecone", "PostgreSQL", "spaCy", "BeautifulSoup", "React", "Tailwind CSS", "Docker"],
    note: "⚠ Repo and deployment pending. Links will be updated post-launch.",
  },
  {
    id: "bookyourevent",
    num: "003",
    rank: "A",
    title: "BookYourEvent",
    overview:
      "A full-stack multi-role venue booking platform handling the complete lifecycle from discovery to payment to in-app communication.",
    detail: `Three roles define the architecture: Bookers browse and filter venues, place instant bookings or competitive bids, pay via Razorpay, and message venue owners in-app. Venue Owners list spaces and manage media via Cloudinary. Admins approve venues and monitor platform-wide stats.\n\nAuth is handled via OTP-verified email (Nodemailer) and Google OAuth. The booking lifecycle — pending → confirmed → completed → reviewed — is automated with server-side state management.`,
    tech: ["React", "Vite", "Axios", "Node.js", "Express", "MongoDB", "Mongoose", "Razorpay", "Cloudinary", "Nodemailer", "Google OAuth"],
    github: "https://github.com/haricodes2970/BookYourEvent.git",
    live: "https://bookyourevnt.netlify.app/",
  },
  {
    id: "picy",
    num: "004",
    rank: "A",
    title: "Picy — Instant Image & Text Sharing",
    overview:
      "Zero-auth content sharing via custom URL. No login, no signup — just navigate, drop content, and share the link.",
    detail: `Navigate to picy.store/yourslug, drop an image or text, and the content is live immediately. Images upload to Cloudinary with a 24-hour auto-delete TTL. Text is stored in MongoDB Atlas with a 7-day TTL index.\n\nShipped solo in 3–4 hours, integrating 4 external services. Includes an admin dashboard, AdSense monetization, full PWA support, and SEO configuration. That's production-level thinking, not just a weekend hack.`,
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB Atlas", "Cloudinary", "Netlify", "Render"],
    github: "https://github.com/haricodes2970/PiCy-PictureCopy",
    live: "https://picy.netlify.app",
  },
  {
    id: "toki",
    num: "005",
    rank: "A",
    title: "Toki — AI Token Usage Tracker",
    overview:
      "A privacy-first Chrome extension giving real-time visibility into your AI spending — before you hit limits or waste tokens.",
    detail: `Toki injects a content script into ChatGPT, Claude, Gemini, and Grok. It tokenizes prompts client-side using js-tiktoken (WASM) — the same tokenizer OpenAI uses — and accumulates usage into chrome.storage.local. Zero data leaves the browser.\n\nA battery-style overlay shows current usage. A pre-send warning fires when a prompt would push daily tokens over configurable limits. The prompt optimizer analyzes patterns in your prompts and suggests trimmed versions.`,
    tech: ["TypeScript", "React", "Tailwind CSS", "Vite", "Manifest V3", "vite-plugin-web-extension", "Recharts", "js-tiktoken (WASM)", "chrome.storage API"],
    github: "https://github.com/haricodes2970/Toki",
    note: "Chrome extension — not deployable as a web app.",
  },
  {
    id: "overlap",
    num: "006",
    rank: "A",
    title: "OverlapOptimizer",
    overview:
      "Detects semantic overlap across educational video courses and generates a deduplicated, optimized playlist — saving learners hours.",
    detail: `Four pipeline stages: (1) Transcription via OpenAI Whisper. (2) BERTopic segments transcripts into topical chunks. (3) Sentence-transformer embeddings indexed in FAISS detect cross-course overlap. (4) A merged learning path with precise skip timestamps is generated.\n\nThe Next.js frontend renders an interactive timeline UI where learners see which segments overlap, preview merged playlists, and export to YouTube or local m3u8.`,
    tech: ["Next.js", "Tailwind CSS", "FastAPI", "OpenAI Whisper", "Sentence-Transformers", "BERTopic", "FAISS", "PostgreSQL", "S3", "Docker"],
    wip: true,
    note: "🚧 In active development. GitHub link coming soon.",
  },
  {
    id: "timetrack",
    num: "007",
    rank: "B",
    title: "AI TimeTrack",
    overview:
      "A cross-platform active-time tracker — logs real engagement time across AI browser tools and AI coding assistants combined.",
    detail: `Two components: a Chrome Extension monitors tab focus and idle state across ChatGPT, Claude, Grok, and Gemini. A VS Code Extension hooks into editor activity events for Cursor, Copilot, and similar tools.\n\nActive detection uses idle timeouts, cross-tab deduplication, and IndexedDB crash recovery snapshots. A unified React dashboard shows per-AI breakdowns, 7/30-day trends, and usage streaks. 100% local-first, no backend.`,
    tech: ["TypeScript", "Manifest V3", "VS Code Extension API", "Vite", "React", "Tailwind CSS", "Recharts", "IndexedDB"],
    wip: true,
    note: "🚧 Work in progress. GitHub link coming when stable.",
  },
];

// ── SKILLS ────────────────────────────────────────────────
export const skills: Skill[] = [
  { styleName: "Santoryu — AI Mastery",      name: "Python",                 category: "ai",       level: 92 },
  { styleName: "Haki — Deep Learning",        name: "PyTorch",                category: "ai",       level: 78 },
  { styleName: "Ittoryu — Agent Logic",       name: "LangChain",              category: "ai",       level: 82 },
  { styleName: "Nitoryu — Semantic Search",   name: "Pinecone / FAISS",       category: "ai",       level: 75 },
  { styleName: "Rokudo Dake — Prompt Craft",  name: "Prompt Engineering",     category: "ai",       level: 90 },
  { styleName: "Vision Strike — CV",          name: "Computer Vision",        category: "ai",       level: 72 },
  { styleName: "Santoryu — UI Mastery",       name: "React / Next.js",        category: "frontend", level: 86 },
  { styleName: "Speed Slash — Styling",       name: "Tailwind CSS",           category: "frontend", level: 90 },
  { styleName: "Chrome Blade — Extensions",   name: "TypeScript",             category: "frontend", level: 78 },
  { styleName: "Haki — System Control",       name: "Node.js / Express",      category: "backend",  level: 84 },
  { styleName: "Stone Cutting — API Design",  name: "FastAPI",                category: "backend",  level: 80 },
  { styleName: "Demon Slash — Data",          name: "MongoDB / PostgreSQL",   category: "backend",  level: 82 },
  { styleName: "Shadow Step — DevOps",        name: "Docker / Kubernetes",    category: "tools",    level: 68 },
  { styleName: "Spirit Wave — Integration",   name: "Cloudinary / Razorpay",  category: "tools",    level: 85 },
  { styleName: "Swordsmith — Version Control",name: "Git / GitHub",           category: "tools",    level: 88 },
];

// ── HOBBIES ───────────────────────────────────────────────
export const hobbies: Hobby[] = [
  { icon: "🎵", name: "Music",          desc: "Fuel for deep work" },
  { icon: "⚡", name: "Vibe Coding",    desc: "Shipping in flow state" },
  { icon: "⚔",  name: "Anime",          desc: "Otaku at heart" },
  { icon: "🎬", name: "Movies",         desc: "Stories that inspire" },
  { icon: "🔍", name: "New Tech",       desc: "Always first to explore" },
  { icon: "📜", name: "Ancient History",desc: "Civilizations that shaped us" },
  { icon: "🪔", name: "Indian Culture", desc: "Ancient stories & wisdom" },
];
