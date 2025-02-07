import { fontSort } from '../font/font-sort'
import type { StatePartial } from '../types'
import type { InferFontFamily } from './user-schema'

export const normalizeFontFamily = (
  fontFamily: InferFontFamily | undefined,
  state: StatePartial,
) => {
  if (fontFamily === undefined) {
    return
  }

  const { fallbacksGeneric } = fontFamily

  const fallbacks = fontFamily.fallbacks.map((value) => {
    if (!state.fallbackFonts.has(value.id)) {
      state.fallbackFonts.set(value.id, { font: value, fontFaces: new Map() })
    }

    return value.id
  })

  const { fonts: fontStates, graph } = fontSort(fontFamily.fonts)

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
