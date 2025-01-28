import { fromHtml } from 'hast-util-from-html'
import { select, selectAll } from 'hast-util-select'
import { toString } from 'hast-util-to-string'
import { orderBy, uniq } from 'lodash-es'
import { resolvePath } from 'mlly'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import memoize from 'p-memoize'
import { trimLines } from 'trim-lines'
import { udhr as _udhr } from 'udhr'
import { z } from 'zod'

export const isFile = async (path: string) =>
  await fs
    .stat(path)
    .then((stats) => stats.isFile())
    .catch(() => false)

export const isDirectory = async (path: string) =>
  await fs
    .stat(path)
    .then((stats) => stats.isDirectory())
    .catch(() => false)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import type { UDHR } from '../src'
import { bcp47Normalize } from '../src/utilities/bcp47-normalize'
const pathDirectoryUDHR = path.dirname(
  await resolvePath('udhr', {
    url: import.meta.url,
  }),
)

export function calculateCodePointFrequencies(input: string): Array<[number, number]> {
  const frequencyMap = new Map<number, number>()

  for (const char of input) {
    // eslint-disable-next-line typescript/no-non-null-assertion
    const codePoint = char.codePointAt(0)!
    if (codePoint !== 10) {
      frequencyMap.set(codePoint, (frequencyMap.get(codePoint) ?? 0) + 1)
    }
  }

  let totalCount = 0
  for (const count of frequencyMap.values()) {
    totalCount += count
  }

  return orderBy(
    Array.from(frequencyMap.entries())
      .sort(([cpA], [cpB]) => cpA - cpB)
      .map(([codePoint, count]) => [codePoint, count / totalCount]),
    ([_, frequency]) => frequency,
    'desc',
  )
}

const createCodePointFrequencies = memoize(async (code: string) => {
  const tree = fromHtml(
    String(await fs.readFile(path.join(pathDirectoryUDHR, 'declaration', `${code}.html`))),
  )
  const body = select('body', tree)

  assert(body !== undefined, `Unable to select body for ${code}.`)

  selectAll('article h2', body).forEach((value) => {
    value.children = []
  })

  selectAll('body header h2', body).forEach((value) => {
    value.children = []
  })

  return calculateCodePointFrequencies(
    trimLines(toString(body))
      .replace(/(?:\r?\n){2,}/gu, '\n')
      .replace(/^\s*\n|\n\s*$/g, ''),
  )
})

const pathDirectoryCLDR = path.join(
  path.dirname(
    await resolvePath('cldr-misc-full/package.json', {
      url: import.meta.url,
    }),
  ),
  'main',
)

assert(await isDirectory(pathDirectoryCLDR))

async function readExemplarCodePoints(): Promise<{ [key: string]: number[] }> {
  // Read the contents of the directory
  const files = await fs.readdir(pathDirectoryCLDR, { withFileTypes: true })

  const schema = z
    .object({
      main: z.record(
        z.string(),
        z.object({
          characters: z.object({
            exemplarCharacters: z.string(),
          }),
        }),
      ),
    })
    .transform((value, context) => {
      const keys = Object.keys(value.main)

      if (keys.length !== 1) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Not a number',
        })

        return z.NEVER
      }

      const key = keys[0]

      return uniq(
        Array.from(value.main[key].characters.exemplarCharacters.replace(/\P{L}+/gu, '')).map(
          // eslint-disable-next-line typescript/no-non-null-assertion
          (char) => char.codePointAt(0)!,
        ),
      )
    })

  return Object.fromEntries(
    (
      await Promise.all(
        files
          .filter((file) => file.isDirectory())
          .map((value) => path.join(pathDirectoryCLDR, value.name, 'characters.json'))
          .map(async (value) => {
            const tag = bcp47Normalize(path.basename(path.dirname(value)), { forgiving: false })

            if (tag === undefined) {
              return undefined
            }

            if (!(await isFile(value))) {
              return undefined
            }

            const content = schema.parse(JSON.parse(await fs.readFile(value, 'utf-8')))

            return [tag, content] as const
          }),
      )
    ).filter((value): value is [string, number[]] => value !== undefined),
  )
}

const exemplarCodePointsMap = await readExemplarCodePoints()

const udhr: UDHR = (
  await Promise.all(
    _udhr.map(async (document) => {
      if (document.bcp47 == null) {
        return undefined
      }

      const bcp47 = bcp47Normalize(document.bcp47, { forgiving: false })

      if (bcp47 === undefined) {
        return undefined
      }

      const codePointFrequencies = await createCodePointFrequencies(document.code)
      const exemplarCodePoints = uniq(
        [
          ...(exemplarCodePointsMap[bcp47] ?? []),
          ...codePointFrequencies.map(([codePoint]) => codePoint),
        ].filter((codePoint) => /\p{L}+/u.test(String.fromCodePoint(codePoint))),
      ).toSorted((a, b) => a - b)

      if (exemplarCodePoints.length === 0) {
        return undefined
      }

      return {
        ...document,
        bcp47,
        codePointFrequencies,
        exemplarCodePoints,
      }
    }),
  )
).filter((value) => value !== undefined)

await fs.writeFile(path.resolve(__dirname, '..', 'src', 'udhr.json'), JSON.stringify(udhr, null, 2))
