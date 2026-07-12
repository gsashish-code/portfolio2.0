import gsap from 'gsap'

const BASE_SCALE = 1.25
const MAGNIFICATION_SCALE = 0.5
const LIFT_DISTANCE = 15
const FALLOFF = 2000

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
