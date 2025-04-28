import { cosmiconfig, type defaultLoaders } from 'cosmiconfig'
import { build } from 'esbuild'
import { remove } from 'fs-extra'
import { pickBy } from 'lodash-es'
import { resolvePath } from 'mlly'
import assert from 'node:assert'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { State } from '../types'
import { normalizeState } from './normalize-state'
import type { UserConfiguration } from './user-schema'

const resolve = async (id: string, basedir?: string): Promise<string | undefined> => {
  try {
    const value = await resolvePath(id, {
      conditions: ['node', 'import', 'require'],
      extensions: ['.mjs', '.cjs', '.js', '.json'],
      url: basedir === undefined ? undefined : pathToFileURL(basedir),
    })
    return typeof value === 'string' ? value : undefined
  } catch {
    return undefined
  }
}

const cosmicconfigLoader = async (
  configFile: string,
  _: string,
): Promise<Awaited<ReturnType<(typeof defaultLoaders)['.mjs']>>> => {
  const alias = pickBy(
    {
      pangram:
        (await resolve('pangram')) ??
        (await resolve('pangram', path.dirname(configFile))) ??
        (await resolve('pangram', path.dirname(fileURLToPath(import.meta.url)))),
    },
    (value): value is string => typeof value === 'string',
  )

  const configurationDirectory = path.dirname(configFile)

  process.chdir(configurationDirectory)

  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'pangram'))

  try {
    await build({
      absWorkingDir: configurationDirectory,
      alias,
      bundle: true,
      entryPoints: {
        index: configFile,
      },
      // external: [],
      format: 'esm',
      loader: {
        '.js': 'js',
        '.json': 'copy',
        '.mjs': 'js',
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
      minify: false,
      outdir: temporaryDirectory,
      outExtension: { '.js': '.mjs' },
      platform: 'node',
      target: [`node${process.version.slice(1)}`],
      treeShaking: true,
      write: true,
    })

    // eslint-disable-next-line typescript/no-unsafe-assignment
    const module_ = await import(path.join(temporaryDirectory, 'index.mjs'))

    await remove(temporaryDirectory)

    // eslint-disable-next-line typescript/no-unsafe-member-access
    return module_?.default ?? module_
  } catch (error) {
    await remove(temporaryDirectory)

    throw error
  }
}

export const createState = async (
  processDirectory: string,
): Promise<{
  configurationDirectory: string
  configurationFile: string
  state: State
}> => {
  const explorer = cosmiconfig('pangram', {
    loaders: {
      '.cjs': cosmicconfigLoader,
      '.js': cosmicconfigLoader,
      '.mjs': cosmicconfigLoader,
      '.ts': cosmicconfigLoader,
    },
    searchPlaces: [
      'pangram.config.js',
      'pangram.config.ts',
      'pangram.config.mjs',
      'pangram.config.cjs',
    ],
    searchStrategy: 'global',
  })

  const config = await explorer.search(processDirectory)
  assert(typeof config?.filepath === 'string', 'No config file.')
  assert(config?.isEmpty !== true, 'Empty config.')
  assert(config.config !== undefined, 'Empty config.')

  const configurationDirectory = path.dirname(config.filepath)
  const configFile = config.filepath

  const state = normalizeState(
    await Promise.resolve(config.config as Promise<UserConfiguration> | UserConfiguration),
    configurationDirectory,
  )

  return {
    configurationDirectory,
    configurationFile: path.relative(processDirectory, configFile),
    state,
  }
}
