import type { Command, OutputLine } from '#features/terminal/types'

const HELP_GROUPS: { label: string; commands: string[] }[] = [
  { label: 'Info', commands: ['whoami', 'show techstack', 'github stats'] },
  { label: 'Files', commands: ['ls', 'projects', 'resume', 'blog'] },
  { label: 'Session', commands: ['clear', 'history', 'date', 'echo <text>'] },
]

export const helpCommand: Command = {
  name: 'help',
  description: 'List available commands',
  run: () => {
    const lines: OutputLine[] = []
    HELP_GROUPS.forEach((group) => {
      lines.push({ type: 'text', content: group.label, tone: 'muted' })
      lines.push({
        type: 'text',
        content: group.commands.map((cmd) => `  ${cmd}`).join('\n'),
      })
    })
    return lines
  },
}
