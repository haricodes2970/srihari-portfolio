// ============================================================
// AI TOOLKIT DATA — srihari-portfolio
// ============================================================

export type ToolCategory =
  | "coding"
  | "ai-ml"
  | "research"
  | "content"
  | "design"
  | "productivity";

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  domain: string;           // for clearbit logo
  description: string;
  useCase: string;          // how I personally use it
  superpower: string;       // one-liner killer feature
  tags: string[];
  link: string;
}

export interface ExperimentingTool {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  note: string;             // experimenting note
}

export const CATEGORY_META: Record<ToolCategory, { label: string; color: string; glow: string }> = {
  "coding":      { label: "Coding",      color: "#00d4ff", glow: "rgba(0,212,255,0.25)" },
  "ai-ml":       { label: "AI / ML",     color: "#a855f7", glow: "rgba(168,85,247,0.25)" },
  "research":    { label: "Research",    color: "#f59e0b", glow: "rgba(245,158,11,0.25)" },
  "content":     { label: "Content",     color: "#22c55e", glow: "rgba(34,197,94,0.25)" },
  "design":      { label: "Design",      color: "#ec4899", glow: "rgba(236,72,153,0.25)" },
  "productivity":{ label: "Productivity",color: "#f97316", glow: "rgba(249,115,22,0.25)" },
};

