import { fontSort } from '../font/font-sort'
import type { FontProperties, StatePartial } from '../types'
import type { ConfigurationFontFamily } from './user-schema'

export const normalizeFontFamily = (
  fontFamily: ConfigurationFontFamily | undefined,
  state: StatePartial,
) => {
  if (fontFamily === undefined) {
    return
  }

  const { generic } = fontFamily

  const local = fontFamily.local.map((configuration) => {
    if (!state.localFonts.has(configuration.id)) {
      state.localFonts.set(configuration.id, { configuration, fontFaces: new Map() })
    }

    return configuration.id
  })

  const { fonts: fontStates, graph } = fontSort(fontFamily.user)

  const user = fontStates.map((value): string => {
    const slug = value.slug

    if (!state.userFonts.has(slug)) {
      state.userFonts.set(slug, value)
    }

    return slug
  })

  return {
    fontFamily: {
      generic,
      local,
      user,
    } satisfies FontProperties['fontFamily'],
    graph,
  }
}
