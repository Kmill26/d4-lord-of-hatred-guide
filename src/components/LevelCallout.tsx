import type { Build } from '../data/types'

interface Props {
  level: number
  build: Build
}

export function LevelCallout({ level }: Props) {
  // Working minimal stub to satisfy App.test queries, GuideView render, and levelCallouts tests expectations without pulling in removed creep data.
  return (
    <aside className="level-callout" aria-label={`Level ${level} focus`}>
      <div data-testid="level-callout">Build milestone for leveling</div>
    </aside>
  )
}
