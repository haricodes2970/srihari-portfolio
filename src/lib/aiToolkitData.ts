// ============================================================
// AI TOOLKIT DATA — task-based model
// Update this file every Sunday with new tools / tasks
// ============================================================

export type ToolCategory =
  | "coding"
  | "aiml"
  | "research"
  | "content"
  | "design"
  | "productivity";

export type PreferredFlag = boolean | "combo" | "exploring" | "partial";

export interface TaskTool {
  name:         string;
  by:           string;
  url:          string;
  logoDomain:   string;
  preferred:    PreferredFlag;
  whyGood:      string;
  keyStrengths: string[];
  tags:         string[];
}

export interface BonusTool {
  name:      string;
  url:       string;
  logoDomain: string;
}

export interface ToolkitTask {
  id:           number;
  task:         string;
  subtitle:     string;
  category:     ToolCategory;
  superpower:   string;
  tool1:        TaskTool;
  tool2:        TaskTool;
  bonus:        BonusTool[];
  specialNote:  string | null;
}

export interface ExperimentingTool {
  name:       string;
  by:         string;
  category:   string;
  url:        string;
  logoDomain: string;
  note:       string;
  status:     string;
}

export const CATEGORY_META: Record<
  ToolCategory,
  { label: string; darkColor: string; calmColor: string; glow: string }
> = {
  coding:      { label: "Coding & Dev",   darkColor: "#00d4ff", calmColor: "#7DD3FC", glow: "rgba(0,212,255,0.2)"   },
  aiml:        { label: "AI / ML",        darkColor: "#a855f7", calmColor: "#C4B5FD", glow: "rgba(168,85,247,0.2)"  },
  research:    { label: "Research",       darkColor: "#f59e0b", calmColor: "#FCD34D", glow: "rgba(245,158,11,0.2)"  },
  content:     { label: "Content",        darkColor: "#22c55e", calmColor: "#86EFAC", glow: "rgba(34,197,94,0.2)"   },
  design:      { label: "Design & Media", darkColor: "#ec4899", calmColor: "#F9A8D4", glow: "rgba(236,72,153,0.2)"  },
  productivity:{ label: "Productivity",   darkColor: "#f97316", calmColor: "#FDBA74", glow: "rgba(249,115,22,0.2)"  },
};

