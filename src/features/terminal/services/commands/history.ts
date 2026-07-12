import useTerminalStore from '#store/terminal'
import type { Command } from '#features/terminal/types'

export const historyCommand: Command = {
  name: 'history',
  description: 'Show previously run commands',
  run: () => {
    const { history } = useTerminalStore.getState()
    if (history.length === 0) {
      return [{ type: 'text', content: 'No commands yet.', tone: 'muted' }]
    }
    return [
      {
        type: 'text',
        content: history
          .map((command, index) => `  ${index + 1}  ${command}`)
          .join('\n'),
      },
    ]
  },
}
