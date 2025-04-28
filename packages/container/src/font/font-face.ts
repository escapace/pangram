import urljoin from 'url-join'
import type {
  FontFace,
  FontFaceAdjustments,
  FontFallback,
  FontProperties,
  FontState,
} from '../types'
import { fontNames } from './font-names'
import { createHash } from '../utilities/create-hash'
import assert from 'node:assert'

const fontSource = ({ font, slug }: FontState, publicPath: string): string =>
  font.format
    .map((format) => ({
      ...font,
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

interface FontFaceOptionsFallback {
  font: FontFallback
  fontProperties: Omit<Required<FontProperties>, 'fontFamily'>
  type: 'fallback'
  adjustments?: FontFaceAdjustments
}

interface FontFaceOptionsFont {
  font: FontState
  fontProperties: Omit<Required<FontProperties>, 'fontFamily'>
  publicPath: string
  type: 'font'
  adjustments?: FontFaceAdjustments
  primaryFont?: FontState
}

export const fontFace = (options: FontFaceOptionsFallback | FontFaceOptionsFont): FontFace => {
  if (options.type === 'font') {
    const { font } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.fontProperties

    const fontFamily = [
      options.primaryFont?.font.family ?? options.primaryFont?.slug,
      options.font?.font.family ?? options.font?.slug,
    ].filter((value) => value !== undefined)

    assert(fontFamily.length === 1 || fontFamily.length === 2)

    return {
      fontDisplay: font.display,
      fontFamily: fontFamily.length === 1 ? fontFamily[0] : createHash(fontFamily),
      fontStretch,
      fontStyle,
      fontWeight,
      src: fontSource(options.font, options.publicPath),
      unicodeRange: font.unicodeRange,
      ...options.adjustments,
    }
  } else {
    const { font } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.fontProperties

    const names = fontNames(font)

    return {
      fontFamily: font.id,
      fontStretch,
      fontStyle,
      fontWeight,
      src: names.map((name) => `local(${name})`).join(', '),
      ...options.adjustments,
    }
  }
}
