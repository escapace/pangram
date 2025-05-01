import type { LocalFont, UserFont, Properties, State, StatePartial } from '../types'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeStyles } from './normalize-styles'
import { schemaLocales, type UserConfiguration } from './user-schema'

export const normalizeState = (userConfiguration: UserConfiguration): State => {
  const locales = schemaLocales.parse(userConfiguration.locales)

  const state: StatePartial = {
    localFonts: new Map<string, LocalFont>(),
    properties: new Map<string, Required<Properties>>(),
    userFonts: new Map<string, UserFont>(),
  }

  const styles = normalizeStyles(locales, state)

  assertFonts(state.userFonts)

  return {
    localFonts: state.localFonts,
    styles,
    userFonts: state.userFonts,
    warnings: new Set<string>(),
    ...normalizeLocales({ locales, styles }),
  }
}
