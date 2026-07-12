import type { Command } from '#features/terminal/types'

/**
 * Stub until the Safari blog ships (Phase 5 in CLAUDE.md's roadmap). Once
 * it does, swap the return for `ctx.openWindow('safari', { view: 'blog' })`.
 */
export const blogCommand: Command = {
  name: 'blog',
  description: 'Read the dev blog (coming soon)',
  run: () => [
    {
      type: 'text',
      content:
        "The blog isn't live yet — it'll open in Safari once it ships. Try 'projects' or 'resume' in the meantime.",
    },
  ],
}
