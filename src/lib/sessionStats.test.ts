import { describe, it, expect, beforeEach } from 'vitest'
import {
  formatSessionDuration,
  getSessionStats,
  recordLevelAdvance,
  touchSession,
} from './sessionStats'

beforeEach(() => {
  sessionStorage.clear()
})

describe('sessionStats', () => {
  it('touchSession starts a session', () => {
    const s = touchSession('rogue-barrage')
    expect(s.levelsMarked).toBe(0)
    expect(s.lastBuildId).toBe('rogue-barrage')
    expect(s.startedAt).toBeGreaterThan(0)
  })

  it('recordLevelAdvance increments only on new marks', () => {
    touchSession('necro-minion')
    recordLevelAdvance('necro-minion')
    recordLevelAdvance('necro-minion')
    expect(getSessionStats()?.levelsMarked).toBe(2)
  })

  it('formatSessionDuration formats minutes and hours', () => {
    const now = 1_000_000
    expect(formatSessionDuration(now - 30_000, now)).toBe('<1 min')
    expect(formatSessionDuration(now - 5 * 60_000, now)).toBe('5 min')
    expect(formatSessionDuration(now - 90 * 60_000, now)).toBe('1h 30m')
  })
})