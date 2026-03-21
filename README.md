# ⚔ Srihari Prasad S — Portfolio

> "You Think, I Make It Real" — Thinking is Limitless

**Live:** https://srihari-portfolio-indol.vercel.app

---

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Framework   | Next.js 15 (App Router)                 |
| Language    | TypeScript                              |
| Styling     | Tailwind CSS + CSS Variables            |
| Animations  | GSAP 3 + ScrollTrigger + Framer Motion  |
| State       | Zustand (persisted mode preference)     |
| Deployment  | Vercel (auto-deploy on push to main)    |

---

## Pages & Routes

| Route          | Section       | Background Effect                                     |
|----------------|---------------|-------------------------------------------------------|
| `/`            | Home (Hero)   | Green particle mesh — cursor-reactive                 |
| `/about`       | About         | Cyan ambient mesh + Jolly Roger watermark + ocean waves |
| `/skills`      | Skills        | Matrix rain + scan line + diagonal grid               |
| `/projects`    | Projects      | Cyan data mesh (noCursor) + expanding pulse rings     |
| `/ai-toolkit`  | AI Toolkit    | Blue ambient mesh — 17 task cards + modals            |
| `/certificates`| Certificates  | Rising green star particles                           |
| `/hobbies`     | Hobbies       | Isometric cube flux — cursor attraction               |
| `/contact`     | Contact       | Cyberpunk crack mesh + SVG cracks + glitch + CRT      |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, cursor, effects, sound)
│   ├── page.tsx                # Home → Hero.tsx
│   ├── about/page.tsx
│   ├── skills/page.tsx
│   ├── projects/page.tsx
│   ├── ai-toolkit/page.tsx     # NEW — AI Toolkit page
│   ├── certificates/page.tsx
│   ├── hobbies/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── sections/               # Full-page section components
│   │   ├── Hero.tsx
│   │   ├── About.tsx           # Cyan mesh + One Piece watermark + waves
│   │   ├── Skills.tsx          # Matrix rain + scan line
│   │   ├── Projects.tsx        # Cyan mesh + pulse rings
│   │   ├── AIToolkit.tsx       # Task-based tool comparison page
│   │   ├── Certificates.tsx    # Rising star particles
│   │   ├── Hobbies.tsx         # Isometric cube flux
│   │   └── Contact.tsx         # Cyberpunk crack glitch
│   │
│   ├── effects/                # Visual background effects
│   │   ├── ParticleMesh.tsx    # Cursor-reactive node network (base, used on Hero)
│   │   ├── GreenCyberBg.tsx    # Matrix rain + scan line (Skills)
│   │   ├── PulseRingOverlay.tsx# Expanding data pulse rings (Projects)
│   │   ├── RisingStarsBg.tsx   # Rising star particles (Certificates)
│   │   ├── IsoFluxBg.tsx       # Canvas isometric cubes w/ cursor attraction (Hobbies)
│   │   ├── CyberpunkCrackBg.tsx# Mixed mesh + SVG cracks + glitch strips (Contact)
│   │   ├── TwoMoons.tsx        # Golden dual-moon decoration (Hero + About, dark mode)
│   │   ├── SoundSystem.tsx     # Click/slash audio on buttons & links
│   │   ├── Cursor.tsx          # Custom sword cursor
│   │   ├── SwordSlash.tsx      # Page transition slash effect
│   │   ├── LoadingScreen.tsx   # Zoro loading animation
│   │   ├── EasterEgg.tsx       # Press Z → Three Sword Style
│   │   └── PageTransition.tsx
│   │
│   └── shared/
│       ├── Navbar.tsx          # Sticky nav, reads NAV_ITEMS
│       ├── Footer.tsx
│       ├── SectionDots.tsx     # Side dot navigation, reads NAV_ITEMS
│       └── ModeApplicator.tsx  # Applies calm-mode class to body
│
├── lib/
│   ├── constants.ts            # NAV_ITEMS, PAGE_ORDER, RANK_COLORS, site URLs
│   ├── data.ts                 # All portfolio content: projects[], skills[], hobbies[]
│   └── aiToolkitData.ts        # AI Toolkit: 17 tasks + 6 experimenting tools (update weekly)
│
├── store/
│   └── uiStore.ts              # Zustand: mode (zoro/calm), loading, modal, slash
│
└── types/
    └── index.ts                # Project, Skill, Hobby, Rank, Mode, SkillCategory types
```

---

## Dual Theme System

The site has two modes toggled via the navbar button:

| Token               | Zoro (dark)  | Calm (light)   |
|---------------------|--------------|----------------|
| `--color-void`      | `#040a06`    | `#eaf3ff`      |
| `--color-deep`      | `#070d08`    | `#dceaf8`      |
| `--color-accent`    | `#00ff6a`    | `#d4a017` (gold)|
| `--color-text-primary`| `#dff2e8` | `#0f1f2e`      |

All background effects check `useUIStore(s => s.mode)` and swap to calm-mode colors automatically.

---

## Updating Content

### Weekly — AI Toolkit tools
Edit **`src/lib/aiToolkitData.ts`** — update `toolkitTasks[]` or `experimentingTools[]`.
No component changes needed; data is imported directly.

### Projects / Skills / Hobbies
Edit **`src/lib/data.ts`** — arrays exported as `projects`, `skills`, `hobbies`.

### Navigation order
Edit **`src/lib/constants.ts`** — `NAV_ITEMS` and `PAGE_ORDER` drive Navbar + SectionDots.

---

## Special Features

| Feature | Description |
|---------|-------------|
| **Dual theme** | Zoro (dark neon) ↔ Calm (light blue + gold) — persisted in localStorage |
| **Sound system** | Sword slash audio on all button/link clicks, ignores form inputs |
| **Custom cursor** | Sword-tip cursor with slash trail |
| **Easter egg** | Press `Z` anywhere → Three Sword Style animation |
| **Two Moons** | Atmospheric golden moons top-left (About + Hero), dark mode only. Tribute to "2 Moons" — boywithuke |
| **Skill modals** | Click any skill card → popup with why%, tools used, projects |
| **Project modals** | Click any project card → full detail modal with live + GitHub links |
| **AI Toolkit** | 17 task-based cards: click to see head-to-head tool comparison with key strengths, tags, direct links |
| **ThirdEye widget** | Live AI usage dashboard embedded in AI Toolkit → https://thirdeye-five.vercel.app |
| **Prefers-reduced-motion** | All canvas effects respect the system accessibility setting |

---

## Running Locally

```bash
npm install
npm run dev
# http://localhost:3000
```

---

## Deployment

Auto-deploys to Vercel on every push to `main`.
Manual deploy: `npx vercel --prod --yes`

---

## Contact

- Email: srihariprasad7078@gmail.com
- GitHub: [haricodes2970](https://github.com/haricodes2970)
- LinkedIn: [haricodes2970](https://linkedin.com/in/haricodes2970)
