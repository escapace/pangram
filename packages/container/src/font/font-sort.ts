import { uniq, uniqBy } from 'lodash-es'
import type { ConfigurationFont } from '../configuration/user-schema'
import { type UserFontPending, FontType } from '../types'
import { toposort } from '../utilities/toposort'
import { fontSlug } from './font-slug'

const hasFontOverlap = (fonts: ConfigurationFont[]): boolean =>
  uniqBy(fonts, (value) => fontSlug(value)).length !== fonts.length

export const fontSort = (
  initial: ConfigurationFont[],
): {
  fonts: UserFontPending[]
  graph: Map<string, string[]>
} => {
  // if (initial.length === 0) {
  //   throw new Error('At least one font is necessary.')
  // }

  if (hasFontOverlap(initial)) {
    throw new Error('One of the stacks has font overlaps.')
  }

  const graph = new Map<string, string[]>()
  const fontStates = new Map<string, UserFontPending>()

  const add = (key: string, parent?: string) => {
    if (!graph.has(key)) {
      graph.set(key, [])
    }

    if (parent !== undefined) {
      // eslint-disable-next-line typescript/no-non-null-assertion
      const array = graph.get(key)!

      if (!array.includes(parent)) {
        array.push(parent)
      }
    }
  }

  const next = (values: ConfigurationFont[], parent?: string) => {
    values.forEach((configuration) => {
      const slug = fontSlug(configuration)

      if (!fontStates.has(slug)) {
        fontStates.set(slug, {
          configuration,
          fontFaces: new Map(),
          slug,
          type: FontType.UserPending,
        })
      }

      add(slug, parent)

      next(configuration.prefer ?? [], slug)
    })
  }

  next(initial)

  const order = toposort(graph).map((value) => Array.from(value))

  // eslint-disable-next-line typescript/no-non-null-assertion
  const fonts = uniq(order.flat()).map((value) => fontStates.get(value)!)

  return { fonts, graph }
}
