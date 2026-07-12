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

## Design reference

Figma source of truth: https://www.figma.com/design/QNUvSyhE4qOsLBWJuIephM/MacOS-Portfolio

No Figma connector/MCP is available in this environment. Instead, the user
exports relevant frames as images into `design/` at the repo root — read
those directly when building the matching UI. `design/` currently has 31
exported frames covering: desktop/wallpaper (light + dark, several
wallpaper variants), Finder, Terminal, About Me, Contact Me, Safari (blog),
Photos, a project deep-dive (file listing + Quick Look screenshot + text
file viewer), Resume.pdf viewer, and 7 mobile breakpoints. Naming isn't
strict; if it's unclear which frame maps to the current phase, ask the user.
If the relevant frame is missing for a UI-heavy phase, ask the user to
export it before inventing colors/spacing/layout Figma already defines. The
scope summary below was derived from a sampled subset of these frames —
re-open the actual frame(s) for pixel-level detail when building that piece
rather than relying on this summary alone.

**The Figma file is the scope.** Build the apps/screens it contains, styled
to match it, before adding anything not shown in it. See Roadmap.

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
- Tailwind CSS v4 (installed)
- GSAP (ScrollTrigger, FLIP, MotionPath, Observer, SplitText) — primary
  animation engine; Framer Motion only where GSAP is a poor fit
- Three.js + React Three Fiber — optional stretch enhancement (see Motion &
  effects below), not required to match the Figma design
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

## Product Scope (per Figma)

### Desktop / OS shell

Menu bar: Apple logo, "Adrian's Portfolio", nav items (Projects,
Testimonials, Contact, Resume), right side icons (wifi, search, profile,
control center) + live clock. Dropdown from the control-center icon toggles
Light Mode / Dark Mode. Wallpaper (multiple wave/gradient variants, distinct
light and dark sets) with centered hero text ("Hey, welcome to my
portfolio"). Desktop icons: `Resume.pdf`, one folder per project (e.g.
"Project 1 (SnapCast)"). Dock, bottom-center, holds exactly 6 icons: Finder,
Safari, Photos, Contacts, Terminal, Trash.

### Applications

Finder, Safari (hosts the blog + live project sites), Photos, Terminal,
About Me, Contact Me, Resume (PDF viewer), Trash. Projects and Testimonials
are reached via the menu bar / Finder, not standalone dock apps.

### Finder

Sidebar: Favorites (Work, About me, Resume, Trash). "Work" contains one
folder per project. Each project folder contains: a "Full case study"
folder/link, `Design.fig`, a screenshot (opens Quick Look-style preview on
click), a site bookmark (opens Safari to the live site), and `TLDR.txt`
(opens a plain-text viewer with a short project blurb). Grid view,
breadcrumbs, search, standard Finder chrome (traffic lights, back/forward).

### Terminal

Fake shell prompt (`@adrian %`). Commands render structured output — e.g.
`show techstack` prints a table of categories/technologies with a success
summary line, `github stats` is chainable next. Build a small command
registry so more commands (`help`, `ls`, `whoami`, `projects`, `resume`,
`clear`, `history`, ...) are easy to add following the same pattern.

### Safari

Custom browser chrome: traffic lights, sidebar toggle, back/forward, shield
icon, address/search bar, share/new-tab/tabs icons. Hosts "My Developer
Blog" (post list: date, title, "Check out the full post" link) and live
project sites (e.g. clicking a project's site bookmark in Finder opens it
here).

### Photos

Sidebar: Library, Memories, Places, People, Favorites. Grid of photos
grouped by date, mail/search icons in the toolbar.

### About Me

Notes-app-style chrome: sidebar (General, Books, Random, Future Plans,
Drafts) + content pane (avatar, heading, bio paragraphs). Supports light and
dark mode (confirmed in exported frames).

### Contact Me

Small standalone popup window (no sidebar): avatar, "Let's Connect" heading,
one-line pitch, 4 colored action buttons (Schedule a call, Email me,
Twitter/X, LinkedIn).

### Resume

Preview-style PDF viewer window (toolbar: page count, zoom, share, print) or
a Finder Quick Look preview of a résumé document.

