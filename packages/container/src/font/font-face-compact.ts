import { groupBy, omit, uniq } from 'lodash-es'
import assert from 'node:assert'
import type { ConfigurationFont } from '../configuration/user-schema'
import type { FontFace, TupleUnion } from '../types'
import { createHash } from '../utilities/create-hash'
import { CharacterSet, parseUnicodeRange } from './font-unicode-range'

const FONT_DISPLAY_PRIORITY: TupleUnion<Exclude<ConfigurationFont['display'], undefined>> = [
  'block',
  'auto',
  'swap',
  'fallback',
  'optional',
]

const reduceFontFaceWeightStretch = (
  value: Array<number | [number, number]>,
): number | [number, number] => {
  const array = uniq(value.flatMap((value) => value)).sort((a, b) => a - b)

  return array.length === 1 ? array[0] : [array[0], array[1]]
}

const reduceUnicodeRange = (value: Array<string | undefined>, codePoints: number[]) => {
  if (value.every((value) => value === undefined)) {
    return undefined
  }

  const characcterSet = value
    .map((value) => {
      if (value !== undefined) {
        return parseUnicodeRange(value)
      }
      const characterSet = new CharacterSet()
      characterSet.add(...codePoints)
      return characterSet
    })
    .reduce((accumulator, value) => accumulator.union(value))

  assert(characcterSet.size !== 0)

  return characcterSet.toHexRangeString()
}

const reduceFontDisplay = (values: Array<FontFace['fontDisplay']>): FontFace['fontDisplay'] => {
  if (values.every((value) => value === undefined)) {
    return undefined
  }

  return values.sort(
    (a, b) =>
      FONT_DISPLAY_PRIORITY.indexOf(a ?? 'auto') - FONT_DISPLAY_PRIORITY.indexOf(b ?? 'auto'),
  )[0]
}

export const fontFaceCompact = (
  fontFaces: { [k: string]: FontFace },
  options:
    | {
        codePoints: number[]
        isFallback: false
        fontFamily?: string
      }
    | {
        isFallback: true
      },
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
        fontDisplay: options.isFallback
          ? undefined
          : reduceFontDisplay(relevant.map((value) => value.fontDisplay)),
        fontStretch: reduceFontFaceWeightStretch(relevant.map((value) => value.fontStretch)),
        fontWeight: reduceFontFaceWeightStretch(relevant.map((value) => value.fontWeight)),
        // fontNamedInstance: isFallback ? current.fontNamedInstance : undefined,
        unicodeRange: options.isFallback
          ? undefined
          : reduceUnicodeRange(
              relevant.map((value) => value.unicodeRange),
              options.codePoints,
            ),
      }

      const hash = createHash(fontFace)
      const result = {
        ...fontFace,
        fontFamily: options.isFallback ? hash : fontFace.fontFamily,
      }

      return keys.map((key) => [key, result] as [string, FontFace])
    })
    .flat()
