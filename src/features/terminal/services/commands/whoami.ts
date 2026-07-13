import { PROFILE_FIELDS } from '#database'
import type { Command } from '#features/terminal/types'

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
