import { techStack } from '#constants/index'
import type { Command } from '#features/terminal/types'

export const techstackCommand: Command = {
  name: 'show techstack',
  description: 'Categorized list of technologies I work with',
  run: () => {
    const start = performance.now()
    const rows = techStack.map(({ category, items }) => ({
      cells: [category, items.join(', ')] as [string, string],
      ok: true,
    }))
    const renderTime = (performance.now() - start).toFixed(2)

    return [
      { type: 'table', headers: ['Category', 'Technologies'], rows },
      {
        type: 'success',
        content: `${rows.length} of ${rows.length} stacks loaded successfully (100%)`,
      },
      { type: 'text', content: `Render time: ${renderTime}ms`, tone: 'muted' },
    ]
  },
}
