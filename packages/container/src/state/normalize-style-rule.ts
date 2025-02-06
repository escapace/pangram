import { flatMap, isEmpty, omit, pick, pickBy } from 'lodash-es'
import { randomUUID } from 'node:crypto'
import type { AtRule } from '../types'
import {
  schemaFontPropertiesKeys,
  type CSSProperties,
  type InferFontProperties,
  type StyleRule,
} from './user-schema'

interface StyleRuleFlat {
  atRules: AtRule[]
  fontProperties: InferFontProperties[]
  id: string
  properties: CSSProperties<{}>
  parent?: string
}

const isEmptyStyleRule = (current: StyleRuleFlat) =>
  isEmpty(pickBy(current.fontProperties, (value) => value !== undefined)) &&
  isEmpty(pickBy(current.properties, (value) => value !== undefined))

export const normalizeStyleRule = (
  rule: StyleRule<InferFontProperties>,
  parent?: StyleRuleFlat,
): StyleRuleFlat[] => {
  const currentFontProperties = pick(rule, schemaFontPropertiesKeys)
  const currentProperties: CSSProperties<{}> = omit(rule, [
    '@supports',
    '@media',
    ...schemaFontPropertiesKeys,
  ])

  const fontProperties: InferFontProperties[] = [
    ...(parent?.fontProperties ?? []),
    currentFontProperties,
  ].filter((value) => !isEmpty(value))

  const properties: CSSProperties<{}> = currentProperties

  const current: StyleRuleFlat = {
    atRules: [...(parent?.atRules ?? [])],
    fontProperties,
    id: randomUUID(),
    parent: parent?.id,
    properties,
  }

  return [
    current,
    ...flatMap(pick(rule, ['@supports', '@media']), (value, type): StyleRuleFlat[] => {
      if (isEmpty(pickBy(value, (value) => value !== undefined)) || value === undefined) {
        return []
      }

      return flatMap(value, (rule, value): StyleRuleFlat[] =>
        normalizeStyleRule(rule, {
          ...current,
          atRules: [
            ...current.atRules,
            {
              type: type as '@media' | '@supports',
              value,
            },
          ],
        }),
      )
    }),
  ].filter((value) => !isEmptyStyleRule(value))
}
