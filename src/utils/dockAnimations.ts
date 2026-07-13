import gsap from 'gsap'
import { prefersReducedMotion } from '#utils/motion'

const BASE_SCALE = 1.25
const MAGNIFICATION_SCALE = 0.5
const LIFT_DISTANCE = 15
const FALLOFF = 2000

const SHOW_DURATION = 0.35
const HIDE_DURATION = 0.22
const HIDE_OFFSET = '120%'

export function magnifyDockIcons(dock: HTMLElement, mouseX: number) {
  const { left } = dock.getBoundingClientRect()
  const dockIcons = dock.querySelectorAll<HTMLElement>('.dock-icon')

  dockIcons.forEach((icon) => {
    const { left: iconLeft, width } = icon.getBoundingClientRect()
    const iconCenterX = iconLeft - left + width / 2
    const distance = Math.abs(mouseX - iconCenterX)
    const intensity = Math.exp(-(distance ** 2.5) / FALLOFF)

    gsap.to(icon, {
      scale: BASE_SCALE + intensity * MAGNIFICATION_SCALE,
      y: -LIFT_DISTANCE * intensity,
      duration: 0.2,
      ease: 'power1.out',
    })
  })
}

export function resetDockIcons(dock: HTMLElement) {
  const dockIcons = dock.querySelectorAll<HTMLElement>('.dock-icon')

  dockIcons.forEach((icon) => {
    gsap.to(icon, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power1.out',
    })
  })
}

/** macOS-style dock reveal: slides up from below the viewport edge. */
export function showDock(dock: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(dock, { y: 0, autoAlpha: 1 })
    return
  }
  gsap.to(dock, {
    y: 0,
    autoAlpha: 1,
    duration: SHOW_DURATION,
    ease: 'power3.out',
    overwrite: true,
  })
}

/** Reverse of showDock; drops the dock back below the viewport edge. */
export function hideDock(dock: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(dock, { y: HIDE_OFFSET, autoAlpha: 0 })
    return
  }
  gsap.to(dock, {
    y: HIDE_OFFSET,
    autoAlpha: 0,
    duration: HIDE_DURATION,
    ease: 'power2.in',
    overwrite: true,
  })
}
