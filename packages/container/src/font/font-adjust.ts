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

const xWidthAverage = (data: RequiredFontInformation, locales: string[]) => {
  assert(data.codePoints.length !== 0)

  const frequencies = codePointFrequencies(
    data.codePoints.map((value) => value.codePoint),
    locales,
  )

  return frequencies.reduce((sum, [codePoint, frequency]) => {
    // eslint-disable-next-line typescript/no-non-null-assertion
    const { advanceWidth } = data.codePoints.find((value) => value.codePoint === codePoint)!

    return sum + advanceWidth * frequency
  }, 0)
}

export const fontAdjust = (
  primary: RequiredFontInformation,
  secondary: RequiredFontInformation,
  locales: string[],
): FontFaceAdjustments => {
  const primaryXWidthAverage = xWidthAverage(primary, locales)
  const secondaryXWidthAverage = xWidthAverage(secondary, locales)

  // Calculate size adjust
  const primaryFontXAvgRatio = primaryXWidthAverage / primary.unitsPerEm
  const fallbackFontXAvgRatio = secondaryXWidthAverage / secondary.unitsPerEm

  const sizeAdjust =
    primaryFontXAvgRatio && fallbackFontXAvgRatio ? primaryFontXAvgRatio / fallbackFontXAvgRatio : 1

  const adjustedEmSquare = primary.unitsPerEm * sizeAdjust

  // Calculate metric overrides for primary font
  const ascentOverride = primary.ascent / adjustedEmSquare
  const descentOverride = Math.abs(primary.descent) / adjustedEmSquare
  const lineGapOverride = primary.lineGap / adjustedEmSquare

  // Conditionally populate font face properties and format to percent
  const adjustments = {
    ascentOverride: `${round(ascentOverride * 100)}%`,
    descentOverride: `${round(descentOverride * 100)}%`,
    lineGapOverride: `${round(lineGapOverride * 100)}%`,
    sizeAdjust: `${round(sizeAdjust * 100)}%`,
  }

  return adjustments
}
