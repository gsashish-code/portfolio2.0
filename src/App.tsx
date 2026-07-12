import { NavBar, Welcome, Dock } from '#components/index'
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
    </main>
  )
}

export default App
