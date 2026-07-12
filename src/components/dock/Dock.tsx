import { dockApps } from '#constants/index'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip'

function Dock() {
  const dockRef = useRef<HTMLDivElement>(null)
  function toggleApplication(appId: string) {
    // Implement the logic to toggle the application based on its ID
    console.log(`Toggling application with ID: ${appId}`)
  }

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const dockIcons = dock.querySelectorAll('.dock-icon')
    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect()
      dockIcons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const iconCenterX = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - iconCenterX)
        const intensity = Math.exp(-(distance ** 2.5) / 2000)
        gsap.to(icon, {
          scale: 1 + 0.25 + intensity * 0.5,
          y: -15 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        })
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect()
      animateIcons(e.clientX - left)
    }
    const resetIcons = () => {
      dockIcons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power1.out',
        })
      })
    }
    dock.addEventListener('mouseleave', resetIcons)
    dock.addEventListener('mousemove', handleMouseMove)
    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', resetIcons)
    }
  }, [])

  return (
    <section id="dock">
      <div className="dock-container" ref={dockRef}>
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div
            key={id || name}
            className="relative flex justify-center items-center p-2"
          >
            <button
              type="button"
              className={`dock-icon`}
              aria-label={name}
              data-tooltip-id={'dock-tooltip'}
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => {
                toggleApplication({ id, canOpen })
              }}
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
