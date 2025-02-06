import { compact, defaults, flatMap, uniq } from 'lodash-es'
import { fontSort } from '../font/font-sort'
import type { Configuration, FontFallback, FontProperties, FontState, Style } from '../types'
import { createHash } from '../utilities/create-hash'
import { reduceGraph } from '../utilities/reduce-graph'
import { toposortReverse } from '../utilities/toposort'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeStyleRule } from './normalize-style-rule'
import type { InferFontFamily, InferFontProperties, InferLocales } from './user-schema'

interface ReducerState {
  cwd: string
  fallbackFonts: Map<string, FontFallback>
  fontProperties: Map<string, Required<FontProperties>>
  fonts: Map<string, FontState>
}

const reduceFontFamily = (fontFamily: InferFontFamily | undefined, state: ReducerState) => {
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

  const { fonts: fontStates, graph } = fontSort(fontFamily.fonts, state.cwd)

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

const reduceFontProperties = (
  infered: InferFontProperties[],
  state: ReducerState,
):
  | {
      graph: Map<string, string[]>
      id: string
    }
  | undefined => {
  const fontPropertiesAndGraphArray = infered.map(
    (properties): { fontProperties: FontProperties; graph?: Map<string, string[]> } | undefined => {
      const value = reduceFontFamily(properties.fontFamily, state)

      return {
        fontProperties: {
          ...properties,
          fontFamily: value?.fontFamily,
        },
        graph: value?.graph,
      }
    },
  )

  const fontPropertiesArray: FontProperties[] = compact(
    fontPropertiesAndGraphArray.map((value) => value?.fontProperties),
  )

  if (fontPropertiesArray.length === 0) {
    return
  }

  const properties = defaults({}, ...fontPropertiesArray.reverse()) as FontProperties

  const fontProperties: Required<FontProperties> = {
    fontFamily: properties.fontFamily,
    fontStretch: properties.fontStretch ?? 100,
    fontStyle: properties.fontStyle ?? 'normal',
    fontVariationSettings: properties.fontVariationSettings ?? 'normal',
    fontWeight: properties.fontWeight ?? 400,
  }

  const id = createHash(fontProperties)

  if (!state.fontProperties.has(id)) {
    state.fontProperties.set(id, fontProperties)
  }

  const graph = compact(fontPropertiesAndGraphArray.map((value) => value?.graph)).reduce(
    (previous, next) => reduceGraph(previous, next),
    new Map<string, string[]>(),
  )

  return { graph, id }
}

const normalizeStyles = (locales: InferLocales, state: ReducerState) => {
  const styles: Style[] = flatMap(locales, (value, locale) => {
    if (typeof value === 'string') {
      return []
    }

    return flatMap(value, (styleRule, classname) =>
      normalizeStyleRule(styleRule).map((value) => {
        const reducedFontProperties = reduceFontProperties(value.fontProperties, state)

        return {
          classname,
          locale,
          ...value,
          fontProperties: reducedFontProperties?.id,
          graph: reducedFontProperties?.graph,
          variables: {},
        }
      }),
    )
  })

  return compact(
    uniq(
      toposortReverse(
        new Map(
          styles.map(
            (value) => [value.id, value.parent === undefined ? [] : [value.parent]] as const,
          ),
        ),
      ).flatMap((value) => Array.from(value)),
    ).map((id) => styles.find((value) => value.id === id)),
  )
}

export const normalizeConfiguration = (locales: InferLocales, cwd: string): Configuration => {
  const state: ReducerState = {
    cwd,
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
