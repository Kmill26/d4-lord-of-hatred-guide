import { SYSTEMS } from '../../data/systems'
import { SEASON, SOURCES } from '../../data/sources'

export function SystemsView() {
  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-systems" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">What’s New in Lord of Hatred</h2>
        <p className="section-intro" style={{ marginBottom: '1.25rem' }}>
          {SEASON.expansion} launched {SEASON.releaseDate} as Season {SEASON.number} (“{SEASON.name}”),
          patch {SEASON.patch}. The systems rework is free to all players; the region, classes and endgame
          systems are expansion content.
        </p>

        <div className="systems-grid">
          {SYSTEMS.map((s) => (
            <div className="system-card" key={s.name}>
              <div className="system-head">
                <h3>{s.name}</h3>
                <span className={`system-tag tag-${s.tag.toLowerCase()}`}>{s.tag}</span>
              </div>
              <p>{s.summary}</p>
              <p className="relevance">{s.levelingRelevance}</p>
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ fontSize: '1rem', marginTop: '1.75rem' }}>
          Sources
        </h3>
        <ul style={{ maxWidth: 760, color: 'var(--muted)', fontSize: '0.85rem' }}>
          {SOURCES.map((src) => (
            <li key={src.url} style={{ marginBottom: '0.25rem' }}>
              <a href={src.url} target="_blank" rel="noopener noreferrer">
                {src.label}
              </a>
            </li>
          ))}
        </ul>
      </div>    </section>
  )
}
