import type { ReactNode } from 'react'

const NON_BREAKING_SPACE = ' '

/**
 * Splits text into one <span> per character so each letter can be animated
 * independently (see textHoverEffect). Spaces are rendered as non-breaking
 * so they don't collapse when wrapped in a span.
 */
export function renderAnimatedText(
  text: string,
  className: string,
  baseWeight = 400,
): ReactNode[] {
  return [...text].map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? NON_BREAKING_SPACE : char}
    </span>
  ))
}
