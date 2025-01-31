import { execa } from 'execa'
import { findUp } from 'find-up'
import { pathExists } from 'fs-extra'
import { writeFile } from 'node:fs/promises'
import { compact, first, kebabCase } from 'lodash-es'
import assert from 'node:assert'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configure } from 'safe-stable-stringify'
import { fontNames } from './font/font-names'
import { schemaFontInformation } from './state/user-schema'

const stringify = configure({
  bigint: false,
  circularValue: Error,
  deterministic: true,
  strict: true,
})

export const inspect = async (options: { font: string }): Promise<void> => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const runtimePackageJSON = await findUp('package.json', {
    cwd: __dirname, // path.dirname(fileURLToPath(import.meta.url)),
  })

  assert(runtimePackageJSON !== undefined, 'Damaged installation')

  const runtimeDirectory = path.dirname(runtimePackageJSON)
  const runtimeFontInspectPath = path.join(runtimeDirectory, 'src/font/font-inspect.py')

  const file = path.resolve(process.cwd(), options.font)
  assert(await pathExists(file), `${file}: no such file`)
  const directory = path.dirname(file)

  // ...[
  //   isEmpty(variationSettings)
  //     ? []
  //     : ['--variation-settings', JSON.stringify([variationSettings])],
  // ].flat(),

  const arguments_: string[] = compact([runtimeFontInspectPath, '-f', file])

  const result = schemaFontInformation.parse(
    JSON.parse((await execa('python3', arguments_)).stdout),
  )

  if (result.variable) {
    for (const variation of result.variations) {
      const names = fontNames(variation)
      const name = first(names)
      const result = { ...variation, id: name === undefined ? variation.id : kebabCase(name) }

      await writeFile(path.join(directory, `${result.id}.json`), stringify(result))
    }
  } else {
    const name = first(fontNames(result))

    result.id =
      name === undefined
        ? path.basename(options.font).split('.').slice(0, -1).join('.')
        : kebabCase(name)

    await writeFile(path.join(directory, `${result.id}.json`), stringify(result))
  }
}
