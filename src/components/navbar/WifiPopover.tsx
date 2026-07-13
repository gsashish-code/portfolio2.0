import { useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'

import { useAnchoredPosition } from '#hooks/useAnchoredPosition'
import { useNetworkStatus } from '#hooks/useNetworkStatus'
import { usePopoverDismiss } from '#hooks/usePopoverDismiss'
import { usePopoverEntrance } from '#hooks/usePopoverEntrance'
import useSettingsStore from '#store/settings'

interface WifiPopoverProps {
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
}

function WifiPopover({ anchorRef, onClose }: WifiPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const {
    online: reallyOnline,
    supported,
    effectiveType,
    downlinkMbps,
    rttMs,
  } = useNetworkStatus()
  const wifiEnabled = useSettingsStore((state) => state.wifiEnabled)
  const online = wifiEnabled && reallyOnline
  const position = useAnchoredPosition(anchorRef)

  usePopoverEntrance(popoverRef, position !== null)
  usePopoverDismiss(popoverRef, anchorRef, onClose)

  if (!position) return null

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Network"
      className="fixed z-50 w-72 rounded-xl border border-black/10 bg-white/90 py-2 text-sm shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/85"
      style={{ top: position.top, right: position.right }}
    >
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="font-semibold text-gray-900 dark:text-white">
          Network
        </span>
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            online ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`}
          />
          {wifiEnabled ? (online ? 'Online' : 'Offline') : 'Wi-Fi Off'}
        </span>
      </div>

      <div className="my-1 border-t border-black/5 dark:border-white/10" />

      {online && supported && (
        <dl className="space-y-1 px-3 py-1.5 text-gray-700 dark:text-gray-300">
          {effectiveType && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Connection</dt>
              <dd className="font-medium uppercase">{effectiveType}</dd>
            </div>
          )}
          {typeof downlinkMbps === 'number' && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Downlink</dt>
              <dd className="font-medium">{downlinkMbps} Mbps</dd>
            </div>
          )}
          {typeof rttMs === 'number' && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Latency</dt>
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
          {wifiEnabled
            ? 'This device currently has no network connection.'
            : 'Turn Wi-Fi on in Control Center to reconnect.'}
        </p>
      )}
    </div>,
    document.body,
  )
}

export default WifiPopover
