import { compact } from 'lodash-es'
import urljoin from 'url-join'
import type { FontStateWritten, State } from '../types'
import type { ResourceHint } from '@pangram/font-loader'

export const fontResourceHints = (slug: string, state: State): ResourceHint[] | undefined => {
  const fontState = state.configuration.fonts.get(slug) as FontStateWritten | undefined

  if (fontState === undefined) {
    return undefined
  }

  const { font } = fontState

  const array: ResourceHint[] = compact([
    font.resourceHint === undefined
      ? undefined
      : {
          as: 'font',
          crossorigin: 'anonymous',
          href: urljoin(state.configuration.publicPath, `${slug}.${font.format[0]}`),
          rel: font.resourceHint,
          type: `font/${font.format[0]}`,
        },
  ])

  return array.length === 0 ? undefined : array
}
