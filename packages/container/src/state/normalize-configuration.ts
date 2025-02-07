import type { Configuration, FontFallback, FontProperties, FontState, StatePartial } from '../types'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeStyles } from './normalize-styles'
import type { InferLocales } from './user-schema'

export const normalizeConfiguration = (locales: InferLocales): Configuration => {
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
    ...normalizeLocales({ locales, styles }),
  }
}
