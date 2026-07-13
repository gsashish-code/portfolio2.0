import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface SettingsStore {
  theme: Theme
  /** Simulated Wi-Fi toggle from Control Center — independent of the real browser connection, so network-dependent features (e.g. `github stats`) can be demoed offline on purpose. Defaults on. */
  wifiEnabled: boolean
  /** 10-100, drives the desktop dimming overlay. */
  brightness: number
  toggleTheme: () => void
  setWifiEnabled: (enabled: boolean) => void
  setBrightness: (value: number) => void
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    immer((set) => ({
      theme: 'light',
      wifiEnabled: true,
      brightness: 100,
      toggleTheme: () =>
        set((state) => {
          state.theme = state.theme === 'dark' ? 'light' : 'dark'
        }),
      setWifiEnabled: (enabled) =>
        set((state) => {
          state.wifiEnabled = enabled
        }),
      setBrightness: (value) =>
        set((state) => {
          state.brightness = value
        }),
    })),
    { name: 'settings' },
  ),
)

export default useSettingsStore
