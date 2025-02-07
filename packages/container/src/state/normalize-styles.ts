import { compact, flatMap, uniq } from 'lodash-es'
import type { StatePartial, Style } from '../types'
import { toposortReverse } from '../utilities/toposort'
import { normalizeFontProperties } from './normalize-font-properties'
import { normalizeStyleRule } from './normalize-style-rule'
import type { InferLocales } from './user-schema'

export const normalizeStyles = (locales: InferLocales, state: StatePartial) => {
  const styles: Style[] = flatMap(locales, (value, locale) => {
    if (typeof value === 'string') {
      return []
    }

    return flatMap(value, (styleRule, classname) =>
      normalizeStyleRule(styleRule).map((value) => {
        const reducedFontProperties = normalizeFontProperties(value.fontProperties, state)

        return {
          classname,
          locale,
          ...value,
          fontProperties: reducedFontProperties?.id,
          graph: reducedFontProperties?.graph,
          variables: {},
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
