import type { Command } from '#features/terminal/types'

export const echoCommand: Command = {
  name: 'echo',
  description: 'Print back whatever you type after it',
  run: (rawArgs) => [{ type: 'text', content: rawArgs }],
}