export const aiTools: AITool[] = [
  // ── Coding ──────────────────────────────────────────────
  {
    id: "cursor",
    name: "Cursor",
    tagline: "AI-native code editor",
    category: "coding",
    domain: "cursor.sh",
    description:
      "VS Code fork supercharged with GPT-4 / Claude in the editor itself. Multi-file edits, codebase-aware chat, and instant inline completions that actually understand context.",
    useCase:
      "My daily driver for coding. I use Cursor's Composer to refactor entire modules, write tests, and debug with full project context instead of copy-pasting snippets.",
    superpower: "Composer — multi-file AI edits in one shot",
    tags: ["editor", "autocomplete", "multi-file", "GPT-4", "Claude"],
    link: "https://cursor.sh",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    tagline: "Pair programmer in VS Code",
    category: "coding",
    domain: "github.com",
    description:
      "OpenAI Codex + GPT-4 baked into VS Code. Completes functions, writes docs, suggests test cases, and now has a chat panel for inline refactoring.",
    useCase:
      "Quick boilerplate and autocomplete when I'm outside Cursor. Great for Bash scripts and config files.",
    superpower: "Inline ghost text that finishes your thought",
    tags: ["autocomplete", "VS Code", "OpenAI", "boilerplate"],
    link: "https://github.com/features/copilot",
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Frontier reasoning & long-context AI",
    category: "coding",
    domain: "anthropic.com",
    description:
      "Anthropic's frontier model — best-in-class for nuanced reasoning, 200k context window, and code quality. Claude 3.5 Sonnet rewrites entire systems thoughtfully.",
    useCase:
      "Architecture discussions, code reviews, and any task needing long-form reasoning. I treat it like a senior engineer who's always available.",
    superpower: "200k context — paste your whole repo",
    tags: ["Claude 3.5", "long-context", "reasoning", "Anthropic"],
    link: "https://claude.ai",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "General-purpose AI assistant",
    category: "coding",
    domain: "openai.com",
    description:
      "The OG. GPT-4o with vision, canvas, real-time browsing, code interpreter, and DALL·E. Best all-rounder for quick tasks, research, and prototyping ideas.",
    useCase:
      "Quick Q&A, generating README drafts, code snippets for unfamiliar languages, and image generation with DALL·E.",
    superpower: "GPT-4o Vision — describe a screenshot, get code",
    tags: ["GPT-4o", "vision", "DALL·E", "browsing", "versatile"],
    link: "https://chatgpt.com",
  },
  // ── AI / ML ─────────────────────────────────────────────
  {
    id: "huggingface",
    name: "Hugging Face",
    tagline: "Open-source AI model hub",
    category: "ai-ml",
    domain: "huggingface.co",
    description:
      "The GitHub for machine learning. 400k+ models, datasets, and Spaces to demo ML apps. Transformers library powers most of the ecosystem.",
    useCase:
      "Finding fine-tuned models, running inference via the API, and deploying Gradio demos without a backend.",
    superpower: "Inference API — 400k models, one endpoint",
    tags: ["models", "datasets", "transformers", "Gradio", "open-source"],
    link: "https://huggingface.co",
  },
  {
    id: "replicate",
    name: "Replicate",
    tagline: "Run AI models via API",
    category: "ai-ml",
    domain: "replicate.com",
    description:
      "Cloud platform to run open-source AI models — Stable Diffusion, LLaMA, Whisper, etc. — via simple REST API. Pay per second of compute.",
    useCase:
      "Rapid prototyping with image generation and audio models without managing GPU infra.",
    superpower: "Any model, any GPU, one API call",
    tags: ["image gen", "Stable Diffusion", "API", "GPU-on-demand"],
    link: "https://replicate.com",
  },
  {
    id: "together-ai",
    name: "Together AI",
    tagline: "Fast open-source LLM inference",
    category: "ai-ml",
    domain: "together.ai",
    description:
      "Blazing-fast inference for open-source LLMs — LLaMA 3, Mixtral, Qwen. Up to 5× faster than OpenAI, fraction of the cost.",
    useCase:
      "Swapping expensive GPT-4 calls with LLaMA 3 70B for batch processing tasks. Significant cost savings.",
    superpower: "LLaMA 3 inference at 100+ tokens/sec",
    tags: ["LLaMA 3", "Mixtral", "fast inference", "cost-effective"],
    link: "https://together.ai",
  },
  {
    id: "langchain",
    name: "LangChain",
    tagline: "LLM application framework",
    category: "ai-ml",
    domain: "langchain.com",
    description:
      "The backbone for building LLM-powered apps — chains, agents, RAG pipelines, memory, and 100+ integrations. Python and JavaScript.",
    useCase:
      "Building RAG systems and multi-step LLM pipelines that connect to vector DBs and external APIs.",
    superpower: "LCEL — composable chains with streaming",
    tags: ["RAG", "agents", "chains", "Python", "LangSmith"],
    link: "https://langchain.com",
  },
  // ── Research ─────────────────────────────────────────────
  {
    id: "perplexity",
    name: "Perplexity",
    tagline: "AI search engine with citations",
    category: "research",
    domain: "perplexity.ai",
    description:
      "Real-time web search powered by LLMs. Every answer comes with numbered citations you can click through. No hallucinations on fresh information.",
    useCase:
      "First stop for technical research, library comparisons, and anything requiring current information beyond my LLM's training cutoff.",
    superpower: "Cited answers — trust but verify instantly",
    tags: ["search", "citations", "real-time", "research"],
    link: "https://perplexity.ai",
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    tagline: "AI research assistant by Google",
    category: "research",
    domain: "notebooklm.google.com",
    description:
      "Upload PDFs, docs, YouTube links — NotebookLM builds a grounded AI that only answers from your sources. No hallucinations outside your material.",
    useCase:
      "Deep-diving into research papers and documentation. Ask questions, get summaries grounded in the actual text.",
    superpower: "Source-grounded Q&A — zero hallucination zone",
    tags: ["PDF", "docs", "grounded AI", "Google", "research"],
    link: "https://notebooklm.google.com",
  },
  // ── Content ──────────────────────────────────────────────
  {
    id: "eleven-labs",
    name: "ElevenLabs",
    tagline: "Ultra-realistic AI voice synthesis",
    category: "content",
    domain: "elevenlabs.io",
    description:
      "State-of-the-art text-to-speech and voice cloning. 30-second voice clone, 29 languages, emotionally expressive narration. Used in major studios.",
    useCase:
      "Voiceovers for demo videos and prototyping voice interfaces without hiring voice actors.",
    superpower: "Voice clone from 30 seconds of audio",
    tags: ["TTS", "voice clone", "29 languages", "audio API"],
    link: "https://elevenlabs.io",
  },
  {
    id: "runway",
    name: "Runway",
    tagline: "AI video generation & editing",
    category: "content",
    domain: "runwayml.com",
    description:
      "Gen-2 and Gen-3 video generation — text to video, image to video, video inpainting. Professional film-quality outputs with motion brush controls.",
    useCase:
      "Creating short demo clips and visual concepts without filming anything. Backgrounds, transitions, b-roll.",
    superpower: "Motion Brush — animate specific parts of an image",
    tags: ["video gen", "Gen-3", "inpainting", "text-to-video"],
    link: "https://runwayml.com",
  },
  {
    id: "suno",
    name: "Suno",
    tagline: "AI music generation from text",
    category: "content",
    domain: "suno.com",
    description:
      "Full song generation from a text prompt — vocals, instruments, lyrics, production. 2-minute songs in 30 seconds. Uncannily good.",
    useCase:
      "Background music for demos and projects. Describe a vibe, get a track. Replaces hours of royalty-free hunting.",
    superpower: "Full produced song from a 10-word prompt",
    tags: ["music gen", "vocals", "lyrics", "audio", "creative"],
    link: "https://suno.com",
  },
  // ── Design ──────────────────────────────────────────────
  {
    id: "midjourney",
    name: "Midjourney",
    tagline: "Highest quality AI image generation",
    category: "design",
    domain: "midjourney.com",
    description:
      "The artistic benchmark for AI image generation. V6 produces photorealistic and painterly art indistinguishable from human work. Discord-based workflow.",
    useCase:
      "Concept art, portfolio visuals, UI mood boards, and any time the image quality needs to be impeccable.",
    superpower: "V6 — photorealism that fools photographers",
    tags: ["image gen", "V6", "art", "Discord", "photorealistic"],
    link: "https://midjourney.com",
  },
  {
    id: "framer",
    name: "Framer",
    tagline: "AI-powered website builder",
    category: "design",
    domain: "framer.com",
    description:
      "No-code/low-code website builder with AI page generation, advanced animations, and CMS. Generates entire responsive pages from a text description.",
    useCase:
      "Rapid landing page prototypes before committing to full Next.js builds. Clients love the speed.",
    superpower: "AI generates a full page from one sentence",
    tags: ["no-code", "animations", "CMS", "landing page", "AI gen"],
    link: "https://framer.com",
  },
  // ── Productivity ─────────────────────────────────────────
  {
    id: "notion-ai",
    name: "Notion AI",
    tagline: "AI-native workspace",
    category: "productivity",
    domain: "notion.so",
    description:
      "Notion with AI writing, summarization, autofill, and Q&A built in. Turns your knowledge base into a searchable AI assistant.",
    useCase:
      "Project planning, sprint notes, and brainstorming. AI autofills templates and summarizes long docs instantly.",
    superpower: "AI Q&A over your entire Notion workspace",
    tags: ["notes", "docs", "AI writing", "autofill", "workspace"],
    link: "https://notion.so",
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    tagline: "AI UI component generator",
    category: "productivity",
    domain: "v0.dev",
    description:
      "Vercel's AI that generates React + shadcn/ui components from text descriptions. Production-ready Tailwind code, deployed instantly.",
    useCase:
      "Scaffolding UI components fast. Describe a data table or dashboard card, copy the code, tweak and ship.",
    superpower: "React + Tailwind component from a sentence",
    tags: ["React", "shadcn", "Tailwind", "UI gen", "Vercel"],
    link: "https://v0.dev",
  },
];

