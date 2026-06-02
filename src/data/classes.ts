import type { ClassInfo, ClassName } from './types'

/**
 * The eight Diablo IV: Lord of Hatred classes.
 * Paladin and Warlock are the two new classes added by the expansion
 * (released April 28, 2026); Spiritborn came from the prior Vessel of Hatred.
 *
 * Mechanics, unlock levels and unlock methods are corrected to the real
 * Season 13 (Season of Reckoning) game state — notably:
 *  - Paladin Oaths unlock AUTOMATICALLY at 15 (no quest).
 *  - Necromancer's Book of the Dead is FREE at level 5 (not 15).
 *  - Barbarian's mechanic is the four-weapon Arsenal / Weapon Expertise.
 */
export const CLASSES: Record<ClassName, ClassInfo> = {
  Warlock: {
    name: 'Warlock',
    slug: 'warlock',
    isNewInLoH: true,
    tagline: 'New in Lord of Hatred — demon-binding dual-resource caster',
    fantasy:
      'Masters of forbidden knowledge who weaponize Hell itself. The Warlock juggles two resources — Wrath (spell spam) and Dominance (summon & command Greater Demons) — in a Create / Control / Combo loop. An aggressive summoner-caster, not a passive pet class.',
    onScreen:
      'A close-to-mid-range caster in light armor who conjures and exploits demons: fans of shadow claws, swarms of lesser demons, hulking Greater Demons you reposition like chess pieces, and burning hex sigils on the ground.',
    role: 'Aggressive dual-resource summoner-caster',
    resource: 'Wrath + Dominance',
    primaryAttribute: 'Willpower',
    weapons: 'Light caster gear — wands, focuses, tomes, daggers',
    mechanic: {
      name: 'Soul Shards',
      unlockLevel: 15,
      unlock: "Class quest 'Disciple of the Forbidden' (meet Hattar in the Dry Steppes)",
      detail:
        'Choose a primary Soul Shard — each binds a signature Greater Demon and defines your playstyle. Fragment Bonuses that further upgrade your shard unlock at level 30.',
      options: [
        'Legion — binds Ae’grom; endless lesser-demon swarm',
        'Vanguard — binds Abodian; transform into Demonform',
        'Mastermind — binds Laalish; shadow / stealth control',
        'Ritualist — binds Vollach; Hellfire & hex rituals',
      ],
    },
    accent: '#9b6fd4',
  },

  Paladin: {
    name: 'Paladin',
    slug: 'paladin',
    isNewInLoH: true,
    tagline: 'New in Lord of Hatred — holy frontline crusader of Oaths and Auras',
    fantasy:
      'A heavily-armored holy warrior who channels Faith into Oaths, Auras, shield skills, spinning Blessed Hammers, and Holy/Fire damage. The Disciple Oath ascends you into the radiant winged Arbiter Form for big damage windows.',
    onScreen:
      'Grounded, heavily-armored melee: shield bashes, orbiting golden hammers, radiant aura glow, Holy and Fire impacts — and the angelic Arbiter Form on the Disciple path. Tankier and more forgiving than most levelers.',
    role: 'Holy frontline bruiser / aura tank',
    resource: 'Faith',
    primaryAttribute: 'Strength',
    weapons: 'One-handed weapons & shields (heavy armor)',
    mechanic: {
      name: 'Oaths',
      unlockLevel: 15,
      unlock: 'Automatically at level 15 — no quest required (the only class whose mechanic is not quest-gated)',
      detail:
        'All four Oaths become available at once; commit to one path that reshapes your kit. The Disciple Oath grants the Arbiter Form on cooldown-skill casts.',
      options: ['Zealot', 'Juggernaut', 'Judicator', 'Disciple (grants Arbiter Form)'],
    },
    accent: '#d4af37',
  },

  Barbarian: {
    name: 'Barbarian',
    slug: 'barbarian',
    isNewInLoH: false,
    tagline: 'Primal warrior — four weapons, shouts, and raw force',
    fantasy:
      'The only class that equips four weapons at once. Heavy weapons, battle shouts, leaps, and throws, all fueled by Fury. Frenzy Throw plays like a ranged attacker; Whirlwind is the classic spin.',
    onScreen:
      'Orange shockwaves, spinning dust devils, war cries rippling the screen. Big, loud melee — you walk into packs and they disappear. Frenzy Throw kites at range with flying axes.',
    role: 'Melee bruiser (or ranged via Frenzy Throw)',
    resource: 'Fury',
    primaryAttribute: 'Strength',
    weapons: 'Four-weapon Arsenal: 2× two-handed + 2× one-handed',
    mechanic: {
      name: 'Arsenal & Weapon Expertise',
      unlockLevel: 15,
      unlock: "Technique slot via the 'Barbarian: Masters of Battle' quest (Dry Steppes)",
      detail:
        'The four-weapon Arsenal opens around level 5; Weapon Expertise levels up as you hit enemies with each weapon type. At level 15 the Technique slot lets you pin one Weapon Expertise bonus to always be active.',
    },
    accent: '#e07830',
  },

  Sorcerer: {
    name: 'Sorcerer',
    slug: 'sorcerer',
    isNewInLoH: false,
    tagline: 'Elemental mage — ice, lightning, and fire from afar',
    fantasy:
      'The classic wizard. Teleport kiting, blizzards freezing the floor, bolts chaining between enemies, firewalls burning lanes. Mana-managed glass cannon with strong defensive cooldowns.',
    onScreen:
      'Blue ice fields, yellow lightning arcs, fire lanes. You blink away with Teleport and watch whole zones melt enemies.',
    role: 'Ranged elemental caster',
    resource: 'Mana',
    primaryAttribute: 'Intelligence',
    weapons: 'Wands, staves, focuses',
    mechanic: {
      name: 'Enchantment System',
      unlockLevel: 15,
      unlock: "'Legacy of the Magi' questline (first slot at 15, second at 30)",
      detail:
        'Socket a known skill into an Enchantment slot to gain a powerful passive version of it instead of casting it. Two slots total — assign defensive/utility skills like Ice Armor and Frost Nova while leveling.',
    },
    accent: '#4a9fb8',
  },

  Druid: {
    name: 'Druid',
    slug: 'druid',
    isNewInLoH: false,
    tagline: 'Nature and storm — werebear, werewolf, or caster storm',
    fantasy:
      'A shapeshifting nature warden. Lightning Storm rains a permanent thundercloud; Pulverize slams the earth; werewolf and werebear forms tear through packs. Spirit-fueled and self-sufficient.',
    onScreen:
      'Constant lightning raining around you, earthen shockwaves, wind and storm effects, earthy greens. Steady, reliable AoE rather than flashy burst.',
    role: 'Storm caster / shapeshift bruiser',
    resource: 'Spirit',
    primaryAttribute: 'Willpower',
    weapons: 'Two-handed maces & staves, totems',
    mechanic: {
      name: 'Spirit Boons',
      unlockLevel: 15,
      unlock: "'Spirits of the Lost Grove' quest (clear the Túr Dúlra Stronghold)",
      detail:
        'Bond with four spirit animals (Deer, Eagle, Wolf, Snake) and choose Boons from each. Lord of Hatred added Shifting Nodes that let many skills work across Human / Werebear / Werewolf forms.',
    },
    accent: '#c4783a',
  },

  Rogue: {
    name: 'Rogue',
    slug: 'rogue',
    isNewInLoH: false,
    tagline: 'Agile killer — knives, bows, traps, imbuements, shadow',
    fantasy:
      'A dexterity fighter who dashes through packs. Imbue weapons with shadow, poison, or cold; specialize your resource economy; spin daggers or rain arrows. Constant movement and screen-filling AoE.',
    onScreen:
      'Spinning steel, poison-green and shadow trails, smoke bombs, arrow volleys. You never stand still — the screen fills with blades or projectiles.',
    role: 'High-speed melee / ranged hybrid',
    resource: 'Energy',
    primaryAttribute: 'Dexterity',
    weapons: 'Dual-wield melee + ranged bow / crossbow',
    mechanic: {
      name: 'Specialization',
      unlockLevel: 15,
      unlock: "'True Potential' questline (Combo Points at 15; Inner Sight ~20; Preparation ~30)",
      detail:
        'Pick one Specialization that reshapes your Energy economy. Combo Points empowers your next Core skill; Inner Sight refunds Energy for effortless Core spam; Preparation resets cooldowns.',
      options: ['Combo Points', 'Inner Sight', 'Preparation'],
    },
    accent: '#5db87a',
  },

  Necromancer: {
    name: 'Necromancer',
    slug: 'necromancer',
    isNewInLoH: false,
    tagline: 'Army of the dead — skeletons, golems, corpses, and blood',
    fantasy:
      'You walk behind an undead wall. Raise Skeletal Warriors and Mages, command a Golem, curse foes, and detonate corpses — or go direct with screen-wide Blood Surge. Minimal aim, maximum army.',
    onScreen:
      'Bone-white minions flooding the screen, green corpse explosions, deep-red Blood Surge bursts. You point at corpses and things explode.',
    role: 'Minion commander / blood caster',
    resource: 'Essence',
    primaryAttribute: 'Intelligence',
    weapons: 'Scythes, wands, focuses, shields',
    mechanic: {
      name: 'Book of the Dead',
      unlockLevel: 5,
      unlock: 'Free at level 5 — no quest required (NOT level 15)',
      detail:
        'Customize Skeletal Warriors, Skeletal Mages, and your Golem — including sacrificing a minion type for a personal buff. Lord of Hatred split Raise Skeleton into separate Warrior and Mage skills on the tree.',
    },
    accent: '#8b7fc9',
  },

  Spiritborn: {
    name: 'Spiritborn',
    slug: 'spiritborn',
    isNewInLoH: false,
    tagline: 'Jungle mystic — quills, spectral fists, evasive strikes',
    fantasy:
      'An agile tribal warrior channeling four spirit guardians. Generate Vigor with Basic skills and spend it on big Core skills — fans of quills, giant spectral hands, evasive counters.',
    onScreen:
      'Teal and storm spirit effects, dodge-heavy movement, quill volleys and huge hand slams on impact. Mobile, ranged-feeling melee.',
    role: 'Agile spirit striker',
    resource: 'Vigor',
    primaryAttribute: 'Dexterity',
    weapons: 'Two-handed Glaive / Quarterstaff / Polearm',
    mechanic: {
      name: 'Spirit Hall',
      unlockLevel: 15,
      unlock: "'Sacred Hunt' questline — primary Spirit at 15, secondary at 30",
      detail:
        'Choose a primary Spirit Guardian at level 15 and a secondary at level 30. Eagle grants Storm Feathers + Vulnerable and movement; Gorilla is tanky; Jaguar ramps attack speed; Centipede poisons.',
      options: ['Eagle', 'Gorilla', 'Jaguar', 'Centipede'],
    },
    accent: '#3db88a',
  },
}

export const CLASS_ORDER: ClassName[] = [
  'Rogue',
  'Barbarian',
  'Sorcerer',
  'Necromancer',
  'Paladin',
  'Warlock',
  'Spiritborn',
  'Druid',
]

/** External class art, with a graceful in-component fallback if it fails to load. */
export const classPortrait = (slug: string) =>
  `https://sunderarmor.com/DIABLO4/Classes/2/${slug}.png`
