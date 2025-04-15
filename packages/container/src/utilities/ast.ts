// MIT License
//
// Copyright (c) Tailwind Labs, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/* eslint-disable */
const SPACE = 0x20
const OPEN_PAREN = 0x28
const AT_SIGN = 0x40

export function parseAtRule(buffer: string, nodes: AstNode[] = []): AtRule {
  // Assumption: The smallest at-rule in CSS right now is `@page`, this means
  //             that we can always skip the first 5 characters and start at the
  //             sixth (at index 5).
  //
  // There is a chance someone is using a shorter at-rule, in that case we have
  // to adjust this number back to 2, e.g.: `@x`.
  //
  // This issue can only occur if somebody does the following things:
  //
  // 1. Uses a shorter at-rule than `@page`
  // 2. Disables Lightning CSS from `@tailwindcss/postcss` (because Lightning
  //    CSS doesn't handle custom at-rules properly right now)
  // 3. Sandwiches the `@tailwindcss/postcss` plugin between two other plugins
  //    that can handle the shorter at-rule
  //
  // Let's use the more common case as the default and we can adjust this
  // behavior if necessary.
  for (let index = 5 /* '@page'.length */; index < buffer.length; index++) {
    const currentChar = buffer.charCodeAt(index)
    if (currentChar === SPACE || currentChar === OPEN_PAREN) {
      const name = buffer.slice(0, index).trim()
      const parameters = buffer.slice(index).trim()
      return atRule(name, parameters, nodes)
    }
  }

  return atRule(buffer.trim(), '', nodes)
}

export type StyleRule = {
  kind: 'rule'
  selector: string
  nodes: AstNode[]
}

export type AtRule = {
  kind: 'at-rule'
  name: string
  params: string
  nodes: AstNode[]
}

export type Declaration = {
  kind: 'declaration'
  property: string
  value: string | undefined
  important: boolean
}

export type Comment = {
  kind: 'comment'
  value: string
}

export type Context = {
  kind: 'context'
  context: Record<string, string | boolean>
  nodes: AstNode[]
}

export type AtRoot = {
  kind: 'at-root'
  nodes: AstNode[]
}

export type Rule = StyleRule | AtRule
export type AstNode = StyleRule | AtRule | Declaration | Comment | Context | AtRoot

export function styleRule(selector: string, nodes: AstNode[] = []): StyleRule {
  return {
    kind: 'rule',
    selector,
    nodes,
  }
}

export function atRule(name: string, params: string = '', nodes: AstNode[] = []): AtRule {
  return {
    kind: 'at-rule',
    name,
    params,
    nodes,
  }
}

export function rule(selector: string, nodes: AstNode[] = []): StyleRule | AtRule {
  if (selector.charCodeAt(0) === AT_SIGN) {
    return parseAtRule(selector, nodes)
  }

  return styleRule(selector, nodes)
}

export function decl(property: string, value: string | undefined, important = false): Declaration {
  return {
    kind: 'declaration',
    property,
    value,
    important,
  }
}

export function comment(value: string): Comment {
  return {
    kind: 'comment',
    value: value,
  }
}

export function context(context: Record<string, string | boolean>, nodes: AstNode[]): Context {
  return {
    kind: 'context',
    context,
    nodes,
  }
}

export function atRoot(nodes: AstNode[]): AtRoot {
  return {
    kind: 'at-root',
    nodes,
  }
}

export const enum WalkAction {
  /** Continue walking, which is the default */
  Continue,

  /** Skip visiting the children of this node */
  Skip,

  /** Stop the walk entirely */
  Stop,
}

