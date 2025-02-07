import { uniq, uniqBy } from 'lodash-es'
import type { InferFont } from '../state/user-schema'
import { type FontStateInitial, TypeFontState } from '../types'
import { toposort } from '../utilities/toposort'
import { fontSlug } from './font-slug'

const hasFontOverlap = (fonts: InferFont[]): boolean =>
  uniqBy(fonts, (value) => fontSlug(value)).length !== fonts.length

export const fontSort = (
  initial: InferFont[],
): {
  fonts: FontStateInitial[]
  graph: Map<string, string[]>
} => {
  // if (initial.length === 0) {
  //   throw new Error('At least one font is necessary.')
  // }

  if (hasFontOverlap(initial)) {
    throw new Error('One of the classes has font overlaps.')
  }

  const graph = new Map<string, string[]>()
  const fontStates = new Map<string, FontStateInitial>()

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

  const next = (values: InferFont[], parent?: string) => {
    values.forEach((font) => {
      const slug = fontSlug(font)

      if (!fontStates.has(slug)) {
        fontStates.set(slug, {
          font,
          fontFaces: new Map(),
          slug,
          type: TypeFontState.Initial,
        })
      }

      add(slug, parent)

      next(font.prefer ?? [], slug)
    })
  }

  next(initial)

  const order = toposort(graph).map((value) => Array.from(value))

  // eslint-disable-next-line typescript/no-non-null-assertion
  const fonts = uniq(order.flat()).map((value) => fontStates.get(value)!)

  return { fonts, graph }
}
