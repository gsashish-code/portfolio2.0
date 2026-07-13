import { useLayoutEffect } from 'react'

import useSettingsStore from '#store/settings'

/** Reflects the settings store's theme onto `<html class="dark">`, the hook Tailwind's `dark:` variant reads. */
export function useThemeSync(): void {
  const theme = useSettingsStore((state) => state.theme)

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
}
