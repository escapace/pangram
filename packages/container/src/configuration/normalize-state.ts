import { browserslistToTargets } from '@pointe/browserslist-to-targets'
import path from 'node:path'
import { z } from 'zod'
import { DEFAULT_JSON_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_PUBLIC_PATH } from '../constants'
import type { State, FontFallback, FontProperties, FontState, StatePartial } from '../types'
import { assertFonts } from './assert-fonts'
import { normalizeLocales } from './normalize-locales'
import { normalizeSelector } from './normalize-selector'
import { normalizeStyles } from './normalize-styles'
import { schemaLocales, type UserConfiguration } from './user-schema'

export const normalizeState = (
  userConfiguration: UserConfiguration,
  configurationDirectory: string,
): State => {
  const outputDirectory = path.resolve(
    configurationDirectory,
    userConfiguration.outputDirectory ?? DEFAULT_OUTPUT_DIR,
  )
  const publicPath = userConfiguration.publicPath ?? DEFAULT_PUBLIC_PATH

  const manifest =
    typeof userConfiguration.manifest === 'function'
      ? userConfiguration.manifest
      : path.resolve(configurationDirectory, userConfiguration.manifest ?? DEFAULT_JSON_FILE)

  const locales = schemaLocales.parse(userConfiguration.locales)
  const selector = normalizeSelector(userConfiguration.selector ?? ':where(:root,:host)')
  const lightningcss = z
    .object({
      exclude: z.number().optional(),
      include: z.number().optional(),
      minify: z.boolean().optional(),
    })
    .optional()
    .parse(userConfiguration.lightningcss)
  const adjustFontMetrics = userConfiguration.adjustFontMetrics ?? true

  const targets = browserslistToTargets({
    ignoreUnknownVersions: true,
    path: configurationDirectory,
  })

  const state: StatePartial = {
    fallbackFonts: new Map<string, FontFallback>(),
    fontProperties: new Map<string, Required<FontProperties>>(),
    fonts: new Map<string, FontState>(),
  }

  const styles = normalizeStyles(locales, state)

  assertFonts(state.fonts)

  return {
    adjustFontMetrics,
    fallbackFonts: state.fallbackFonts,
    fontProperties: state.fontProperties,
    fonts: state.fonts,
    lightningcss,
    manifest,
    outputDirectory,
    publicPath,
    selector,
    styles,
    targets,
    ...normalizeLocales({ locales, styles }),
  }
}
