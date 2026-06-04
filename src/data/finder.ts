import type { Build, Meters } from './types'
import { TIER_RANK } from './tierList'

/**
 * "Find my build" quiz. A handful of preference questions score the 24 builds
 * and surface the best matches. Deterministic and side-effect free so it can be
 * unit-tested.
 */
export type BuildStyle = 'ranged' | 'melee' | 'minion' | 'hybrid'

/** How each build actually plays on the range/melee/minion axis. */
export const BUILD_STYLE: Record<string, BuildStyle> = {
  'rogue-dance-of-knives': 'melee',
  'rogue-twisting-blades': 'melee',
  'rogue-barrage': 'ranged',
  'barb-frenzy-throw': 'ranged',
  'barb-whirlwind': 'melee',
  'barb-hota': 'melee',
  'sorc-static-blizzard': 'ranged',
  'sorc-charged-bolts': 'ranged',
  'sorc-firewall': 'ranged',
  'necro-minion': 'minion',
  'necro-blood-surge': 'hybrid',
  'necro-blood-lance': 'ranged',
  'paladin-shield-retribution': 'hybrid',
  'paladin-blessed-hammer': 'hybrid',
  'paladin-zeal': 'melee',
  'warlock-dread-claws': 'hybrid',
  'warlock-minion': 'minion',
  'warlock-eviscerate': 'hybrid',
  'spiritborn-quill-volley': 'ranged',
  'spiritborn-crushing-hand': 'melee',
  'spiritborn-payback': 'melee',
  'druid-lightning-storm': 'ranged',
  'druid-pulverize': 'melee',
  'druid-shred': 'melee',
}

export interface FinderOption {
  label: string
  desc: string
  /** Weight applied to a build's meters when this option is chosen. */
  prefer?: Partial<Record<keyof Meters, number>>
  /** Reward builds whose style matches. */
  style?: BuildStyle
  /** Restrict to the two new Lord of Hatred classes. */
  newClassOnly?: boolean
  /** Reward classic (non-new) classes. */
  classicOnly?: boolean
}

export interface FinderQuestion {
  id: string
  question: string
  options: FinderOption[]
}

export const FINDER_QUESTIONS: FinderQuestion[] = [
  {
    id: 'distance',
    question: 'How do you like to fight?',
    options: [
      { label: 'From range, kept safe', desc: 'Projectiles and spells from a distance', style: 'ranged', prefer: { survival: 1 } },
      { label: 'Up close and personal', desc: 'In the thick of the pack', style: 'melee', prefer: { damage: 1 } },
      { label: 'Let an army do it', desc: 'Minions / demons clear for you', style: 'minion', prefer: { ease: 1, survival: 1 } },
      { label: 'I don’t care — surprise me', desc: 'No preference', prefer: {} },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most while leveling?',
    options: [
      { label: 'Raw speed to 70', desc: 'Clear and move as fast as possible', prefer: { speed: 3, aoe: 1 } },
      { label: 'Staying alive', desc: 'Forgiving, hard to kill', prefer: { survival: 3, ease: 1 } },
      { label: 'Brain-off simplicity', desc: 'Few buttons, low effort', prefer: { ease: 3 } },
      { label: 'Big satisfying damage', desc: 'Things explode', prefer: { damage: 3, aoe: 1 } },
    ],
  },
  {
    id: 'novelty',
    question: 'New content or comfort food?',
    options: [
      { label: 'Show me what’s new', desc: 'Paladin or Warlock (added in Lord of Hatred)', newClassOnly: true },
      { label: 'A classic class', desc: 'Rogue, Barb, Sorc, Necro, Druid, Spiritborn', classicOnly: true },
      { label: 'Whatever’s strongest', desc: 'Tier over novelty', prefer: {} },
    ],
  },
]

const NEW_CLASSES = new Set(['Paladin', 'Warlock'])

export interface FinderResult {
  build: Build
  score: number
}

/** Score every build against the chosen options; return best-first. */
export function recommendBuilds(answers: FinderOption[], builds: Build[]): FinderResult[] {
  const scored = builds.map((b) => {
    let score = 0
    // Tier is a strong baseline — faster builds win ties.
    score += (2 - TIER_RANK[b.tier]) * 2.5
    const isNew = NEW_CLASSES.has(b.className)
    let excluded = false
    for (const opt of answers) {
      if (!opt) continue
      if (opt.newClassOnly) {
        if (isNew) score += 5
        else excluded = true
      }
      if (opt.classicOnly && !isNew) score += 3
      if (opt.style) {
        if (BUILD_STYLE[b.id] === opt.style) score += 4
        else if (BUILD_STYLE[b.id] === 'hybrid') score += 1.5
      }
      if (opt.prefer) {
        for (const [k, w] of Object.entries(opt.prefer)) {
          score += (b.meters[k as keyof Meters] ?? 0) * (w as number)
        }
      }
    }
    return { build: b, score: excluded ? -Infinity : score }
  })
  return scored.filter((s) => s.score > -Infinity).sort((a, b) => b.score - a.score)
}
