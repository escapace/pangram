import { codePointFrequencies } from '@pangram/unicode-tools'
import { orderBy } from 'lodash-es'
import assert from 'node:assert'

export const fontTestString = (codePoints: number[], locales: string[] = []) => {
  const testStringCodePoints = orderBy(
    codePointFrequencies(locales, codePoints, (value) =>
      /[\p{White_Space}\p{Symbol}\p{Number}\p{Punctuation}\p{Other}]/u.test(
        String.fromCodePoint(value),
      ),
    ),
    ([_, frequency]) => frequency,
    'desc',
  )
    .map(([codePoint]) => codePoint)
    .slice(0, 10)

  assert(testStringCodePoints.length !== 0)

  const testString = String.fromCodePoint(
    ...(testStringCodePoints.length === 10 ? testStringCodePoints : codePoints.slice(0, 10)),
  )

  assert(testString.length !== 0)

  return testString
}
