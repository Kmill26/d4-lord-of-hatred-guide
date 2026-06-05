import { useMemo, useState, type CSSProperties } from 'react'
import { BUILDS } from '../../data/builds'
import { CLASSES, CLASS_ORDER } from '../../data/classes'
import { byTier } from '../../data/tierList'
import { favoriteCap } from '../../lib/favorites'
import { ClassPortrait, TierBadge } from '../shared'

interface Props {
  onPickBuild: (id: string) => void
  compare: string[]
  onToggleCompare: (id: string) => void
  favorites: string[]
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => boolean
}

export function BuildsView({
  onPickBuild,
  compare,
  onToggleCompare,
  favorites,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState<'all' | string>('all')
  const [favOnly, setFavOnly] = useState(false)
  const [favNotice, setFavNotice] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BUILDS.filter((b) => {
      if (favOnly && !favorites.includes(b.id)) return false
      if (classFilter !== 'all' && b.className !== classFilter) return false
      if (!q) return true
      const hay = `${b.className} ${b.name} ${b.playstyle} ${b.feelsLike} ${b.tierLabel} ${
        b.selection ?? ''
      } ${b.skillPriority.join(' ')}`.toLowerCase()
      return hay.includes(q)
    }).sort(byTier)
  }, [query, classFilter, favOnly, favorites])

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-builds" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Builds</h2>
        <p className="section-intro" style={{ margin: '-0.5rem 0 1rem' }}>
          {BUILDS.length} builds across all 8 classes. Click any card for the full point-by-point guide.
        </p>

        {favNotice && (
          <p className="fav-notice builds-fav-notice" role="status" aria-live="polite">
            {favNotice}
          </p>
        )}

        <div className="build-toolbar">
          <input
            className="search-input"
            type="search"
            placeholder="Search builds, skills, playstyle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search builds"
          />
          <label className="sr-only" htmlFor="class-filter">
            Filter by class
          </label>
          <select id="class-filter" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option value="all">All Classes</option>
            {CLASS_ORDER.map((cn) => (
              <option key={cn} value={cn}>
                {cn}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={`filter-chip ${favOnly ? 'on' : ''}`}
            aria-pressed={favOnly}
            onClick={() => setFavOnly((v) => !v)}
            title="Show only starred builds"
          >
            ★ Favorites{favorites.length ? ` (${favorites.length})` : ''}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-note">
            <p>
              No builds match
              {query ? ` “${query}”` : ''}
              {classFilter !== 'all' ? ` in ${classFilter}` : ''}.
            </p>
            <button
              type="button"
              className="ctrl-btn"
              onClick={() => {
                setQuery('')
                setClassFilter('all')
                setFavOnly(false)
              }}
            >
              Clear search &amp; filters
            </button>
          </div>
        ) : (
          <div className="class-grid">
            {filtered.map((b) => {
              const c = CLASSES[b.className]
              const inCompare = compare.includes(b.id)
              return (
                <article
                  key={b.id}
                  className="class-card"
                  style={{ '--accent': c.accent } as CSSProperties}
                >
                  <TierBadge tier={b.tier} />
                  <ClassPortrait cls={c} height={56} className="thumb" />
                  <h3>{b.className}</h3>
                  <div className="build-title">{b.name}</div>
                  <p>{b.tierLabel}</p>
                  <p>
                    <em>{b.feelsLike}</em>
                  </p>
                  {b.selection && <p style={{ color: 'var(--gold)' }}>{b.selection}</p>}
                  <div className="card-actions">
                    <button type="button" className="card-open" onClick={() => onPickBuild(b.id)}>
                      Open guide →
                    </button>
                    <button
                      type="button"
                      className={`card-fav ${isFavorite(b.id) ? 'on' : ''}`}
                      aria-pressed={isFavorite(b.id)}
                      aria-label={isFavorite(b.id) ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={() => {
                        const msg = favoriteCap(isFavorite(b.id), b.id, onToggleFavorite)
                        if (msg) {
                          setFavNotice(msg)
                          window.setTimeout(() => setFavNotice(''), 3000)
                        }
                      }}
                      title="Star this build"
                    >
                      {isFavorite(b.id) ? '★ Saved' : '☆ Save'}
                    </button>
                    <button
                      type="button"
                      className={`card-cmp ${inCompare ? 'on' : ''}`}
                      aria-pressed={inCompare}
                      onClick={() => onToggleCompare(b.id)}
                      title="Add to the Compare view"
                    >
                      {inCompare ? '✓ Comparing' : '＋ Compare'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}