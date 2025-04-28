import { flatMap, isEmpty, pick, pickBy } from 'lodash-es'
import { randomUUID } from 'node:crypto'
import type { AtRule } from '../utilities/ast'
import {
  schemaFontPropertiesKeys,
  type ConfigurationFontProperties,
  type StyleRule,
} from './user-schema'

interface StyleRuleFlat {
  atRules: AtRule[]
  fontProperties: ConfigurationFontProperties[]
  id: string
  // properties: CSSProperties
  parent?: string
}

const isEmptyStyleRule = (current: StyleRuleFlat) =>
  isEmpty(pickBy(current.fontProperties, (value) => value !== undefined)) /* && */
// isEmpty(pickBy(current.properties, (value) => value !== undefined))

export const normalizeStyleRule = (
  rule: StyleRule<ConfigurationFontProperties>,
  parent?: StyleRuleFlat,
): StyleRuleFlat[] => {
  const currentFontProperties = pick(rule, schemaFontPropertiesKeys)
  // const currentProperties: CSSProperties = omit(rule, [
  //   '@supports',
  //   '@media',
  //   ...schemaFontPropertiesKeys,
  // ])

  const fontProperties: ConfigurationFontProperties[] = [
    ...(parent?.fontProperties ?? []),
    currentFontProperties,
  ].filter((value) => !isEmpty(value))

  // const properties: CSSProperties = currentProperties

  const current: StyleRuleFlat = {
    atRules: [...(parent?.atRules ?? [])],
    fontProperties,
    id: randomUUID(),
    parent: parent?.id,
    // properties,
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
              kind: 'at-rule',
              name: type as '@media' | '@supports',
              nodes: [],
              params: value,
            } satisfies AtRule,
          ],
        }),
      )
    }),
  ].filter((value) => !isEmptyStyleRule(value))
}
