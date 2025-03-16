#!/usr/bin/env node

import { command, compose, string } from '@escapace/cli'
import assert from 'node:assert'

const commandBuild = command()
  .reference('build')
  .name('build')
  .description('Write locale-optmizied fonts')
  .reducer(() => ({}))

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

        return await build()
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
