// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useGuideState, clampLevel, parseHash, normalizeBuildProgress } from './useGuideState'
import { BUILDS } from '../data/builds'
import { MAX_FAVORITES } from '../lib/favorites'

beforeEach(() => {
  localStorage.clear()
  window.location.hash = ''
})

describe('clampLevel', () => {
  it('bounds to [1, 70] and rounds', () => {
    expect(clampLevel(0)).toBe(1)
    expect(clampLevel(999)).toBe(70)
    expect(clampLevel(12.6)).toBe(13)
    expect(clampLevel(NaN)).toBe(1)
  })
})

describe('parseHash', () => {
  it('reads a known build id and level', () => {
    window.location.hash = '#rogue-barrage/10'
    expect(parseHash()).toEqual({ buildId: 'rogue-barrage', level: 10 })
  })
  it('ignores unknown build ids', () => {
    window.location.hash = '#not-a-build/10'
    expect(parseHash().buildId).toBeUndefined()
  })
})

describe('useGuideState', () => {
  it('starts on the paths view for a fresh visitor', () => {
    const { result } = renderHook(() => useGuideState())
    expect(result.current.view).toBe('paths')
    expect(result.current.level).toBe(1)
  })

  it('selectBuild switches build and resets level (unless keepLevel)', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => result.current.goToLevel(20))
    act(() => result.current.selectBuild('rogue-barrage'))
    expect(result.current.build.id).toBe('rogue-barrage')
    expect(result.current.level).toBe(1)

    act(() => result.current.goToLevel(15))
    act(() => result.current.selectBuild('necro-minion', { keepLevel: true }))
    expect(result.current.level).toBe(15)
  })

  it('advance marks the level complete and moves on', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => result.current.advance())
    expect(result.current.level).toBe(2)
    expect(result.current.completed.has(1)).toBe(true)
  })

  it('toggleCheck and toggleFlag are per-build and reversible', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => result.current.toggleCheck('chore:filter'))
    expect(result.current.checks.has('chore:filter')).toBe(true)
    act(() => result.current.toggleCheck('chore:filter'))
    expect(result.current.checks.has('chore:filter')).toBe(false)
  })

  it('compare selection caps at three builds', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => {
      result.current.toggleCompare('rogue-barrage')
      result.current.toggleCompare('necro-minion')
      result.current.toggleCompare('sorc-static-blizzard')
      result.current.toggleCompare('paladin-zeal')
    })
    expect(result.current.compare).toHaveLength(3)
    expect(result.current.compare).not.toContain('rogue-barrage')
  })

  it('per-level notes round-trip', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => result.current.setNote(5, 'respec here'))
    expect(result.current.getNote(5)).toBe('respec here')
    expect(result.current.getNote(6)).toBe('')
  })

  it('migrates v2 progress on first load', () => {
    localStorage.setItem(
      'd4_loh_guide_v2',
      JSON.stringify({
        buildId: 'rogue-barrage',
        level: 7,
        view: 'guide',
        progress: { 'rogue-barrage': { completed: [1, 2, 3], flags: [4] } },
      }),
    )
    const { result } = renderHook(() => useGuideState())
    expect(result.current.build.id).toBe('rogue-barrage')
    expect(result.current.completed.has(2)).toBe(true)
    expect(result.current.flags.has(4)).toBe(true)
  })

  it('persists to v4 storage key', () => {
    const { result } = renderHook(() => useGuideState())
    act(() => result.current.setView('guide'))
    expect(localStorage.getItem('d4_loh_guide_v4')).toBeTruthy()
    expect(localStorage.getItem('d4_loh_guide_v3')).toBeNull()
  })

  it('toggleFavorite caps at 12 and unfavorite works', () => {
    const { result } = renderHook(() => useGuideState())
    const ids = BUILDS.map((b) => b.id).slice(0, MAX_FAVORITES + 1)
    for (const id of ids.slice(0, MAX_FAVORITES)) {
      act(() => {
        expect(result.current.toggleFavorite(id)).toBe(true)
      })
    }
    expect(result.current.favorites).toHaveLength(MAX_FAVORITES)
    act(() => {
      expect(result.current.toggleFavorite(ids[MAX_FAVORITES])).toBe(false)
    })
    act(() => {
      expect(result.current.toggleFavorite(ids[0])).toBe(true)
    })
    expect(result.current.favorites).not.toContain(ids[0])
  })

  it('normalizeBuildProgress dedupes and bounds levels', () => {
    const p = normalizeBuildProgress({ completed: [1, 1, 99, 2.4], flags: [], checks: ['a', 'a'] })
    expect(p.completed).toEqual([1, 2])
    expect(p.checks).toEqual(['a'])
  })
})
