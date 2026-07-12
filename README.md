# Portfolio OS

A personal portfolio built as a simulated operating system rather than a
traditional website — boot into a desktop, open "apps" (Finder, Safari,
Photos, Terminal, About Me, Contact, Resume, ...) in draggable windows,
complete with a dock, menu bar, and a real window manager. Design source of
truth is a [Figma file](./CLAUDE.md#design-reference) exported into
[`design/`](./design).

> Status: Phase 0 (tooling) complete. The OS shell hasn't been built yet —
> see [Roadmap](#roadmap).

## Tech stack

- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP (ScrollTrigger, FLIP, MotionPath, Observer, SplitText),
  Framer Motion where GSAP doesn't fit
- **3D**: Three.js + React Three Fiber
- **State**: Zustand, React Query
- **Routing / forms**: React Router, React Hook Form + Zod
- **Scroll / motion**: Lenis, Motion Values
- **Persistence**: IndexedDB, localStorage
- **Tooling**: ESLint, Prettier, Husky, Vitest, Playwright, Storybook, Vite
  PWA

## Getting started

```bash
npm install
npm run dev
```

| Script                    | Purpose                           |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Start the Vite dev server         |
| `npm run build`           | Type-check and build for prod     |
| `npm run preview`         | Preview the production build      |
| `npm run lint`            | Run ESLint                        |
| `npm run format`          | Format the repo with Prettier     |
| `npm run format:check`    | Check formatting without writing  |
| `npm run typecheck`       | Type-check the whole repo         |
| `npm test`                | Run unit/component tests (Vitest) |
| `npm run test:watch`      | Vitest in watch mode              |
| `npm run test:e2e`        | Run Playwright E2E tests          |
| `npm run storybook`       | Start Storybook locally           |
| `npm run build-storybook` | Build the static Storybook site   |

## Architecture

Feature-first, organized as an OS kernel plus a set of self-contained "apps":

```
src/
  app/          # app shell, providers, router wiring
  core/         # window manager, boot sequence, global chrome
  components/   # shared design-system primitives
  features/     # one folder per app (finder, terminal, safari, ...)
    <feature>/
      components/
      hooks/
      services/
      types/
      utils/
      index.ts  # barrel export — the feature's public API
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

Full product spec, engineering standards, and the phased build plan live in
[`CLAUDE.md`](./CLAUDE.md).

## Roadmap

Built incrementally, one phase at a time:

0. Tooling — Tailwind, lint/format/hooks, test/E2E/Storybook setup
1. OS kernel — window manager, boot sequence, state persistence
2. Desktop chrome — wallpaper, menu bar, dock, control center, theming
3. Spotlight search
4. Finder
5. Terminal
6. Safari (custom browser chrome hosting portfolio pages)
7. VS Code (Monaco-based editor hosting project content)
8. Content apps — Projects, Experience, Resume, GitHub/LeetCode dashboards,
   Photography, Music Player, Activity Monitor, AI Chat
9. Three.js background/effects
10. GSAP animation system + polish pass
11. Performance, accessibility, mobile, testing, CI/CD, deploy

See [`CLAUDE.md`](./CLAUDE.md) for the detailed spec behind each phase.

## License

Personal project — all rights reserved.
