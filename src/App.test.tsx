// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  localStorage.clear()
  window.location.hash = ''
})
afterEach(cleanup)

describe('<App> smoke', () => {
  it('renders the shell, tablist and first-run build finder', async () => {
    render(<App />)
    expect(screen.getByText(/Lord of Hatred/i)).toBeInTheDocument()
    expect(screen.getByRole('tablist', { name: /guide sections/i })).toBeInTheDocument()
    // First visit pops the build finder.
    expect(await screen.findByText(/Find my build/i)).toBeInTheDocument()
    // The default (paths) view eventually resolves from its lazy chunk.
    expect(await screen.findByRole('tabpanel')).toBeInTheDocument()
  })

  it('opens the command palette on its trigger button', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open command palette/i }))
    expect(await screen.findByRole('dialog', { name: /command palette/i })).toBeInTheDocument()
  })
})
