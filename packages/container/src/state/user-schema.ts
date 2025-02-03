import { bcp47Normalize } from '@pangram/unicode-tools'
import type { Properties } from 'csstype'
import { sortBy, uniq } from 'lodash-es'
import { isNativeError } from 'node:util/types'
import { z } from 'zod'
import { fontUnicodeRange } from '../font/font-unicode-range'
import type { WebFont } from '@pangram/font-loader'

const schemaFontInformationShared = z.object({
  ascent: z.number(),
  capHeight: z.number(),
  codePoints: z.array(
    z.object({
      advanceWidth: z.number(),
      codePoint: z.number(),
      height: z.number(),
      leftSideBearing: z.number(),
      width: z.number(),
      xMax: z.number(),
      xMin: z.number(),
      yMax: z.number(),
      yMin: z.number(),
    }),
  ),
  descent: z.number(),
  features: z.array(
    z.object({
      name: z.string(),
      type: z.enum(['substitution', 'positioning']),
    }),
  ),
  id: z.string(),
  lineGap: z.number(),
  unitsPerEm: z.number(),
  xHeight: z.number(),
  xWidthAvg: z.number(),

  familyName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  postScriptName: z.string().optional().nullable(),
  subfamilyName: z.string().optional().nullable(),
  typographicFamilyName: z.string().optional().nullable(),
  typographicSubfamilyName: z.string().optional().nullable(),
  wwsFamilyName: z.string().optional().nullable(),
  wwsSubFamilyName: z.string().optional().nullable(),
})

const schemaFontInspectVariationAxis = z.object({
  default: z.number(),
  max: z.number(),
  min: z.number(),
  name: z.string().min(1),
})

const schemaFontInformationVariation = z
  .object({
    namedInstance: z.string().optional().nullable(),
    namedInstancePostScriptName: z.string().optional().nullable(),
    variable: z.literal(false),
  })
  .extend(schemaFontInformationShared.shape)

export const schemaFontInformationStatic = z
  .object({
    variable: z.literal(true),
    variationAxes: z.array(schemaFontInspectVariationAxis),
    variations: z.array(schemaFontInformationVariation),
  })
  .extend(schemaFontInformationShared.shape)

export type FontInformationStatic = z.infer<typeof schemaFontInformationStatic>
export type FontInformationVariation = z.infer<typeof schemaFontInformationVariation>

export const schemaFontInformation = z.discriminatedUnion('variable', [
  schemaFontInformationStatic,
  schemaFontInformationVariation,
])

export type FontInformation = z.infer<typeof schemaFontInformation>

// "wght" font-weight
// "wdth" font-stretch
// "slnt" font-style: oblique + angle
// "ital" font-style: italic
// "opsz" font-optical-sizing

export type InferFont = {
  prefer?: InferFont[]
} & z.infer<typeof schemaFontPlaceholder>
export type InputFont = {
  prefer?: InputFont[]
} & z.input<typeof schemaFontPlaceholder>

export type InferRule = z.infer<typeof schemaRule>
export type InputRule = z.input<typeof schemaRule>

export type InferLocale = Record<string, InferRule>
export type InputLocale = Record<string, InputRule>

export type InferLocales = Record<string, string | InferLocale>
export type InputLocales = Record<string, string | InputLocale>

export const schemaFontPlaceholder = z.object({
  display: z.optional(
    z
      .literal('auto')
      .or(z.literal('block'))
      .or(z.literal('swap'))
      .or(z.literal('fallback'))
      .or(z.literal('optional')),
  ),
  format: z
    .optional(z.array(z.literal('woff').or(z.literal('woff2'))))
    .transform(
      (value): Array<'woff' | 'woff2'> =>
        sortBy(uniq(value === undefined || value?.length === 0 ? ['woff2'] : value), (value) =>
          value === 'woff2' ? 0 : 1,
        ),
    ),
  name: z
    .string()
    .optional()
    .refine((value) => {
      if (value === undefined) {
        return true
      }

      return /^[a-z-]+$/i.test(value)
    }),
  resourceHint: z.optional(z.literal('preload').or(z.literal('prefetch'))),
  source: z.string(),
  tech: z.optional(z.array(z.enum(['variations']))),
  unicodeRange: z.optional(
    z
      .string()
      .min(1)
      .transform((value): string => fontUnicodeRange(value).toHexRangeString()),
  ),
})

const schemaFont: z.ZodType<InferFont, z.ZodTypeDef, InputFont> = schemaFontPlaceholder
  .extend({
    prefer: z.lazy(() => z.optional(z.array(schemaFont).min(1))),
  })
  .strict()

const isFontInformation = (value: Record<string, unknown>): value is FontInformation =>
  schemaFontInformation.safeParse(value).success

const schemaFontFamily = z.array(schemaFont.or(schemaFontInformation)).transform(
  (
    values,
  ): {
    fallbacks: FontInformation[]
    fonts: InferFont[]
  } => {
    const fallbacks = values.filter(isFontInformation)
    const fonts = values.filter((value): value is InferFont => !isFontInformation(value))

    return {
      fallbacks,
      fonts,
    }
  },
)

// TODO: support css variables
export const schemaFontVariationSettings = z.literal('normal').or(z.record(z.number()))
export const schemaFontWeight = z.number().min(1).max(1000).default(400)
export const schemaFontStretch = z.number().min(50).max(200).default(100)
export const schemaFontStyle = z.enum(['normal', 'italic']).default('normal')

