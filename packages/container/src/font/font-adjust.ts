/* eslint-disable typescript/strict-boolean-expressions */
import { codePointFrequencies } from '@pangram/unicode-tools'
import assert from 'node:assert'
import type { UserConfigurationFontInformation } from '../state/user-schema'
import type { FontFaceAdjustments } from '../types'
import { round } from '../utilities/round'

export type RequiredFontInformation = Required<
  Pick<
    UserConfigurationFontInformation,
    'ascent' | 'codePoints' | 'descent' | 'lineGap' | 'unitsPerEm' | 'xWidthAvg'
  >
>

type CodePointInformation =
  RequiredFontInformation['codePoints'] extends Array<infer T> ? T : unknown

const combineCodepoints = (arrays: CodePointInformation[][]): CodePointInformation[] => {
  if (arrays.length === 1) {
    return arrays[0]
  }

  const codePoints = new Map<number, CodePointInformation>()

  for (const array of arrays) {
    for (const value of array) {
      if (codePoints.has(value.codePoint)) {
        continue
      }

      codePoints.set(value.codePoint, value)
    }
  }

  return Array.from(codePoints.values())
}

export const xWidthAverage = (locales: string[], ...fonts: RequiredFontInformation[]) => {
  assert(fonts.length !== 0)

  const { unitsPerEm } = fonts[0]

  const codePoints = combineCodepoints(fonts.map((value) => value.codePoints))

  assert(codePoints.length !== 0)

  const frequencies = codePointFrequencies(
    locales,
    codePoints.map((value) => value.codePoint),
    // [32],
  )

  const value =
    frequencies.reduce((sum, [codePoint, frequency]) => {
      // eslint-disable-next-line typescript/no-non-null-assertion
      const { advanceWidth } = codePoints.find((value) => value.codePoint === codePoint)!

      return sum + advanceWidth * frequency
    }, 0) / unitsPerEm

  return value
}

const toPercentString = (value: number) => `${round(value * 100)}%`

// extended from https://github.com/seek-oss/capsize/blob/master/packages/core/src/createFontStack.ts
export const fontAdjust = (
  primary: RequiredFontInformation,
  secondary: RequiredFontInformation,
  locales: string[],
): FontFaceAdjustments => {
  const primaryXWidthAverage = xWidthAverage(locales, primary)
  const secondaryXWidthAverage = xWidthAverage(locales, secondary)

  const sizeAdjust =
    primaryXWidthAverage && secondaryXWidthAverage
      ? primaryXWidthAverage / secondaryXWidthAverage
      : 1

  const adjustedEmSquare = primary.unitsPerEm * sizeAdjust

  // Calculate metric overrides for primary font
  const ascentOverride = primary.ascent / adjustedEmSquare
  const descentOverride = Math.abs(primary.descent) / adjustedEmSquare
  const lineGapOverride = primary.lineGap / adjustedEmSquare

  const secondaryAscentOverride = secondary.ascent / adjustedEmSquare
  const secondaryDescentOverride = Math.abs(secondary.descent) / adjustedEmSquare
  const secondaryLineGapOverride = secondary.lineGap / adjustedEmSquare

  const adjustments: FontFaceAdjustments = {}

  if (ascentOverride && ascentOverride !== secondaryAscentOverride) {
    adjustments.ascentOverride = toPercentString(ascentOverride)
  }
  if (descentOverride && descentOverride !== secondaryDescentOverride) {
    adjustments.descentOverride = toPercentString(descentOverride)
  }
  if (lineGapOverride !== secondaryLineGapOverride) {
    adjustments.lineGapOverride = toPercentString(lineGapOverride)
  }
  if (sizeAdjust && sizeAdjust !== 1) {
    adjustments.sizeAdjust = toPercentString(sizeAdjust)
  }

  return adjustments
}
