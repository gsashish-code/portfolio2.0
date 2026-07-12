import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'

import { useNetworkStatus } from '#hooks/useNetworkStatus'

interface WifiPopoverProps {
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
}

function WifiPopover({ anchorRef, onClose }: WifiPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const { online, supported, effectiveType, downlinkMbps, rttMs } =
    useNetworkStatus()
  const [position, setPosition] = useState<{
    top: number
    right: number
  } | null>(null)

  useLayoutEffect(() => {
    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect()
      if (!rect) return
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      })
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef])

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (popoverRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onClose()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [anchorRef, onClose])

  if (!position) return null

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Network"
      className="fixed z-50 w-72 rounded-xl border border-black/10 bg-white/90 py-2 text-sm shadow-xl backdrop-blur-md"
      style={{ top: position.top, right: position.right }}
    >
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="font-semibold text-gray-900">Network</span>
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            online ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`}
          />
          {online ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="my-1 border-t border-black/5" />

      {online && supported && (
        <dl className="space-y-1 px-3 py-1.5 text-gray-700">
          {effectiveType && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Connection</dt>
              <dd className="font-medium uppercase">{effectiveType}</dd>
            </div>
          )}
          {typeof downlinkMbps === 'number' && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Downlink</dt>
              <dd className="font-medium">{downlinkMbps} Mbps</dd>
            </div>
          )}
          {typeof rttMs === 'number' && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Latency</dt>
              <dd className="font-medium">{rttMs} ms</dd>
            </div>
          )}
        </dl>
      )}

      {online && !supported && (
        <p className="px-3 py-1.5 text-xs text-gray-400">
          Detailed connection info isn&rsquo;t available in this browser.
        </p>
      )}

      {!online && (
        <p className="px-3 py-1.5 text-xs text-gray-400">
          This device currently has no network connection.
        </p>
      )}
    </div>,
    document.body,
  )
}

export default WifiPopover
