import { uniq } from 'lodash-es'
import type { FontInformation } from '../state/user-schema'

export const fontNames = (font: FontInformation) =>
  uniq(
    [
      [font.wwsFamilyName, font.wwsSubFamilyName],
      [font.typographicFamilyName, font.typographicSubfamilyName],
      [font.familyName, font.subfamilyName],
      [font.fullName],
      [font.postScriptName],
    ]
      .flatMap((value): string | string[] | undefined => {
        const { length } = value

        if (length === 1 && typeof value[0] === 'string') {
          return value[0]
        }

        if (length === 2 && typeof value[0] === 'string' && typeof value[1] === 'string') {
          const familyName = value[0]
          const subfamilyName = value[1]

          const result: string[] = []

          result.push(`${familyName} ${subfamilyName}`)

          if (subfamilyName.toLowerCase() === 'regular') {
            result.push(`${familyName}`)
          }

          return result
        }

        return undefined
      })
      .filter((value): value is string => value !== undefined),
  )
