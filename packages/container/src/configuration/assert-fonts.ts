import { flatMap, uniq } from 'lodash-es'
import type { UserFont } from '../types'

export const assertFonts = (fonts: Map<string, UserFont>) => {
  const values = Array.from(fonts.values()).map((value): [string, string] => [
    value.slug,
    value.slug,
  ])

  if (
    uniq(flatMap(values, (value) => value[0])).length !==
    uniq(flatMap(values, (value) => value[1])).length
  ) {
    throw new Error('Conflicting font names.')
  }
}
