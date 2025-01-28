import { compact, isNumber } from 'lodash-es'
import type { FontFace } from '../types'
import { fontFamilyQuote } from './font-family-quote'

export const fontFaceToString = (value: FontFace): string => {
  const qwe = compact([
    '@font-face {',
    `font-family: ${fontFamilyQuote(value.fontFamily)};`,
    `src: ${value.src};`,
    isNumber(value.fontWeight)
      ? value.fontWeight === 400
        ? undefined
        : `font-weight: ${value.fontWeight};`
      : Array.isArray(value.fontWeight)
        ? `font-weight: ${value.fontWeight[0]} ${value.fontWeight[1]};`
        : undefined,
    value.fontStyle === 'normal' ? undefined : `font-style: ${value.fontStyle};`,
    isNumber(value.fontStretch)
      ? value.fontStretch === 100
        ? undefined
        : `font-stretch: ${value.fontStretch}%;`
      : Array.isArray(value.fontStretch)
        ? `font-stretch: ${value.fontStretch[0]}% ${value.fontStretch[1]}%;`
        : undefined,
    value.unicodeRange === undefined ? undefined : `unicode-range: ${value.unicodeRange};`,
    value.ascentOverride === undefined ? undefined : `ascent-override: ${value.ascentOverride};`,
    value.descentOverride === undefined ? undefined : `descent-override: ${value.descentOverride};`,
    value.lineGapOverride === undefined
      ? undefined
      : `line-gap-override: ${value.lineGapOverride};`,
    value.sizeAdjust === undefined ? undefined : `size-adjust: ${value.sizeAdjust};`,
    value.fontDisplay === undefined ? undefined : `font-display: ${value.fontDisplay};`,
    // value.fontNamedInstance === undefined
    //   ? undefined
    //   : `font-named-instance: ${quoteFontFamily(value.fontNamedInstance)};`,
    '}',
  ]).join('\n')

  return qwe
}
