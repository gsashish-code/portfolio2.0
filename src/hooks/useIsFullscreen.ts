import { useEffect, useState } from 'react'

/** Tracks real document fullscreen state, so it stays correct even when exited via Esc. */
export function useIsFullscreen(): boolean {
  const [isFullscreen, setIsFullscreen] = useState(() =>
    Boolean(document.fullscreenElement),
  )

  useEffect(() => {
    const handleChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  return isFullscreen
}
