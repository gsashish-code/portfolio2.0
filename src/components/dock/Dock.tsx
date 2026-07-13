import { dockApps } from '#constants/index'
import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import {
  hideDock,
  magnifyDockIcons,
  resetDockIcons,
  showDock,
} from '#utils/dockAnimations'
import { toggleApplication } from '#utils/toggleApplication'

/** Grace period before hiding, so crossing the gap between the edge trigger and the icons doesn't flicker. */
const HIDE_DELAY_MS = 300
/** Brief peek on load so first-time visitors discover the hidden dock, like a Mac showing it at login. */
const INTRO_PEEK_MS = 1600

function Dock() {
  const { windows, openWindow, closeWindow } = useWindowStore()
  const dockRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<number | undefined>(undefined)

  const cancelScheduledHide = () => window.clearTimeout(hideTimeoutRef.current)

  const revealDock = () => {
    cancelScheduledHide()
    if (dockRef.current) showDock(dockRef.current)
  }

  const scheduleHideDock = () => {
    cancelScheduledHide()
    hideTimeoutRef.current = window.setTimeout(() => {
      if (dockRef.current) hideDock(dockRef.current)
    }, HIDE_DELAY_MS)
  }

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect()
      magnifyDockIcons(dock, e.clientX - left)
    }
    const handleMouseLeave = () => resetDockIcons(dock)

    dock.addEventListener('mousemove', handleMouseMove)
    dock.addEventListener('mouseleave', handleMouseLeave)

    revealDock()
    hideTimeoutRef.current = window.setTimeout(() => {
      hideDock(dock)
    }, INTRO_PEEK_MS)

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', handleMouseLeave)
      cancelScheduledHide()
    }
  }, [])

  return (
    <section
      id="dock"
      onMouseEnter={revealDock}
      onMouseLeave={scheduleHideDock}
    >
      <div className="dock-container" ref={dockRef}>
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div
            key={id}
            className="relative flex justify-center items-center p-2"
          >
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() =>
                toggleApplication(
                  id,
                  windows[id]?.isOpen ?? false,
                  openWindow,
                  closeWindow,
                )
              }
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? '' : 'opacity-60'}
              />
            </button>
          </div>
        ))}
        <Tooltip noArrow id="dock-tooltip" place="top" className="tooltip" />
      </div>
      <div className="dock-trigger" aria-hidden="true" />
    </section>
  )
}

export default Dock
