import { browserslist } from '@escapace/browserslist'
import { findUp } from 'find-up'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import { DEFAULT_JSON_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_PUBLIC_PATH } from '../constants'
import type { Configuration } from '../types'
import { createState } from './create-state'
import { normalizeSelector } from './normalize-selector'

export const createConfiguration = async (): Promise<Configuration> => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const runtimePackageJSON = await findUp('package.json', {
    cwd: __dirname,
  })

  if (runtimePackageJSON === undefined) {
    throw new Error('Damaged installation')
  }

  const runtimeDirectory = path.dirname(runtimePackageJSON)
  const runtimeFontStripPath = path.join(runtimeDirectory, 'src/font/font-strip.py')
  const runtimeFontInspectPath = path.join(runtimeDirectory, 'src/font/font-inspect.py')

  if (!existsSync(runtimeFontStripPath)) {
    throw new Error('Damaged installation')
  }

  const processDirectory = process.cwd()
  const { configurationDirectory, configurationFile, state, userConfiguration } =
    await createState(processDirectory)

  const outputDirectory = path.resolve(
    configurationDirectory,
    userConfiguration.outputDirectory ?? DEFAULT_OUTPUT_DIR,
  )

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

  const targets = browserslist({
    ignoreUnknownVersions: true,
    path: configurationDirectory,
  })

  const publicPath = userConfiguration.publicPath ?? DEFAULT_PUBLIC_PATH

  const manifest =
    typeof userConfiguration.manifest === 'function'
      ? userConfiguration.manifest
      : path.resolve(configurationDirectory, userConfiguration.manifest ?? DEFAULT_JSON_FILE)

  return {
    adjustFontMetrics,
    configurationDirectory,
    configurationFile,
    lightningcss,
    manifest,
    outputDirectory,
    processDirectory,
    publicPath,
    runtimeDirectory,
    runtimeFontInspectPath,
    runtimeFontStripPath,
    selector,
    state,
    targets,
  }
}
