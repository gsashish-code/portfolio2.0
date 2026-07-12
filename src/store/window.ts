import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants/index'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface WindowState {
  isOpen: boolean
  zIndex: number
  data: unknown
}

interface WindowStore {
  windows: Record<string, WindowState>
  nextZIndex: number
  openWindow: (windowId: string, data: unknown) => void
  closeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowId, data) =>
      set((state) => {
        const window = state.windows[windowId]
        if (window) {
          window.isOpen = true
          window.data = data
          window.zIndex = state.nextZIndex
          state.nextZIndex += 1
        }
      }),
    closeWindow: (windowId) =>
      set((state) => {
        const window = state.windows[windowId]
        if (window) {
          window.isOpen = false
          window.data = null
          window.zIndex = INITIAL_Z_INDEX
        }
      }),
    focusWindow: (windowId) =>
      set((state) => {
        const window = state.windows[windowId]
        if (window) {
          window.zIndex = state.nextZIndex
          state.nextZIndex += 1
        }
      }),
  })),
)

export default useWindowStore
