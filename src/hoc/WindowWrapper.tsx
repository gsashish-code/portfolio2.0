import { useGSAP } from '@gsap/react'
import { Minus, Plus, X, type LucideIcon } from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefObject,
} from 'react'

import { animateWindowClose, animateWindowOpen } from '#animations/window'
import { useWindowInteractions } from '#core/window/useWindowInteractions'
import useWindowStore from '#store/window'

interface TrafficLightProps {
  color: 'red' | 'yellow' | 'green'
  icon: LucideIcon
  label: string
  onClick?: () => void
}

const TRAFFIC_LIGHT_COLORS: Record<TrafficLightProps['color'], string> = {
  red: 'bg-[#ff5f57]',
  yellow: 'bg-[#febc2e]',
  green: 'bg-[#28c840]',
}

/** Exported so apps with their own custom chrome (e.g. Safari) can render matching traffic lights without duplicating the look. */
export function TrafficLight({
  color,
  icon: Icon,
  label,
  onClick,
}: TrafficLightProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-3 w-3 items-center justify-center rounded-full ${TRAFFIC_LIGHT_COLORS[color]}`}
    >
      <Icon
        aria-hidden
        strokeWidth={2.5}
        className="size-2 text-black/80 opacity-0 transition-opacity group-hover:opacity-100"
      />
    </button>
  )
}

interface WindowWrapperOptions {
  defaultWidth?: number
  defaultHeight?: number
  /**
   * 'none' skips the generic dark title bar entirely and hands the wrapped
   * component a `dragHandleRef` to attach to its own top chrome instead —
   * for apps like Safari whose own toolbar (traffic lights included) IS the
   * title bar, rather than a separate strip above it.
   */
  chrome?: 'default' | 'none'
}

const DEFAULT_WIDTH = 640
const DEFAULT_HEIGHT = 420

/**
 * Wraps a feature's root component with the entire window shell — this is
 * the one place all window behavior lives, not spread across components:
 *
 * - Chrome: dark title bar, traffic lights (red closes; yellow/green are
 *   visual-only for now).
 * - Dragging: title bar is the GSAP Draggable trigger, bounded to the
 *   viewport (see useWindowInteractions).
 * - Resizing: corner grip, also GSAP Draggable, resizes the window box
 *   directly rather than moving the grip itself (see useWindowInteractions).
 * - Open/close animation: GSAP scale+fade (see animations/window.ts),
 *   gated on the window store's `isOpen` for `windowId`. Stays mounted
 *   through the close animation (`isMounted`, separate from the store's
 *   `isOpen`) so there's something on screen to animate out before
 *   actually unmounting.
 *
 * `defaultTitle` shows until the feature pushes a context-specific title
 * via `setWindowTitle` (e.g. Terminal switching to "Tech Stack").
 */
function WindowWrapper<P extends object>(
  Component: ComponentType<
    P & {
      data?: unknown
      dragHandleRef?: RefObject<HTMLDivElement | null>
    }
  >,
  windowId: string,
  defaultTitle: string,
  {
    defaultWidth = DEFAULT_WIDTH,
    defaultHeight = DEFAULT_HEIGHT,
    chrome = 'default',
  }: WindowWrapperOptions = {},
) {
  function WrappedComponent(props: P) {
    const { windows, closeWindow, focusWindow } = useWindowStore()
    const window = windows[windowId]
    const isOpen = window?.isOpen ?? false

    const windowRef = useRef<HTMLDivElement>(null)
    const titleBarRef = useRef<HTMLDivElement>(null)
    const resizeHandleRef = useRef<HTMLDivElement>(null)
    const wasOpenRef = useRef(isOpen)
    const [isMounted, setIsMounted] = useState(isOpen)

    useWindowInteractions({
      windowRef,
      dragHandleRef: titleBarRef,
      resizeHandleRef,
      enabled: isMounted,
    })

    useEffect(() => {
      const wasOpen = wasOpenRef.current
      wasOpenRef.current = isOpen

      if (isOpen && !wasOpen) {
        setIsMounted(true)
      } else if (!isOpen && wasOpen) {
        if (windowRef.current) {
          animateWindowClose(windowRef.current, () => setIsMounted(false))
        } else {
          setIsMounted(false)
        }
      }
    }, [isOpen])

    useGSAP(() => {
      if (isMounted && windowRef.current) animateWindowOpen(windowRef.current)
    }, [isMounted])

    if (!window || !isMounted) return null

    return (
      <div
        ref={windowRef}
        onMouseDown={() => focusWindow(windowId)}
        style={{
          width: defaultWidth,
          height: defaultHeight,
          zIndex: window.zIndex,
        }}
        className="fixed top-0 left-0 flex flex-col overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/40"
      >
        {chrome === 'default' && (
          <div
            ref={titleBarRef}
            className="flex h-8 shrink-0 cursor-grab items-center bg-[#2c2c2e] px-3 active:cursor-grabbing"
          >
            <div className="group flex items-center gap-2">
              <TrafficLight
                color="red"
                icon={X}
                label="Close"
                onClick={() => closeWindow(windowId)}
              />
              <TrafficLight color="yellow" icon={Minus} label="Minimize" />
              <TrafficLight color="green" icon={Plus} label="Maximize" />
            </div>
            <p className="flex-1 truncate text-center text-[13px] font-medium text-[#d1d1d1]">
              {window.title ?? defaultTitle}
            </p>
            <div className="w-13" aria-hidden />
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-hidden">
          <Component
            {...props}
            data={window.data}
            dragHandleRef={chrome === 'none' ? titleBarRef : undefined}
          />
        </div>

        <div
          ref={resizeHandleRef}
          aria-hidden
          className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize"
        />
      </div>
    )
  }

  WrappedComponent.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`
  return WrappedComponent
}

export default WindowWrapper