export const experimentingTools: ExperimentingTool[] = [
  {
    id: "whisper",
    name: "Whisper",
    tagline: "OpenAI speech recognition",
    domain: "openai.com",
    note: "Building a local transcription pipeline. Accuracy on Indian English accents is surprising.",
  },
  {
    id: "elevenlabs-exp",
    name: "ElevenLabs",
    tagline: "Voice cloning experiments",
    domain: "elevenlabs.io",
    note: "Experimenting with real-time voice conversion for interactive AI demos.",
  },
  {
    id: "runway-exp",
    name: "Runway Gen-3",
    tagline: "Video generation research",
    domain: "runwayml.com",
    note: "Testing motion brush for animating UI mockups into short product demos.",
  },
  {
    id: "suno-exp",
    name: "Suno v4",
    tagline: "Music for project demos",
    domain: "suno.com",
    note: "Generating background tracks for portfolio demos. v4 handles genre blending well.",
  },
  {
    id: "udio",
    name: "Udio",
    tagline: "AI music generation",
    domain: "udio.com",
    note: "Comparing against Suno for instrumental-only tracks. Different aesthetic.",
  },
  {
    id: "notebooklm-exp",
    name: "NotebookLM",
    tagline: "Deep research tool",
    domain: "notebooklm.google.com",
    note: "Using it to synthesize 20+ research papers for an AI project. Game-changer.",
  },
];
