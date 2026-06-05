import type { SourceRef } from './types'

/** Authoritative references behind the data in this guide (verified June 2026). */
/** Subset cited on the tier list (leveling-speed methodology). */
export const TIER_LIST_SOURCES: SourceRef[] = [
  { label: 'Maxroll — D4 build & leveling guides', url: 'https://maxroll.gg/d4' },
  { label: 'Icy Veins — D4 class & leveling guides', url: 'https://www.icy-veins.com/d4/' },
  { label: 'Wowhead — D4 Season 13 guides', url: 'https://www.wowhead.com/diablo-4/guide/gameplay/season-13-overview' },
  { label: 'Mobalytics — Everything Lord of Hatred', url: 'https://mobalytics.gg/diablo-4/guides/everything-lord-of-hatred' },
]

export const SOURCES: SourceRef[] = [
  { label: 'Official — Diablo IV: Lord of Hatred', url: 'https://diablo4.blizzard.com/en-us/lord-of-hatred' },
  { label: 'Official — Season of Reckoning', url: 'https://diablo4.blizzard.com/en-us/season' },
  { label: 'Maxroll — D4 build & leveling guides', url: 'https://maxroll.gg/d4' },
  { label: 'Icy Veins — D4 class & leveling guides', url: 'https://www.icy-veins.com/d4/' },
  { label: 'Wowhead — D4 Season 13 guides', url: 'https://www.wowhead.com/diablo-4/guide/gameplay/season-13-overview' },
  { label: 'Mobalytics — Everything Lord of Hatred', url: 'https://mobalytics.gg/diablo-4/guides/everything-lord-of-hatred' },
  { label: 'Wikipedia — Diablo IV: Lord of Hatred', url: 'https://en.wikipedia.org/wiki/Diablo_IV:_Lord_of_Hatred' },
]

export const SEASON = {
  name: 'Season of Reckoning',
  number: 13,
  expansion: 'Lord of Hatred',
  releaseDate: 'April 28, 2026',
  patch: '3.0.3',
} as const
