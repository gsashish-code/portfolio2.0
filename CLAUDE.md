# Portfolio OS — Project Brief

## Vision

A personal portfolio built as a simulated operating system, not a website. The
user "boots into" a desktop; every section of the portfolio (About, Projects,
Resume, Contact, ...) is an "application" running in a window. Target quality
bar: Apple.com, Linear, Framer, Vercel, Stripe, Figma, Arc Browser, Raycast.
This must read as senior/staff-level frontend engineering work, not a
tutorial project — it is a portfolio piece meant to demonstrate SDE-3 / Staff
Frontend Engineer skill during interview loops at companies like Stripe,
Vercel, Meta, Google, Airbnb, Netflix, Apple.

When working in this repo, act as a Staff Frontend Engineer: React,
TypeScript, WebGL/Three.js, GSAP, browser internals, performance, design
systems, architecture.

## How to build this (read every session)

**Never generate everything at once.** Work one phase at a time (see
Roadmap below). For every phase:

1. Explain the architecture for that phase before writing code.
2. Create/confirm the folder structure.
3. Generate the code.
4. Explain the engineering decisions made.
5. Suggest improvements / follow-ups.
6. Refactor before moving on to the next phase.
7. Hold everything to production quality — no half-finished implementations.

Prioritize maintainability, scalability, performance, accessibility, and
clean architecture over speed of output. Use TodoWrite to track steps within
a phase. Update the "Current Status" section below at the end of a session so
the next session picks up correctly.

There is a `/portfolio-phase` skill in `.claude/skills/` that operationalizes
this workflow — invoke it (or just ask normally) to start or continue a phase.

## Tech Stack

- React 19, TypeScript (strict, no `any`), Vite
- Tailwind CSS v4
- GSAP (ScrollTrigger, FLIP, MotionPath, Observer, SplitText) — primary
  animation engine; Framer Motion only where GSAP is a poor fit
- Three.js + React Three Fiber (background/effects, post-processing, bloom)
- Zustand (global/app state, proper selectors, no prop drilling)
- React Query (server/async state, caching, prefetching)
- React Router
- React Hook Form + Zod (forms/validation)
- Motion values, Lenis (smooth scroll)
- Web Workers where CPU-heavy work would jank the main thread
- IndexedDB + localStorage (persistence — window layout, theme, settings)
- vite-plugin-pwa
- ESLint, Prettier, Husky
- Vitest + React Testing Library, Playwright, Storybook

## Architecture

Feature-first. Target layout:

```
src/
  app/          # app shell, providers, router wiring
  core/         # OS kernel: window manager, boot sequence, global chrome
  components/   # shared/dumb UI primitives (design system)
  features/     # one folder per "application" (finder, terminal, safari, ...)
    <feature>/
      components/
      hooks/
      services/
      types/
      utils/
      index.ts  # barrel export — this is the feature's public API
  hooks/        # cross-feature hooks
  lib/          # thin wrappers around third-party libs
  services/     # cross-feature services (persistence, analytics)
  stores/       # zustand stores
  animations/   # reusable GSAP timelines/utilities
  workers/
  types/
  utils/
  routes/
```

Rules:
- No prop drilling — lift to a Zustand store with selectors instead.
- Memoize deliberately (not reflexively); lazy-load and code-split at the
  feature/app boundary; Suspense + Error Boundaries around every lazy app.
- Composition over inheritance; dependency inversion at service boundaries
  (features depend on interfaces in `types/`, not on each other directly).
- Keep files small and single-purpose. No duplicated logic — extract to
  `lib/`, `utils/`, or a shared hook.
- Every feature module exposes its public surface via `index.ts` only.

## Product Scope

### Desktop / OS shell
Animated wallpaper, live clock, dock, spotlight search, notification center,
menu bar, control center, desktop icons, context menus, window shadows/drag/
resize/snap, keyboard shortcuts, wallpaper selector, dark/light mode, accent
color, blur/glassmorphism, realistic macOS-style animations.

### Applications
About Me, Projects, Experience, Resume, GitHub Dashboard, LeetCode Analytics,
Photography Gallery, Music Player, Terminal, VS Code, Finder, Safari, Blog,
Notes, Settings, Contact, Downloads, Trash, Activity Monitor, AI Chat.

