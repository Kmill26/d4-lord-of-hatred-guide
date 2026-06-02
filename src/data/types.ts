/**
 * Shared data types for the Lord of Hatred leveling companion.
 * All game data lives in src/data and is validated by these types.
 */

export type Tier = 'S' | 'A' | 'B'

export type ClassName =
  | 'Warlock'
  | 'Paladin'
  | 'Barbarian'
  | 'Sorcerer'
  | 'Druid'
  | 'Rogue'
  | 'Necromancer'
  | 'Spiritborn'

/** A class's signature mechanic (e.g. Soul Shards, Oaths, Enchantments). */
export interface ClassMechanic {
  name: string
  /** Character level at which the mechanic comes online. */
  unlockLevel: number
  /** How it unlocks — quest name, or "automatically". */
  unlock: string
  detail: string
  /** Selectable variants (shards / oaths / spirits / specializations). */
  options?: string[]
}

export interface ClassInfo {
  name: ClassName
  /** Portrait slug (used for the external class art with a graceful fallback). */
  slug: string
  /** New in the Lord of Hatred expansion (Paladin, Warlock). */
  isNewInLoH: boolean
  tagline: string
  fantasy: string
  /** What it looks like to play, on screen. */
  onScreen: string
  role: string
  resource: string
  primaryAttribute: string
  weapons: string
  mechanic: ClassMechanic
  /** Accent color for cards/badges. */
  accent: string
}

/** A notable level breakpoint on a build's leveling path. */
export interface Milestone {
  level: number
  skill: string
  note: string
  /** Highlighted as a major power spike / mechanic unlock. */
  major?: boolean
  /** A planned respec / pivot point. */
  respec?: boolean
}

/** A Lord of Hatred runeword = one Rune of Ritual + one Rune of Invocation. */
export interface Runeword {
  /** Rune of Ritual (the "cause" — generates Offering). */
  ritual: string
  /** Rune of Invocation (the "effect" — spends Offering). */
  invocation: string
  effect: string
}

export interface Meters {
  /** 1–5 ratings used for the "feel" bars. */
  speed: number
  survival: number
  ease: number
  damage: number
  aoe: number
}

export interface Build {
  id: string
  name: string
  className: ClassName
  tier: Tier
  tierLabel: string
  /** Soul Shard / Oath / Spirit Hall / Specialization choice, if any. */
  selection?: string
  playstyle: string
  feelsLike: string
  colors: string
  meters: Meters
  /** Ordered skill priority — also rendered as the recommended skill bar. */
  skillPriority: string[]
  milestones: Milestone[]
  gear: string[]
  runes: Runeword[]
  runeNote?: string
  respecNote?: string
  sources: string[]
}

export interface TierEntry {
  buildId: string
  note: string
}

export type TierTable = Record<Tier, TierEntry[]>

export interface Mercenary {
  name: string
  archetype: string
  /** Reinforcement perk name. */
  reinforcement: string
  role: string
  levelingNote: string
  best?: boolean
}

export interface RoutePhase {
  range: string
  title: string
  steps: string[]
}

export type SystemTag = 'New' | 'Reworked' | 'Returning' | 'Changed'

export interface SystemInfo {
  name: string
  tag: SystemTag
  summary: string
  levelingRelevance: string
}

export interface SourceRef {
  label: string
  url: string
}
