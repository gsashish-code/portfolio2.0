import { useRef, useState } from 'react'

import dayjs from 'dayjs'

import SearchOverlay from '#components/SearchOverlay'
import WifiPopover from '#components/WifiPopover'
import { navIcons, navLinks } from '#constants/index'

function NavBar() {
  const [isWifiOpen, setIsWifiOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const wifiRef = useRef<HTMLLIElement>(null)
  const searchRef = useRef<HTMLLIElement>(null)

  const handleIconClick = (type: (typeof navIcons)[number]['type']) => {
    switch (type) {
      case 'wifi':
        setIsWifiOpen((prev) => !prev)
        break
      case 'search':
        setIsSearchOpen((prev) => !prev)
        break
      default:
        // profile / control-center: planned in a later phase
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
