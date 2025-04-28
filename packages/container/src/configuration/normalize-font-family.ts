import { fontSort } from '../font/font-sort'
import type { StatePartial } from '../types'
import type { ConfigurationFontFamily } from './user-schema'

export const normalizeFontFamily = (
  fontFamily: ConfigurationFontFamily | undefined,
  state: StatePartial,
) => {
  if (fontFamily === undefined) {
    return
  }

  const { generics: fallbacksGeneric } = fontFamily

  const fallbacks = fontFamily.local.map((configuration) => {
    if (!state.fallbackFonts.has(configuration.id)) {
      state.fallbackFonts.set(configuration.id, { configuration, fontFaces: new Map() })
    }

    return configuration.id
  })

  const { fonts: fontStates, graph } = fontSort(fontFamily.family)

  const fonts = fontStates.map((value): string => {
    const slug = value.slug

    if (!state.fonts.has(slug)) {
      state.fonts.set(slug, value)
    }

    return slug
  })

  return {
    fontFamily: {
      fallbacks,
      fallbacksGeneric,
      fonts,
    },
    graph,
  }
}
