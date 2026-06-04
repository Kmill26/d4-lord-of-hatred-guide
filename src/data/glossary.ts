/**
 * New-player glossary for Diablo IV: Lord of Hatred. Each term is leveling-
 * focused. Content was drafted and adversarially fact-checked in a content pass
 * (fabricated specifics were stripped; a couple of low-confidence numbers were
 * softened). `seeAlso` references other terms by their exact `term` string.
 */
export type GlossaryCategory =
  | "Combat"
  | "Stats"
  | "Gear"
  | "Classes"
  | "Progression"
  | "Endgame"
  | "Currency"

export interface GlossaryTerm {
  term: string
  category: GlossaryCategory
  /** One-line gloss. */
  short: string
  /** 1-3 sentence explanation, leveling-focused. */
  full: string
  seeAlso?: string[]
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Vulnerable",
    category: "Combat",
    short: "Purple debuff making enemies take +20% damage from all sources for ~2s.",
    full: "A status that makes an enemy take 20% more damage from everything while it lasts (shown as a purple glow on the health bar). Every class has tools to apply it, some guaranteed (Barbarian Violent Swing, Necromancer Bone Prison) and some via Lucky Hit. The 'Damage to Vulnerable Enemies' stat multiplies this in its own bucket, so it is one of the strongest leveling stats to chase.",
    seeAlso: ["Lucky Hit", "Damage Buckets", "Critical Strike"],
  },
  {
    term: "Overpower",
    category: "Combat",
    short: "Random ~3% big-hit that scales with your Life and Fortify (teal text).",
    full: "Overpower is a random damage trigger (base ~3% chance) that adds a burst based on your Current Life plus Fortify, on top of normal skill damage. Only direct hits can Overpower (damage-over-time cannot), and it shows as teal text (orange if it also crits). It rewards high-Life, tanky leveling builds rather than pure damage stacking.",
    seeAlso: ["Fortify", "Critical Strike", "Damage Buckets"],
  },
  {
    term: "Fortify",
    category: "Stats",
    short: "Soft shield: when Fortify equals your Life you take 10% less damage.",
    full: "Fortify is a survivability layer shown under your health globe. While your Fortify amount is at or above your current Life, you gain a flat 10% damage reduction, and Fortify also directly boosts Overpower damage. It builds from armor pieces and skills and decays after 5 seconds out of combat, making it great for aggressive leveling.",
    seeAlso: ["Overpower", "Barrier", "Armor", "Resolve"],
  },
  {
    term: "Unstoppable",
    category: "Combat",
    short: "Buff that clears all crowd control and blocks new CC briefly.",
    full: "Unstoppable instantly removes any stun, root, slow, or fear on you and makes you immune to new crowd control for a short time (damage still hurts). Sources include class movement skills (Barbarian Charge, Rogue Shadow Step, Sorcerer Teleport), some Aspects like Iron Warrior, and shrines. Keep one Unstoppable skill slotted while leveling to escape deadly packs.",
    seeAlso: ["Crowd Control (CC)", "Barrier", "Aspect"],
  },
  {
    term: "Lucky Hit",
    category: "Combat",
    short: "On-hit proc chance: skill's Lucky Hit % times the effect's own %.",
    full: "Lucky Hit is a two-step roll: the skill's base Lucky Hit Chance times the effect's listed activation chance (e.g. a 20% skill with a 30% effect = 6% real trigger). It powers healing, resource refunds, and applying Vulnerable. Slow, hard-hitting skills have higher base Lucky Hit than fast ones, and +Lucky Hit Chance on rings, amulets, and gloves raises every proc.",
    seeAlso: ["Vulnerable", "Critical Strike", "Damage Buckets"],
  },
  {
    term: "Crowd Control (CC)",
    category: "Combat",
    short: "Chill/Freeze/Stun/Daze etc. that disable enemies; fills boss Stagger.",
    full: "Crowd Control is any effect that disables enemies: Chill slows them, Freeze and Stun lock them in place, Daze stops attacks, plus Slow, Root, and Fear. It buys time to reposition or burst priority targets. Bosses ignore direct CC; your CC instead fills their Stagger meter, which when full opens a damage window.",
    seeAlso: ["Unstoppable", "Vulnerable", "Resolve"],
  },
  {
    term: "Barrier",
    category: "Stats",
    short: "Extra health bar absorbing 100% of incoming damage until it breaks.",
    full: "A Barrier is a temporary shield (capped at your maximum Life) that soaks 100% of incoming damage until it is depleted or expires. It comes from specific skills and Legendary Aspects and is duration-based. Barriers are a strong leveling defense because they block hits outright rather than just reducing them.",
    seeAlso: ["Fortify", "Armor", "Aspect", "Unstoppable"],
  },
  {
    term: "Resolve",
    category: "Classes",
    short: "Paladin resource: stacks grant damage reduction, lost when you are hit.",
    full: "Resolve is the Paladin's defensive resource (NEW class). Active stacks grant stacking damage reduction, and you lose a stack each time you are hit. Shield Charge and defensive skills build it (typically 1 stack per enemy hit). The Juggernaut Oath flips this, spending stacks to enlarge your shield attacks instead of losing them, so look for Maximum Resolve Stacks and stack-generation on gear.",
    seeAlso: ["Oath", "Fortify", "Barrier"],
  },
  {
    term: "Damage Buckets",
    category: "Stats",
    short: "Damage stats split into separate multiplied groups, not one big sum.",
    full: "Your damage is calculated by multiplying several separate 'buckets' (additive damage, Vulnerable, Critical Strike, etc.) rather than adding everything together. Most +% affixes pile into one additive bucket with diminishing returns, so spreading stats across different buckets multiplies far better than overloading a single one. This is the core idea behind every strong build.",
    seeAlso: ["Vulnerable", "Critical Strike", "Greater Affix"],
  },
  {
    term: "Critical Strike",
    category: "Combat",
    short: "Chance-based hit that deals bonus Critical Strike Damage; its own bucket.",
    full: "A Critical Strike is a chance-based bigger hit. Two stats drive it: Critical Strike Chance (how often) and Critical Strike Damage (how much extra). Crit lives in its own damage bucket, so pairing Chance and Damage multiplies cleanly with Vulnerable and additive damage. A crit on an Overpower turns the text orange for a huge hit.",
    seeAlso: ["Damage Buckets", "Vulnerable", "Overpower"],
  },
  {
    term: "Resistances",
    category: "Stats",
    short: "Per-element % reduction (Fire, Cold, etc.) capped around 70%.",
    full: "Resistances reduce damage from a specific element (Fire, Cold, Lightning, Poison, Shadow). Each resistance is capped (commonly 70%) and works alongside Armor. While leveling, keep resistances topped up from gear and Elixirs, especially before pushing into Torment tiers where enemy elemental damage spikes.",
    seeAlso: ["Armor", "Torment", "Fortify"],
  },
  {
    term: "Armor",
    category: "Stats",
    short: "Main physical mitigation; also softly reduces non-physical damage.",
    full: "Armor is your primary damage reduction stat, scaling against enemy level and capped at a hard percentage. It mitigates physical damage most and contributes to non-physical mitigation too. Hit the Armor cap (largely from chest and pants) before stacking Resistances, since reaching it is the biggest survivability jump while leveling.",
    seeAlso: ["Resistances", "Fortify", "Item Power"],
  },
  {
    term: "Aspect",
    category: "Gear",
    short: "Legendary power imprinted onto gear to change or boost a skill.",
    full: "Aspects are Legendary powers that modify your skills or stats. With the skill-tree rework, many former passives now live on Aspects, so they are build-defining. You get them from dungeons (Codex of Power) or by salvaging Legendaries, then imprint them at the Occultist. Each Aspect rolls a value within a min-to-max range, and salvaging or finding a higher roll lets you store and imprint the stronger version.",
    seeAlso: ["Codex of Power", "Imprint", "Unique"],
  },
  {
    term: "Codex of Power",
    category: "Gear",
    short: "Account-wide library of Aspects you can imprint anytime.",
    full: "The Codex of Power is your permanent, account-wide collection of Legendary Aspects, filled by completing dungeons or salvaging Legendaries. Once an Aspect is in the Codex you can imprint it onto gear repeatedly, and salvaging a higher-rolled duplicate automatically upgrades the stored version. It removes the old need to hoard Legendary drops.",
    seeAlso: ["Aspect", "Imprint", "Tempering"],
  },
  {
    term: "Imprint",
    category: "Gear",
    short: "Stamp a Codex/extracted Aspect onto an item at the Occultist.",
    full: "Imprinting applies an Aspect to an item at the Occultist. Imprinting a Rare turns it Legendary; imprinting a Legendary replaces its existing power while keeping affixes. It costs Gold and Veiled Crystals (from salvaging). While leveling, imprint your key Aspects onto Rings and Amulets since you swap those slots less often.",
    seeAlso: ["Aspect", "Codex of Power", "Tempering"],
  },
  {
    term: "Tempering",
    category: "Gear",
    short: "Blacksmith adds an affix from a recipe pool; limited reroll charges.",
    full: "Tempering adds an extra affix to Rare, Legendary, Unique, or Mythic gear at the Blacksmith using learned Tempering Manuals. Each item takes one tempering affix from a recipe's pool and you get a limited number of reroll charges (more on items with Greater Affixes). A Scroll of Restoration resets exhausted charges. Temper your build's key damage affixes onto leveling gear.",
    seeAlso: ["Masterworking", "Greater Affix", "Item Power"],
  },
  {
    term: "Masterworking",
    category: "Gear",
    short: "12-rank upgrade boosting Item Power and unlocking Greater Affixes.",
    full: "Masterworking upgrades an item through 12 ranks, raising its Item Power and unlocking Greater Affixes (it needs at least 2 tempered affixes first). The usual flow is Temper then Masterwork. It is mostly an endgame (60-70+) optimization step and has limited relevance during the 1-60 campaign.",
    seeAlso: ["Tempering", "Greater Affix", "Item Power"],
  },
  {
    term: "Item Power",
    category: "Gear",
    short: "Item's strength tier; non-Ancestral caps 750, Ancestral 800+.",
    full: "Item Power (IP) sets an item's affix roll ranges and gates content. Non-Ancestral gear caps at IP 750 (from level 60+); Ancestral items always drop at IP 800+ and only appear at Torment 1+. Uniques are IP 800 minimum and Mythic Uniques always IP 900. Higher IP also enables Greater Affixes, so it is the backbone of gear progression.",
    seeAlso: ["Greater Affix", "Torment", "Masterworking"],
  },
  {
    term: "Greater Affix",
    category: "Gear",
    short: "Supercharged affix; only on high-rarity gear at high Item Power.",
    full: "Greater Affixes are high-impact, build-defining versions of normal affixes (bigger skill damage %, resource synergies) that appear only on higher-rarity items at elevated Item Power. They are guaranteed on Uniques (IP 800+) and Mythic Uniques (IP 900), and each one grants +1 tempering charge. Masterworking can also unlock them on regular gear.",
    seeAlso: ["Item Power", "Unique", "Tempering", "Masterworking"],
  },
  {
    term: "Unique",
    category: "Gear",
    short: "Named item with a special power; rolls now vary so it is a chase.",
    full: "Uniques are named items with a fixed special power and at least one Greater Affix (IP 800+). In Lord of Hatred their affixes now roll differently each drop, so three identical Unique swords can have three different stat spreads, making them a real loot chase. Tempering now also applies to Uniques from a per-Unique pool.",
    seeAlso: ["Mythic Unique", "Greater Affix", "Item Power"],
  },
  {
    term: "Mythic Unique",
    category: "Gear",
    short: "Top-tier account-bound Unique: IP 900, 4 Greater Affixes, Mythic Power.",
    full: "Mythic Uniques are the strongest items in the game: always Ancestral at IP 900 with four Greater Affixes plus a Mythic Power, and account-bound (never tradeable). They are an endgame chase you craft or find via the Horadric Cube and top-difficulty content, not something you rely on while leveling 1-70.",
    seeAlso: ["Unique", "Greater Affix", "Horadric Cube", "Item Power"],
  },
  {
    term: "Rune of Ritual",
    category: "Gear",
    short: "Runeword half that generates Offering when its condition is met.",
    full: "A Rune of Ritual is the first half of a Runeword: when its in-combat condition triggers it generates Offering, the resource that powers the second rune. Pair one Rune of Ritual with one Rune of Invocation in a 2-socket item. Overflow (generating more Offering than needed) can strengthen the effect.",
    seeAlso: ["Rune of Invocation", "Offering"],
  },
  {
    term: "Rune of Invocation",
    category: "Gear",
    short: "Runeword half that spends Offering to fire a powerful effect.",
    full: "A Rune of Invocation is the second half of a Runeword: it consumes the Offering built by your Rune of Ritual to unleash a powerful effect (damage, buff, or summon). One Ritual plus one Invocation forms a complete Runeword in a 2-socket item (Helms, Chests, Pants, or 2H weapons). While leveling, just use whatever rune pairs drop naturally.",
    seeAlso: ["Rune of Ritual", "Offering"],
  },
  {
    term: "Offering",
    category: "Currency",
    short: "Hidden resource a Rune of Ritual builds to fuel a Rune of Invocation.",
    full: "Offering is the internal resource of a Runeword. The Rune of Ritual accumulates Offering as you fight, and the Rune of Invocation spends it to activate. If the Ritual produces more than the Invocation needs, the overflow can boost the result. You do not manage Offering manually; it is the link between the two runes.",
    seeAlso: ["Rune of Ritual", "Rune of Invocation"],
  },
  {
    term: "Paragon",
    category: "Progression",
    short: "Account-wide board system unlocked at 70; up to 300 points.",
    full: "Paragon is the post-cap progression system that begins at level 70 (the new cap) and is account-wide, granting up to 300 points spent on Paragon Boards. You slot Glyphs into boards for big bonuses. Paragon is purely an endgame layer, so your 1-70 leveling is about reaching 70 to unlock it.",
    seeAlso: ["Glyph", "Torment", "Renown"],
  },
  {
    term: "Glyph",
    category: "Progression",
    short: "Socketed Paragon board upgrade that levels up; caps at rank 50.",
    full: "Glyphs are powerful upgrades socketed into Paragon Boards, boosting nearby nodes and granting bonus effects. They level up (cap rank 50) by completing The Pit, which scales their radius and power. Glyphs are part of the endgame Paragon layer and matter only after you hit level 70.",
    seeAlso: ["Paragon", "The Pit"],
  },
  {
    term: "The Pit",
    category: "Endgame",
    short: "Tiered timed dungeon; clearing Tier 10 unlocks Torment 1.",
    full: "The Pit is a scaling, timed endgame dungeon used to push difficulty and level Glyphs. Clearing Pit Tier 10 is the gate that unlocks Torment 1 (this is NOT a level-70 requirement). Higher Pit tiers give better Glyph upgrade odds, making it central to endgame Paragon progression.",
    seeAlso: ["Torment", "Glyph", "Paragon"],
  },
  {
    term: "Helltide",
    category: "Endgame",
    short: "Timed zone event with dense mobs and Cinder/Aberrant Cinder loot.",
    full: "Helltide is a recurring timed event that corrupts a zone with tougher, denser enemies and special chests bought with Cinders. Combined with War Plans it is one of the fastest endgame leveling routes. Whisper caches opened during Helltide scale to your opened Torment tier, enabling big XP multipliers.",
    seeAlso: ["Whispers / Tree of Whispers", "War Plans", "Torment"],
  },
  {
    term: "Nightmare Dungeon",
    category: "Endgame",
    short: "Sigil-activated dungeon with affixes; great density for XP.",
    full: "Nightmare Dungeons are tougher dungeon runs activated by Nightmare Sigils, adding modifiers and higher density. They are strong XP thanks to Cursed Chest and Shrine events, so prioritize finishing those events over killing every mob. They are a core endgame leveling and farming activity.",
    seeAlso: ["The Pit", "Helltide", "Torment"],
  },
  {
    term: "Whispers / Tree of Whispers",
    category: "Endgame",
    short: "Bounty system; caches scale to your opened Torment tier.",
    full: "The Tree of Whispers gives rotating Whisper bounties across zones; completing them earns Grim Favors to redeem for caches of gear and XP. Crucially, cache rewards scale to the highest Torment tier you have opened (not earned), which is why Whispers plus War Plans is a top alt-leveling and XP route.",
    seeAlso: ["Helltide", "War Plans", "Torment"],
  },
  {
    term: "Stronghold",
    category: "Progression",
    short: "Story-locked area objective; clearing one grants +100 Renown.",
    full: "Strongholds are corrupted areas you clear to reclaim, each granting +100 Renown. Skovos has its own set of strongholds that open as you progress. Clearing them is a big early Renown and XP boost and often unlocks a waypoint or vendor.",
    seeAlso: ["Renown", "Capstone Dungeon", "Helltide"],
  },
  {
    term: "Capstone Dungeon",
    category: "Progression",
    short: "Difficulty-gate dungeon (~level 45) that raises the difficulty tier.",
    full: "Capstone Dungeons are special dungeons that unlock the next difficulty tier when cleared, with the first becoming available around level 45. They are the bridge from the campaign into harder content and the Helltide/Whisper/War Plans loop. Note the modern Torment chain is gated through The Pit, not only Capstones.",
    seeAlso: ["Torment", "The Pit", "Stronghold"],
  },
  {
    term: "Torment",
    category: "Endgame",
    short: "Top 12 difficulty tiers with huge XP scaling; T1 needs Pit Tier 10.",
    full: "Torment 1-12 are the top of the 16-tier difficulty ladder, unlocked by clearing Pit Tier 10 (T1) then progressing sequentially (T1 to T2 to T3...). They massively scale XP and drop Ancestral gear. Torment 10 is the efficiency sweet spot; T12 has roughly +1,400% XP but with diminishing returns if your clear speed slows.",
    seeAlso: ["The Pit", "Item Power", "Helltide"],
  },
  {
    term: "Renown",
    category: "Progression",
    short: "Regional reward track from exploring; gives Skill Points and more.",
    full: "Renown is Skovos's reward track earned by discovering areas, finishing side quests, clearing dungeons (+40 each) and strongholds (+100 each), and unlocking waypoints. Its rewards include Skill Points that compound over the season, so chasing Renown early gives a real power and leveling edge.",
    seeAlso: ["Stronghold", "Specialization", "Paragon"],
  },
  {
    term: "Mercenary / Reinforcement",
    category: "Classes",
    short: "Hired NPC ally; also a Reinforcement that procs on your skills.",
    full: "Mercenaries are NPC allies you recruit to fight alongside you (Hire) and to call in as a Reinforcement that triggers on certain actions. Choices: Raheir (tank, safest), Varyana (DPS/speed), Subo (ranged), and Aldkin (caster/debuff). For solo leveling, Raheir's tankiness keeps you alive while you learn a build.",
    seeAlso: ["Crowd Control (CC)", "Resolve"],
  },
  {
    term: "Horadric Cube",
    category: "Endgame",
    short: "Crafting station in Temis for Unique and Rune crafting.",
    full: "The Horadric Cube is an endgame crafting station unlocked in the hub city Temis, used for crafting and upgrading Uniques and Runes (a path toward Mythic Uniques). It is not available during early leveling; it comes online as part of the Skovos endgame loop.",
    seeAlso: ["Mythic Unique", "Rune of Ritual", "Rune of Invocation"],
  },
  {
    term: "Talisman / Charm",
    category: "Gear",
    short: "Socketable charm gear holding extra affixes for added power.",
    full: "Talismans (and Charms) are a gear category that hold additional affixes to layer more stats onto your character, slotting into a dedicated system rather than normal armor slots. They are part of the endgame customization and stat-stacking toolkit in Skovos, adding another bucket of bonuses on top of armor and jewelry.",
    seeAlso: ["Greater Affix", "Damage Buckets", "Loot Filter"],
  },
  {
    term: "Loot Filter",
    category: "Gear",
    short: "Setting that hides junk drops so only useful gear shows.",
    full: "The Loot Filter lets you hide drops below a chosen quality or that lack stats you care about, cutting clutter so good items stand out. Turn it on early in the campaign so you stop picking up vendor trash and can spot Aspects, Greater Affixes, and build pieces fast.",
    seeAlso: ["Greater Affix", "Aspect", "Item Power"],
  },
  {
    term: "Book of the Dead",
    category: "Classes",
    short: "Necromancer minion-customization system; FREE at level 5.",
    full: "The Book of the Dead is the Necromancer's class mechanic for customizing Skeletal Warriors, Mages, and Golem, including sacrificing a minion type for a personal buff. It unlocks FREE at level 5 (earlier than most class mechanics, which come at 15), so Necros shape their summons very early.",
    seeAlso: ["Specialization", "Oath", "Enchantment"],
  },
  {
    term: "Oath",
    category: "Classes",
    short: "Paladin class mechanic; Oaths auto-unlock at level 15 (no quest).",
    full: "Oaths are the Paladin's (NEW class) chosen stances that reshape how skills and the Resolve resource behave (e.g. Juggernaut Oath spends Resolve to magnify shield attacks). They auto-unlock at level 15 with no quest required, defining the Paladin's playstyle from mid-campaign onward.",
    seeAlso: ["Resolve", "Specialization", "Book of the Dead"],
  },
  {
    term: "Soul Shard",
    category: "Classes",
    short: "Warlock class mechanic via quest at 15; Fragment bonus at 30.",
    full: "Soul Shards are the Warlock's (NEW class) mechanic, unlocked by a quest at level 15, that empower the class's curse-and-summon playstyle. A Fragment bonus opens at level 30 to deepen the system. Slot it as soon as the level-15 quest is available to power up your Warlock.",
    seeAlso: ["Enchantment", "Oath", "Specialization"],
  },
  {
    term: "Enchantment",
    category: "Classes",
    short: "Sorcerer mechanic: slot a skill for a passive effect; slots at 15 & 30.",
    full: "Enchantments let the Sorcerer place a skill into an Enchantment slot to gain a powerful passive version of that skill's effect instead of casting it. The first slot unlocks at level 15 and the second at level 30, so Sorcerers gain build-shaping passives in two big steps.",
    seeAlso: ["Specialization", "Soul Shard", "Book of the Dead"],
  },
  {
    term: "Specialization",
    category: "Classes",
    short: "Class mechanic system; e.g. Rogue Combo Points 15, Inner Sight ~20.",
    full: "Specialization is the umbrella term for each class's signature mechanic, most unlocking around level 15. The Rogue tiers in: Combo Points at 15, Inner Sight near 20, and Preparation near 30. Other examples include the Druid's Spirit Boons (15) and Barbarian's Technique slot (15). Unlocking your specialization is a major mid-campaign power spike.",
    seeAlso: ["Spirit Hall", "Spirit Boon", "Arsenal / Weapon Expertise"],
  },
  {
    term: "Spirit Hall",
    category: "Classes",
    short: "Spiritborn mechanic: pick spirit guardians; primary 15, secondary 30.",
    full: "The Spirit Hall is the Spiritborn's mechanic where you choose spirit guardians (Gorilla, Eagle, Jaguar, Centipede) that grant passives and reshape skills. The primary spirit unlocks at level 15 and a secondary at level 30, letting you mix two spirits for hybrid builds.",
    seeAlso: ["Spirit Boon", "Specialization", "Arsenal / Weapon Expertise"],
  },
  {
    term: "Spirit Boon",
    category: "Classes",
    short: "Druid mechanic: animal-spirit passives unlocked at level 15.",
    full: "Spirit Boons are the Druid's mechanic: you bond with animal spirits (Deer, Eagle, Wolf, Snake) to choose permanent passive boons that buff resource, damage, and survivability. They unlock at level 15 and are a key early customization step for any Druid build.",
    seeAlso: ["Spirit Hall", "Specialization", "Book of the Dead"],
  },
  {
    term: "Arsenal / Weapon Expertise",
    category: "Classes",
    short: "Barbarian system: multiple weapons with Expertise; Technique slot at 15.",
    full: "The Barbarian Arsenal lets you equip multiple weapons (two 1H, two 2H) assigned to different skills, each building Weapon Expertise bonuses as you use it. The Arsenal opens around level 5 and the Technique slot (a passive from one weapon type) unlocks at level 15, giving the Barbarian extra layered bonuses.",
    seeAlso: ["Specialization", "Spirit Hall", "Damage Buckets"],
  },
  {
    term: "Runeword",
    category: "Gear",
    short: "One Rune of Ritual + one Rune of Invocation socketed together.",
    full: "A Runeword pairs a generator (Rune of Ritual, which builds Offering) with a spender (Rune of Invocation, which consumes it) in your sockets. Most leveling guides suggest a Movement Speed or Vulnerable runeword early.",
    seeAlso: ["Rune of Ritual", "Rune of Invocation", "Offering"],
  },
  {
    term: "War Plans",
    category: "Endgame",
    short: "Post-campaign board that chains activities into one efficient run.",
    full: "At the Command Table in Temis you queue up to five activities (Whispers, Nightmare Dungeons, Helltides, the Pit, Lair Bosses, Infernal Hordes) into a single chained run — and can enter some without keys. It unlocks after the campaign and is a strong, efficient XP loop on the way to the cap.",
    seeAlso: ["Whispers / Tree of Whispers", "Helltide", "Echoing Hatred"],
  },
  {
    term: "Echoing Hatred",
    category: "Endgame",
    short: "Torment-1 wave-survival arena with an Overwhelm meter.",
    full: "A pinnacle activity at the Sightless Eye in Temis: survive waves while an Overwhelm meter rises if too many enemies live (each kill lowers it). It rewards top-tier gear, Uniques / Mythics and Talismans — a target beyond the leveling band that you are working toward.",
    seeAlso: ["Torment", "Talisman / Charm", "War Plans"],
  },
]

/**
 * Lookup by term, tolerant of aliases: the full name, the part before " (",
 * and each side of a " / " pair all resolve (so `Term name="Crowd Control"`
 * finds "Crowd Control (CC)").
 */
export const GLOSSARY_BY_TERM: Record<string, GlossaryTerm> = (() => {
  const map: Record<string, GlossaryTerm> = {}
  const add = (k: string, t: GlossaryTerm) => {
    const key = k.trim().toLowerCase()
    if (key && !(key in map)) map[key] = t
  }
  for (const t of GLOSSARY) {
    add(t.term, t)
    add(t.term.split(' (')[0], t)
    for (const part of t.term.split(' / ')) add(part, t)
  }
  return map
})()

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "Combat", "Stats", "Gear", "Classes", "Progression", "Endgame", "Currency"
]
