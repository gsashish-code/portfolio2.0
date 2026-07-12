import type { Command } from '#features/terminal/types'

export const dateCommand: Command = {
  name: 'date',
  description: 'Show the current date and time',
  run: () => [{ type: 'text', content: new Date().toString() }],
}
