import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'

export interface Point {
  x: number
  y: number
}

/**
 * Free-form drag-to-reposition for a floating panel (e.g. the Spotlight
 * search bar). `containerRef` is the element whose bounding rect is used to
 * compute the initial drag offset; call the returned `startDrag` from that
 * element's onPointerDown.
 */
export function useDraggablePosition(
  containerRef: RefObject<HTMLElement | null>,
  initialPosition: () => Point,
) {
  const [position, setPosition] = useState<Point>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const dragOffset = useRef<Point | null>(null)

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragOffset.current) return
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      })
    }
    const stopDragging = () => {
      dragOffset.current = null
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
    }
  }, [isDragging])

  const startDrag = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      dragOffset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
      setIsDragging(true)
    },
    [containerRef],
  )

  return { position, isDragging, startDrag }
}
