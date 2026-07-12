import { useEffect, useState } from 'react'

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string
  downlink?: number
  rtt?: number
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike
}

export interface NetworkStatus {
  online: boolean
  /** Whether the (non-standard, Chromium-only) Network Information API is present. */
  supported: boolean
  effectiveType?: string
  downlinkMbps?: number
  rttMs?: number
}

function readStatus(): NetworkStatus {
  const connection = (navigator as NavigatorWithConnection).connection
  return {
    online: navigator.onLine,
    supported: Boolean(connection),
    effectiveType: connection?.effectiveType,
    downlinkMbps: connection?.downlink,
    rttMs: connection?.rtt,
  }
}

/**
 * Real, browser-reported connection info. There is no web API on any
 * browser/OS that exposes actual Wi-Fi signal strength (blocked for
 * fingerprinting/privacy reasons) — this is the closest real substitute:
 * online/offline plus, where the Network Information API is present
 * (Chromium only), a rough quality estimate.
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>(readStatus)

  useEffect(() => {
    const update = () => setStatus(readStatus())
    const connection = (navigator as NavigatorWithConnection).connection

    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    connection?.addEventListener('change', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      connection?.removeEventListener('change', update)
    }
  }, [])

  return status
}
