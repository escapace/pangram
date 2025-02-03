import { type Targets, transform } from 'lightningcss'
import { forEach } from 'lodash-es'
import type { StyleRule } from '../state/user-schema'

function dashify(string_: string) {
  return string_.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const DOUBLE_SPACE = '  '

function sortObject<T extends object>(object: T): T {
  const sortedKeys = Object.keys(object).sort()
  // eslint-disable-next-line typescript/no-explicit-any
  const sortedObject: any = {}

  sortedKeys.forEach((key) => {
    // eslint-disable-next-line typescript/no-unsafe-member-access
    sortedObject[key as keyof T] = object[key as keyof T]
  })

  return sortedObject as T
}

export function iterateProperties(v: StyleRule<{}>, indent = '', prefix = '') {
  const rules: string[] = []

  forEach(sortObject(v), (value, key) => {
    if (Array.isArray(value)) {
      rules.push(...value.map((v) => iterateProperties({ [key]: v }, indent)))
    } else if (typeof value === 'object') {
      const isEmpty = Object.keys(value).length === 0

      if (!isEmpty) {
        if (key === '@supports' || key === '@media') {
          rules.push(iterateProperties(value, indent + DOUBLE_SPACE, `${key} `))
        } else {
          rules.push(
            `${indent}${prefix}${key} {\n${iterateProperties(
              value,
              indent + DOUBLE_SPACE,
              prefix,
            )}\n${indent}}`,
          )
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      rules.push(`${indent}${key.startsWith('--') ? key : dashify(key)}: ${value};`)
    }
  })

  return rules.join('\n')
}

export const style = (selector: string, rule: StyleRule<{}>, targets?: Targets) => {
  const css = `${selector} {
${iterateProperties(rule, '  ')}
}`

  const { code } = transform({
    code: Buffer.from(css),
    filename: 'style.css',
    minify: false,
    targets,
  })

  return code.toString()
}
