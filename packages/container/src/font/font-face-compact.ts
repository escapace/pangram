import { cloneDeep, groupBy, omit, uniq, uniqBy } from 'lodash-es'
import assert from 'node:assert'
import type { ConfigurationFont } from '../configuration/user-schema'
import {
  FontType,
  type FontFace,
  type LocalFont,
  type TupleUnion,
  type UserFontComplete,
} from '../types'
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

export function fontFaceCompact(
  inputs: Array<[LocalFont | UserFontComplete, FontFace, string]>,
): Array<[LocalFont | UserFontComplete, FontFace, string]>
export function fontFaceCompact(
  inputs: Array<[LocalFont | UserFontComplete, FontFace]>,
): Array<[LocalFont | UserFontComplete, FontFace]>
export function fontFaceCompact(
  inputs:
    | Array<[LocalFont | UserFontComplete, FontFace, string]>
    | Array<[LocalFont | UserFontComplete, FontFace]>,
):
  | Array<[LocalFont | UserFontComplete, FontFace, string]>
  | Array<[LocalFont | UserFontComplete, FontFace]> {
  const copy = cloneDeep(inputs)

  const grouped = Object.values(
    groupBy(
      copy as Array<[LocalFont | UserFontComplete, FontFace, string | undefined]>,
      ([_, fontFace]) =>
        createHash(
          omit(fontFace, [
            'fontDisplay',
            'fontStretch',
            'fontWeight',
            'unicodeRange',
          ] satisfies Array<keyof FontFace>),
        ),
    ),
  )

  const entries = grouped
    .map((value) => {
      const fontFaces = value.map((value) => value[1])

      const fonts = uniqBy(
        value.map((value) => value[0]),
        (value) => (value.type === FontType.UserComplete ? value.slug : value.configuration.id),
      )
      assert(fonts.length === 1)
      const font = fonts[0]

      const keys = value.map((value) => value[2]).filter((value) => value !== undefined)

      const base = value[0][1]

      const fontFace: FontFace = {
        ...base,
        fontDisplay:
          font.type === FontType.Local
            ? undefined
            : reduceFontDisplay(fontFaces.map((value) => value.fontDisplay)),
        fontStretch: reduceFontFaceWeightStretch(fontFaces.map((value) => value.fontStretch)),
        fontWeight: reduceFontFaceWeightStretch(fontFaces.map((value) => value.fontWeight)),
        // fontNamedInstance: isLocal ? current.fontNamedInstance : undefined,
        unicodeRange:
          font.type === FontType.Local
            ? undefined
            : reduceUnicodeRange(
                fontFaces.map((value) => value.unicodeRange),
                font.codePoints,
              ),
      }

      return keys.length === 0
        ? [[font, fontFace] as [LocalFont | UserFontComplete, FontFace]]
        : keys.map((key): [LocalFont | UserFontComplete, FontFace, string] => [font, fontFace, key])
    })
    .flat()

  return entries as
    | Array<[LocalFont | UserFontComplete, FontFace, string]>
    | Array<[LocalFont | UserFontComplete, FontFace]>
}

export const fontFaceCompactMap = (
  font: LocalFont | UserFontComplete,
  map: Map<string, FontFace>,
) => {
  const result = fontFaceCompact(
    Array.from(map.entries()).map(
      ([key, fontFace]): [LocalFont | UserFontComplete, FontFace, string] => [font, fontFace, key],
    ),
  )

  return new Map(result.map(([_, fontFace, key]): [string, FontFace] => [key, fontFace]))
}