### Mobile

7 exported breakpoints. iOS-style status bar, a "Go back" + centered title
top bar in place of the menu bar, and a bottom tab bar (3 icons observed:
checklist/notes, camera, an "A" logo) replacing the dock. Content
(Terminal, Safari/blog, etc.) reflows to single-column.

## Motion & effects

GSAP drives all interaction motion: window open/close/minimize, dock
magnification/bounce, menu bar dropdowns, Finder/Safari transitions. No
arbitrary/random animation — build a reusable animation-utility layer in
`animations/`. Target 60fps everywhere; respect `prefers-reduced-motion`.

Three.js is not part of the Figma design (wallpapers are static images) —
treat any WebGL/particle/shader background as an optional stretch
enhancement to consider only after the Figma scope is built and polished,
and only if it doesn't compromise the performance bar below.

## Cross-cutting bars

- **Performance**: Lighthouse 100/100/100/100. Core Web Vitals optimized,
  image optimization, virtualization, request batching, prefetch/preload,
  caching, IntersectionObserver, Web Workers for heavy work.
- **Accessibility**: full keyboard navigation, ARIA, focus traps, screen
  reader support, `prefers-reduced-motion`, high-contrast mode.
- **Mobile**: responsive per the exported mobile frames, touch gestures
  (pinch/swipe), momentum scroll, adaptive bottom tab bar, responsive
  windows.
- **Engineering standards**: strict TS (no `any`), SOLID, DRY, KISS, barrel
  exports, no duplicated code, docs where the _why_ isn't obvious.
- **Testing**: Vitest + RTL (component/integration), Playwright (E2E).
- **CI/CD**: GitHub Actions — lint, typecheck, test, build, deploy.
- **Deployment**: Vercel, Docker support, env configs, analytics, error
  logging.

## Roadmap (phases — work through in order, one at a time)

- [x] **Phase 0** — Tooling: Tailwind v4, ESLint/Prettier/Husky, Vitest,
      Playwright, Storybook, path aliases, base folder structure.
- [ ] **Phase 1** — OS kernel: window manager (drag/resize/snap/z-order/
      minimize/maximize/close), boot sequence, app registry, Zustand stores
      for window + settings state, persistence to IndexedDB/localStorage.
- [ ] **Phase 2** — Desktop chrome: wallpaper (light/dark sets), menu bar
      (nav + status icons + clock), Light/Dark mode dropdown, dock (6 apps,
      magnification), desktop icons (Resume.pdf, project folders).
- [ ] **Phase 3** — Finder app (sidebar, Work folder, project subfolders,
      file grid, Quick Look screenshot preview, TLDR.txt text viewer, site
      bookmarks that open Safari).
- [ ] **Phase 4** — Terminal app (prompt, command registry, `show
techstack` / `github stats` and friends).
- [ ] **Phase 5** — Safari app (browser chrome, blog post list, renders
      project site bookmarks).
- [x] **Phase 6** — Photos app (sidebar, date-grouped photo grid).
- [ ] **Phase 7** — About Me (Notes-style) + Contact Me (popup card) apps.
- [ ] **Phase 8** — Resume PDF viewer.
- [ ] **Phase 9** — Mobile responsive pass across all apps built so far,
      matching the 7 exported mobile frames (status bar, back/title bar,
      bottom tab bar).
- [ ] **Phase 10** — GSAP motion polish pass (window/dock/menu animation
      system, 60fps, reduced-motion support) across all apps.
- [ ] **Phase 11** — Performance, accessibility, full test suite, CI/CD,
      deploy to Vercel. Revisit optional Three.js background enhancement
      here if there's still appetite for it.

## Current Status

Phase 0 tooling complete (unchanged from original setup). Well past Phase 0
in practice — this section had gone stale across several sessions; the
notes below reflect the actual working tree.

**Desktop chrome (Phase 2, partial)**: `NavBar` (menu bar, wifi/search
popovers with draggable Spotlight-style search and live `useNetworkStatus`),
`Welcome` (hero text with per-letter magnetic hover), and `Dock` (6 icons,
GSAP magnification, opens/closes windows via the window store) are built
under `src/components/`. Light/dark mode toggle and desktop icons are not
built yet.

