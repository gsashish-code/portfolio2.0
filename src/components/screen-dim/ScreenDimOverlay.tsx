import useSettingsStore from '#store/settings'

/** Control Center's Display slider dims the whole desktop via a black overlay, like a real screen's brightness control. */
function ScreenDimOverlay() {
  const brightness = useSettingsStore((state) => state.brightness)
  const dimOpacity = Math.max(0, 0.85 - brightness / 100)

  if (dimOpacity === 0) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-999999 bg-black transition-opacity duration-300"
      style={{ opacity: dimOpacity }}
    />
  )
}

export default ScreenDimOverlay
