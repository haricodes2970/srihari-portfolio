# ⚔ Srihari Prasad S — Portfolio

> "You Think, I Make It Real" — Thinking is Limitless

---

## 🧱 Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 15 (App Router)           |
| Language    | TypeScript                        |
| Styling     | Tailwind CSS                      |
| Animations  | Framer Motion + GSAP              |
| State       | Zustand                           |
| Icons       | Lucide React                      |
| Deployment  | Vercel                            |

---

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (nav, cursor, effects)
│   ├── page.tsx            # Home (Hero)
│   ├── about/page.tsx
│   ├── skills/page.tsx
│   ├── projects/page.tsx
│   ├── certificates/page.tsx
│   ├── hobbies/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── sections/           # Full-page section components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx
│   │   ├── Hobbies.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/                 # Reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeader.tsx
│   │   └── TechTag.tsx
│   │
│   ├── effects/            # Visual effects
│   │   ├── Cursor.tsx      # Custom sword cursor
│   │   ├── SwordSlash.tsx  # Page transition slash
│   │   ├── LoadingScreen.tsx
│   │   ├── EasterEgg.tsx   # Press Z → Three Sword Style
│   │   ├── ParticleCanvas.tsx
│   │   └── PageTransition.tsx
│   │
│   └── shared/             # Layout chrome
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ModeToggle.tsx
│       ├── SectionDots.tsx
│       └── ScrollProgress.tsx
│
├── hooks/
│   ├── useCursor.ts
│   ├── useMode.ts
│   ├── useScrollProgress.ts
│   ├── useReveal.ts
│   ├── useEasterEgg.ts
│   └── usePageTransition.ts
│
├── store/
│   └── uiStore.ts          # Zustand: mode, loading, modal, slash
│
├── lib/
│   ├── utils.ts            # cn(), delay(), clamp()
│   ├── constants.ts        # NAV_ITEMS, URLs, RANK_COLORS
│   └── data.ts             # ALL portfolio content (projects, skills, hobbies)
│
├── types/
│   └── index.ts            # Project, Skill, Hobby, Rank, Mode types
│
└── styles/
    └── animations.css      # Keyframe animations
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 🏗 Build Phases

### Phase 1 — Foundation
- [x] Project structure
- [x] Config files (Next.js, Tailwind, TypeScript)
- [x] Design tokens in Tailwind config
- [x] Data file (all content)
- [x] Types
- [x] Zustand store
- [x] All hooks
- [ ] globals.css design system

### Phase 2 — Layout & Content
- [ ] Navbar (sticky, frosted glass, active links)
- [ ] Footer
- [ ] SectionDots
- [ ] ScrollProgress
- [ ] All section skeletons with content

### Phase 3 — Interactions
- [ ] Custom cursor (dot + ring + click slash)
- [ ] SwordSlash on page transition
- [ ] LoadingScreen (three swords + energy bar)
- [ ] Scroll reveal animations
- [ ] Skill bar animations on intersect
- [ ] Project modal (click to deep-dive)

### Phase 4 — Cinematic & Polish
- [ ] GSAP Hero intro timeline
- [ ] Easter egg (Z key → Three Sword Style)
- [ ] Mode toggle (Zoro ↔ Calm)
- [ ] ParticleCanvas sword trail
- [ ] Scroll parallax via GSAP ScrollTrigger
- [ ] Mobile responsiveness pass

### Phase 5 — Deploy
- [ ] Add real photo to About
- [ ] Add certificates when ready
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Custom domain (optional)

---

## 🎮 Easter Egg

Press **Z** anywhere on the site to trigger **Three Sword Style mode**.

---

## ⚔ Design System

| Token        | Value                  |
|--------------|------------------------|
| Background   | `#040a06`              |
| Green Core   | `#00ff6a`              |
| Green Mid    | `#1aff7a`              |
| Text Primary | `#dff2e8`              |
| Font Display | Cinzel (serif)         |
| Font UI      | Rajdhani (sans-serif)  |
| Font Mono    | Share Tech Mono        |

---

## 📬 Contact

- Email: srihariprasad7078@gmail.com
- GitHub: [haricodes2970](https://github.com/haricodes2970)
- LinkedIn: [haricodes2970](https://linkedin.com/in/haricodes2970)
