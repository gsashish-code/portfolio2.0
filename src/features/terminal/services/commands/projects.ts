import { locations } from '#database'
import type { Command } from '#features/terminal/types'

export const projectsCommand: Command = {
  name: 'projects',
  description: 'List project folders',
  run: () => [
    ...locations.work.children.map((project) => ({
      type: 'text' as const,
      content: `📁 ${project.name}`,
    })),
    {
      type: 'text' as const,
      content:
        'Open Finder from the dock for full case studies, screenshots, and live links.',
      tone: 'muted' as const,
    },
  ],
}
