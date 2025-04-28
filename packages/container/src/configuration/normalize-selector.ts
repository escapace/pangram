import { clone, generate, parse, toPlainObject } from 'css-tree'
import z from 'zod'

export const normalizeSelector = (selector: string) => {
  const ast = parse(`${selector} {}`)

  const schema = z.object({
    children: z.tuple([
      z.object({
        block: z.object({
          children: z.array(z.any()).length(0),
          type: z.literal('Block'),
        }),
        prelude: z.object({
          children: z.array(z.any()).min(1),
          type: z.literal('SelectorList'),
        }),
        type: z.literal('Rule'),
      }),
    ]),
    type: z.literal('StyleSheet'),
  })

  void schema.parse(toPlainObject(clone(ast)))

  return generate(ast, { sourceMap: false }).slice(0, -2)
}