export function walk(
  ast: AstNode[],
  visit: (
    node: AstNode,
    utils: {
      parent: AstNode | null
      replaceWith(newNode: AstNode | AstNode[]): void
      context: Record<string, string | boolean>
      path: AstNode[]
    },
  ) => void | WalkAction,
  path: AstNode[] = [],
  context: Record<string, string | boolean> = {},
) {
  for (let i = 0; i < ast.length; i++) {
    let node = ast[i]
    let parent = path[path.length - 1] ?? null

    // We want context nodes to be transparent in walks. This means that
    // whenever we encounter one, we immediately walk through its children and
    // furthermore we also don't update the parent.
    if (node.kind === 'context') {
      if (walk(node.nodes, visit, path, { ...context, ...node.context }) === WalkAction.Stop) {
        return WalkAction.Stop
      }
      continue
    }

    path.push(node)
    let replacedNode = false
    let replacedNodeOffset = 0
    let status =
      visit(node, {
        parent,
        context,
        path,
        replaceWith(newNode) {
          if (replacedNode) return
          replacedNode = true

          if (Array.isArray(newNode)) {
            if (newNode.length === 0) {
              ast.splice(i, 1)
              replacedNodeOffset = 0
            } else if (newNode.length === 1) {
              ast[i] = newNode[0]
              replacedNodeOffset = 1
            } else {
              ast.splice(i, 1, ...newNode)
              replacedNodeOffset = newNode.length
            }
          } else {
            ast[i] = newNode
            replacedNodeOffset = 1
          }
        },
      }) ?? WalkAction.Continue
    path.pop()

    // We want to visit or skip the newly replaced node(s), which start at the
    // current index (i). By decrementing the index here, the next loop will
    // process this position (containing the replaced node) again.
    if (replacedNode) {
      if (status === WalkAction.Continue) {
        i--
      } else {
        i += replacedNodeOffset - 1
      }
      continue
    }

    // Stop the walk entirely
    if (status === WalkAction.Stop) return WalkAction.Stop

    // Skip visiting the children of this node
    if (status === WalkAction.Skip) continue

    if ('nodes' in node) {
      path.push(node)
      let result = walk(node.nodes, visit, path, context)
      path.pop()

      if (result === WalkAction.Stop) {
        return WalkAction.Stop
      }
    }
  }

  return
}

// This is a depth-first traversal of the AST
export function walkDepth(
  ast: AstNode[],
  visit: (
    node: AstNode,
    utils: {
      parent: AstNode | null
      path: AstNode[]
      context: Record<string, string | boolean>
      replaceWith(newNode: AstNode[]): void
    },
  ) => void,
  path: AstNode[] = [],
  context: Record<string, string | boolean> = {},
) {
  for (let i = 0; i < ast.length; i++) {
    let node = ast[i]
    let parent = path[path.length - 1] ?? null

    if (node.kind === 'rule' || node.kind === 'at-rule' || node.kind === 'context') {
      path.push(node)
      walkDepth(
        node.nodes,
        visit,
        path,
        node.kind === 'context' ? { ...context, ...node.context } : context,
      )
      path.pop()
    }

    path.push(node)
    visit(node, {
      parent,
      context,
      path,
      replaceWith(newNode) {
        if (Array.isArray(newNode)) {
          if (newNode.length === 0) {
            ast.splice(i, 1)
          } else if (newNode.length === 1) {
            ast[i] = newNode[0]
          } else {
            ast.splice(i, 1, ...newNode)
          }
        } else {
          ast[i] = newNode
        }

        // Skip over the newly inserted nodes (being depth-first it doesn't make sense to visit them)
        i += newNode.length - 1
      },
    })
    path.pop()
  }
}

export function toCss(ast: AstNode[]) {
  function stringify(node: AstNode, depth = 0): string {
    let css = ''
    let indent = '  '.repeat(depth)

    // Declaration
    if (node.kind === 'declaration') {
      css += `${indent}${node.property}: ${node.value}${node.important ? ' !important' : ''};\n`
    }

    // Rule
    else if (node.kind === 'rule') {
      css += `${indent}${node.selector} {\n`
      for (let child of node.nodes) {
        css += stringify(child, depth + 1)
      }
      css += `${indent}}\n`
    }

    // AtRule
    else if (node.kind === 'at-rule') {
      // Print at-rules without nodes with a `;` instead of an empty block.
      //
      // E.g.:
      //
      // ```css
      // @layer base, components, utilities;
      // ```
      if (node.nodes.length === 0) {
        return `${indent}${node.name} ${node.params};\n`
      }

      css += `${indent}${node.name}${node.params ? ` ${node.params} ` : ' '}{\n`
      for (let child of node.nodes) {
        css += stringify(child, depth + 1)
      }
      css += `${indent}}\n`
    }

    // Comment
    else if (node.kind === 'comment') {
      css += `${indent}/*${node.value}*/\n`
    }

    // These should've been handled already by `prepareAstForPrinting` which
    // means we can safely ignore them here. We return an empty string
    // immediately to signal that something went wrong.
    else if (node.kind === 'context' || node.kind === 'at-root') {
      return ''
    }

    // Unknown
    else {
      node satisfies never
    }

    return css
  }

  let css = ''

  for (let node of ast) {
    let result = stringify(node)
    if (result !== '') {
      css += result
    }
  }

  return css
}
