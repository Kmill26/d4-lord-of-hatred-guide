import { describe, it, expect } from 'vitest'
import { BUILDS } from '../data/builds'
import {
  buildPayloadFromState,
  collectBuildNotes,
  exportJson,
  shareUrl,
} from './exportProgress'

describe('exportProgress', () => {
  it('collectBuildNotes filters by build prefix', () => {
    const notes = {
      'rogue-barrage:5': 'respec',
      'rogue-barrage:10': '  ',
      'necro-minion:3': 'golem',
    }
    expect(collectBuildNotes('rogue-barrage', notes)).toEqual({ 'rogue-barrage:5': 'respec' })
  })

  it('buildPayloadFromState includes shareUrl and progress', () => {
    const b = BUILDS[0]
    const payload = buildPayloadFromState({
      buildId: b.id,
      level: 12,
      progress: { completed: [1, 2], flags: [5], checks: ['chore:filter'] },
      notes: { [`${b.id}:5`]: 'note' },
      compare: [],
      favorites: [b.id],
    })
    expect(payload.buildId).toBe(b.id)
    expect(payload.completed).toEqual([1, 2])
    expect(payload.shareUrl).toBe(shareUrl(b.id, 12))
    expect(payload.favorites).toEqual([b.id])
  })

  it('exportJson is valid JSON', () => {
    const payload = buildPayloadFromState({
      buildId: 'necro-minion',
      level: 1,
      progress: { completed: [], flags: [], checks: [] },
      notes: {},
      compare: [],
      favorites: [],
    })
    expect(() => JSON.parse(exportJson(payload))).not.toThrow()
  })
})