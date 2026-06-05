import { describe, it, expect } from 'vitest'
import { LEVELING_ACTIVITIES } from '../data/strategy'
import { inBand, parseBand, pickActivityAtLevel } from './levelBands'

describe('parseBand', () => {
  it('parses en-dash and hyphen ranges', () => {
    expect(parseBand('1–45')).toEqual([1, 45])
    expect(parseBand('60-70')).toEqual([60, 70])
  })
})

describe('inBand', () => {
  it('is inclusive on both ends', () => {
    expect(inBand(45, [45, 48])).toBe(true)
    expect(inBand(44, [45, 48])).toBe(false)
  })
})

describe('pickActivityAtLevel', () => {
  it('prefers the narrowest matching band', () => {
    const at50 = pickActivityAtLevel(50, LEVELING_ACTIVITIES)
    expect(at50?.name).toBe('Strongholds')
  })
})