### Finder
Folders, breadcrumbs, search, grid/list view, file preview, drag selection,
rename, keyboard navigation, context menu, animations.

### Terminal
Fake filesystem; commands: `help`, `ls`, `pwd`, `cat`, `whoami`, `projects`,
`skills`, `experience`, `clear`, `resume`, `github`, `linkedin`, `theme`,
`history`, `exit`. Command history, autocomplete, animation.

### Safari
Custom browser chrome: tabs, address bar, bookmarks, animated loading,
back/forward. Portfolio pages render inside it as "sites."

### VS Code
Explorer, tabs, split editor, Monaco editor, syntax highlighting, typing
animation, live preview, git sidebar, extensions sidebar.

### Projects (each project is an interactive experience)
Examples: Airbnb Clone, Microservices, Payment Gateway, 3D Portfolio,
Real-time Chat. Each includes: architecture diagram, tech stack, animated
timeline, performance metrics, challenges/trade-offs, source preview, demo
video, screenshots, API architecture, DB design.

### Three.js
Floating particles, interactive background, lighting, cursor effects,
post-processing/bloom, parallax, physics, shader effects, GPU-optimized
rendering.

### GSAP
Professional timelines only — no arbitrary/random animation. Use
ScrollTrigger, FLIP, MotionPath, Observer, SplitText. Build a reusable
animation-utility layer in `animations/`. Target 60fps everywhere.

## Cross-cutting bars

- **Performance**: Lighthouse 100/100/100/100. Core Web Vitals optimized,
  image optimization, virtualization, request batching, prefetch/preload,
  caching, IntersectionObserver, Web Workers for heavy work.
- **Accessibility**: full keyboard navigation, ARIA, focus traps, screen
  reader support, `prefers-reduced-motion`, high-contrast mode.
- **Mobile**: responsive, touch gestures (pinch/swipe), momentum scroll,
  adaptive dock, responsive windows.
- **Engineering standards**: strict TS (no `any`), SOLID, DRY, KISS, barrel
  exports, no duplicated code, docs where the *why* isn't obvious.
- **Testing**: Vitest + RTL (component/integration), Playwright (E2E).
- **CI/CD**: GitHub Actions — lint, typecheck, test, build, deploy.
- **Deployment**: Vercel, Docker support, env configs, analytics, error
  logging.

## Roadmap (phases — work through in order, one at a time)

- [ ] **Phase 0** — Tooling: Tailwind v4, ESLint/Prettier/Husky, Vitest,
      Playwright, Storybook, path aliases, base folder structure.
- [ ] **Phase 1** — OS kernel: window manager (drag/resize/snap/z-order/
      minimize/maximize/close), boot sequence, app registry, Zustand stores
      for window + settings state, persistence to IndexedDB/localStorage.
- [ ] **Phase 2** — Desktop chrome: wallpaper, menu bar, dock, clock, desktop
      icons, context menus, control center, notification center, theme
      (dark/light/accent), settings app.
- [ ] **Phase 3** — Spotlight search (cross-app content index).
- [ ] **Phase 4** — Finder app.
- [ ] **Phase 5** — Terminal app (fake FS + command set above).
- [ ] **Phase 6** — Safari app (custom browser chrome hosting portfolio
      pages: About, Blog, Contact, Notes).
- [ ] **Phase 7** — VS Code app (Monaco, explorer, tabs, git/extensions
      sidebars) hosting Projects content.
- [ ] **Phase 8** — Content apps: Projects, Experience, Resume, GitHub
      Dashboard, LeetCode Analytics, Photography Gallery, Music Player,
      Activity Monitor, AI Chat, Downloads, Trash.
- [ ] **Phase 9** — Three.js background/effects layer.
- [ ] **Phase 10** — GSAP animation system + polish pass across all apps.
- [ ] **Phase 11** — Performance, a11y, mobile pass; full test suite; CI/CD;
      deploy to Vercel.

## Current Status

Fresh Vite + React 19 + TypeScript scaffold. `App.tsx` currently renders a
placeholder ("Welcome to Den"). None of the above tech stack is installed
yet and no phase has started. Next step: Phase 0.
