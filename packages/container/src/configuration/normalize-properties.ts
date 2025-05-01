import { compact, defaults } from 'lodash-es'
import type { Properties, StatePartial } from '../types'
import { createHash } from '../utilities/create-hash'
import { reduceGraph } from '../utilities/reduce-graph'
import { normalizeFontFamily } from './normalize-font-family'
import type { ConfigurationFontProperties } from './user-schema'

export const normalizeProperties = (
  infered: ConfigurationFontProperties[],
  state: StatePartial,
):
  | {
      graph: Map<string, string[]>
      id: string
    }
  | undefined => {
  const propertiesAndGraphArray = infered.map(
    (properties): { properties: Properties; graph?: Map<string, string[]> } | undefined => {
      const value = normalizeFontFamily(properties.fontFamily, state)

      return {
        graph: value?.graph,
        properties: {
          ...properties,
          fontFamily: value?.fontFamily,
        },
      }
    },
  )

  const propertiesArray: Properties[] = compact(
    propertiesAndGraphArray.map((value) => value?.properties),
  )

  if (propertiesArray.length === 0) {
    return
  }

  const _properties = defaults({}, ...propertiesArray.reverse()) as Properties

  const properties: Required<Properties> = {
    fontFamily: _properties.fontFamily,
    fontStretch: _properties.fontStretch ?? 100,
    fontStyle: _properties.fontStyle ?? 'normal',
    fontVariationSettings: _properties.fontVariationSettings ?? 'normal',
    fontWeight: _properties.fontWeight ?? 400,
  }

  const id = createHash(properties)

  if (!state.properties.has(id)) {
    state.properties.set(id, properties)
  }

  const graph = compact(propertiesAndGraphArray.map((value) => value?.graph)).reduce(
    (previous, next) => reduceGraph(previous, next),
    new Map<string, string[]>(),
  )

  return { graph, id }
}
