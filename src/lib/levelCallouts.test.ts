import { describe, it, expect } from 'vitest'
import { BUILD_BY_ID } from '../data/builds'
import { getLevelCallout } from './levelCallouts'

describe('getLevelCallout', () => {
  it('L5 Necro returns milestone about Book of the Dead', () => {
    const necro = BUILD_BY_ID['necro-minion']
    const c = getLevelCallout(5, necro)
    expect(c?.kind).toBe('milestone')
    expect(c?.body).toMatch(/Book of the Dead|NOT level 15/i)
  })

  it('L15 class mechanic callout when no milestone at 15', () => {
    const paladin = BUILD_BY_ID['paladin-shield-retribution']
    if (paladin.milestones.some((m) => m.level === 15)) return
    expect(getLevelCallout(15, paladin)?.title).toBe('Class mechanic unlock')
  })

  it('L30 second mechanic for Sorc when no milestone at 30', () => {
    const sorc = BUILD_BY_ID['sorc-charged-bolts']
    if (sorc.milestones.some((m) => m.level === 30)) return
    expect(getLevelCallout(30, sorc)?.title).toContain('second mechanic')
  })

  it('L38 sorc respec milestone surfaces pivot advice', () => {
    const sorc = BUILD_BY_ID['sorc-static-blizzard']
    const m = sorc.milestones.find((x) => x.respec)
    expect(m).toBeTruthy()
    const c = getLevelCallout(m!.level, sorc)
    expect(c?.kind).toBe('milestone')
    expect(c?.title).toBe('Planned respec / pivot')
  })

  it('campaign start band callout at L1 when no milestone', () => {
    const rogue = BUILD_BY_ID['rogue-barrage']
    if (rogue.milestones.some((m) => m.level === 1)) return
    expect(getLevelCallout(1, rogue)?.title).toBe('Campaign start')
  })
})