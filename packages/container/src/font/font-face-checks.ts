import { uniq } from 'lodash-es'
import {
  FontType,
  type Configuration,
  type FontFace,
  type LocalFont,
  type UserFontComplete,
} from '../types'
import { fontName } from './font-name'
import { CharacterSet, parseUnicodeRange } from './font-unicode-range'

function toTuple(v: number | [number, number]): [number, number] {
  return Array.isArray(v) ? v : [v, v]
}

function rangesOverlap([minA, maxA]: [number, number], [minB, maxB]: [number, number]): boolean {
  return maxA >= minB && maxB >= minA
}

/**
 * Returns *true* when at least one pair of faces can match the same character.
 */
const unicodeRange = (font: LocalFont | UserFontComplete, fontFace: FontFace) => {
  if (fontFace.unicodeRange !== undefined) {
    return parseUnicodeRange(fontFace.unicodeRange)
  }

  if (font.type === FontType.UserComplete) {
    const characterSet = new CharacterSet()
    characterSet.add(...font.codePoints)
    return characterSet
  }

  // we assume full unicode range for local fonts

  return parseUnicodeRange('U+0-10FFFF') // when unicodeRange is omitted
}

type FontFaceWithCodepoints = [LocalFont | UserFontComplete, FontFace]

export function fontFaceChecks(faces: FontFaceWithCodepoints[], configuration: Configuration) {
  const issues: Array<[LocalFont | UserFontComplete, LocalFont | UserFontComplete]> = []

  for (let index = 0; index < faces.length - 1; index++) {
    const [fontX, fontFaceX] = faces[index]
    for (let index_ = index + 1; index_ < faces.length; index_++) {
      const [fontY, fontFaceY] = faces[index_]

      /* Different families never clash: CSS only compares faces *within* a family */
      if (fontFaceX.fontFamily !== fontFaceY.fontFamily) continue

      /* font-style must be identical (CSS never mixes italic+normal for one run) */
      if (fontFaceX.fontStyle !== fontFaceY.fontStyle) continue

      /* Ranges for weight & stretch must overlap (numeric or tuple)  */
      if (!rangesOverlap(toTuple(fontFaceX.fontWeight), toTuple(fontFaceY.fontWeight))) continue
      if (!rangesOverlap(toTuple(fontFaceX.fontStretch), toTuple(fontFaceY.fontStretch))) continue

      /* Unicode-range overlap ⇒ two faces could both serve the same code point */
      const unicodeRangeX = unicodeRange(fontX, fontFaceX)
      const unicodeRangeY = unicodeRange(fontY, fontFaceY)

      if (unicodeRangeX.intersect(unicodeRangeY).size !== 0) {
        issues.push([fontX, fontY])
      }
    }
  }

  if (issues.length !== 0) {
    throw new Error(
      `Conflicting @font-face at-rules for ${uniq(
        issues.flat().map((value) => fontName(value, configuration)),
      ).join(', ')}`,
    )
  }
}
