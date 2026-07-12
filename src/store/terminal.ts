import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { OutputLine } from '#features/terminal/types'

interface TerminalStore {
  input: string
  history: string[]
  historyIndex: number | null
  output: OutputLine[]
  setInput: (value: string) => void
  pushOutput: (lines: OutputLine[]) => void
  clearOutput: () => void
  commitToHistory: (command: string) => void
  navigateHistory: (direction: 'up' | 'down') => void
}

const useTerminalStore = create<TerminalStore>()(
  immer((set) => ({
    input: '',
    history: [],
    historyIndex: null,
    output: [],
    setInput: (value) =>
      set((state) => {
        state.input = value
      }),
    pushOutput: (lines) =>
      set((state) => {
        state.output.push(...lines)
      }),
    clearOutput: () =>
      set((state) => {
        state.output = []
      }),
    commitToHistory: (command) =>
      set((state) => {
        if (command.trim().length > 0) state.history.push(command)
        state.historyIndex = null
      }),
    navigateHistory: (direction) =>
      set((state) => {
        if (state.history.length === 0) return

        if (direction === 'up') {
          const nextIndex =
            state.historyIndex === null
              ? state.history.length - 1
              : Math.max(0, state.historyIndex - 1)
          state.historyIndex = nextIndex
          state.input = state.history[nextIndex]
          return
        }

        if (state.historyIndex === null) return
        const nextIndex = state.historyIndex + 1
        if (nextIndex >= state.history.length) {
          state.historyIndex = null
          state.input = ''
        } else {
          state.historyIndex = nextIndex
          state.input = state.history[nextIndex]
        }
      }),
  })),
)

export default useTerminalStore
