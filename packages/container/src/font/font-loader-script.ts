import { build, type OutputFile } from 'esbuild'
import { TextDecoder } from 'node:util'
import type { WebFont } from '@pangram/font-loader'
import type { State } from '../types'
import { resolvePath } from 'mlly'

const buildToString = (value: { outputFiles: OutputFile[] }): string =>
  new TextDecoder('utf-8').decode(value.outputFiles[0].contents).replace(/\n$/, '')

export const fontLoaderScript = async (
  state: State,
  locales: Array<readonly [string, string | string[]]>,
  fonts: WebFont[],
): Promise<string> =>
  buildToString(
    await build({
      absWorkingDir: state.runtimeDirectory,
      bundle: true,
      define: {
        __DATA_FONTS__: JSON.stringify(fonts),
        __DATA_LOCALES__: JSON.stringify(locales),
      },
      entryPoints: [await resolvePath('@pangram/font-loader', { url: import.meta.url })],
      format: 'iife',
      minify: true,
      platform: 'browser',
      target: state.targets.esbuild,
      write: false,
    }),
  )
