import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import SafariApp from './SafariApp'

describe('SafariApp address bar', () => {
  it('stays editable (including backspace) after submitting a search', async () => {
    const user = userEvent.setup()
    render(<SafariApp />)

    const addressInput = screen.getByPlaceholderText(
      'Search or enter website name',
    )

    await user.type(addressInput, 'gsap{Enter}')
    expect(await screen.findByText(/search results for/i)).toBeInTheDocument()
    expect(addressInput).toHaveValue('gsap')

    // This is the regression this test guards: after a search commits, the
    // input used to get stuck showing the submitted query forever because
    // it was derived from the view on every render instead of from the
    // user's own edits.
    await user.type(addressInput, '{Backspace}{Backspace}')
    expect(addressInput).toHaveValue('ga')

    await user.type(addressInput, 'sap')
    expect(addressInput).toHaveValue('gasap')
  })
})
