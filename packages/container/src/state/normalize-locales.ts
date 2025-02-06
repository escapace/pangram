import { groupBy, has, map } from 'lodash-es'
import type { Style } from '../types'
import type { InferLocales } from './user-schema'

export const normalizeLocales = (options: {
  locales: InferLocales
  styles: Style[]
}): {
  localeFromAlias: Map<string, string[]>
  locales: Record<string, Style[]>
  localeToAlias: Map<string, string[]>
} => {
  const locales = groupBy(options.styles, (value) => value.locale)

  const [localeFromAlias, localeToAlias] = map(options.locales, (value, key) => {
    if (typeof value === 'string') {
      if (!has(locales, value)) {
        throw new Error(`Locale alias ${key} points to a missing locale ${value}.`)
      }

      if (value === key) {
        return
      }

      return [key, value] as const
    }

    return
  })
    .filter((value): value is [string, string] => value !== undefined)
    .reduce(
      (accumulator, value) => {
        accumulator.forEach((map, index) => {
          const [k, v] = index === 0 ? value : [...value].reverse()

          const array = map.has(k)
            ? // eslint-disable-next-line typescript/no-non-null-assertion
              map.get(k)!
            : // eslint-disable-next-line typescript/no-non-null-assertion
              (map.set(k, []), map.get(k)!)

          if (!array.includes(v)) {
            array.push(v)
          }
        })

        return accumulator
      },
      [new Map<string, string[]>(), new Map<string, string[]>()],
    )

  return {
    localeFromAlias,
    locales,
    localeToAlias,
  }
}
