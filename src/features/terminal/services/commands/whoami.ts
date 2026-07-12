import type { Command } from '#features/terminal/types'

/**
 * TODO: replace with real bio facts — LinkedIn fetch was blocked (LinkedIn
 * returns HTTP 999 to unauthenticated scrapers, and the LinkedIn MCP
 * connector isn't authorized in this environment). Swap these in directly.
 */
const PROFILE_FIELDS = [
  { label: 'Name', value: 'G S Ashish' },
  { label: 'Role', value: '<TODO: e.g. Frontend Engineer>' },
  { label: 'Location', value: '<TODO>' },
  { label: 'Focus', value: "<TODO: what you're building/learning right now>" },
  { label: 'Fun fact', value: '<TODO>' },
]

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'A quick profile card',
  run: () => [
    {
      type: 'profile',
      avatar: '🧑‍💻',
      fields: PROFILE_FIELDS,
    },
  ],
}
