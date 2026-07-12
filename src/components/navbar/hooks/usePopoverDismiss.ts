import { useCallback, useEffect, type RefObject } from 'react'

import { animatePopoverClose } from '#animations/popover'

/**
 * Wires the "click outside or press Escape to dismiss" behavior shared by
 * every menu-bar popover, and plays the close animation before the caller's
 * onClose actually unmounts the popover. `elementRef` is the popover's own
 * root (clicks inside it don't dismiss it); `anchorRef` is the trigger that
 * opened it (clicks on it don't re-dismiss it either).
 */
export function usePopoverDismiss(
  elementRef: RefObject<HTMLElement | null>,
  anchorRef: RefObject<HTMLElement | null>,
  onClose: () => void,
): () => void {
  const requestClose = useCallback(() => {
    const element = elementRef.current
    if (!element) {
      onClose()
      return
    }
    animatePopoverClose(element, onClose)
  }, [elementRef, onClose])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (elementRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      requestClose()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [elementRef, anchorRef, requestClose])

  return requestClose
}
