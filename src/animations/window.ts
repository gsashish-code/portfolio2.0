import gsap from 'gsap'
import { prefersReducedMotion } from '#utils/motion'

const OPEN_DURATION = 0.28
const CLOSE_DURATION = 0.2

/**
 * macOS-style window open: scale + fade in place, no bounce. Deliberately
 * leaves x/y alone — the drag/resize system owns that transform, and
 * animating it here would fight the initial centering on mount.
 */
export function animateWindowOpen(element: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(element, { autoAlpha: 1, scale: 1 })
    return
  }
  gsap.fromTo(
    element,
    { autoAlpha: 0, scale: 0.92 },
    { autoAlpha: 1, scale: 1, duration: OPEN_DURATION, ease: 'power3.out' },
  )
}

/** Reverse of animateWindowOpen; calls onComplete once the exit finishes so the caller can unmount. */
export function animateWindowClose(
  element: HTMLElement,
  onComplete: () => void,
) {
  if (prefersReducedMotion()) {
    onComplete()
    return
  }
  gsap.to(element, {
    autoAlpha: 0,
    scale: 0.92,
    duration: CLOSE_DURATION,
    ease: 'power2.in',
    onComplete,
  })
}
