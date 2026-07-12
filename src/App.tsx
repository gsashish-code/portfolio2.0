import { NavBar, Welcome, Dock } from '#components/index'
import Photos from '#features/photos'
import Terminal from '#features/terminal'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import './App.css'

gsap.registerPlugin(Draggable)

function App() {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Terminal />
      <Photos />
    </main>
  )
}

export default App
