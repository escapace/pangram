import { transform } from 'lightningcss'
import type { State } from '../types'

export const minifyCss = (value: string, state: State) => {
  const targets = state.configuration.targets.lightningcss
  const options = state.configuration.lightningcss

  const { code: one } = transform({
    minify: true,
    ...options,
    code: Buffer.from(value),
    filename: 'style.css',
    targets,
  })

  const { code: two } = transform({
    minify: true,
    ...options,
    code: Buffer.from(one),
    filename: 'style.css',
    targets,
  })

  return two.toString()
}
