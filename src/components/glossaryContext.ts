import { createContext, useContext } from 'react'

/**
 * Lets any component open the Glossary view focused on a specific term, without
 * prop-drilling. App provides the implementation.
 */
export type OpenGlossary = (term?: string) => void

export const GlossaryCtx = createContext<OpenGlossary>(() => {})

export const useOpenGlossary = (): OpenGlossary => useContext(GlossaryCtx)
