import { flatMap, uniq } from 'lodash-es'
import type { FontState } from '../types'

export const assertFonts = (fonts: Map<string, FontState>) => {
  const values = Array.from(fonts.values()).map((value): [string, string] => [
    value.slug,
    value.font.name ?? value.slug,
  ])

  if (
    uniq(flatMap(values, (value) => value[0])).length !==
    uniq(flatMap(values, (value) => value[1])).length
  ) {
    throw new Error('Conflicting font names.')
  }
}
