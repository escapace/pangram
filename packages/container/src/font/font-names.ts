import { uniq } from 'lodash-es'
import assert from 'node:assert'
import type { FontInformation } from '../state/user-schema'

export const fontNames = (font: FontInformation) => {
  const namedInstance = (font.variable ? undefined : font.namedInstance) ?? undefined
  const namedInstancePostScriptName =
    (font.variable ? undefined : font.namedInstancePostScriptName) ?? undefined

  const names: string[] = []

  if (namedInstance !== undefined || namedInstancePostScriptName !== undefined) {
    if (namedInstance !== undefined) {
      assert(typeof font.familyName === 'string')
      names.push(`${font.familyName} ${namedInstance}`)
    }

    if (namedInstancePostScriptName !== undefined) {
      names.push(namedInstancePostScriptName)
    }
  } else {
    names.push(
      ...uniq(
        [
          [font.wwsFamilyName, font.wwsSubFamilyName], // 0
          [font.typographicFamilyName, font.typographicSubfamilyName], // 1
          [font.familyName, font.subfamilyName], // 2
          [font.fullName], // 3
          [font.postScriptName], // 4
        ]
          .flatMap((value): string | string[] | undefined => {
            const { length } = value

            if (length === 1 && typeof value[0] === 'string') {
              return value[0]
            } else if (
              length === 2 &&
              typeof value[0] === 'string' &&
              typeof value[1] === 'string'
            ) {
              const familyName = value[0]
              const subfamilyName = value[1]

              return subfamilyName.toLowerCase() === 'regular'
                ? `${familyName}`
                : `${familyName} ${subfamilyName}`
            }

            return undefined
          })
          .filter((value): value is string => value !== undefined),
      ),
    )
  }

  assert(names.length !== 0)

  return names
}
