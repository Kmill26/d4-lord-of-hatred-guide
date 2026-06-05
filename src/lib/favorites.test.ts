import { describe, it, expect } from 'vitest'
import { FAVORITE_CAP_MESSAGE, favoriteCap } from './favorites'

describe('favoriteCap', () => {
  it('unfavorites always call toggle', () => {
    let called = false
    const msg = favoriteCap(true, 'rogue-barrage', () => {
      called = true
      return true
    })
    expect(called).toBe(true)
    expect(msg).toBeUndefined()
  })

  it('returns cap message when toggle returns false', () => {
    const msg = favoriteCap(false, 'rogue-barrage', () => false)
    expect(msg).toBe(FAVORITE_CAP_MESSAGE)
  })
})