import { transform } from 'lightningcss'
import type { Configuration } from '../types'

export const minifyCss = (value: string, configuration: Configuration) => {
  const targets = configuration.state.targets.lightningcss
  const options = configuration.state.lightningcss

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
