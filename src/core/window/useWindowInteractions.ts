import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useLayoutEffect, type RefObject } from 'react'

const MIN_WIDTH = 360
const MIN_HEIGHT = 220
const MAX_SIZE_RATIO = 0.9

function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value))
}

interface UseWindowInteractionsOptions {
  windowRef: RefObject<HTMLElement | null>
  dragHandleRef: RefObject<HTMLElement | null>
  resizeHandleRef: RefObject<HTMLElement | null>
  /** Gate + re-trigger key: refs are stable objects, so this must change
   * to a truthy value the render the window elements actually mount (they
   * don't exist yet while the window is closed). */
  enabled: boolean
}

/**
 * Centers the window on mount, then wires up two independent GSAP
 * Draggable instances: one on the title bar that moves the whole window
 * (bounded to the viewport), one on the corner grip that resizes it by
 * reading cumulative drag distance rather than letting Draggable move the
 * grip itself relative to the window's own transform.
 */
export function useWindowInteractions({
  windowRef,
  dragHandleRef,
  resizeHandleRef,
  enabled,
}: UseWindowInteractionsOptions) {
  useLayoutEffect(() => {
    if (!enabled) return

    const windowEl = windowRef.current
    const dragHandle = dragHandleRef.current
    const resizeHandle = resizeHandleRef.current
    if (!windowEl || !dragHandle || !resizeHandle) return

    const centerX = Math.max(0, (window.innerWidth - windowEl.offsetWidth) / 2)
    const centerY = Math.max(
      0,
      (window.innerHeight - windowEl.offsetHeight) / 2,
    )
    gsap.set(windowEl, { x: centerX, y: centerY })

    const [dragInstance] = Draggable.create(windowEl, {
      type: 'x,y',
      trigger: dragHandle,
      bounds: window,
      edgeResistance: 0.65,
      inertia: false,
      cursor: 'grab',
    })

    let startWidth = 0
    let startHeight = 0

    const [resizeInstance] = Draggable.create(resizeHandle, {
      type: 'x,y',
      cursor: 'nwse-resize',
      onPress() {
        startWidth = windowEl.offsetWidth
        startHeight = windowEl.offsetHeight
      },
      onDrag(this: Draggable) {
        const maxWidth = window.innerWidth * MAX_SIZE_RATIO
        const maxHeight = window.innerHeight * MAX_SIZE_RATIO
        gsap.set(windowEl, {
          width: clamp(MIN_WIDTH, maxWidth, startWidth + this.x),
          height: clamp(MIN_HEIGHT, maxHeight, startHeight + this.y),
        })
      },
      onRelease() {
        gsap.set(resizeHandle, { x: 0, y: 0 })
      },
    })

    return () => {
      dragInstance.kill()
      resizeInstance.kill()
    }
  }, [enabled, windowRef, dragHandleRef, resizeHandleRef])
}
