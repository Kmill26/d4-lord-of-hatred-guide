// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExportMenu } from './ExportMenu'
import { BUILD_BY_ID } from '../data/builds'
import type { GuideState } from '../hooks/useGuideState'

function mockState(overrides: Partial<GuideState> = {}): GuideState {
  const build = BUILD_BY_ID['warlock-dread-claws']
  return {
    build,
    level: 10,
    view: 'guide',
    completed: new Set([1, 2]),
    flags: new Set(),
    checks: new Set(),
    compare: [],
    favorites: [],
    seenOnboarding: true,
    theme: true,
    isFavorite: () => false,
    toggleFavorite: () => true,
    selectBuild: vi.fn(),
    goToLevel: vi.fn(),
    advance: vi.fn(),
    toggleFlag: vi.fn(),
    toggleCheck: vi.fn(),
    resetProgress: vi.fn(),
    resetLevel: vi.fn(),
    setView: vi.fn(),
    getNote: () => '',
    getBuildNotes: () => ({}),
    setNote: vi.fn(),
    toggleCompare: vi.fn(),
    clearCompare: vi.fn(),
    dismissOnboarding: vi.fn(),
    setTheme: vi.fn(),
    ...overrides,
  }
}

describe('ExportMenu', () => {
  it('renders share and export buttons', () => {
    render(<ExportMenu state={mockState()} />)
    expect(screen.getByRole('button', { name: /share link/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /export build/i })).toBeInTheDocument()
  })

  it('confirms before exporting notes', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(
      <ExportMenu
        state={mockState({
          getBuildNotes: () => ({ 'warlock-dread-claws:5': 'private' }),
        })}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /export build/i }))
    expect(confirmSpy).toHaveBeenCalled()
    confirmSpy.mockRestore()
  })
})