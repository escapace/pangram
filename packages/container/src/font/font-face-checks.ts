import type { FontFace } from '../types'
import { CharacterSet, parseUnicodeRange } from './font-unicode-range'

function toTuple(v: number | [number, number]): [number, number] {
  return Array.isArray(v) ? v : [v, v]
}

function rangesOverlap([minA, maxA]: [number, number], [minB, maxB]: [number, number]): boolean {
  return maxA >= minB && maxB >= minA
}

type FontFaceWithCodepoints = { codePoints?: number[] } & FontFace

/**
 * Returns *true* when at least one pair of faces can match the same character.
 * Assumes an external helper  isUnicodeRangeOverlap(a?:string,b?:string):boolean
 */

const unicodeRange = (value: FontFaceWithCodepoints) => {
  if (value.unicodeRange !== undefined) {
    return parseUnicodeRange(value.unicodeRange)
  }

  if (value.codePoints !== undefined) {
    const characterSet = new CharacterSet()
    characterSet.add(...value.codePoints)
    return characterSet
  }

  return parseUnicodeRange('U+0-10FFFF') // when unicodeRange is omitted
}

export function fontFaceChecks(faces: FontFaceWithCodepoints[]) {
  const issues: Array<[FontFaceWithCodepoints, FontFaceWithCodepoints]> = []

  for (let index = 0; index < faces.length - 1; index++) {
    const a = faces[index]
    for (let index_ = index + 1; index_ < faces.length; index_++) {
      const b = faces[index_]

      /* Different families never clash: CSS only compares faces *within* a family */
      if (a.fontFamily !== b.fontFamily) continue

      /* font-style must be identical (CSS never mixes italic+normal for one run) */
      if (a.fontStyle !== b.fontStyle) continue

      /* Ranges for weight & stretch must overlap (numeric or tuple)  */
      if (!rangesOverlap(toTuple(a.fontWeight), toTuple(b.fontWeight))) continue
      if (!rangesOverlap(toTuple(a.fontStretch), toTuple(b.fontStretch))) continue

      /* Unicode-range overlap ⇒ two faces could both serve the same code point */
      const urA = unicodeRange(a)
      const urB = unicodeRange(b)

      if (urA.intersect(urB).size !== 0) {
        issues.push([a, b])
      }
    }
  }

  // TODO: better error messages
  if (issues.length !== 0) {
    throw new Error(`Font face matching issue`)
  }
}
