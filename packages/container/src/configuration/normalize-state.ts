import type { State, FontFallback, FontProperties, FontState, StatePartial } from '../types'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeStyles } from './normalize-styles'
import { schemaLocales, type UserConfiguration } from './user-schema'

export const normalizeState = (userConfiguration: UserConfiguration): State => {
  const locales = schemaLocales.parse(userConfiguration.locales)

  const state: StatePartial = {
    fallbackFonts: new Map<string, FontFallback>(),
    fontProperties: new Map<string, Required<FontProperties>>(),
    fonts: new Map<string, FontState>(),
  }

  const styles = normalizeStyles(locales, state)

  assertFonts(state.fonts)

  return {
    fallbackFonts: state.fallbackFonts,
    fontProperties: state.fontProperties,
    fonts: state.fonts,
    styles,
    warnings: new Set<string>(),
    ...normalizeLocales({ locales, styles }),
  }
}
