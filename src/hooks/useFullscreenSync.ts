import { useLayoutEffect } from 'react'

import { useIsFullscreen } from '#hooks/useIsFullscreen'

/** Reflects real fullscreen state onto `<html class="is-fullscreen">`, the hook Tailwind's `fullscreen:` variant reads. */
export function useFullscreenSync(): void {
  const isFullscreen = useIsFullscreen()

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-fullscreen', isFullscreen)
  }, [isFullscreen])
}
