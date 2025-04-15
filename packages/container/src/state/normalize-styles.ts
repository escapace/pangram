import { compact, flatMap, kebabCase, uniq } from 'lodash-es'
import type { StatePartial, Style } from '../types'
import { escape } from '../utilities/escape'
import { toposortReverse } from '../utilities/toposort'
import { normalizeFontProperties } from './normalize-font-properties'
import { normalizeStyleRule } from './normalize-style-rule'
import type { ConfigurationLocales } from './user-schema'

export const normalizeStyles = (locales: ConfigurationLocales, state: StatePartial) => {
  const styles: Style[] = flatMap(locales, (value, locale) => {
    if (typeof value === 'string') {
      return []
    }

    return flatMap(value, (styleRule, classname) =>
      normalizeStyleRule(styleRule).map((value) => {
        const reducedFontProperties = normalizeFontProperties(value.fontProperties, state)

        return {
          // classname,
          locale,
          prefix: escape(kebabCase(classname)),
          ...value,
          ast: [],
          fontProperties: reducedFontProperties?.id,
          graph: reducedFontProperties?.graph,
          metrics: {},
        }
      }),
    )
  })

  return compact(
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
}
