import type { Manifest } from './types'
import { z } from 'zod'

const schemaFont = z.object({
  fontFaces: z
    .array(
      z.object({
        fontFamily: z.string(),
        fontStretch: z
          .number()
          .or(z.tuple([z.number(), z.number()]))
          .optional(),
        fontStyle: z.literal('italic').optional(),
        fontWeight: z
          .number()
          .or(z.tuple([z.number(), z.number()]))
          .optional(),
      }),
    )
    .optional(),
  prefer: z.array(z.string()).optional(),
  resourceHints: z.array(
    z.object({
      as: z.literal('font'),
      crossorigin: z.literal('anonymous'),
      href: z.string(),
      rel: z.literal('prefetch').or(z.literal('preload')),
      type: z.string(),
    }),
  ),
  slug: z.string(),
  tech: z.array(z.string()).optional(),
  testString: z.string().optional(),
})

const schemaManifestLocale = z.object({
  fontFace: z.string(),
  fonts: z.array(schemaFont),
  order: z.array(z.string()).optional(),
  prefixes: z.array(z.string()),
  style: z.string(),
})

const schemaManifest = z.object({
  aliases: z.record(z.string(), z.string()),
  locales: z.record(z.string(), schemaManifestLocale),
  script: z.string(),
})

export const parseManifest = (input: string | Manifest): Manifest =>
  schemaManifest.parse(typeof input === 'string' ? JSON.parse(input) : input)