**OS kernel (Phase 1, partial)**: `src/store/window.ts` is a Zustand+immer
store keyed by window id (`isOpen`/`zIndex`/`data`/optional `title`
override), with `openWindow`/`closeWindow`/`focusWindow`/`setWindowTitle`.
`src/hoc/WindowWrapper.tsx` is the single place that owns the entire window
shell for every app — chrome (dark title bar, Lucide `X`/`Minus`/`Plus`
traffic lights, hover-reveal on the whole cluster), dragging (title bar as
the GSAP Draggable trigger, bounded to the viewport), resizing (corner grip,
also GSAP Draggable, resizes the box via cumulative drag delta rather than
moving the grip), and open/close animation (GSAP scale+fade,
`src/animations/window.ts`, respects `prefers-reduced-motion`). There was
briefly a separate `WindowChrome` component — folded back into
`WindowWrapper` since it was the only consumer and the split added
indirection without reuse benefit. The window's content slot is
theme-agnostic (no hardcoded background) so both a dark app (Terminal) and
a light app (Photos) render correctly; each feature's root component owns
its own background. Not yet built: z-order-on-focus, minimize/maximize
(traffic lights are wired for close only), persistence, boot sequence.

**Terminal (Phase 4, functionally complete, one content placeholder
pending)**: `src/features/terminal/` — command registry (`services/
commands/registry.ts`) dispatches fixed-phrase and prefix commands (`help`,
`whoami`, `show techstack`, `github stats` via live GitHub REST API +
React Query, `ls`, `projects`, `resume` (opens the Resume window),
`clear`, `history` with ↑/↓ recall and a caret that correctly tracks
`selectionStart` (not just end-of-string), `date`, `echo`, `blog` stub for
the future Safari blog) plus a regex-based easter-egg matcher for
destructive/sudo-style input. `github stats` is live against the real
`gsashish-code` GitHub handle. UI: `TerminalApp`, `PromptLine` (blinking
block caret via a real hidden `<input>` overlaid with styled text),
`OutputRenderer` (text/success/error/link/table/profile line types).
Window title mirrors the active command's context (`Tech Stack — zsh —
80×24` etc.). **One placeholder remains**: `whoami`'s bio fields
(`services/commands/whoami.ts`) are `<TODO>` — a LinkedIn fetch was
attempted and blocked (HTTP 999 from LinkedIn's anti-scraping, and the
LinkedIn MCP connector isn't authorized in this environment).

**Photos (Phase 6, complete for the available content)**:
`src/features/photos/` — same feature-first shape as Terminal
(`types/constants/services/components/index.ts`), reusing `WindowWrapper`
and the `setWindowTitle` store action for a title bar that reflects the
active sidebar section, same as Terminal's command-context title. Sidebar
(Library/Memories/Places/People/Favorites, Lucide icons, local `useState`
— no store needed, unlike Terminal, since there's nothing cross-feature to
coordinate) + toolbar (mail/search) + a date-grouped photo grid
(`gsashish1.png`–`gsashish6.png`, two groups) matching the exported "Photo
Dump" frame's hero-tile-plus-smaller-row layout. Non-Library sections show
a friendly empty state rather than a dead end. No click-to-preview
(Quick Look is Finder's job per the spec, not Photos').

Also added since original setup: `@tanstack/react-query` (first use is
Terminal's GitHub stats fetch), with `QueryClientProvider` wired in
`src/main.tsx` via `src/app/providers/`. `lucide-react` is now used for
window-chrome and Photos icons. Hooks/utils that were briefly colocated
per-component (`src/components/*/hooks|utils/`) were consolidated into
global `src/hooks/` and `src/utils/`, imported via the `#hooks/*`/`#utils/*`
aliases — this repo's convention is centralized hooks/utils, not
per-component colocation.

Next step: fill in Terminal's `whoami` placeholder when bio facts are
available, then either continue Phase 1 properly (z-order-on-focus,
minimize/maximize, persistence) or move on to Phase 3 (Finder) or Phase 5
(Safari).
