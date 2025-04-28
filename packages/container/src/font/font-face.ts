import assert from 'node:assert'
import urljoin from 'url-join'
import type {
  FontFace,
  FontFaceAdjustments,
  FontFallback,
  FontProperties,
  FontState,
} from '../types'
import { createHash } from '../utilities/create-hash'
import { fontNames } from './font-names'

const fontSource = ({ configuration, slug }: FontState, publicPath: string): string =>
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
    const { configuration } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.fontProperties

    const fontFamily = [
      options.primaryFont?.configuration.family ?? options.primaryFont?.slug,
      options.font?.configuration.family ?? options.font?.slug,
    ].filter((value) => value !== undefined)

    assert(fontFamily.length === 1 || fontFamily.length === 2)

    return {
      fontDisplay: configuration.display,
      fontFamily: fontFamily.length === 1 ? fontFamily[0] : createHash(fontFamily),
      fontStretch,
      fontStyle,
      fontWeight,
      src: fontSource(options.font, options.publicPath),
      unicodeRange: configuration.unicodeRange,
      ...options.adjustments,
    }
  } else {
    const { configuration } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.fontProperties

    const names = fontNames(configuration)

    return {
      fontFamily: configuration.id,
      fontStretch,
      fontStyle,
      fontWeight,
      src: names.map((name) => `local(${name})`).join(', '),
      ...options.adjustments,
    }
  }
}
