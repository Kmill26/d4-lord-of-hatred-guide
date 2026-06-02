import { useEffect, useMemo, useRef, useState } from 'react'
import { buildLevelRows, levelRowText } from '../../lib/leveling'
import type { GuideState, ViewId } from '../../hooks/useGuideState'

interface Props {
  state: GuideState
  onSwitchView: (v: ViewId) => void
}

export function QuickRefView({ state, onSwitchView }: Props) {
  const { build, level, completed, goToLevel } = state
  const allRows = useMemo(() => buildLevelRows(build), [build])
  const [milestonesOnly, setMilestonesOnly] = useState(false)
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null)
  const jumpRef = useRef<HTMLInputElement | null>(null)

  const rows = milestonesOnly ? allRows.filter((r) => r.isMilestone) : allRows
  const current = allRows[level - 1] ?? allRows[0]
  const next = allRows[level] ?? null

  const doJump = () => {
    const v = parseInt(jumpRef.current?.value ?? '', 10)
    if (!Number.isNaN(v)) goToLevel(v)
  }

  // Keep the current row visible.
  useEffect(() => {
    const el = tbodyRef.current?.querySelector(`tr[data-level="${level}"]`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [level, milestonesOnly])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('input, select, textarea, [role="tab"]')) return
      if (e.key === 'ArrowRight') goToLevel(level + 1)
      else if (e.key === 'ArrowLeft') goToLevel(level - 1)
      else if (e.key === '/' || e.key.toLowerCase() === 'r') {
        e.preventDefault()
        onSwitchView('guide')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goToLevel, level, onSwitchView])

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {})
  }
  const copyAll = () =>
    copy(`${build.className} — ${build.name}\n` + allRows.map(levelRowText).join('\n'))

  return (
    <section
      className="view"
      id="view-panel"
      role="tabpanel"
      aria-labelledby="tab-quickref"
      tabIndex={-1}
    >
      <div className="quickref-now">
        <div className="now-level">
          {build.className} · {build.name} — level {level}
        </div>
        <div className="now-skill">→ {current.skill}</div>
        {current.note && (
          <div style={{ fontSize: '0.82rem', color: '#c9b8a8', margin: '0.25rem 0' }}>
            {current.note}
          </div>
        )}
        <div className="now-next">
          {next ? (
            <>
              After that (L{level + 1}): <strong style={{ color: 'var(--gold)' }}>{next.skill}</strong>
            </>
          ) : (
            '★ Level 70 — start Paragon'
          )}
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        Level {level}: {current.skill}
      </div>

      <div className="quickref-toolbar">
        <label>
          I’m level
          <input
            key={level}
            ref={jumpRef}
            type="number"
            min={1}
            max={70}
            defaultValue={level}
            onKeyDown={(e) => {
              if (e.key === 'Enter') doJump()
            }}
          />
        </label>
        <button type="button" className="ctrl-btn" onClick={doJump}>
          Jump
        </button>
        <button type="button" className="ctrl-btn" onClick={() => copy(levelRowText(current))}>
          Copy row
        </button>
        <button type="button" className="ctrl-btn" onClick={copyAll}>
          Copy all
        </button>
        <button type="button" className="ctrl-btn" onClick={() => window.print()}>
          Print
        </button>
        <span className="kbd-hint" style={{ marginLeft: 'auto' }}>
          Keys: ←→ level · R or / for guide
        </span>
        <label>
          <input
            type="checkbox"
            checked={milestonesOnly}
            onChange={(e) => setMilestonesOnly(e.target.checked)}
          />
          Milestones only
        </label>
      </div>

      <div className="panel-scroll">
        <div className="quickref-table-wrap">
          <table className="quickref-table">
            <caption className="sr-only">
              Level-by-level skill priority for {build.className} {build.name}
            </caption>
            <thead>
              <tr>
                <th scope="col">Lvl</th>
                <th scope="col">Spend points in</th>
                <th scope="col" className="note-h">
                  Note
                </th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {rows.map((r) => (
                <tr
                  key={r.level}
                  data-level={r.level}
                  className={`${r.level === level ? 'current' : ''} ${
                    r.major ? 'milestone' : ''
                  } ${completed.has(r.level) ? 'done' : ''}`}
                  onClick={() => goToLevel(r.level)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="lvl">
                    <button
                      type="button"
                      className="btn-reset"
                      style={{ fontFamily: 'Cinzel, serif', fontWeight: 900, color: 'var(--gold)', width: 'auto' }}
                      aria-label={`Go to level ${r.level}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToLevel(r.level)
                      }}
                    >
                      {r.level}
                    </button>
                  </td>
                  <td className="skill">
                    {r.major && <span className="star">★</span>}
                    {r.skill}
                  </td>
                  <td className="note">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
