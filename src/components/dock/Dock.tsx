import { dockApps } from '#constants/index'
import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { magnifyDockIcons, resetDockIcons } from '#utils/dockAnimations'
import { toggleApplication } from '#utils/toggleApplication'

function Dock() {
  const { windows, openWindow, closeWindow } = useWindowStore()
  const dockRef = useRef<HTMLDivElement>(null)

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
    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="dock">
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
    </section>
  )
}

export default Dock
