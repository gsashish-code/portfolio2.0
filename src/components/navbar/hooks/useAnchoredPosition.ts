import { useLayoutEffect, useState, type RefObject } from 'react'

export interface AnchoredPosition {
  top: number
  right: number
}

/**
 * Tracks a position pinned below-and-right-aligned to an anchor element
 * (e.g. a menu-bar icon), re-measuring on resize/scroll. Returns null until
 * the anchor has been measured at least once.
 */
export function useAnchoredPosition(
  anchorRef: RefObject<HTMLElement | null>,
  gap = 8,
): AnchoredPosition | null {
  const [position, setPosition] = useState<AnchoredPosition | null>(null)

  useLayoutEffect(() => {
    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect()
      if (!rect) return
      setPosition({
        top: rect.bottom + gap,
        right: window.innerWidth - rect.right,
      })
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef, gap])

  return position
}
