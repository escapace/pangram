import type { FontLocal, FontProperties, FontState, State, StatePartial } from '../types'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeStyles } from './normalize-styles'
import { schemaLocales, type UserConfiguration } from './user-schema'

export const normalizeState = (userConfiguration: UserConfiguration): State => {
  const locales = schemaLocales.parse(userConfiguration.locales)

  const state: StatePartial = {
    fontProperties: new Map<string, Required<FontProperties>>(),
    localFonts: new Map<string, FontLocal>(),
    userFonts: new Map<string, FontState>(),
  }

  const styles = normalizeStyles(locales, state)

  assertFonts(state.userFonts)

  return {
    fontProperties: state.fontProperties,
    localFonts: state.localFonts,
    styles,
    userFonts: state.userFonts,
    warnings: new Set<string>(),
    ...normalizeLocales({ locales, styles }),
  }
}
