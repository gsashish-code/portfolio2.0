import gsap from 'gsap'

const OPEN_DURATION = 0.22
const CLOSE_DURATION = 0.16

/**
 * macOS-style pop-in used for Spotlight-like overlays and menu-bar popovers:
 * a quick scale + fade from the element's own center, no bounce.
 */
export function animatePopoverOpen(element: HTMLElement) {
  gsap.fromTo(
    element,
    { autoAlpha: 0, scale: 0.92, y: -8 },
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: OPEN_DURATION,
      ease: 'power3.out',
    },
  )
}

/** Reverse of animatePopoverOpen; calls onComplete once the exit finishes so the caller can unmount. */
export function animatePopoverClose(
  element: HTMLElement,
  onComplete: () => void,
) {
  gsap.to(element, {
    autoAlpha: 0,
    scale: 0.94,
    y: -6,
    duration: CLOSE_DURATION,
    ease: 'power2.in',
    onComplete,
  })
}
