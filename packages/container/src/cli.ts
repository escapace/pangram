#!/usr/bin/env node

import { command, string, compose } from '@escapace/cli'
import { DEFAULT_JSON_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_PUBLIC_PATH } from './constants'
import assert from 'node:assert'

const commandBuild = command()
  .reference('build')
  .name('build')
  .description('Write locale-optmizied fonts')
  .input(
    string()
      .reference('output')
      .description('font output directory path')
      .option('--output')
      .default(DEFAULT_OUTPUT_DIR),
  )
  .input(
    string()
      .reference('manifest')
      .description('manifest path')
      .option('--manifest')
      .default(DEFAULT_JSON_FILE),
  )
  .input(
    string()
      .reference('base')
      .description('font public base path')
      .option('--base')
      .default(DEFAULT_PUBLIC_PATH),
  )

const commandInspect = command()
  .reference('inspect')
  .name('inspect')
  .description('Inspect a font file')
  .input(string().reference('font').description('font file').option('--font'))

const app = compose(
  command()
    .reference('pangram')
    .name('pangram')
    .description('Automate web font loading and localization best practices')
    .subcommand(commandBuild)
    .subcommand(commandInspect)
    .reducer(async (value) => {
      if (value.reference === 'build') {
        const { build } = await import('./build')

        return await build({
          ...value.value,
        })
      }

      if (value.reference === 'inspect') {
        const { inspect } = await import('./inspect')

        const { font } = value.value

        assert(font !== undefined, '--font is required')

        return await inspect({
          font,
        })
      }

      return
    }),
)

await app()
