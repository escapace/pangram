/* eslint-disable typescript/strict-boolean-expressions */
import { codePointFrequencies } from '@pangram/unicode-tools'
import assert from 'node:assert'
import type { FontInformation } from '../state/user-schema'
import type { FontFaceAdjustments } from '../types'
import { round } from '../utilities/round'

type RequiredFontInformation = Required<
  Pick<
    FontInformation,
    'ascent' | 'codePoints' | 'descent' | 'lineGap' | 'unitsPerEm' | 'xWidthAvg'
  >
>

export const xWidthAverage = (data: RequiredFontInformation, locales: string[]) => {
  assert(data.codePoints.length !== 0)

  const frequencies = codePointFrequencies(
    data.codePoints.map((value) => value.codePoint),
    locales,
    [32],
  )

  return (
    frequencies.reduce((sum, [codePoint, frequency]) => {
      // eslint-disable-next-line typescript/no-non-null-assertion
      const { advanceWidth } = data.codePoints.find((value) => value.codePoint === codePoint)!

      return sum + advanceWidth * frequency
    }, 0) / data.unitsPerEm
  )
}

const toPercentString = (value: number) => `${round(value * 100)}%`

// extended from https://github.com/seek-oss/capsize/blob/master/packages/core/src/createFontStack.ts
export const fontAdjust = (
  primary: RequiredFontInformation,
  secondary: RequiredFontInformation,
  locales: string[],
): FontFaceAdjustments => {
  const primaryXWidthAverage = xWidthAverage(primary, locales)
  const secondaryXWidthAverage = xWidthAverage(secondary, locales)

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
