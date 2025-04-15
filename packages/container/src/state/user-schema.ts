import type { Font } from '@pangram/font-loader'
import { bcp47Normalize } from '@pangram/unicode-tools'
import { sortBy, uniq } from 'lodash-es'
import path from 'node:path'
import { isNativeError } from 'node:util/types'
import { z } from 'zod'
import { fontUnicodeRange } from '../font/font-unicode-range'

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

export type UserConfigurationFontInformationStatic = z.infer<typeof schemaFontInformationStatic>
export type UserConfigurationFontInformationVariation = z.infer<
  typeof schemaFontInformationVariation
>

export const schemaFontInformation = z.discriminatedUnion('variable', [
  schemaFontInformationStatic,
  schemaFontInformationVariation,
])

export type UserConfigurationFontInformation = z.infer<typeof schemaFontInformation>

// "wght" font-weight
// "wdth" font-stretch
// "slnt" font-style: oblique + angle
// "ital" font-style: italic
// "opsz" font-optical-sizing

export type ConfigurationFont = {
  prefer?: ConfigurationFont[]
} & z.infer<typeof schemaFontPlaceholder>
export type UserConfigurationFont = {
  prefer?: UserConfigurationFont[]
} & z.input<typeof schemaFontPlaceholder>

export type ConfigurationRule = z.infer<typeof schemaRule>
export type UserConfigurationRule = z.input<typeof schemaRule>

export type ConfigurationLocale = Record<string, ConfigurationRule>
export type UserConfigurationLocale = Record<string, UserConfigurationRule>

export type ConfigurationLocales = Record<string, string | ConfigurationLocale>
export type UserConfigurationLocales = Record<string, string | UserConfigurationLocale>

export const schemaFontPlaceholder = z.object({
  desubroutinize: z.boolean().default(false),
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
  layoutFeatures: z.array(z.string().regex(/^[\p{L}\p{N}]+$/u)).optional(),
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
  source: z.string().transform((value) => path.resolve(value)),
  tech: z.optional(z.array(z.enum(['variations']))),
  unicodeRange: z.optional(
    z
      .string()
      .min(1)
      .transform((value): string => fontUnicodeRange(value).toHexRangeString()),
  ),
})

const schemaFont: z.ZodType<ConfigurationFont, z.ZodTypeDef, UserConfigurationFont> =
  schemaFontPlaceholder
    .extend({
      prefer: z.lazy(() => z.optional(z.array(schemaFont).min(1))),
    })
    .strict()

const schemaFontFamilyGeneric = z.enum([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'math',
])

export type ConfigurationFontFaimlyGeneric = z.infer<typeof schemaFontFamilyGeneric>

const schemaFontFamily = z
  .array(schemaFont.or(schemaFontInformation).or(schemaFontFamilyGeneric))
  .transform(
    (
      values,
    ): {
      fallbacks: UserConfigurationFontInformation[]
      fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
      fonts: ConfigurationFont[]
    } => {
      const fallbacksGeneric = values.filter((value) => typeof value === 'string')
      const fallbacks = values.filter(
        (value): value is UserConfigurationFontInformation =>
          schemaFontInformation.safeParse(value).success,
      )
      const fonts = values.filter(
        (value): value is ConfigurationFont => schemaFont.safeParse(value).success,
      )

      return {
        fallbacks,
        fallbacksGeneric,
        fonts,
      }
    },
  )

export type ConfigurationFontFamily = z.infer<typeof schemaFontFamily>

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

export const schemaFontPropertiesKeys = schemaFontProperties.keyof().options

export type ConfigurationFontProperties = z.infer<typeof schemaFontProperties>
export type UserConfigurationFontProperties = z.input<typeof schemaFontProperties>

export type StyleRule<T extends {}> = {
  '@media'?: Record<string, StyleRule<T>>
  '@supports'?: Record<string, StyleRule<T>>
} & Omit<T, '@media' | '@supports'>

const schemaRule: z.ZodType<
  StyleRule<ConfigurationFontProperties>,
  z.ZodTypeDef,
  StyleRule<UserConfigurationFontProperties>
> = z.lazy(() => {
  const schemaCSSProperties = schemaFontProperties

  // @ts-expect-error circular reference
  const schemaAtRules = z.object({
    // @ts-expect-error circular reference
    '@media': z.lazy(() => z.record(schemaCSSProperties.merge(schemaAtRules))).optional(),
    '@supports': z.lazy(() => z.record(schemaCSSProperties.merge(schemaAtRules))).optional(),
  })

  // eslint-disable-next-line typescript/no-unsafe-argument
  return schemaCSSProperties.merge(schemaAtRules)
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

export interface Locale {
  font: Font[]
  fontFace: string
  order: string[] | undefined
  style: string
}

export interface Manifest {
  alias: Record<string, string>
  locale: Record<string, Locale>
  script: string
}

import type Lightningcss from 'lightningcss'

export type LightningCSSOptions = Partial<
  Pick<Lightningcss.TransformOptions<Lightningcss.CustomAtRules>, 'exclude' | 'include' | 'minify'>
>

export interface UserConfiguration {
  locales: UserConfigurationLocales
  lightningcss?: LightningCSSOptions
  manifest?: ((manifest: Manifest) => Promise<void>) | string
  outputDirectory?: string
  publicPath?: string
  selector?: string
}
