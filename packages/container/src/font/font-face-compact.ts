import { groupBy, omit, uniq } from 'lodash-es'
import type { InferFont } from '../state/user-schema'
import type { FontFace, TupleUnion } from '../types'
import { createHash } from '../utilities/create-hash'
import { type CharacterSet, fontUnicodeRange } from './font-unicode-range'

const fontDisplayCompact = (value: InferFont['display']) => {
  const priority: TupleUnion<Exclude<InferFont['display'], undefined>> = [
    'block',
    'auto',
    'swap',
    'fallback',
    'optional',
  ]

  return priority.indexOf(value ?? 'auto')
}

const reduceFontFaceWeightStretch = (
  value: Array<number | [number, number]>,
): number | [number, number] => {
  const array = uniq(value.flatMap((value) => value)).sort((a, b) => a - b)

  return array.length === 1 ? array[0] : [array[0], array[1]]
}

const reduceUnicodeRange = (value: Array<string | undefined>) => {
  const characcterSet = value
    .map((value) => (typeof value === 'string' ? fontUnicodeRange(value) : undefined))
    .filter((value): value is CharacterSet => value !== undefined)
    .reduce((accumulator, value) => accumulator.union(value))

  if (characcterSet.size === 0) {
    return undefined
  }

  return characcterSet.toHexRangeString()
}

export const fontFaceCompact = (
  fontFaces: { [k: string]: FontFace },
  isFallback: boolean,
): Array<[string, FontFace]> =>
  Object.values(
    groupBy(Object.entries(fontFaces), ([, fontFace]) =>
      createHash(
        omit(fontFace, ['fontDisplay', 'fontStretch', 'fontWeight', 'unicodeRange'] satisfies Array<
          keyof FontFace
        >),
      ),
    ),
  )
    .map((value) => {
      const relevant = value.map((value) => value[1])
      const current = value[0][1]
      const keys = value.map((value) => value[0])

      const fontFace: FontFace = {
        ...current,
        fontDisplay: isFallback
          ? undefined
          : relevant.map((value) => value.fontDisplay).sort(fontDisplayCompact)[0],
        // fontStretch: 100,
        // fontStyle: 'normal',
        // fontWeight: 400,
        fontStretch: reduceFontFaceWeightStretch(relevant.map((value) => value.fontStretch)),
        fontWeight: reduceFontFaceWeightStretch(relevant.map((value) => value.fontWeight)),
        // fontNamedInstance: isFallback ? current.fontNamedInstance : undefined,
        unicodeRange: isFallback
          ? undefined
          : reduceUnicodeRange(relevant.map((value) => value.unicodeRange)),
      }

      const hash = createHash(fontFace)
      const result = { ...fontFace, fontFamily: `${current.fontFamily}-${hash}` }

      return keys.map((key) => [key, result] as [string, FontFace])
    })
    .flat()
