import { NavBar, Welcome, Dock, ScreenDimOverlay } from '#components/index'
import Photos from '#features/photos'
import Safari from '#features/safari'
import Terminal from '#features/terminal'
import { useFullscreenSync } from '#hooks/useFullscreenSync'
import { useThemeSync } from '#hooks/useThemeSync'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import './App.css'

gsap.registerPlugin(Draggable)

function App() {
  useThemeSync()
  useFullscreenSync()

  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Terminal />
      <Photos />
      <Safari />
      <ScreenDimOverlay />
    </main>
  )
}

export default App
