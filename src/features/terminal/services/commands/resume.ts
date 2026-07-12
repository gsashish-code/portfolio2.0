import type { Command } from '#features/terminal/types'

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Open the résumé viewer',
  run: (_rawArgs, ctx) => {
    ctx.openWindow('resume')
    return [{ type: 'success', content: 'Opening Resume.pdf…' }]
  },
}
