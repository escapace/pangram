import { findUp } from 'find-up'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Configuration } from '../types'
import { createState } from './create-state'

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
  const { configurationDirectory, configurationFile, state } = await createState(processDirectory)

  return {
    configurationDirectory,
    configurationFile,
    processDirectory,
    runtimeDirectory,
    runtimeFontInspectPath,
    runtimeFontStripPath,
    state,
    warnings: new Set<string>(),
  }
}
