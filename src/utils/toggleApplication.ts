import { dockApps } from '#database'

export function toggleApplication(
  appId: string,
  isOpen: boolean,
  openWindow: (windowId: string, data: unknown) => void,
  closeWindow: (windowId: string) => void,
) {
  const app = dockApps.find((app) => app.id === appId)
  if (!app || !app.canOpen) return

  if (isOpen) {
    closeWindow(appId)
  } else {
    openWindow(appId, null)
  }
}
