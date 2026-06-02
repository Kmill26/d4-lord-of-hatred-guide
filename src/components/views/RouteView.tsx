import { MERCENARIES, MERC_NOTE } from '../../data/mercenaries'
import { ROUTE, ROUTE_NOTE } from '../../data/strategy'

interface Props {
  level: number
  onJumpToLevel: (lvl: number) => void
}

function parseRange(range: string): [number, number] {
  const nums = range.split(/[–-]/).map((s) => parseInt(s.trim(), 10))
  return [nums[0] || 1, nums[1] || nums[0] || 70]
}

export function RouteView({ level, onJumpToLevel }: Props) {
  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-route" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Route (1 → 70)</h2>
        <p className="callout">{ROUTE_NOTE}</p>

        <ol className="route-timeline">
          {ROUTE.map((phase) => {
            const [min, max] = parseRange(phase.range)
            const active = level >= min && level <= max
            return (
              <li className={`strategy-phase route-phase ${active ? 'phase-active' : ''}`} key={phase.range}>
                <div className="route-band">Levels {phase.range}</div>
                <h3>
                  {phase.title}
                  {active && <span className="here-badge">You’re here · L{level}</span>}
                </h3>
                <ol>
                  {phase.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={() => onJumpToLevel(active ? level : min)}
                >
                  {active ? `Resume the Point Guide at L${level}` : `Open the Point Guide at L${min}`} →
                </button>
              </li>
            )
          })}
        </ol>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: '1.5rem' }}>
          Mercenaries
        </h3>
        <p className="callout">{MERC_NOTE}</p>
        <div className="merc-grid">
          {MERCENARIES.map((m) => (
            <div className={`merc-card ${m.best ? 'best' : ''}`} key={m.name}>
              <h4>
                {m.name}
                {m.best && <span className="pill">Best for leveling</span>}
              </h4>
              <div className="arch">{m.archetype}</div>
              <p>{m.role}</p>
              <p>
                <strong style={{ color: 'var(--gold)' }}>Reinforcement:</strong> {m.reinforcement}
              </p>
              <p className="muted-warm">{m.levelingNote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
