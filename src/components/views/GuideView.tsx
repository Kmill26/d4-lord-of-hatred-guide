import { useEffect, useMemo, useRef, useState } from 'react'
import { CLASSES } from '../../data/classes'
import { LEVEL_CAP } from '../../data/builds'
import { buildLevelRows, levelRowText } from '../../lib/leveling'
import type { GuideState, ViewId } from '../../hooks/useGuideState'
import { ClassPortrait, MetersBars, RunewordList } from '../shared'
import { GuideDossier } from '../GuideDossier'

interface Props {
  state: GuideState
  reducedMotion: boolean
  onSwitchView: (v: ViewId) => void
}

export function GuideView({ state, reducedMotion, onSwitchView }: Props) {
  const { build, level, completed, flags, checks, advance, goToLevel, toggleFlag, toggleCheck, getNote, setNote } =
    state
  const cls = CLASSES[build.className]
  const rows = useMemo(() => buildLevelRows(build), [build])
  const current = rows[level - 1] ?? rows[0]
  const next = rows[level] ?? null
  const [listOpen, setListOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const emberLayer = useRef<HTMLDivElement | null>(null)

  const levelPct = Math.round(((level - 1) / (LEVEL_CAP - 1)) * 100)

  // Scoped keyboard shortcuts (this view is only mounted while active).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      // Don't hijack typing, or arrow/tab navigation while a tab button is focused.
      if (t && t.closest('input, select, textarea, [contenteditable="true"], [role="tab"]')) return
      const k = e.key.toLowerCase()
      if (e.key === ' ' || e.key === 'Enter') {
        if (t && t.closest('button, a')) return // let the control handle it
        e.preventDefault()
        advance()
      } else if (e.key === 'ArrowRight') {
        goToLevel(level + 1)
      } else if (e.key === 'ArrowLeft') {
        goToLevel(level - 1)
      } else if (k === 'm') {
        const m = rows.find((r) => r.major && r.level > level)
        if (m) goToLevel(m.level)
      } else if (e.key === '/') {
        e.preventDefault()
        setListOpen((v) => !v)
      } else if (k === 'r') {
        e.preventDefault()
        onSwitchView('quickref')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, goToLevel, level, rows, onSwitchView])

  // Decorative embers — disabled under reduced-motion, paused when hidden.
  useEffect(() => {
    if (reducedMotion) return
    const layer = emberLayer.current
    if (!layer) return
    const spawn = () => {
      if (document.visibilityState !== 'visible') return
      for (let i = 0; i < 5; i++) {
        const em = document.createElement('div')
        em.className = 'ember'
        em.style.left = `${(i * 23 + 9) % 100}%`
        em.style.bottom = `${(i * 13) % 30}%`
        em.style.animationDelay = `${-(i * 0.5)}s`
        layer.appendChild(em)
        window.setTimeout(() => em.remove(), 3000)
      }
    }
    spawn()
    const timer = window.setInterval(spawn, 6000)
    return () => {
      window.clearInterval(timer)
      layer.replaceChildren()
    }
  }, [reducedMotion])

  const copyCurrent = async () => {
    try {
      await navigator.clipboard?.writeText(levelRowText(current))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  const isFlagged = flags.has(level)
  const advanced = completed.has(level)

  return (
    <section
      className="view"
      id="view-panel"
      role="tabpanel"
      aria-labelledby="tab-guide"
      tabIndex={-1}
    >
      <div className="guide-scroll">
        <p className="guide-banner">
          In Lord of Hatred you allocate skill points freely and skills rank to 15 — there is no fixed
          “one point per level.” This companion flags every real milestone and otherwise tells you what to
          prioritize. <strong>Space</strong> / <strong>→</strong> advance · <strong>M</strong> next ★ ·{' '}
          <strong>R</strong> quick-ref · <strong>/</strong> full list.
        </p>

        <h2 className="sr-only">
          Point guide — {build.className} {build.name}, level {level}
        </h2>
        <div className="sr-only" role="status" aria-live="polite">
          Level {level}: {current.skill}. {current.note}
        </div>

        <div className="guide-layout">
          {/* What this build looks like */}
          <aside className="visual-panel" aria-label="What this build looks like">
            <ClassPortrait cls={cls} height={120} />
            <h4>{build.name}</h4>
            <p className="tagline">{build.feelsLike}</p>
            <MetersBars meters={build.meters} />
            {build.selection && (
              <>
                <div className="phase-title">Your pick</div>
                <p>{build.selection}</p>
              </>
            )}
            <div className="phase-title">On screen</div>
            <p>{cls.onScreen}</p>
            <div className="phase-title">Skill bar (left → right)</div>
            <ul className="skill-bar-list">
              {build.skillPriority.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="phase-title">Class fantasy</div>
            <p>{cls.fantasy}</p>
          </aside>

          {/* Next skill card */}
          <div className="guide-card-wrap">
            <div className="next-card">
              <div className="ember-layer" ref={emberLayer} aria-hidden="true" />
              <div className="top-banner" />
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <div className="inner-panel">
                {current.major && <div className="milestone-badge">★ MILESTONE</div>}
                {current.respec && (
                  <div className="respec-alert">
                    <strong>Planned respec / pivot</strong> — {current.note}
                  </div>
                )}
                <div className="next-label">At level {level}, do this</div>
                <div className="next-skill">{current.skill}</div>
                <p className="next-note">{current.note}</p>
                <button type="button" className="action-btn" onClick={advance}>
                  {advanced
                    ? `DONE — GO TO LEVEL ${Math.min(level + 1, LEVEL_CAP)}`
                    : `MARK DONE & ADVANCE → L${Math.min(level + 1, LEVEL_CAP)}`}
                </button>
                <div className="next-mini">
                  {next ? (
                    <>
                      Then: <strong>{next.skill}</strong>
                    </>
                  ) : (
                    '★ Reached 70 — begin Paragon & push toward Torment 1'
                  )}
                </div>
                <div className="gear-panel">
                  <div className="cell">
                    <strong>Gear priority</strong>
                    <ul>
                      {build.gear.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cell">
                    <strong>Runewords</strong>
                    <RunewordList runes={build.runes} />
                    {build.runeNote && (
                      <p style={{ margin: '0.35rem 0 0', color: 'var(--faint)' }}>{build.runeNote}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="level-progress-strip">
              <div className="row">
                <span>LEVEL {level}</span>
                <span>{level >= LEVEL_CAP ? 'MAX LEVEL' : `${levelPct}% TO LEVEL ${LEVEL_CAP}`}</span>
              </div>
              <div className="track">
                <div className="fill" style={{ width: `${levelPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <GuideDossier
          build={build}
          level={level}
          checks={checks}
          toggleCheck={toggleCheck}
          getNote={getNote}
          setNote={setNote}
          goToLevel={goToLevel}
        />
      </div>

      {listOpen && (
        <div className="full-list" id="full-list" role="region" aria-label="Full leveling list">
          {rows.map((r) => (
            <div
              key={r.level}
              className={`level-row ${r.level === level ? 'active' : ''} ${
                completed.has(r.level) ? 'done' : ''
              }`}
            >
              <button
                type="button"
                className="btn-reset"
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}
                onClick={() => {
                  goToLevel(r.level)
                  setListOpen(false)
                }}
              >
                <span className="lvl">L{r.level}</span>
                <span className="skill">
                  {r.major ? '★ ' : ''}
                  {r.skill}
                </span>
              </button>
              <button
                type="button"
                className="flag"
                aria-pressed={flags.has(r.level)}
                aria-label={flags.has(r.level) ? `Unflag level ${r.level}` : `Flag level ${r.level}`}
                onClick={() => toggleFlag(r.level)}
              >
                !
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <div className="controls">
          <button type="button" className="ctrl-btn" onClick={() => goToLevel(level - 1)}>
            ◀ L−1
          </button>
          <button type="button" className="ctrl-btn" onClick={() => goToLevel(level + 1)}>
            L+1 ▶
          </button>
          <button
            type="button"
            className="ctrl-btn"
            onClick={() => {
              const m = rows.find((r) => r.major && r.level > level)
              if (m) goToLevel(m.level)
            }}
          >
            Next ★
          </button>
          <button
            type="button"
            className="ctrl-btn"
            aria-expanded={listOpen}
            aria-controls="full-list"
            onClick={() => setListOpen((v) => !v)}
          >
            Full list (/)
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="ctrl-btn"
            aria-pressed={isFlagged}
            title="Flag this level"
            onClick={() => toggleFlag()}
          >
            {isFlagged ? '⚑ Flagged' : '⚐ Flag'}
          </button>
          <button type="button" className="ctrl-btn" title="Copy this step" onClick={copyCurrent}>
            {copied ? 'Copied!' : '⎘ Copy'}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Copied step to clipboard' : ''}
          </span>
          <span className="kbd-hint">Space · ←→ · M · R · /</span>
        </div>
        <span className="build-name">
          {build.className} · {build.name}
        </span>
      </footer>
    </section>
  )
}
