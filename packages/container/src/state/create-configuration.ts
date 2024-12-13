import { cosmiconfig } from 'cosmiconfig'
import { find, isEmpty, isObject } from 'lodash-es'
import assert from 'node:assert'
import path from 'node:path'
import { flattenConfiguration } from './flatten-configuration'
import { schemaLocales } from './user-schema'

export const createConfiguration = async (processDirectory: string) => {
  const explorer = cosmiconfig('tyre', {
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

  const configurationDirectory = path.dirname(config.filepath)
  const configFile = config.filepath

  const configuration = flattenConfiguration(
    schemaLocales.parse(find([config.config], (value) => isObject(value) && !isEmpty(value))),
    configurationDirectory,
  )

  return {
    configuration,
    configurationDirectory,
    configurationFile: path.relative(processDirectory, configFile),
  }
}
