import { Features, type Targets, transform } from 'lightningcss'

export const minifyCss = (value: string, targets: Targets) => {
  const { code: one } = transform({
    code: Buffer.from(value),
    exclude: Features.Nesting,
    filename: 'style.css',
    minify: true,
    targets,
  })

  const { code: two } = transform({
    code: Buffer.from(one),
    exclude: Features.Nesting,
    filename: 'style.css',
    minify: true,
    targets,
  })

  return two.toString()
}