// 'fontOpticalSizing'
// 'fontVariationSetting'
export const schemaFontProperties = z.object({
  fontFamily: schemaFontFamily.optional(),
  fontStretch: schemaFontStretch.optional(),
  fontStyle: schemaFontStyle.optional(),
  fontVariationSettings: schemaFontVariationSettings.optional(),
  fontWeight: schemaFontWeight.optional(),
})

export type CSSTypeProperties = Properties<({} & string) | number>
export type InferFontProperties = z.infer<typeof schemaFontProperties>
export type InputFontProperties = z.input<typeof schemaFontProperties>

export type CSSProperties<T extends {}> = {
  [Property in Exclude<keyof CSSTypeProperties, keyof T>]?:
    | Array<CSSTypeProperties[Property]>
    | CSSTypeProperties[Property]
} & T

export interface FeatureQueries<StyleType> {
  '@supports'?: Record<string, StyleType>
}

export interface MediaQueries<StyleType> {
  '@media'?: Record<string, StyleType>
}

export type StyleRule<T extends {}> = CSSProperties<T> &
  FeatureQueries<CSSProperties<T> & MediaQueries<CSSProperties<T>>> &
  MediaQueries<CSSProperties<T> & FeatureQueries<CSSProperties<T>>>

const schemaRule: z.ZodType<
  StyleRule<InferFontProperties>,
  z.ZodTypeDef,
  StyleRule<InputFontProperties>
> = z.lazy(() => {
  const schemaCSSProperties = schemaFontProperties.passthrough()

  // @ts-expect-error circular reference
  const schemaMediaQueries = z
    .object({
      // '@media': z.record(
      //   z.intersection(schemaCSSProperties, schemaFeatureQueries)
      // )
      // @ts-expect-error circular reference
      '@media': z.lazy(() => z.record(schemaCSSProperties.merge(schemaFeatureQueries))),
    })
    .partial()
    .passthrough()

  // @ts-expect-error circular reference
  const schemaFeatureQueries = z
    .object({
      // '@supports': z.record(
      //   z.intersection(schemaCSSProperties, schemaMediaQueries)
      // )
      // @ts-expect-error circular reference
      '@supports': z.lazy(() => z.record(schemaCSSProperties.merge(schemaMediaQueries))),
    })
    .partial()
    .passthrough()

  // eslint-disable-next-line typescript/no-unsafe-argument
  return schemaCSSProperties.merge(schemaFeatureQueries).merge(schemaMediaQueries).passthrough()
})

export const schemaLocale = z.object({}).catchall(schemaRule)
// export const schemaLocale = z.record(z.string(), schemaRule)

export const schemaLocales = z
  .record(z.string(), z.string().or(schemaLocale))
  .transform((value, context): { [key: string]: string | z.infer<typeof schemaLocale> } => {
    try {
      const entries = Object.entries(value).map(([key, value]) => {
        const keyNormalized = bcp47Normalize(key, {
          forgiving: false,
          warning(value) {
            throw new Error(value)
          },
        })

        if (keyNormalized === undefined) {
          throw new Error(`bcp47 tag ${key} unknown.`)
        }

        if (key !== keyNormalized) {
          console.warn(`bcp47 tag ${key} normalized to ${keyNormalized}.`)
        }

        if (typeof value === 'string') {
          const valueNormalized = bcp47Normalize(value, {
            forgiving: false,
            warning(value) {
              throw new Error(value)
            },
          })

          if (valueNormalized === undefined) {
            throw new Error(`bcp47 tag ${value} unknown.`)
          }

          if (value !== valueNormalized) {
            console.warn(`bcp47 tag ${value} normalized to ${valueNormalized}.`)
          }

          return [keyNormalized, valueNormalized] as const
        }

        return [keyNormalized, value] as const
      })

      const keys = entries.map(([key]) => key)

      if (new Set(keys).size !== keys.length) {
        throw new Error('Duplicate bcp47 locale tags.')
      }

      return Object.fromEntries(entries)
    } catch (error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: isNativeError(error) ? error.message : 'Unable to parse locale tags.',
      })

      return z.NEVER
    }
  })

// export interface ResourceHint {
//   as: 'font'
//   crossorigin: 'anonymous'
//   href: string
//   rel: 'prefetch' | 'preload'
//   type: string
// }
//
// export type WebFontState =
//   | 'error'
//   | 'font-already-loaded'
//   | 'font-loaded'
//   | 'font-not-supported'
//   | 'font-unknown'
//
// export interface WebFont {
//   slug: string
//   fontFace?: Array<{
//     fontFamily: string
//     fontStretch?: number | [number, number]
//     fontStyle?: 'italic'
//     fontWeight?: number | [number, number]
//   }>
//   prefer?: string[]
//   resourceHint?: ResourceHint[]
//   state?: WebFontState
//   tech?: string[]
//   testString?: string
// }

export interface WebFontLocale {
  font: WebFont[]
  fontFace: string
  noScriptStyle: string
  order: string[] | undefined
  style: string
}

export interface WebFontsJson {
  alias: Record<string, string>
  font: WebFont[]
  fontFace: string
  locale: Record<string, WebFontLocale>
  noScriptStyle: string
  order: string[] | undefined
  script: string
  style: string
}
