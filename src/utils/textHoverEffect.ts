import gsap from 'gsap'

export type TextWeightVariant = 'title' | 'subtitle'

interface FontWeightRange {
  min: number
  max: number
  default: number
}

const FONT_WEIGHTS: Record<TextWeightVariant, FontWeightRange> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

const HOVER_TWEEN_DURATION = 0.3
const LEAVE_TWEEN_DURATION = 0.5
// Controls how quickly the weight boost falls off with distance from the
// cursor; larger = wider glow, tuned by eye against the falloff curve.
const DISTANCE_FALLOFF = 20000

function animateLetterWeight(
  letter: HTMLSpanElement,
  weight: number,
  duration: number,
) {
  gsap.to(letter, {
    duration,
    ease: 'power2.out',
    fontVariationSettings: `'wght' ${weight}`,
  })
}

/**
 * Wires up a magnetic variable-font-weight hover effect on a container of
 * per-letter <span>s (see renderAnimatedText). Letter positions are measured
 * once and cached, then reused on every pointer move — recomputing
 * getBoundingClientRect() per letter per mousemove would force a layout
 * reflow on each frame. Position updates only happen on resize, and the
 * per-frame animation work is batched behind requestAnimationFrame so rapid
 * native mousemove events collapse into a single GSAP update per frame.
 */
export function setupTextHoverEffect(
  container: HTMLElement | null,
  variant: TextWeightVariant,
): () => void {
  if (!container) return () => {}

  const letters = Array.from(container.querySelectorAll('span'))
  const { min, max, default: baseWeight } = FONT_WEIGHTS[variant]

  let containerLeft = 0
  let letterCenters: number[] = []

  const measure = () => {
    containerLeft = container.getBoundingClientRect().left
    letterCenters = letters.map(
      (letter) =>
        letter.getBoundingClientRect().left -
        containerLeft +
        letter.offsetWidth / 2,
    )
  }
  measure()

  let frameId: number | null = null
  let pendingMouseX = 0

  const applyWeights = () => {
    frameId = null
    letters.forEach((letter, index) => {
      const distance = Math.abs(pendingMouseX - letterCenters[index])
      const intensity = Math.exp(-(distance ** 2) / DISTANCE_FALLOFF)
      animateLetterWeight(
        letter,
        min + (max - min) * intensity,
        HOVER_TWEEN_DURATION,
      )
    })
  }

  const handleMouseMove = (event: MouseEvent) => {
    pendingMouseX = event.clientX - containerLeft
    frameId ??= requestAnimationFrame(applyWeights)
  }

  const handleMouseLeave = () => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    letters.forEach((letter) =>
      animateLetterWeight(letter, baseWeight, LEAVE_TWEEN_DURATION),
    )
  }

  window.addEventListener('resize', measure)
  container.addEventListener('mousemove', handleMouseMove)
  container.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    if (frameId !== null) cancelAnimationFrame(frameId)
    window.removeEventListener('resize', measure)
    container.removeEventListener('mousemove', handleMouseMove)
    container.removeEventListener('mouseleave', handleMouseLeave)
  }
}
