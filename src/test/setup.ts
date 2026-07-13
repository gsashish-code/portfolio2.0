import '@testing-library/jest-dom'

// jsdom doesn't implement matchMedia; several utilities (prefersReducedMotion,
// theme/fullscreen sync) call it unconditionally on mount.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
