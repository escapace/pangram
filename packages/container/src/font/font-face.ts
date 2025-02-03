import urljoin from 'url-join'
import type {
  FontFace,
  FontFaceAdjustments,
  FontFallback,
  FontProperties,
  FontState,
} from '../types'
import { fontNames } from './font-names'

const fontSource = ({ font, slug }: FontState, publicPath: string): string =>
  font.format
    .map((format) => ({
      ...font,
      format,
      url: urljoin(publicPath, `${font.name ?? slug}.${format}`),
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
  publicPath: string
  type: 'fallback'
  adjustments?: FontFaceAdjustments
}

interface FontFaceOptionsFont {
  font: FontState
  fontProperties: Omit<Required<FontProperties>, 'fontFamily'>
  publicPath: string
  type: 'font'
  adjustments?: FontFaceAdjustments
}

export const fontFace = (options: FontFaceOptionsFallback | FontFaceOptionsFont): FontFace => {
  if (options.type === 'font') {
    const { font } = options.font
    const { fontStretch, fontStyle, fontWeight } = options.fontProperties

    return {
      fontDisplay: font.display,
      fontFamily: font.name ?? options.font.slug,
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
