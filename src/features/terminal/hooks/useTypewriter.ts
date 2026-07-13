import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '#utils/motion'

const CHAR_INTERVAL_MS = 18

/** Reveals `text` one character at a time; instant under prefers-reduced-motion. */
export function useTypewriter(text: string): string {
  const [visibleCount, setVisibleCount] = useState(() =>
    prefersReducedMotion() ? text.length : 0,
  )

  useEffect(() => {
    if (prefersReducedMotion()) return

    const interval = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= text.length) {
          window.clearInterval(interval)
          return count
        }
        return count + 1
      })
    }, CHAR_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [text])

  return text.slice(0, visibleCount)
}
