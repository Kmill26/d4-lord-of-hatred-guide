import type { TierTable } from './types'

/**
 * Season 13 (Lord of Hatred) LEVELING-speed tier list (S/A/B).
 * Ranked on movement, survivability, ease, damage and total time to 70 at
 * season start with no resources. Build-level rankings follow Maxroll's
 * leveling tier list; where a class-level source (Icy Veins) disagrees, the
 * note says so.
 */
export const TIER_LIST: TierTable = {
  S: [
    { buildId: 'rogue-dance-of-knives', note: 'Consensus fastest overall leveler' },
    { buildId: 'rogue-twisting-blades', note: 'Tankier Rogue S-tier; great vs bosses' },
    { buildId: 'rogue-barrage', note: 'Easiest to pilot — safe ranged screen-clear' },
    { buildId: 'barb-frenzy-throw', note: 'Best Barbarian; ranged hit-and-run' },
    { buildId: 'necro-minion', note: 'Easiest, most forgiving army leveler' },
    { buildId: 'sorc-static-blizzard', note: 'Safest caster; brain-off pack melt' },
    { buildId: 'paladin-shield-retribution', note: 'Fastest Paladin; tanky Thorns AoE' },
    { buildId: 'spiritborn-quill-volley', note: 'Icy Veins/Mobalytics rate S; Maxroll’s overall list places it A' },
  ],
  A: [
    { buildId: 'barb-whirlwind', note: 'Classic spin; free Dust Devils at 15' },
    { buildId: 'sorc-charged-bolts', note: 'Best raw season-start damage' },
    { buildId: 'warlock-dread-claws', note: 'Top Warlock AoE; best endgame scaling' },
    { buildId: 'warlock-minion', note: 'Safest/fastest Warlock route' },
    { buildId: 'spiritborn-crushing-hand', note: 'Strong AoE speedfarmer for dense content' },
    { buildId: 'spiritborn-payback', note: 'Aggressive counter-attack bruiser' },
    { buildId: 'paladin-blessed-hammer', note: 'Hammerdin; steady through the campaign' },
    { buildId: 'druid-lightning-storm', note: 'Best Druid; beginner-friendly, self-sufficient' },
    { buildId: 'sorc-firewall', note: 'Fire DoT alternative; clunkier early' },
    { buildId: 'necro-blood-surge', note: 'Overpower-fueled screen-wide AoE' },
  ],
  B: [
    { buildId: 'barb-hota', note: 'Slam bruiser; big single-target' },
    { buildId: 'druid-pulverize', note: 'Durable werebear; low mobility early' },
    { buildId: 'druid-shred', note: 'High-mobility werewolf; weak early AoE' },
    { buildId: 'paladin-zeal', note: 'Crit buzzsaw melee; position-dependent' },
    { buildId: 'warlock-eviscerate', note: 'Bleed/boss-killer; mediocre AoE' },
    { buildId: 'necro-blood-lance', note: 'Direct-combat blood; needs some crafting' },
  ],
}

export const TIER_ORDER = ['S', 'A', 'B'] as const

export const TIER_LIST_NOTE =
  'Leveling-speed tiers for Season 13 (Season of Reckoning), as of the 3.0.3 patch (May 2026). ' +
  'Sources disagree on exact ordering — Maxroll ranks individual builds, Icy Veins ranks whole classes. ' +
  'Any S/A build clears the campaign comfortably; pick what you enjoy.'
