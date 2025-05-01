import type { ResourceHint } from '@pangram/font-loader'
import { compact } from 'lodash-es'
import urljoin from 'url-join'
import type { Configuration, UserFontComplete } from '../types'

export const fontResourceHints = (
  slug: string,
  configuration: Configuration,
): ResourceHint[] | undefined => {
  const font = configuration.state.userFonts.get(slug) as UserFontComplete | undefined

  if (font === undefined) {
    return undefined
  }

  const { format, resourceHint } = font.configuration

  const array: ResourceHint[] = compact([
    resourceHint === undefined
      ? undefined
      : {
          as: 'font',
          crossorigin: 'anonymous',
          href: urljoin(configuration.publicPath, `${slug}.${format[0]}`),
          rel: resourceHint,
          type: `font/${format[0]}`,
        },
  ])

  return array.length === 0 ? undefined : array
}
