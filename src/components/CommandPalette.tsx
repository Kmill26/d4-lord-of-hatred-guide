import { useEffect, useMemo, useRef, useState } from 'react'
import { BUILDS } from '../data/builds'
import { GLOSSARY } from '../data/glossary'
import { LEVEL_CAP } from '../data/builds'
import { FINDER_QUESTIONS } from '../data/finder'
import { fuzzyMatch, fuzzySegments } from '../lib/fuzzy'
import type { GuideState } from '../hooks/useGuideState'
import { TABS } from './tabs'

interface Cmd {
  id: string
  kind: 'Go to' | 'Build' | 'Level' | 'Term' | 'Action'
  title: string
  subtitle?: string
  run: () => void
}

interface Props {
  onClose: () => void
  state: GuideState
  onOpenGlossary: (term?: string) => void
  onOpenFinder: () => void
}

export function CommandPalette({ onClose, state, onOpenGlossary, onOpenFinder }: Props) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const go = (fn: () => void) => () => {
    fn()
    onClose()
  }

  const { pinned, searchable } = useMemo(() => {
    const favSet = new Set(state.favorites)
    const tabCmds: Cmd[] = TABS.map((t) => ({
      id: `view:${t.id}`,
      kind: 'Go to',
      title: t.label,
      subtitle: 'Section',
      run: go(() => state.setView(t.id)),
    }))
    const actions: Cmd[] = [
      {
        id: 'action:finder',
        kind: 'Action',
        title: 'Find my build…',
        subtitle: `Answer ${FINDER_QUESTIONS.length} questions`,
        run: go(onOpenFinder),
      },
      {
        id: 'action:compare',
        kind: 'Action',
        title: 'Compare builds',
        subtitle: 'Side by side',
        run: go(() => state.setView('compare')),
      },
      {
        id: 'action:theme',
        kind: 'Action',
        title: state.theme ? 'Turn off class theming' : 'Turn on class theming',
        subtitle: 'Tint the UI by class',
        run: go(() => state.setTheme(!state.theme)),
      },
      {
        id: 'action:export',
        kind: 'Action',
        title: 'Open Point Guide',
        subtitle: 'Share link & JSON export are in the guide footer',
        run: go(() => state.setView('guide')),
      },
    ]
    const favCmds: Cmd[] = []
    for (const id of state.favorites) {
      const b = BUILDS.find((x) => x.id === id)
      if (!b) continue
      favCmds.push({
        id: `fav:${b.id}`,
        kind: 'Build',
        title: `★ ${b.className} — ${b.name}`,
        subtitle: 'Favorite build',
        run: go(() => state.selectBuild(b.id, { view: 'guide' })),
      })
    }
    const buildCmds: Cmd[] = BUILDS.filter((b) => !favSet.has(b.id)).map((b) => ({
      id: `build:${b.id}`,
      kind: 'Build',
      title: `${b.className} — ${b.name}`,
      subtitle: `${b.tier}-tier · ${b.feelsLike}`,
      run: go(() => state.selectBuild(b.id, { view: 'guide' })),
    }))
    const termCmds: Cmd[] = GLOSSARY.map((t) => ({
      id: `term:${t.term}`,
      kind: 'Term',
      title: t.term,
      subtitle: t.short,
      run: go(() => onOpenGlossary(t.term)),
    }))
    return {
      pinned: [...favCmds.slice(0, 4), ...actions, ...tabCmds],
      searchable: [...tabCmds, ...actions, ...favCmds, ...buildCmds, ...termCmds],
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- go() recreated each render; closures use latest props
  }, [state, onClose, onOpenFinder, onOpenGlossary])

  const results: Cmd[] = (() => {
    const q = query.trim()
    const dyn: Array<{ cmd: Cmd; score: number }> = []
    const levelMatch = q.match(/(?:level|lvl|l)?\s*(\d{1,2})/i)
    if (levelMatch) {
      const n = Math.min(LEVEL_CAP, Math.max(1, parseInt(levelMatch[1], 10)))
      dyn.push({
        cmd: {
          id: `level:${n}`,
          kind: 'Level',
          title: `Go to level ${n}`,
          subtitle: `${state.build.className} — ${state.build.name}`,
          run: go(() => {
            state.goToLevel(n)
            state.setView('guide')
          }),
        },
        score: 1000,
      })
    }
    if (!q) {
      return [...dyn.map((d) => d.cmd), ...pinned.slice(0, 14)]
    }
    const scored: Array<{ cmd: Cmd; score: number }> = [...dyn]
    for (const cmd of searchable) {
      const m =
        fuzzyMatch(q, cmd.title) ?? (cmd.subtitle ? fuzzyMatch(q, cmd.subtitle) : null)
      if (m) scored.push({ cmd, score: m.score })
    }
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 40).map((s) => s.cmd)
  })()

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${sel}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((i) => Math.min(results.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      results[sel]?.run()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmdk-input-row">
          <span className="cmdk-prompt" aria-hidden="true">
            ⌘K
          </span>
          <input
            ref={inputRef}
            className="cmdk-input"
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="cmdk-list"
            aria-activedescendant={results[sel] ? `cmdk-opt-${sel}` : undefined}
            placeholder="Jump to a build, section, level or term…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSel(0)
            }}
            onKeyDown={onKey}
          />
        </div>
        <div className="cmdk-list" id="cmdk-list" role="listbox" ref={listRef}>
          {results.length === 0 && <div className="cmdk-empty">No matches for “{query}”.</div>}
          {results.map((cmd, i) => {
            const m = query.trim() ? fuzzyMatch(query.trim(), cmd.title) : null
            const segs = m ? fuzzySegments(cmd.title, m.matches) : [{ text: cmd.title, hit: false }]
            return (
              <button
                key={cmd.id}
                id={`cmdk-opt-${i}`}
                data-idx={i}
                role="option"
                aria-selected={i === sel}
                type="button"
                className={`cmdk-item ${i === sel ? 'sel' : ''}`}
                onMouseMove={() => setSel(i)}
                onClick={cmd.run}
              >
                <span className={`cmdk-kind k-${cmd.kind.replace(' ', '')}`}>{cmd.kind}</span>
                <span className="cmdk-title">
                  {segs.map((s, j) =>
                    s.hit ? <mark key={j}>{s.text}</mark> : <span key={j}>{s.text}</span>,
                  )}
                </span>
                {cmd.subtitle && <span className="cmdk-sub">{cmd.subtitle}</span>}
              </button>
            )
          })}
        </div>
        <div className="cmdk-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}