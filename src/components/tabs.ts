import type { ViewId } from '../hooks/useGuideState'

export interface TabDef {
  id: ViewId
  label: string
}

export const TABS: TabDef[] = [
  { id: 'paths', label: 'Class Guide' },
  { id: 'guide', label: 'Point Guide' },
  { id: 'quickref', label: 'Quick Ref' },
  { id: 'builds', label: 'Builds' },
  { id: 'compare', label: 'Compare' },
  { id: 'tiers', label: 'Tier List' },
  { id: 'route', label: 'Route' },
  { id: 'systems', label: "What's New" },
  { id: 'glossary', label: 'Glossary' },
  { id: 'advisor', label: 'Respec' },
]
