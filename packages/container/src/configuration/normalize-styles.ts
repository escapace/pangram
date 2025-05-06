import { compact, flatMap, kebabCase, uniq } from 'lodash-es'
import type { StatePartial, Style } from '../types'
import { escape } from '../utilities/escape'
import { toposortReverse } from '../utilities/toposort'
import { normalizeProperties } from './normalize-properties'
import { normalizeStyleRule } from './normalize-style-rule'
import type { ConfigurationLocales } from './user-schema'

export const normalizeStyles = (locales: ConfigurationLocales, state: StatePartial) => {
  const styles: Style[] = flatMap(locales, (value, locale) => {
    if (typeof value === 'string') {
      return []
    }

    return flatMap(value, (styleRule, stack) =>
      normalizeStyleRule(styleRule).map((value): Style => {
        const properties = normalizeProperties(value.properties, state)

        return {
          ast: [],
          atRules: value.atRules,
          graph: properties?.graph,
          id: value.id,
          locale,
          parent: value.parent,
          properties:
            properties?.id === undefined ? undefined : state.properties.get(properties.id),
          stack: escape(kebabCase(stack)),
        } satisfies Style
      }),
    )
  })

  const value = compact(
    uniq(
      toposortReverse(
        new Map(
          styles.map(
            (value) => [value.id, value.parent === undefined ? [] : [value.parent]] as const,
          ),
        ),
      ).flatMap((value) => Array.from(value)),
    ).map((id) => styles.find((value) => value.id === id)),
  )

  return value
}
