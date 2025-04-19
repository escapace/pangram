import { uniq } from 'lodash-es'
import assert from 'node:assert'
import type { UserConfigurationFontInformation } from '../state/user-schema'

// function sanitizePSNameComponent(input?: string): string {
//   return Array.from(input)
//     .filter((ch) => /[A-Z0-9]/i.test(ch))
//     .join('')
// }
//
// function generateNamedInstancePostScriptName(
//   fontInfo: FontInfo,
//   instanceStyleName: string | null | undefined,
// ): string {
//   /* Step 1– Family prefix */
//   let familyPrefix =
//     fontInfo.variationsPostScriptNamePrefix ??
//     fontInfo.familyName ??
//     fontInfo.legacyFamilyName ??
//     'UnknownFamily'
//
//   familyPrefix = sanitizePSNameComponent(familyPrefix)
//
//   /* Step 2 – Instance style */
//   const styleComponent = sanitizePSNameComponent(instanceStyleName ?? 'Instance')
//
//   /* Compose */
//   let psName = `${familyPrefix}-${styleComponent}`
//
//   /* Step 3 – 127‑character limit */
//   if (psName.length > 127) {
//     psName = psName.slice(0, 124) + '...'
//   }
//
//   return psName
// }

export const fontNames = (font: UserConfigurationFontInformation) => {
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
          [font.familyName, font.subfamilyName], // 0
          [font.wwsFamilyName, font.wwsSubFamilyName], // 1
          [font.legacyFamilyName, font.legacySubfamilyName], // 2
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

              // https://learn.microsoft.com/en-us/typography/opentype/spec/name
              // For fonts in extended typographic families (that is, families that include more than regular,
              // italic, bold, and bold italic variants), values for name IDs 1 and 2 are normally
              // chosen to provide compatibility with certain applications that assume a family has
              // at most four style-linked fonts. In that case, some fonts may end up with a
              // Subfamily name (name ID 2) of “Regular” even though the font would not be
              // considered, typographically, a regular font. For such non-regular fonts in which
              // name ID 2 is specified as “Regular”, the “Regular” descriptor would generally be
              // omitted from name ID 4. For example, the Arial Black font has a Font Family name
              // (name ID 1) of “Arial Black” and a Subfamily name (name ID 2) of “Regular”, but has
              // a full font name (name ID 4) of “Arial Black”. Note that name IDs 16 and 17 should
              // also be included in these fonts, and that name ID 4 would typically be a
              // combination of name IDs 16 and 17, without needing any additional qualifications
              // regarding “Regular”.

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
