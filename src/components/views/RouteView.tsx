import { MERCENARIES, MERC_NOTE } from '../../data/mercenaries'
import { ROUTE, ROUTE_NOTE, DIFFICULTY_LADDER, LEVELING_ACTIVITIES } from '../../data/strategy'
import { Term } from '../Term'

interface Props {
  level: number
  onJumpToLevel: (lvl: number) => void
}

function parseRange(range: string): [number, number] {
  const nums = range.split(/[–-]/).map((s) => parseInt(s.trim(), 10))
  return [nums[0] || 1, nums[1] || nums[0] || 70]
}

const inBand = (level: number, [min, max]: [number, number]) => level >= min && level <= max

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

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: '1.75rem' }}>
          Difficulty &amp; XP Ladder
        </h3>
        <p className="callout">
          XP scales with difficulty, so climb the ladder as fast as you can clear — you do{' '}
          <strong>not</strong> sit on Normal to “save” XP. <Term name="Torment">Torment</Term> is
          endgame; you arrive there around the cap.
        </p>
        <ul className="ladder">
          {DIFFICULTY_LADDER.map((d) => {
            const active = d.band[0] === 70 ? level >= 70 : inBand(level, d.band)
            return (
              <li key={d.name} className={`ladder-row ${active ? 'here' : ''} ${d.levelingFocus ? '' : 'endgame'}`}>
                <span className="ladder-name">{d.name}</span>
                <span className="ladder-xp">{d.xp}</span>
                <span className="ladder-unlock">{d.unlock}</span>
                {active && <span className="here-badge">L{level}</span>}
              </li>
            )
          })}
        </ul>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: '1.75rem' }}>
          Leveling Activities
        </h3>
        <p className="callout">
          What to actually <em>do</em> for XP at each stage. Highlighted rows are relevant at your
          current level (L{level}).
        </p>
        <div className="activity-grid">
          {LEVELING_ACTIVITIES.map((a) => (
            <div key={a.name} className={`activity-card ${inBand(level, a.band) ? 'active' : ''}`}>
              <div className="activity-head">
                <h4>{a.name}</h4>
                <span className="activity-band">L{a.band[0]}–{a.band[1]}</span>
              </div>
              <p className="activity-unlock">{a.unlock}</p>
              <p className="activity-value">{a.value}</p>
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: '1.75rem' }}>
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
