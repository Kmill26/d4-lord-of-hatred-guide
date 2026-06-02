/** Class & build identity — what each path LOOKS and FEELS like */
window.D4_CLASS_IMG = (slug) =>
  `https://sunderarmor.com/DIABLO4/Classes/2/${slug}.png`;

window.D4_CLASSES = {
  Warlock: {
    slug: "warlock",
    tagline: "New in Lord of Hatred — demon binder from the front line",
    fantasy: "You command Hell and the Abyss. Lesser demons swarm, Greater Demons smash, and you weave shadow, fire, and hexes. Two resources: Wrath (spam skills) and Dominance (big demons).",
    onScreen: "Purple-black shadow claws, burning sigils on the ground, hulking demons you reposition like chess pieces. Close-range caster in light armor — not a back-line mage.",
    role: "Hybrid summoner / burst caster",
    newInLoH: true,
    mechanic: "Soul Shards (pick at 15): Legion (army), Vanguard (transform), Mastermind (stealth/shadow), Ritualist (hellfire hexes). Dread Claws uses Mastermind.",
  },
  Rogue: {
    slug: "rogue",
    tagline: "Agile killer — knives, bows, traps, shadow",
    fantasy: "Dexterity fighter who dashes through packs. Combo Points or other specs change the loop, but leveling builds are about constant movement and AoE blades.",
    onScreen: "Spinning steel, poison green trails, smoke bombs. You never stand still — the screen fills with projectiles and blade storms.",
    role: "High-speed melee / ranged hybrid",
    newInLoH: false,
    mechanic: "Specialization at 15 (Combo Points for Dance of Knives).",
  },
  Barbarian: {
    slug: "barbarian",
    tagline: "Primal warrior — shouts, leaps, and raw force",
    fantasy: "Heavy weapons, battle shouts, and unstoppable melee. Frenzy Throw plays almost like a ranged attacker; Whirlwind is the classic spin.",
    onScreen: "Orange shockwaves, spinning dust devils, war cries rippling the screen. Big, loud, melee — you walk into packs and they disappear.",
    role: "Melee bruiser",
    newInLoH: false,
    mechanic: "Weapon Expertise & shouts for defense and fury.",
  },
  Sorcerer: {
    slug: "sorcerer",
    tagline: "Elemental mage — ice, lightning, fire from afar",
    fantasy: "Classic wizard. Teleport kiting, blizzards freezing the floor, bolts chaining between enemies.",
    onScreen: "Blue ice fields, yellow lightning arcs, firewall lanes. You blink away and watch zones melt enemies.",
    role: "Ranged elemental caster",
    newInLoH: false,
    mechanic: "Enchantments on weapons; mana management.",
  },
  Necromancer: {
    slug: "necromancer",
    tagline: "Army of the dead — skeletons and corpses",
    fantasy: "You walk behind an undead wall. Raise Skeleton, Corpse Explosion — minimal aim, maximum army.",
    onScreen: "Bone-white minions flooding the screen, green corpse bursts. You point at corpses and things explode.",
    role: "Minion commander",
    newInLoH: false,
    mechanic: "Book of the Dead at 15 — customize skeleton types.",
  },
  Paladin: {
    slug: "paladin",
    tagline: "New in Lord of Hatred — holy warrior with wings",
    fantasy: "Crusader fantasy: auras, hammers orbiting you, shield bashes, angelic wings for mobility. Tankier than most levelers.",
    onScreen: "Golden hammers spinning, radiant wings, shield flashes. Slower than Rogue but visually iconic and forgiving.",
    role: "Aura bruiser / holy melee",
    newInLoH: true,
    mechanic: "Disciple Oath quest at 15; Oath skills swap on the bar.",
  },
  Druid: {
    slug: "druid",
    tagline: "Nature and storm — werebear or caster storm",
    fantasy: "Lightning Storm leveling = walk with a permanent thundercloud. Shapeshift forms exist but storm is the fast level route.",
    onScreen: "Constant lightning raining around you, wind effects, earthy greens. Less flashy than Sorc ice but very steady AoE.",
    role: "Storm / shapeshift hybrid",
    newInLoH: false,
    mechanic: "Spirit boons at 15.",
  },
  Spiritborn: {
    slug: "spiritborn",
    tagline: "Jungle mystic — evade, spirits, big slams",
    fantasy: "Agile tribal warrior channeling spirits. Crushing Hand = giant spectral fist smashing down.",
    onScreen: "Teal spirit effects, dodge-heavy movement, huge hand slams on impact. Mobile melee with spirit visuals.",
    role: "Agile spirit striker",
    newInLoH: false,
    mechanic: "Spirit system at 15.",
  },
};

