import { useRef, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import {
  Bluetooth,
  Maximize,
  Minimize2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
} from 'lucide-react'

import { useAnchoredPosition } from '#hooks/useAnchoredPosition'
import { useIsFullscreen } from '#hooks/useIsFullscreen'
import { usePopoverDismiss } from '#hooks/usePopoverDismiss'
import { usePopoverEntrance } from '#hooks/usePopoverEntrance'
import useSettingsStore from '#store/settings'

interface ControlCenterPopoverProps {
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen()
  } else {
    void document.documentElement.requestFullscreen()
  }
}

interface ToggleTileProps {
  label: string
  active: boolean
  icon: ReactNode
  onClick: () => void
}

function ToggleTile({ label, active, icon, onClick }: ToggleTileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl py-3 text-xs font-medium transition-colors ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200/80 text-gray-700 dark:bg-white/10 dark:text-gray-300'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

interface SliderCardProps {
  label: string
  value: number
  min: number
  icon?: ReactNode
  onChange: (value: number) => void
}

function SliderCard({ label, value, min, icon, onChange }: SliderCardProps) {
  return (
    <div className="rounded-xl bg-gray-200/60 p-3 dark:bg-white/10">
      <div className="mb-2 flex items-center justify-between text-gray-700 dark:text-gray-200">
        <span className="text-sm">{label}</span>
        <span className="text-sm">{value}%</span>
      </div>
      <div className="flex items-center gap-2">
        {icon}
        <input
          type="range"
          min={min}
          max={100}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={label}
          className="h-1 w-full flex-1 cursor-pointer appearance-none rounded-full bg-gray-400/50 accent-blue-500 dark:bg-white/20"
        />
      </div>
    </div>
  )
}

function ControlCenterPopover({
  anchorRef,
  onClose,
}: ControlCenterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const position = useAnchoredPosition(anchorRef)
  const {
    theme,
    toggleTheme,
    wifiEnabled,
    setWifiEnabled,
    brightness,
    setBrightness,
  } = useSettingsStore()
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [volume, setVolume] = useState(75)
  const isFullscreen = useIsFullscreen()

  usePopoverEntrance(popoverRef, position !== null)
  usePopoverDismiss(popoverRef, anchorRef, onClose)

  if (!position) return null

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Control Center"
      className="fixed z-50 w-72 rounded-2xl border border-black/10 bg-white/85 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/85"
      style={{ top: position.top, right: position.right }}
    >
      <div className="grid grid-cols-4 gap-2">
        <ToggleTile
          label="Wi-Fi"
          active={wifiEnabled}
          icon={<Wifi className="h-5 w-5" />}
          onClick={() => setWifiEnabled(!wifiEnabled)}
        />
        <ToggleTile
          label="Bluetooth"
          active={bluetoothEnabled}
          icon={<Bluetooth className="h-5 w-5" />}
          onClick={() => setBluetoothEnabled((prev) => !prev)}
        />
        <ToggleTile
          label={theme === 'dark' ? 'Dark' : 'Light'}
          active={theme === 'dark'}
          icon={
            theme === 'dark' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )
          }
          onClick={toggleTheme}
        />
        <ToggleTile
          label={isFullscreen ? 'Exit' : 'Fullscreen'}
          active={isFullscreen}
          icon={
            isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )
          }
          onClick={toggleFullscreen}
        />
      </div>

      <div className="mt-3 space-y-2">
        <SliderCard
          label="Display"
          value={brightness}
          min={10}
          onChange={setBrightness}
        />
        <SliderCard
          label="Volume"
          value={volume}
          min={0}
          icon={
            volume === 0 ? (
              <VolumeX className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            ) : (
              <Volume2 className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            )
          }
          onChange={setVolume}
        />
      </div>
    </div>,
    document.body,
  )
}

export default ControlCenterPopover
