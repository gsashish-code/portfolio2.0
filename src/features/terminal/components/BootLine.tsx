import { useTypewriter } from '../hooks/useTypewriter'

const BOOT_TEXT = "Welcome. Type 'help' to get started."

function BootLine() {
  const typed = useTypewriter(BOOT_TEXT)
  return <p className="text-[#8e8e93]">{typed}</p>
}

export default BootLine