window.D4_BUILD_VISUALS = {
  "warlock-dread-claws": {
    tagline: "Shadow assassin with a demon bodyguard",
    feelsLike: "A tactical burst mage who teleports, drops a demon in the pack, and detonates double rings of shadow claws.",
    colors: "Purple abyss, shadow trails, occasional green hex sigils",
    meters: { speed: 3, survival: 2, ease: 3, damage: 4, aoe: 5 },
    phases: [
      {
        through: 14,
        title: "Levels 1–14 — Whip & Claws",
        onScreen: "You whip enemies with a demon tail (Hellion Sting), then slash forward with four shadow claws (Dread Claws). Still frontal cones — not circles yet.",
        skillBar: ["Hellion Sting (LMB spam)", "Dread Claws (core)", "Nether Step (move)", "empty ×3"],
        rotation: "Nether Step into pack → Dread Claws → Hellion Sting when low on Wrath. On bosses, focus Hellion Sting with crosshair on target.",
      },
      {
        through: 33,
        title: "Levels 15–33 — Double Ring Terror",
        onScreen: "★ Game changer at 15: claws form TWO circles — one around YOU, one around your Rampage demon. Screen fills with purple AoE. Sigil drops hex circles.",
        skillBar: ["Dread Claws", "Rampage (place demon)", "Hellion Sting (bosses)", "Nether Step", "Sigil of Subversion", "Laalish/command"],
        rotation: "Summon Rampage inside pack → Dread Claws (both rings hit) → Nether Step for Shadowform → repeat. Boss: hold Hellion Sting on target.",
      },
      {
        through: 70,
        title: "Levels 34–70 — Fallen Army + Terror Demon",
        onScreen: "After respec: no more tail whip — you tap Command Fallen (lunatics charge and explode). Metamorphosis turns you into a terror demon for burst windows.",
        skillBar: ["Dread Claws", "Command Fallen", "Rampage", "Metamorphosis", "Nether Step", "utility"],
        rotation: "Tap Command Fallen 2–3× when ready → Rampage in pack → spam Dread Claws → Metamorphosis on elites. Dark Prison automated later via runes.",
      },
    ],
  },
  "warlock-minion": {
    tagline: "General of a demon army",
    feelsLike: "Walking through zones while minions clear — you cast occasionally and stay safer than Dread Claws.",
    colors: "Swarms of small demons, less shadow spectacle",
    meters: { speed: 4, survival: 4, ease: 5, damage: 3, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Constant small demons on screen; you're often behind the pack directing summons.", skillBar: ["Hellhound / Fallen", "Rampage", "buffs", "move"], rotation: "Keep summons up, walk through packs, use core when off cooldown." },
    ],
  },
  "rogue-dance-of-knives": {
    tagline: "Human blender — spinning knife storm",
    feelsLike: "Diablo's fastest leveler. You dash and the screen becomes knives.",
    colors: "Steel grey, poison green, smoke grey",
    meters: { speed: 5, survival: 3, ease: 4, damage: 5, aoe: 5 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Knives orbit and fly everywhere; you zip with Blade Shift. Poison green on weapons.", skillBar: ["Dance of Knives", "Blade Shift", "Dark Shroud", "Concealment", "Poison Imbuement", "Dash"], rotation: "Dark Shroud up → Blade Shift into pack → hold Dance of Knives → Concealment on danger." },
    ],
  },
  "rogue-twisting-blades": {
    tagline: "Armored blade tornado",
    feelsLike: "Similar to Dance of Knives but tankier — blades return to you for defense.",
    colors: "Spinning blades, darker rogue tones",
    meters: { speed: 4, survival: 4, ease: 4, damage: 4, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Blades spiral around you as you walk through enemies.", skillBar: ["Twisting Blades", "Blade Shift", "Dark Shroud", "..."], rotation: "Keep blades up, walk through packs, shift for energy." },
    ],
  },
  "barb-frenzy-throw": {
    tagline: "Axe machine gun barbarian",
    feelsLike: "Stay at range throwing axes while Frenzy stacks — safer than melee spin.",
    colors: "Orange impacts, war cry shockwaves",
    meters: { speed: 5, survival: 4, ease: 4, damage: 5, aoe: 3 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Axes fly to enemies; War Cry buffs; Wrath of Berserker for burst windows.", skillBar: ["Frenzy Throw", "Frenzy", "War Cry", "shouts", "Wrath", "leap"], rotation: "Build Frenzy stacks → Throw → War Cry on cooldown → Berserker for elites." },
    ],
  },
  "barb-whirlwind": {
    tagline: "Classic spin-to-win",
    feelsLike: "Run into pack, hold spin, everything dies.",
    colors: "Dust tornado, red rage effects",
    meters: { speed: 4, survival: 3, ease: 5, damage: 4, aoe: 5 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Permanent whirlwind vortex around your character.", skillBar: ["Whirlwind", "Lunging Strike", "shouts", "Wrath"], rotation: "Shout buffs → spin through packs → Lunging Strike for fury refill." },
    ],
  },
  "sorc-blizzard": {
    tagline: "Walking blizzard — freeze the map",
    feelsLike: "Kite backward, leave ice zones, enemies shatter.",
    colors: "Ice blue floors, white frost",
    meters: { speed: 3, survival: 4, ease: 5, damage: 4, aoe: 5 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Permanent blizzard circles; Teleport blink; frozen enemies.", skillBar: ["Blizzard", "Teleport", "Ice Armor", "Frost Bolt", "Nova", "Ult"], rotation: "Lay Blizzard → Teleport kite → refresh zones → Nova when surrounded." },
    ],
  },
  "sorc-charged-bolts": {
    tagline: "Lightning factory → Ball Lightning",
    feelsLike: "Early: bolts spray forward. Late: giant lightning ball clears halls.",
    colors: "Yellow lightning, later big orb",
    meters: { speed: 4, survival: 3, ease: 4, damage: 4, aoe: 4 },
    phases: [
      { through: 38, title: "Early — Charged Bolts", onScreen: "Bolts fan out in front of you.", skillBar: ["Charged Bolts", "Teleport", "Armor", "Nova"], rotation: "Spam bolts, Teleport out, repeat." },
      { through: 70, title: "Late — Ball Lightning", onScreen: "Large lightning orb rolling through enemies.", skillBar: ["Ball Lightning", "Teleport", "..."], rotation: "Cast orb in choke points, kite with Teleport." },
    ],
  },
  "necro-minion": {
    tagline: "General of the dead — walk, don't aim",
    feelsLike: "Easiest leveling in the game. Army does the work.",
    colors: "Bone white skeletons, green corpse explosions",
    meters: { speed: 5, survival: 5, ease: 5, damage: 3, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "20+ skeletons on screen; Corpse Explosion chains.", skillBar: ["Raise Skeleton", "Corpse Explosion", "Bone Splinters", "curse", "golem", "ult"], rotation: "Keep army up → walk → Corpse Explosion on corpses → Splinters when bored." },
    ],
  },
  "paladin-shield-retribution": {
    tagline: "Shield bash crusader with wings",
    feelsLike: "Holy warrior — bash, aura, wing dash. Faster than hammers.",
    colors: "Gold radiant, shield flashes, wing trails",
    meters: { speed: 5, survival: 5, ease: 4, damage: 4, aoe: 3 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Shield impacts, golden wings dashing, aura glow on character.", skillBar: ["Shield Bash", "Advance", "Defiance Aura", "Arbiter", "Condemn", "star fall"], rotation: "Aura always on → Advance into pack → Bash → Wing skills on cooldown." },
    ],
  },
  "paladin-blessed-hammer": {
    tagline: "Spinning golden hammers (Hammerdin)",
    feelsLike: "Classic Diablo 2 fantasy — hammers orbit while you walk.",
    colors: "Golden hammers circling, holy light",
    meters: { speed: 4, survival: 4, ease: 4, damage: 4, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Multiple hammers orbiting; Condemn zones on ground.", skillBar: ["Blessed Hammer", "Advance", "Defiance Aura", "Condemn", "Falling Star", "Rally"], rotation: "Walk through packs with hammers up → Condemn on elites → Advance for fortify." },
    ],
  },
  "druid-lightning-storm": {
    tagline: "Permanent thundercloud",
    feelsLike: "Walk simulator — storm follows and shocks everything nearby.",
    colors: "Yellow lightning constant rain",
    meters: { speed: 3, survival: 4, ease: 5, damage: 4, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Lightning storm aura always visible around druid.", skillBar: ["Lightning Storm", "Wind Shear", "Blood Howl", "werebear optional", "...", "..."], rotation: "Keep storm up → walk → Blood Howl heal → Shear for stragglers." },
    ],
  },
  "spiritborn-crushing-hand": {
    tagline: "Spirit fist from the sky",
    feelsLike: "Dodge-heavy melee — big teal hand slams down on packs.",
    colors: "Teal spirits, jungle greens",
    meters: { speed: 4, survival: 3, ease: 3, damage: 4, aoe: 4 },
    phases: [
      { through: 70, title: "Whole leveling", onScreen: "Spectral fist impacts; evade trails.", skillBar: ["Crushing Hand", "Thrash", "evade skills", "spirit buffs", "...", "..."], rotation: "Evade into pack → Crushing Hand → Thrash builders → repeat." },
    ],
  },
};