import { compact, defaults } from 'lodash-es'
import type { FontProperties, StatePartial } from '../types'
import { createHash } from '../utilities/create-hash'
import { reduceGraph } from '../utilities/reduce-graph'
import { normalizeFontFamily } from './normalize-font-family'
import type { InferFontProperties } from './user-schema'

export const normalizeFontProperties = (
  infered: InferFontProperties[],
  state: StatePartial,
):
  | {
      graph: Map<string, string[]>
      id: string
    }
  | undefined => {
  const fontPropertiesAndGraphArray = infered.map(
    (properties): { fontProperties: FontProperties; graph?: Map<string, string[]> } | undefined => {
      const value = normalizeFontFamily(properties.fontFamily, state)

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
