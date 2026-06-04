import { GLOSSARY_BY_TERM } from '../data/glossary'
import { useOpenGlossary } from './glossaryContext'

/**
 * Inline glossary term. Renders its children (or the term itself) with a dotted
 * underline; hover/focus shows a definition tooltip, click opens the Glossary.
 * If the term isn't in the glossary it renders the text plainly.
 */
export function Term({ name, children }: { name: string; children?: React.ReactNode }) {
  const open = useOpenGlossary()
  const entry = GLOSSARY_BY_TERM[name.toLowerCase()]
  const label = children ?? name
  if (!entry) return <>{label}</>
  return (
    <button
      type="button"
      className="gloss-term"
      onClick={() => open(entry.term)}
      aria-label={`${entry.term}: ${entry.short} (open glossary)`}
    >
      {label}
      <span className="gloss-tip" aria-hidden="true">
        <span className="gloss-tip-term">{entry.term}</span>
        <span className="gloss-tip-body">{entry.full}</span>
      </span>
    </button>
  )
}
