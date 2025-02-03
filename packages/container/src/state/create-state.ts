import { browserslistToTargets } from '@pointe/browserslist-to-targets'
import { findUp } from 'find-up'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_JSON_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_PUBLIC_PATH } from '../constants'
import type { Options, State } from '../types'
import { createConfiguration } from './create-configuration'

export const createState = async (options: Options): Promise<State> => {
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

  const processDirectory = options.cwd ?? process.cwd()
  const { configuration, configurationDirectory, configurationFile } =
    await createConfiguration(processDirectory)
  const outputDirectory = path.resolve(processDirectory, options.output ?? DEFAULT_OUTPUT_DIR)
  const publicPath = options.base ?? DEFAULT_PUBLIC_PATH
  const jsonFile = path.resolve(processDirectory, options.manifest ?? DEFAULT_JSON_FILE)

  const targets = browserslistToTargets({
    ignoreUnknownVersions: true,
    path: processDirectory,
  })

  return {
    configuration,
    configurationDirectory,
    configurationFile,
    jsonFile,
    outputDir: outputDirectory,
    processDirectory,
    publicPath,
    runtimeDirectory,
    runtimeFontInspectPath,
    runtimeFontStripPath,
    targets,
  }
}
