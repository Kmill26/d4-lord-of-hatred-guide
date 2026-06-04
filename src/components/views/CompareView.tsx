import { useState, type CSSProperties } from 'react'
import { BUILDS, BUILD_BY_ID } from '../../data/builds'
import { CLASSES, CLASS_ORDER } from '../../data/classes'
import { byTier } from '../../data/tierList'
import { getEnrichment } from '../../data/enrich'
import { BUILD_STYLE } from '../../data/finder'
import type { GuideState } from '../../hooks/useGuideState'
import type { Meters } from '../../data/types'
import { ClassPortrait, TierBadge } from '../shared'

interface Props {
  state: GuideState
  onPickBuild: (id: string) => void
}

const METERS: Array<[keyof Meters, string]> = [
  ['speed', 'Speed'],
  ['survival', 'Survival'],
  ['ease', 'Ease'],
  ['damage', 'Damage'],
  ['aoe', 'AoE'],
]

export function CompareView({ state, onPickBuild }: Props) {
  const { compare, toggleCompare, clearCompare } = state
  const builds = compare.map((id) => BUILD_BY_ID[id]).filter(Boolean)
  const [adding, setAdding] = useState('')

  const meterMax = (k: keyof Meters) => Math.max(...builds.map((b) => b.meters[k]), 0)

  if (builds.length === 0) {
    const suggestions = [...BUILDS].sort(byTier).slice(0, 6)
    return (
      <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-compare" tabIndex={-1}>
        <div className="panel-scroll">
          <h2 className="section-title">Compare Builds</h2>
          <p className="section-intro" style={{ marginTop: '-0.5rem' }}>
            Pick two or three builds to put their feel, meters and milestones side by side. Add from
            any build card (“＋ Compare”), the command palette, or start with a top leveler:
          </p>
          <div className="build-pick-list" style={{ marginTop: '1rem' }}>
            {suggestions.map((b) => (
              <button key={b.id} type="button" className="build-pick" onClick={() => toggleCompare(b.id)}>
                ＋ {b.tier} · {b.className} {b.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const addable = BUILDS.filter((b) => !compare.includes(b.id))

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-compare" tabIndex={-1}>
      <div className="panel-scroll">
        <div className="compare-head-row">
          <h2 className="section-title" style={{ margin: 0 }}>
            Compare Builds
          </h2>
          <div className="compare-actions">
            {compare.length < 3 && addable.length > 0 && (
              <select
                value={adding}
                aria-label="Add a build to compare"
                onChange={(e) => {
                  if (e.target.value) {
                    toggleCompare(e.target.value)
                    setAdding('')
                  }
                }}
              >
                <option value="">＋ Add a build…</option>
                {CLASS_ORDER.map((cn) => {
                  const cb = addable.filter((b) => b.className === cn)
                  if (!cb.length) return null
                  return (
                    <optgroup key={cn} label={cn}>
                      {cb.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.className} — {b.name}
                        </option>
                      ))}
                    </optgroup>
                  )
                })}
              </select>
            )}
            <button type="button" className="ctrl-btn" onClick={clearCompare}>
              Clear
            </button>
          </div>
        </div>

        <div className="compare-grid-wrap">
          <div
            className="compare-grid"
            style={{ '--cols': builds.length } as CSSProperties}
          >
            {/* Header cards */}
            <div className="cmp-rowlabel" />
            {builds.map((b) => {
              const cls = CLASSES[b.className]
              return (
                <div key={b.id} className="cmp-card" style={{ '--accent': cls.accent } as CSSProperties}>
                  <button
                    type="button"
                    className="cmp-remove"
                    aria-label={`Remove ${b.name} from comparison`}
                    onClick={() => toggleCompare(b.id)}
                  >
                    ✕
                  </button>
                  <ClassPortrait cls={cls} height={84} />
                  <div className="cmp-name">{b.name}</div>
                  <div className="cmp-sub">
                    {b.className} <TierBadge tier={b.tier} />
                  </div>
                  <p className="cmp-feels">{b.feelsLike}</p>
                  <button type="button" className="ctrl-btn cmp-open" onClick={() => onPickBuild(b.id)}>
                    Open guide →
                  </button>
                </div>
              )
            })}

            {/* Meter rows */}
            {METERS.map(([k, label]) => {
              const max = meterMax(k)
              return (
                <div className="cmp-contents" key={k}>
                  <div className="cmp-rowlabel">{label}</div>
                  {builds.map((b) => {
                    const v = b.meters[k]
                    const best = v === max && builds.length > 1
                    return (
                      <div className="cmp-cell" key={b.id + k}>
                        <span className={`cmp-meter ${best ? 'best' : ''}`}>
                          <span className="cmp-meter-fill" style={{ width: `${v * 20}%` }} />
                        </span>
                        <span className="cmp-meter-num">{v}/5{best ? ' ★' : ''}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Text rows */}
            <Row label="Style" builds={builds} render={(b) => <span className="cmp-tag">{BUILD_STYLE[b.id]}</span>} />
            <Row label="Your pick" builds={builds} render={(b) => b.selection ?? '—'} />
            <Row
              label="Skill bar"
              builds={builds}
              render={(b) => (
                <ol className="cmp-bar">
                  {b.skillPriority.slice(0, 4).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              )}
            />
            <Row
              label="Core loop"
              builds={builds}
              render={(b) => getEnrichment(b.id)?.resourceLoop ?? b.playstyle.split('. ')[0] + '.'}
            />
            <Row
              label="Milestones"
              builds={builds}
              render={(b) => `${b.milestones.filter((m) => m.major).length} major · ${b.milestones.length} total`}
            />
            <Row
              label="Runewords"
              builds={builds}
              render={(b) => b.runes.map((r) => `${r.ritual}+${r.invocation}`).join(', ') || '—'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({
  label,
  builds,
  render,
}: {
  label: string
  builds: ReturnType<typeof BUILDS.filter>
  render: (b: (typeof BUILDS)[number]) => React.ReactNode
}) {
  return (
    <div className="cmp-contents">
      <div className="cmp-rowlabel">{label}</div>
      {builds.map((b) => (
        <div className="cmp-cell cmp-text" key={b.id + label}>
          {render(b)}
        </div>
      ))}
    </div>
  )
}
