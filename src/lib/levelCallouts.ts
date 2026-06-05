import { CLASSES } from '../data/classes'
import { DIFFICULTY_LADDER, LEVELING_ACTIVITIES, ROUTE } from '../data/strategy'
import type { Build, ClassName } from '../data/types'
import { inBand, parseBand, pickActivityAtLevel } from './levelBands'

export type CalloutKind = 'route' | 'activity' | 'mechanic' | 'difficulty' | 'milestone'

export interface LevelCallout {
  kind: CalloutKind
  title: string
  body: string
}

export const CALLOUT_KIND_LABELS: Record<CalloutKind, string> = {
  route: 'Route',
  activity: 'Activity',
  mechanic: 'Mechanic',
  difficulty: 'Difficulty',
  milestone: 'Milestone',
}

const SECOND_MECHANIC_CLASSES: ClassName[] = ['Rogue', 'Sorcerer', 'Spiritborn', 'Warlock']

function hasMilestoneAt(build: Build, level: number): boolean {
  return build.milestones.some((m) => m.level === level)
}

function milestoneCallout(level: number, build: Build): LevelCallout | null {
  const m = build.milestones.find((ms) => ms.level === level)
  if (!m || !m.note.trim()) return null
  if (m.respec) {
    return { kind: 'milestone', title: 'Planned respec / pivot', body: m.note }
  }
  if (m.major) {
    return { kind: 'milestone', title: 'Build milestone', body: m.note }
  }
  return { kind: 'milestone', title: m.skill, body: m.note }
}

function mechanicCallout(level: number, build: Build): LevelCallout | null {
  const mech = CLASSES[build.className].mechanic
  if (level === mech.unlockLevel) {
    return {
      kind: 'mechanic',
      title: `${mech.name} unlocks`,
      body: `${mech.unlock}. ${mech.detail}`,
    }
  }
  if (level === 30 && SECOND_MECHANIC_CLASSES.includes(build.className)) {
    return {
      kind: 'mechanic',
      title: `${build.className} — second mechanic slot`,
      body: `Many ${build.className} builds pick a secondary option at 30. Your guide’s “Your pick” and milestones cover the recommended choice.`,
    }
  }
  return null
}

function globalCallout(level: number, build: Build): LevelCallout | null {
  if (hasMilestoneAt(build, level)) return null

  const unlockLevel = CLASSES[build.className].mechanic.unlockLevel

  if (level === 5 && build.className === 'Necromancer') {
    return {
      kind: 'mechanic',
      title: 'Book of the Dead',
      body: 'Free at level 5 (not 15). Customize warriors, mages, and your Golem before other classes unlock their mechanics.',
    }
  }

  if (level === 15 && build.className !== 'Necromancer' && unlockLevel === 15) {
    return {
      kind: 'mechanic',
      title: 'Class mechanic unlock',
      body: 'Most classes unlock their signature mechanic around 15 (Paladin Oaths auto-unlock — no quest). Check Class Guide for your exact unlock.',
    }
  }

  if (level >= 30 && level <= 32 && SECOND_MECHANIC_CLASSES.includes(build.className)) {
    return {
      kind: 'mechanic',
      title: 'Secondary mechanic',
      body: 'Second slot at 30 — Rogue Preparation, Sorc second Enchantment, Spiritborn secondary Spirit Hall, or Warlock Fragment Bonuses. See your build milestones.',
    }
  }

  const bands: Array<{ band: [number, number]; callout: LevelCallout }> = [
    {
      band: [1, 3],
      callout: {
        kind: 'route',
        title: 'Campaign start',
        body: 'Lord of Hatred opens in Skovos (hub: Temis). Turn on the Loot Filter (Options → Gameplay) and upgrade your weapon whenever you can — it is the base of all damage.',
      },
    },
    {
      band: [20, 24],
      callout: {
        kind: 'difficulty',
        title: 'Push to Hard',
        body: 'Bump to Hard as soon as you kill quickly — Hard grants +75% open-world XP. You do not sit on Normal to “save” XP.',
      },
    },
    {
      band: [45, 48],
      callout: {
        kind: 'route',
        title: 'Post-campaign',
        body: 'Campaign ends ~45. Run the first Capstone Dungeon, then farm Hard Helltides and Tree of Whispers. Chase Experience Wells (+15% XP/1h).',
      },
    },
    {
      band: [50, 54],
      callout: {
        kind: 'activity',
        title: 'Strongholds & Expert',
        body: 'Clear Strongholds for one-time first-clear XP. Push Expert when clears stay fast (+125% XP vs Normal).',
      },
    },
    {
      band: [55, 59],
      callout: {
        kind: 'difficulty',
        title: 'Penitent & second Capstone',
        body: 'Second Capstone unlocks The Pit path. Penitent (+175% XP) when you still one-shot packs.',
      },
    },
    {
      band: [60, 69],
      callout: {
        kind: 'route',
        title: 'Pit & Torment handoff',
        body: 'Temper gear, socket runewords, clear Pit Tier 10 for Torment 1. Level 70 opens Paragon — respec is cheap at the cap.',
      },
    },
    {
      band: [70, 70],
      callout: {
        kind: 'route',
        title: 'Level cap reached',
        body: 'Paragon begins at 70 (account-wide). Pivot from your leveling build, unlock War Plans and Echoing Hatred on Torment 1.',
      },
    },
  ]

  return bands.find((b) => inBand(level, b.band))?.callout ?? null
}

function routePhaseCallout(level: number): LevelCallout | null {
  for (const phase of ROUTE) {
    if (parseBand(phase.range)[0] !== level) continue
    const step = phase.steps[0]
    return { kind: 'route', title: phase.title, body: step ?? phase.title }
  }
  return null
}

function activityCallout(level: number): LevelCallout | null {
  const act = pickActivityAtLevel(level, LEVELING_ACTIVITIES)
  if (!act) return null
  return { kind: 'activity', title: `Focus: ${act.name}`, body: act.value }
}

function difficultyCallout(level: number): LevelCallout | null {
  const tier = DIFFICULTY_LADDER.find((t) => {
    if (!t.levelingFocus) return false
    if (t.band[0] === 70) return level >= 70
    return inBand(level, t.band)
  })
  if (!tier) return null
  return {
    kind: 'difficulty',
    title: `World Difficulty: ${tier.name}`,
    body: `${tier.xp} — ${tier.unlock}. Climb as soon as you clear fast; XP scales with difficulty.`,
  }
}

export function getLevelCallout(level: number, build: Build): LevelCallout | null {
  return (
    milestoneCallout(level, build) ??
    mechanicCallout(level, build) ??
    globalCallout(level, build) ??
    routePhaseCallout(level) ??
    activityCallout(level) ??
    difficultyCallout(level)
  )
}