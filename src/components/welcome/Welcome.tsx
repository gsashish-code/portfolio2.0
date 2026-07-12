import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { renderAnimatedText } from '#utils/renderAnimatedText'
import { setupTextHoverEffect } from '#utils/textHoverEffect'

function Welcome() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const cleanupTitle = setupTextHoverEffect(titleRef.current, 'title')
    const cleanupSubtitle = setupTextHoverEffect(
      subtitleRef.current,
      'subtitle',
    )
    return () => {
      cleanupTitle()
      cleanupSubtitle()
    }
  }, [])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderAnimatedText(
          "Hey, I'm G S Ashish! Welcome to my",
          'text-3xl font-georama',
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderAnimatedText('Portfolio', 'text-9xl italic font-georama')}
      </h1>

      {/* Small screen */}
      <div className="small-screen">
        <p>
          This portfolio is designed for desktop and tablet devices. It is not
          optimized for mobile devices. Please use a desktop or tablet device to
          view this portfolio.
        </p>
      </div>
    </section>
  )
}

export default Welcome
