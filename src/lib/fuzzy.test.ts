import { describe, it, expect } from 'vitest'
import { fuzzyMatch, fuzzyTest, fuzzySegments } from './fuzzy'

describe('fuzzyMatch', () => {
  it('returns a zero-score match for an empty query', () => {
    expect(fuzzyMatch('', 'anything')).toEqual({ score: 0, matches: [] })
  })

  it('matches in-order subsequences', () => {
    expect(fuzzyMatch('dok', 'Dance of Knives')).not.toBeNull()
    expect(fuzzyMatch('xyz', 'Dance of Knives')).toBeNull()
  })

  it('is case-insensitive', () => {
    expect(fuzzyTest('BARR', 'Barrage')).toBe(true)
  })

  it('rewards contiguous and prefix matches with a higher score', () => {
    const prefix = fuzzyMatch('bar', 'Barrage')!
    const scattered = fuzzyMatch('bar', 'Blood Lance Aura Rune')!
    expect(prefix.score).toBeGreaterThan(scattered.score)
  })

  it('records matched indices in order', () => {
    const m = fuzzyMatch('dok', 'Dance of Knives')!
    expect(m.matches).toHaveLength(3)
    for (let i = 1; i < m.matches.length; i++) {
      expect(m.matches[i]).toBeGreaterThan(m.matches[i - 1])
    }
  })
})

describe('fuzzySegments', () => {
  it('splits a target into hit / non-hit runs covering the whole string', () => {
    const m = fuzzyMatch('ce', 'Dance')!
    const segs = fuzzySegments('Dance', m.matches)
    expect(segs.map((s) => s.text).join('')).toBe('Dance')
    expect(segs.some((s) => s.hit)).toBe(true)
  })

  it('returns a single non-hit segment when there are no matches', () => {
    expect(fuzzySegments('Dance', [])).toEqual([{ text: 'Dance', hit: false }])
  })
})
