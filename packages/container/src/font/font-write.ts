import { execa } from 'execa'
import { mkdirp, pathExists } from 'fs-extra'
import { compact, includes, map, uniq } from 'lodash-es'
import assert from 'node:assert'
import path from 'node:path'
import type { Configuration } from '../types'
import { fontInspectCommand } from './font-inspect'

export const fontWrite = async (
  slug: string,
  configuration: Configuration,
): Promise<{
  codePoints: number[]
  files: string[]
}> => {
  // eslint-disable-next-line typescript/no-non-null-assertion
  const fontState = configuration.state.fonts.get(slug)!
  const font = fontState.configuration
  const source = path.resolve(configuration.configurationDirectory, font.source)

  if (!(await pathExists(source))) {
    throw new Error(`${font.source}: no such file`)
  }

  if (!includes(['.otf', '.ttf', '.woff'], path.extname(source))) {
    throw new Error(
      `${font.source}: not a ttf or cff-flavored opentype (.otf or .ttf) or woff (.woff) font file`,
    )
  }

  // https://www.w3.org/TR/css-fonts-4/#default-features
  const layoutFeatures =
    font.layoutFeatures === undefined
      ? `--layout-features=*`
      : font.layoutFeatures.length === 0
        ? undefined
        : `--layout-features+=${uniq(font.layoutFeatures).sort().join(',')}`

  await mkdirp(configuration.outputDirectory)

  const files = await Promise.all(
    map(font.format, async (format): Promise<string> => {
      const outputFile = path.join(configuration.outputDirectory, `${slug}.${format}`)

      const fonttools = await execa(
        'pyftsubset',
        compact([
          source,
          format === 'woff' ? '--with-zopfli' : undefined,
          `--output-file=${outputFile}`,
          font.unicodeRange !== undefined ? `--unicodes=${font.unicodeRange}` : undefined,
          font.desubroutinize ? '--desubroutinize' : undefined,
          '--harfbuzz-repacker',
          `--flavor=${format}`,
          layoutFeatures,
          `--name-IDs=''`,
          `--recalc-average-width`,
          `--recalc-bounds`,
          `--recalc-max-context`,
          `--obfuscate-names`,
        ]),
      )

      const fontStrip = await execa('python3', [
        configuration.runtimeFontStripPath,
        '-f',
        outputFile,
      ])

      if (!(await pathExists(outputFile)) || fonttools.exitCode !== 0 || fontStrip.exitCode !== 0) {
        throw new Error(`${font.source}: fonttools error`)
      }

      return outputFile
    }),
  )

  const file = fontState.configuration.format.includes('woff2')
    ? files.find((value) => value.endsWith('.woff2'))
    : files.find((value) => value.endsWith('.woff'))

  assert(typeof file === 'string')

  const { codePoints: _codePoints } = await fontInspectCommand(
    configuration.runtimeFontInspectPath,
    file,
  )
  const codePoints = _codePoints.map((value) => value.codePoint)

  return { codePoints, files }
}

// --layout-features=

// fonttools by default keeps 'calt', 'ccmp', 'clig', 'curs', 'dnom', 'frac', 'kern', 'liga',
// 'locl', 'mark', 'mkmk', 'numr', 'rclt', 'rlig', 'rvrn'

//
