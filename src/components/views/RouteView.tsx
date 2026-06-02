import { MERCENARIES, MERC_NOTE } from '../../data/mercenaries'
import { ROUTE, ROUTE_NOTE } from '../../data/strategy'

export function RouteView() {
  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-route" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Route (1 → 70)</h2>
        <p className="callout">{ROUTE_NOTE}</p>

        {ROUTE.map((phase) => (
          <div className="strategy-phase" key={phase.range}>
            <h3>
              Levels {phase.range} — {phase.title}
            </h3>
            <ol>
              {phase.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        ))}

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
              <p style={{ color: '#dcc9b8' }}>{m.levelingNote}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
