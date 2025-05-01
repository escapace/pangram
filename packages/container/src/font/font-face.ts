import { compact, isEmpty } from 'lodash-es'
import assert from 'node:assert'
import urljoin from 'url-join'
import {
  FontType,
  type Configuration,
  type FontFace,
  type FontFaceAdjustments,
  type LocalFont,
  type Properties,
  type UserFont,
  type UserFontComplete,
} from '../types'
import { createHash } from '../utilities/create-hash'
import { fontNames } from './font-names'

const fontSource = ({ configuration, slug }: UserFont, publicPath: string): string =>
  configuration.format
    .map((format) => ({
      ...configuration,
      format,
      url: urljoin(publicPath, `${slug}.${format}`),
    }))
    .flatMap(({ format, tech, url }) =>
      (tech ?? []).includes('variations')
        ? [
            `url("${url}") format("${format}-variations")`,
            // `url("${url}") format("${format}") tech("variations")`
          ]
        : `url("${url}") format("${format}")`,
    )
    .join(', ')

interface FontFaceOptions {
  font: LocalFont | UserFontComplete
  properties: Omit<Required<Properties>, 'fontFamily'>
  adjustments?: FontFaceAdjustments
  primaryFont?: LocalFont | UserFontComplete
}

const localFontFamily = (font: LocalFont) => {
  const value = [
    font.configuration.familyName,
    font.configuration.legacyFamilyName,
    font.configuration.wwsFamilyName,
  ].find((value) => typeof value === 'string')

  assert(value !== undefined)

  return value
}

const userFontFamily = (font: UserFontComplete) => font.configuration.family

const getFontFamily = (font?: LocalFont | UserFontComplete) =>
  font === undefined
    ? undefined
    : font.type === FontType.Local
      ? localFontFamily(font)
      : userFontFamily(font)

const getFontId = (font: LocalFont | UserFontComplete) =>
  font.type === FontType.Local ? font.configuration.id : font.slug

// const createFontFamily = (font?: LocalFont | UserFontComplete, primaryFont?: LocalFont | UserFontComplete) => {}

export const fontFace = (
  options: FontFaceOptions,
  { adjustFontMetrics, publicPath }: Configuration,
): FontFace => {
  const hasPrimaryFont = options.primaryFont !== undefined
  const hasAdjustments = hasPrimaryFont ? adjustFontMetrics && !isEmpty(options.adjustments) : false

  const _fontFamily = getFontFamily(options.font)

  const fontFamily =
    typeof _fontFamily === 'string' && !hasAdjustments
      ? _fontFamily
      : createHash(
          compact([
            _fontFamily ?? getFontId(options.font),
            getFontFamily(options.primaryFont) ??
              (options.primaryFont === undefined ? undefined : getFontId(options.primaryFont)),
          ]),
        )

  if (options.font.type === FontType.Local) {
    const { configuration } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.properties
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const src = fontNames(configuration)
      .map((name) => `local(${name})`)
      .join(', ')

    return {
      fontFamily,
      fontStretch,
      fontStyle,
      fontWeight,
      src,
      ...options.adjustments,
    }
  } else {
    const { configuration } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.properties

    return {
      fontDisplay: configuration.display,
      fontFamily,
      fontStretch,
      fontStyle,
      fontWeight,
      src: fontSource(options.font, publicPath),
      unicodeRange: configuration.unicodeRange,
      ...options.adjustments,
    }
  }
}

//   fontStretch: number | [number, number]
//   fontWeight: number | [number, number]
//   fontDisplay?: ConfigurationFont['display']
//   unicodeRange?: ConfigurationFont['unicodeRange']

//   ascentOverride?: string
//   descentOverride?: string
//   lineGapOverride?: string
//   sizeAdjust?: string
//   fontStyle: 'italic' | 'normal'
//   src: string
//
//   fontFamily: string
