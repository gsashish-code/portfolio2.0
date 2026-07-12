---
name: portfolio-phase
description: Start or continue the next build phase of the Portfolio OS project (this repo's OS-style personal portfolio). Use when the user asks to build/continue/work on the portfolio, a specific phase, or a specific app/feature of it (dock, window manager, terminal, finder, safari, photos, about me, contact, resume viewer, GSAP polish, etc).
---

# Portfolio OS — phase workflow

This repo is building a personal portfolio that simulates an operating
system, to a Staff Frontend Engineer quality bar. The full product spec,
tech stack, architecture rules, and phase roadmap live in `CLAUDE.md` at the
repo root — read it in full before doing anything else in this skill.

There is a Figma file that is the visual source of truth for this project
(link + access notes in `CLAUDE.md`'s "Design reference" section). Exported
frames live in `design/` at the repo root — for any slice with a visible UI
surface, check that folder (Read the relevant image) before inventing
visual details. If the frame you need isn't there, ask the user to export
it rather than guessing colors, spacing, or layout that Figma already
defines.

## Steps

1. **Orient**: Read `CLAUDE.md`, in particular the Roadmap and Current
   Status sections. Check the working tree (`git status`, relevant
   `src/` folders) to confirm Current Status is still accurate — treat it as
   a hint, not ground truth.
2. **Pick scope**: If the user named a specific phase/app/feature, scope to
   that. Otherwise propose the next unchecked roadmap phase and confirm with
   the user before starting — don't assume which phase they mean if more
   than one is plausible.
3. **Explain the architecture** for this slice before writing code: what
   folders/modules it touches, what state it owns, how it composes with
   existing features. Keep it short — a few sentences to a short list, not
   an essay.
4. **Confirm/create folder structure** per the feature-first layout in
   `CLAUDE.md` (`components/`, `hooks/`, `services/`, `types/`, `utils/`,
   `index.ts` barrel per feature module).
5. **Implement.** Use TodoWrite to track the steps within this phase.
   Follow the engineering standards in `CLAUDE.md` (strict TS, no `any`,
   Zustand + selectors, memoize deliberately, lazy-load/Suspense/Error
   Boundaries at feature boundaries, composition over inheritance).
6. **Explain the decisions** made and any trade-offs.
7. **Suggest improvements** / follow-ups that are out of scope for this
   slice but worth knowing about.
8. **Refactor pass** before declaring the slice done — check for
   duplication, oversized files, missing memoization/lazy-loading, dead
   code.
9. **Verify**: run typecheck/lint/tests relevant to what changed, and use
   the `verify` or `run` skill to actually exercise the feature in the
   browser when it has a visible/interactive surface — don't claim done on
   the strength of a type-check alone.
10. **Update `CLAUDE.md`**: tick the phase's roadmap checkbox if fully
    complete, and update "Current Status" to reflect the real state for the
    next session.

## Guardrails

- Do not jump ahead and scaffold multiple phases/apps in one pass — one
  slice at a time, per `CLAUDE.md`'s explicit "never generate everything at
  once" instruction.
- Do not introduce a dependency from the Tech Stack list before it's
  actually needed by the slice in progress (e.g. don't wire up Three.js
  while building the Terminal app).
- If a phase requires installing new packages, say so explicitly and run
  the install rather than silently assuming they're present.
