import type { Command } from '#features/terminal/types'

export const blogCommand: Command = {
  name: 'blog',
  description: 'Read the dev blog',
  run: (_rawArgs, ctx) => {
    ctx.openWindow('safari')
    return [{ type: 'success', content: 'Opening the dev blog in Safari…' }]
  },
}
