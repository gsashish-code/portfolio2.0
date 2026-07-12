import { useCallback, type KeyboardEvent } from 'react'

import useTerminalStore from '#store/terminal'
import useWindowStore from '#store/window'

import { TERMINAL_PROMPT, TERMINAL_WINDOW_ID } from '../constants'
import { dispatchCommand } from '../services/commands/registry'
import type { CommandContext } from '../types'

export function useTerminal() {
  const input = useTerminalStore((state) => state.input)
  const output = useTerminalStore((state) => state.output)
  const setInput = useTerminalStore((state) => state.setInput)
  const pushOutput = useTerminalStore((state) => state.pushOutput)
  const clearOutput = useTerminalStore((state) => state.clearOutput)
  const commitToHistory = useTerminalStore((state) => state.commitToHistory)
  const navigateHistory = useTerminalStore((state) => state.navigateHistory)

  const openWindow = useWindowStore((state) => state.openWindow)
  const setWindowTitle = useWindowStore((state) => state.setWindowTitle)

  const submit = useCallback(async () => {
    const raw = input
    if (raw.trim().length === 0) return

    commitToHistory(raw)

    if (raw.trim().toLowerCase() === 'clear') {
      clearOutput()
      setWindowTitle(TERMINAL_WINDOW_ID, undefined)
      setInput('')
      return
    }

    pushOutput([{ type: 'command', prompt: TERMINAL_PROMPT, input: raw }])
    setInput('')

    const ctx: CommandContext = {
      openWindow: (windowId, data) => openWindow(windowId, data ?? null),
      setTitle: (title) => setWindowTitle(TERMINAL_WINDOW_ID, title),
    }
    const lines = await dispatchCommand(raw, ctx)
    pushOutput(lines)
  }, [
    input,
    commitToHistory,
    clearOutput,
    setWindowTitle,
    setInput,
    pushOutput,
    openWindow,
  ])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        void submit()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        navigateHistory('up')
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        navigateHistory('down')
      }
    },
    [submit, navigateHistory],
  )

  return { input, output, setInput, handleKeyDown }
}