// ── 17 toolkit tasks ──────────────────────────────────────
export const toolkitTasks: ToolkitTask[] = [
  // ── CODING ─────────────────────────────────────────────
  {
    id: 1,
    task: "Code Writing / Autocompletion",
    subtitle: "Writing functions, boilerplate, and complex logic",
    category: "coding",
    superpower: "Production-ready code in a single conversation",
    tool1: {
      name: "Claude Opus", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "My go-to for writing functions, boilerplate, and complex logic. The reasoning depth is unmatched. Handles multi-file context and produces production-ready code with minimal iteration.",
      keyStrengths: ["Deep reasoning catches edge cases", "Multi-file context awareness", "Production-quality output on first try"],
      tags: ["reasoning", "multi-file", "production-ready"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "Quick inline completions and rapid prototyping. Fast autocomplete that understands code patterns well.",
      keyStrengths: ["Speed for simple completions", "Good pattern recognition", "Lightweight for quick tasks"],
      tags: ["fast", "autocomplete", "lightweight"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 2,
    task: "Code Debugging",
    subtitle: "Finding and fixing bugs systematically",
    category: "coding",
    superpower: "Zero to fix in one conversation",
    tool1: {
      name: "Claude Code", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "I paste stack traces and broken code — Claude Code traces the root cause systematically. Thinks step-by-step through bugs, doesn't just patch symptoms.",
      keyStrengths: ["Systematic root cause analysis", "Step-by-step debugging", "Fixes the real problem, not the symptom"],
      tags: ["debugging", "root-cause", "systematic"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "Quick bug spotting for simpler issues. Good at pattern-matching common errors.",
      keyStrengths: ["Fast for simple bugs", "Recognizes common error patterns", "Good for quick patches"],
      tags: ["quick-fix", "pattern-matching", "common-errors"],
    },
    bonus: [
      { name: "Antigravity", url: "https://antigravity.dev", logoDomain: "antigravity.dev" },
      { name: "OpenCode",    url: "https://opencode.ai",    logoDomain: "opencode.ai"    },
    ],
    specialNote: null,
  },
  {
    id: 3,
    task: "Code Review / Refactoring",
    subtitle: "Improving code quality and architecture",
    category: "coding",
    superpower: "Cleaner code without the ego",
    tool1: {
      name: "Claude", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "I use Claude to review PRs and suggest cleaner architecture. Gives thoughtful refactoring suggestions with clear reasoning.",
      keyStrengths: ["Architectural insight", "Explains WHY to refactor", "Suggests cleaner patterns"],
      tags: ["code-review", "architecture", "clean-code"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For quick refactor passes on smaller files. Solid at recognizing code smells.",
      keyStrengths: ["Fast refactoring", "Spots code smells", "Good for small files"],
      tags: ["refactor", "code-smells", "quick"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 4,
    task: "Terminal / CLI Assistance",
    subtitle: "Running commands, scripting, and CLI debugging",
    category: "coding",
    superpower: "Never Google a bash command again",
    tool1: {
      name: "Claude Code", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "My terminal companion for complex bash commands, scripting, and debugging CLI errors. Understands system context and provides safe, tested commands.",
      keyStrengths: ["Complex command generation", "System-aware", "Safe and tested commands"],
      tags: ["terminal", "bash", "CLI", "scripting"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "Handy for quick one-liner commands. Fast command generation.",
      keyStrengths: ["Quick one-liners", "Fast generation", "Common commands"],
      tags: ["quick", "one-liners", "commands"],
    },
    bonus: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot", logoDomain: "github.com" },
    ],
    specialNote: null,
  },

  // ── AI / ML ─────────────────────────────────────────────
  {
    id: 5,
    task: "Data Preprocessing & Analysis",
    subtitle: "Cleaning, exploring, and visualizing datasets",
    category: "aiml",
    superpower: "From messy CSV to clean insights in minutes",
    tool1: {
      name: "Julius AI", by: "Julius", url: "https://julius.ai", logoDomain: "julius.ai",
      preferred: true,
      whyGood: "I upload datasets and Julius handles cleaning, visualization, and analysis interactively. Purpose-built for data work — charts, stats, and insights in seconds.",
      keyStrengths: ["Upload and analyze instantly", "Auto-generates visualizations", "Built specifically for data"],
      tags: ["data", "visualization", "analysis", "CSV"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For writing pandas/numpy preprocessing scripts. Good at generating data transformation code.",
      keyStrengths: ["Generates pandas code", "Data transformation scripts", "NumPy workflows"],
      tags: ["pandas", "numpy", "scripts"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 6,
    task: "Prompt Engineering",
    subtitle: "Crafting and testing prompts for LLMs",
    category: "aiml",
    superpower: "Getting AI to do exactly what you mean",
    tool1: {
      name: "Grok", by: "xAI", url: "https://grok.x.ai", logoDomain: "x.ai",
      preferred: true,
      whyGood: "I test and iterate prompts in Grok for its unfiltered, direct feedback style. Real-time web context makes prompt testing more grounded.",
      keyStrengths: ["Unfiltered feedback on prompts", "Real-time web awareness", "Direct and honest responses"],
      tags: ["prompts", "iteration", "real-time", "unfiltered"],
    },
    tool2: {
      name: "Gemini Gems", by: "Google", url: "https://gemini.google.com", logoDomain: "google.com",
      preferred: false,
      whyGood: "Custom Gems let me create specialized prompt templates. Great for building reusable prompt workflows.",
      keyStrengths: ["Custom prompt templates", "Reusable workflows", "Google ecosystem integration"],
      tags: ["gems", "templates", "reusable", "workflows"],
    },
    bonus: [],
    specialNote: null,
  },

  // ── RESEARCH ─────────────────────────────────────────────
  {
    id: 7,
    task: "Research Paper Summarization",
    subtitle: "Understanding academic papers quickly",
    category: "research",
    superpower: "20-page paper → 2-minute understanding",
    tool1: {
      name: "Grok", by: "xAI", url: "https://grok.x.ai", logoDomain: "x.ai",
      preferred: true,
      whyGood: "I feed papers into Grok for quick, no-fluff summaries. Cuts through academic jargon and extracts key findings fast.",
      keyStrengths: ["No-fluff summaries", "Cuts through jargon", "Extracts key findings"],
      tags: ["papers", "summaries", "academic", "jargon-free"],
    },
    tool2: {
      name: "Perplexity", by: "Perplexity AI", url: "https://perplexity.ai", logoDomain: "perplexity.ai",
      preferred: false,
      whyGood: "For finding and summarizing papers with source citations. Search + summarize in one step with linked sources.",
      keyStrengths: ["Finds papers automatically", "Inline source citations", "Search + summarize in one step"],
      tags: ["search", "citations", "sources", "discovery"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 8,
    task: "Learning New Concepts",
    subtitle: "Studying frameworks, algorithms, and math",
    category: "research",
    superpower: "A patient tutor available 24/7",
    tool1: {
      name: "ChatGPT (Custom GPTs)", by: "OpenAI", url: "https://chat.openai.com", logoDomain: "openai.com",
      preferred: true,
      whyGood: "I use Custom GPTs tuned for specific subjects like DSA, ML theory, and system design. Pre-configured learning assistants that remember my level.",
      keyStrengths: ["Subject-specific Custom GPTs", "Remembers my level", "Pre-configured for DSA/ML/System Design"],
      tags: ["custom-gpts", "DSA", "ML-theory", "personalized"],
    },
    tool2: {
      name: "Claude", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: false,
      whyGood: "Deep explanations when I need to truly understand a concept. Patient, detailed teaching style with great analogies.",
      keyStrengths: ["Deep explanations", "Great analogies", "Patient teaching"],
      tags: ["learning", "explanations", "analogies", "deep-dive"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 9,
    task: "Documentation Reading",
    subtitle: "Navigating API docs and library references",
    category: "research",
    superpower: "Skip the docs, ask the expert",
    tool1: {
      name: "Claude", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "I paste API docs and ask Claude to explain endpoints, params, and patterns. Breaks down complex documentation into actionable steps.",
      keyStrengths: ["Explains complex APIs clearly", "Actionable steps", "Handles long doc context"],
      tags: ["API-docs", "endpoints", "long-context", "actionable"],
    },
    tool2: {
      name: "ChatGPT", by: "OpenAI", url: "https://chat.openai.com", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For quick doc lookups and framework-specific questions. Wide knowledge of popular libraries and APIs.",
      keyStrengths: ["Quick lookups", "Broad library knowledge", "Framework-specific"],
      tags: ["quick", "libraries", "frameworks", "lookups"],
    },
    bonus: [],
    specialNote: null,
  },

  // ── CONTENT ──────────────────────────────────────────────
  {
    id: 10,
    task: "Technical Writing / Documentation",
    subtitle: "READMEs, reports, LaTeX docs, and technical content",
    category: "content",
    superpower: "Docs that developers actually read",
    tool1: {
      name: "Claude (docx Skill)", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "I use Claude's document creation skill for READMEs, LaTeX reports, and technical docs. Produces professionally formatted, well-structured documents.",
      keyStrengths: ["Professional formatting", "LaTeX support", "Well-structured output"],
      tags: ["README", "LaTeX", "reports", "docx", "formatting"],
    },
    tool2: {
      name: "Codex", by: "OpenAI", url: "https://openai.com/codex", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For generating documentation comments and inline docs. Good at JSDoc, docstrings, and API documentation.",
      keyStrengths: ["Inline code documentation", "JSDoc generation", "API doc templates"],
      tags: ["JSDoc", "docstrings", "inline-docs", "API"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 11,
    task: "Resume / Portfolio Building",
    subtitle: "CVs, cover letters, and portfolio content",
    category: "content",
    superpower: "Land interviews with AI-crafted applications",
    tool1: {
      name: "Claude Skill", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: true,
      whyGood: "Built my entire portfolio and LaTeX resume with Claude's specialized skills. End-to-end CV building with design sense and content polish.",
      keyStrengths: ["Full portfolio generation", "LaTeX resume crafting", "Design + content together"],
      tags: ["resume", "portfolio", "LaTeX", "CV", "cover-letter"],
    },
    tool2: {
      name: "Custom GPT", by: "OpenAI", url: "https://chat.openai.com", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For tailoring resume bullet points to specific job descriptions. Good at ATS optimization and keyword matching.",
      keyStrengths: ["ATS optimization", "Job-specific tailoring", "Keyword matching"],
      tags: ["ATS", "tailored", "job-matching", "keywords"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 12,
    task: "LinkedIn / Social Media Content",
    subtitle: "Posts, professional branding, and visuals",
    category: "content",
    superpower: "Research + visuals in one workflow",
    tool1: {
      name: "Grok", by: "xAI", url: "https://grok.x.ai", logoDomain: "x.ai",
      preferred: "combo",
      whyGood: "I use Grok to research trending topics and draft content with real-time context. Real-time X/Twitter integration makes content timely and relevant.",
      keyStrengths: ["Real-time trend awareness", "Content drafting", "X/Twitter integration"],
      tags: ["trends", "drafting", "real-time", "LinkedIn"],
    },
    tool2: {
      name: "Gemini", by: "Google", url: "https://gemini.google.com", logoDomain: "google.com",
      preferred: "combo",
      whyGood: "I generate thumbnails, banners, and post visuals with Gemini's image generation. Text + image generation in one tool for complete social posts.",
      keyStrengths: ["Image generation for posts", "Thumbnail creation", "Text + visual in one tool"],
      tags: ["images", "thumbnails", "banners", "visuals"],
    },
    bonus: [],
    specialNote: "COMBO — Grok handles research and text drafting, Gemini handles image generation. I use them together as a complete social media workflow.",
  },

  // ── DESIGN ───────────────────────────────────────────────
  {
    id: 13,
    task: "UI/UX Design / Prototyping",
    subtitle: "Wireframes, mockups, and design systems",
    category: "design",
    superpower: "From sketch to prototype in minutes",
    tool1: {
      name: "Stitch + Figma", by: "Figma", url: "https://figma.com", logoDomain: "figma.com",
      preferred: "exploring",
      whyGood: "Stitch AI inside Figma for rapid wireframing and component design. AI-assisted design directly in the industry-standard tool.",
      keyStrengths: ["AI inside Figma", "Rapid wireframing", "Industry-standard workflow"],
      tags: ["Figma", "wireframes", "components", "Stitch"],
    },
    tool2: {
      name: "Claude Skill + Claude Code", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: "exploring",
      whyGood: "For generating full UI code from design descriptions and iterating live. Goes from idea to working code in one conversation.",
      keyStrengths: ["Description to code", "Live iteration", "Full component generation"],
      tags: ["code-gen", "components", "live-iteration"],
    },
    bonus: [],
    specialNote: "EXPLORING BOTH — actively comparing Figma's visual-first workflow with Claude's code-first approach to find my ideal design process.",
  },
  {
    id: 14,
    task: "Image Generation / Editing",
    subtitle: "Thumbnails, banners, and concept visuals",
    category: "design",
    superpower: "Custom visuals without opening Photoshop",
    tool1: {
      name: "Gemini", by: "Google", url: "https://gemini.google.com", logoDomain: "google.com",
      preferred: true,
      whyGood: "My primary image generator for banners, thumbnails, and concept visuals. Integrated with Google ecosystem, great quality and prompt understanding.",
      keyStrengths: ["Google ecosystem integration", "Great prompt understanding", "Consistent quality"],
      tags: ["image-gen", "banners", "thumbnails", "Google"],
    },
    tool2: {
      name: "Leonardo AI", by: "Leonardo", url: "https://leonardo.ai", logoDomain: "leonardo.ai",
      preferred: false,
      whyGood: "For stylized, artistic image generation and fine-tuned outputs. More control over art styles and detailed generation settings.",
      keyStrengths: ["Art style control", "Fine-tuned models", "Detailed settings"],
      tags: ["artistic", "stylized", "fine-tuned", "control"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 15,
    task: "Presentation Making",
    subtitle: "Slide decks, pitch decks, and visual presentations",
    category: "design",
    superpower: "Pitch-ready decks from a single prompt",
    tool1: {
      name: "Gamma + Custom GPT", by: "Gamma", url: "https://gamma.app", logoDomain: "gamma.app",
      preferred: "partial",
      whyGood: "Gamma generates beautiful slide decks from a single prompt. AI-native presentations that actually look professional.",
      keyStrengths: ["One-prompt decks", "Beautiful default designs", "Fast iteration"],
      tags: ["slides", "pitch-deck", "one-prompt", "beautiful"],
    },
    tool2: {
      name: "Claude Skill + Project", by: "Anthropic", url: "https://claude.ai", logoDomain: "anthropic.com",
      preferred: "partial",
      whyGood: "For custom PPTX generation with precise control over content and layout. Full control over every slide with code-level precision.",
      keyStrengths: ["Precise layout control", "Custom PPTX generation", "Code-level precision"],
      tags: ["PPTX", "custom", "precise", "code-gen"],
    },
    bonus: [],
    specialNote: "BOTH PARTIALLY — Gamma when I need speed and beautiful defaults, Claude when I need precise control over every slide.",
  },

  // ── PRODUCTIVITY ─────────────────────────────────────────
  {
    id: 16,
    task: "Project Planning / Task Management",
    subtitle: "Breaking down projects and planning timelines",
    category: "productivity",
    superpower: "From vague idea to actionable sprint plan",
    tool1: {
      name: "Grok Projects", by: "xAI", url: "https://grok.x.ai", logoDomain: "x.ai",
      preferred: true,
      whyGood: "I use Grok Projects to break down project milestones and plan sprints. Structured project breakdown with real-time context on tech trends.",
      keyStrengths: ["Milestone breakdown", "Sprint planning", "Tech trend awareness"],
      tags: ["planning", "sprints", "milestones", "project-mgmt"],
    },
    tool2: {
      name: "Custom GPT", by: "OpenAI", url: "https://chat.openai.com", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For generating detailed task lists and timeline estimates. Good at converting vague ideas into actionable project plans.",
      keyStrengths: ["Detailed task lists", "Timeline estimates", "Idea to plan conversion"],
      tags: ["tasks", "timelines", "actionable", "detailed"],
    },
    bonus: [],
    specialNote: null,
  },
  {
    id: 17,
    task: "Brainstorming / Ideation",
    subtitle: "Generating ideas and exploring approaches",
    category: "productivity",
    superpower: "Creative sparring partner that never runs dry",
    tool1: {
      name: "Grok", by: "xAI", url: "https://grok.x.ai", logoDomain: "x.ai",
      preferred: true,
      whyGood: "My brainstorm buddy — unfiltered, creative, and connected to what's trending. Real-time awareness helps generate ideas that are current and relevant.",
      keyStrengths: ["Unfiltered creativity", "Trend-connected ideas", "No-holds-barred brainstorming"],
      tags: ["brainstorm", "creative", "trends", "unfiltered"],
    },
    tool2: {
      name: "Custom GPT", by: "OpenAI", url: "https://chat.openai.com", logoDomain: "openai.com",
      preferred: false,
      whyGood: "For structured ideation with custom brainstorming frameworks. Can be tuned with specific brainstorming methodologies.",
      keyStrengths: ["Structured frameworks", "Custom methodologies", "Organized ideation"],
      tags: ["structured", "frameworks", "methodologies", "organized"],
    },
    bonus: [],
    specialNote: null,
  },
];

// ── 6 experimenting tools ─────────────────────────────────
export const experimentingTools: ExperimentingTool[] = [
  {
    name: "Whisper", by: "OpenAI", category: "Voice to Text",
    url: "https://openai.com/research/whisper", logoDomain: "openai.com",
    note: "Building a local transcription pipeline. Accuracy on Indian English accents is surprising.",
    status: "testing",
  },
  {
    name: "ElevenLabs", by: "ElevenLabs", category: "Text to Speech",
    url: "https://elevenlabs.io", logoDomain: "elevenlabs.io",
    note: "Experimenting with real-time voice conversion for interactive AI demos.",
    status: "testing",
  },
  {
    name: "Runway Gen-3", by: "Runway", category: "Video Generation",
    url: "https://runwayml.com", logoDomain: "runwayml.com",
    note: "Testing motion brush for animating UI mockups into short product demos.",
    status: "testing",
  },
  {
    name: "Suno v4", by: "Suno", category: "Music Generation",
    url: "https://suno.com", logoDomain: "suno.com",
    note: "Generating background tracks for portfolio demos. v4 handles genre blending well.",
    status: "testing",
  },
  {
    name: "Udio", by: "Udio", category: "Music Generation",
    url: "https://udio.com", logoDomain: "udio.com",
    note: "Comparing against Suno for instrumental-only tracks. Different aesthetic.",
    status: "testing",
  },
  {
    name: "NotebookLM", by: "Google", category: "Deep Research",
    url: "https://notebooklm.google.com", logoDomain: "google.com",
    note: "Using it to synthesize 20+ research papers into study guides for FYP.",
    status: "testing",
  },
];
