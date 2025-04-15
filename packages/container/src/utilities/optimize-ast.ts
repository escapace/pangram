/* eslint-disable typescript/no-non-null-assertion */
import assert from 'node:assert'
import { context, walkDepth, type AstNode } from './ast'
import { createHash } from './create-hash'

const findOrder = (...contexts: Array<Record<string, boolean | string> | undefined>) =>
  contexts
    .map((int) => {
      const value = typeof int === 'string' ? parseInt(int) : undefined
      return value === undefined ? undefined : isNaN(value) ? undefined : value
    })
    .find((value) => value !== undefined)

export const optimizeAst = (_ast: AstNode[]): AstNode[] => {
  const ast = [context({ optimize: true }, structuredClone(_ast))]

  const next = (ast: AstNode[]) => {
    let total = 0

    walkDepth(ast, (node, tools) => {
      if (!(node.kind === 'rule' || node.kind === 'at-rule' || node.kind === 'context')) {
        return
      }

      const children = node.nodes

      const state = new Map<string, { index: number; value: AstNode }>()

      let changes = 0

      for (const currentChild of children) {
        const index = children.indexOf(currentChild)

        const key = createHash({
          ...currentChild,
          nodes: [],
        })

        if (state.has(key)) {
          const reference = state.get(key)!
          const previousChild = reference.value

          if (
            (currentChild.kind === 'rule' ||
              currentChild.kind === 'at-rule' ||
              currentChild.kind === 'context') &&
            (previousChild.kind === 'rule' ||
              previousChild.kind === 'at-rule' ||
              previousChild.kind === 'context')
          ) {
            previousChild.nodes.push(...currentChild.nodes)
            changes += 1
          }
        } else {
          state.set(key, { index, value: currentChild })
        }
      }

      if (state.size === 0 || changes === 0) {
        return
      }

      const nodes = [...state.values()]
        .sort((a, b) => a.index - b.index)
        .map((value) => value.value)

      tools.replaceWith([
        {
          ...node,
          nodes,
        },
      ])

      state.clear()

      total += 1
    })

    return total
  }

  let running

  while (running !== 0) {
    running = next(ast)

    continue
  }

  walkDepth(ast, (node, tools) => {
    if (node.kind === 'context') {
      tools.replaceWith([
        {
          ...node,
          nodes: node.nodes
            .map((value, index) => ({
              index,
              order: findOrder(
                value.kind === 'context' ? value.context : undefined,
                node.context,
                tools.context,
              ),
              value,
            }))
            .sort((a, b) => {
              let number = 0

              if (a.order !== undefined && b.order !== undefined) {
                number = a.order - b.order
              }

              if (number === 0) {
                number = a.index - b.index
              }

              return number
            })
            .map((value) => value.value),
        },
      ])
    }
  })

  assert(ast[0].kind === 'context')
  assert(ast[0].context.optimize === true)

  const nodes = ast[0].nodes

  // console.log(JSON.stringify(nodes, null, 2))

  walkDepth(nodes, (node, tools) => {
    if (node.kind === 'context') {
      tools.replaceWith(node.nodes)
    }
  })

  return nodes
}
