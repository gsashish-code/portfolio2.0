import { useRef, useState } from 'react'

import dayjs from 'dayjs'

import { navIcons, navLinks } from '#database'

import ControlCenterPopover from './ControlCenterPopover'
import SearchOverlay from './SearchOverlay'
import WifiPopover from './WifiPopover'

function NavBar() {
  const [isWifiOpen, setIsWifiOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const wifiRef = useRef<HTMLLIElement>(null)
  const searchRef = useRef<HTMLLIElement>(null)
  const controlCenterRef = useRef<HTMLLIElement>(null)

  const handleIconClick = (type: (typeof navIcons)[number]['type']) => {
    switch (type) {
      case 'wifi':
        setIsWifiOpen((prev) => !prev)
        break
      case 'search':
        setIsSearchOpen((prev) => !prev)
        break
      case 'control-center':
        setIsControlCenterOpen((prev) => !prev)
        break
      default:
        // profile: planned in a later phase
        break
    }
  }

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">G S Ashish's Portfolio</p>
        <ul>
          {navLinks.map(({ name, id }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ img, id, type }) => {
            const anchorRef =
              type === 'wifi'
                ? wifiRef
                : type === 'search'
                  ? searchRef
                  : type === 'control-center'
                    ? controlCenterRef
                    : undefined

            return (
              <li key={id} ref={anchorRef}>
                <button
                  type="button"
                  onClick={() => handleIconClick(type)}
                  aria-label={type}
                >
                  <img src={img} alt={`icon-${id}`} className="icon-hover" />
                </button>
                {type === 'wifi' && isWifiOpen && (
                  <WifiPopover
                    anchorRef={wifiRef}
                    onClose={() => setIsWifiOpen(false)}
                  />
                )}
                {type === 'control-center' && isControlCenterOpen && (
                  <ControlCenterPopover
                    anchorRef={controlCenterRef}
                    onClose={() => setIsControlCenterOpen(false)}
                  />
                )}
              </li>
            )
          })}
        </ul>
        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
      {isSearchOpen && (
        <SearchOverlay
          anchorRef={searchRef}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </nav>
  )
}

export default NavBar
