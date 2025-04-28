import type { ResourceHint } from '@pangram/font-loader'
import { compact } from 'lodash-es'
import urljoin from 'url-join'
import type { Configuration, FontStateWritten } from '../types'

export const fontResourceHints = (
  slug: string,
  configuration: Configuration,
): ResourceHint[] | undefined => {
  const font = configuration.state.fonts.get(slug) as FontStateWritten | undefined

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
