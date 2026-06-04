# Diablo IV · Lord of Hatred — Leveling Strategium

An interactive **Diablo IV: Lord of Hatred** (Season 13 · *Season of Reckoning*) leveling
companion. Pick a class and build, then get every milestone from level 1 to 70 — plus a
build tier list, the leveling route, mercenary advice, a "what's new" systems primer, and a
respec advisor.

> Fan-made. Not affiliated with Blizzard Entertainment.

## Features

- **Command palette (`⌘K` / `Ctrl-K`)** — fuzzy-jump to any build, section, level (“level
  38”), or glossary term. The fastest way around the whole app.
- **Build finder** — answer three questions and get your best-matched builds; pops on first
  visit and is always a click away.
- **Class Guide** — what each of the 8 classes looks like to play, with the new
  **Paladin** and **Warlock** classes highlighted.
- **Point Guide** — a level-by-level companion (keyboard-driven) that flags every real
  milestone, now with a per-build **dossier**: pro tips (core loop, common mistakes,
  boss/elite advice), a tickable **progression checklist**, and per-level **notes**.
- **Quick Ref** — a printable/copyable table of the whole 1→70 path.
- **Builds** — 24 leveling builds (3 per class), searchable, filterable, add-to-compare.
- **Compare** — put 2–3 builds side by side: meters (with per-row “winner”), style, skill
  bar, milestones, runewords, and core loop.
- **Tier List** — leveling-speed tiers (S/A/B), filterable by class, with sources.
- **Route** — the Season 13 route (Skovos), a **difficulty/XP ladder** and a **leveling-
  activity** reference that both highlight where you are, plus mercenaries.
- **What's New** — the Lord of Hatred systems that matter for leveling.
- **Glossary** — 47 fact-checked Diablo IV terms a new player meets while leveling, searchable
  and cross-linked; key terms are also inline tooltips throughout the app.
- **Respec** — should you switch builds? Build-aware advice.

Progress (current build, level, completed/flagged levels, checklist, notes, compare
selection) is saved to `localStorage` and the URL hash (`#buildId/level`) is shareable and
deep-linkable. Optional per-class accent **theming** tints the UI. Fully keyboard navigable
with visible focus, ARIA tabs, and `prefers-reduced-motion` support.

**Installable PWA** — a service worker precaches the app and runtime-caches fonts and art, so
the guide works offline and can be installed to your home screen / desktop.

## Accuracy

Game data was researched and adversarially fact-checked (June 2026) against Maxroll, Icy
Veins, Wowhead, Mobalytics, Game8, the official Blizzard pages, and Wikipedia. Lord of
Hatred released **April 28, 2026**, adds **Paladin** and **Warlock** (8 classes total),
raises the level cap to **70**, and expands the difficulty ladder to **16 tiers**
(Normal/Hard/Expert/Penitent + Torment 1–12).

## Tech

Vite + React 19 + TypeScript, **zero runtime dependencies beyond React**. Views are
code-split (lazy-loaded) so the initial bundle stays lean. All game data is typed and lives
in [`src/data`](src/data). Tested with **Vitest** (logic, data-integrity cross-references,
hook behaviour, and an `<App>` render smoke test).

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/ (+ PWA service worker)
npm run preview    # preview the production build
npm run lint       # eslint
npm test           # vitest run
```

The build uses a relative base, so the `dist/` output can be hosted from a domain root, a
GitHub Pages project sub-path, or opened directly from disk.

## Project layout

```
src/
  data/         # typed game data: classes, builds, tier list, route, mercenaries, systems,
                #   glossary, per-build enrichment, build-finder + checklist derivation
  hooks/        # useGuideState (persistence + hash routing + checklist/notes/compare), reduced-motion
  lib/          # leveling-row generator, fuzzy matcher, storage, JSON-LD/SEO
  components/   # TopBar, command palette, build finder, dossier, glossary tooltips,
                #   per-view components + shared atoms
  styles/       # the HUD design system
```
