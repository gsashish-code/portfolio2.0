import type { RefObject } from 'react'

import { useGSAP } from '@gsap/react'

import { animatePopoverOpen } from '#animations/popover'

/**
 * Plays the popover's entrance animation once it's actually ready to be
 * measured/animated. Defaults to firing on mount; pass `ready` for popovers
 * (like WifiPopover) that render null until an anchor-relative position is
 * known — keying off that boolean rather than the position value itself
 * means this fires exactly once, not on every reposition.
 */
export function usePopoverEntrance(
  elementRef: RefObject<HTMLElement | null>,
  ready = true,
): void {
  useGSAP(() => {
    if (ready && elementRef.current) animatePopoverOpen(elementRef.current)
  }, [ready])
}
