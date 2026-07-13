import { locations } from '#database'
import type { Command } from '#features/terminal/types'

export const lsCommand: Command = {
  name: 'ls',
  description: 'List the top-level Finder locations',
  run: () => [
    {
      type: 'text',
      content: Object.values(locations)
        .map((location) => location.name)
        .join('    '),
    },
  ],
}
