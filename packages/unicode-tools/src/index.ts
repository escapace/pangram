import { basicFilter } from 'bcp-47-match'
import { fill, orderBy, some } from 'lodash-es'
import assert from 'node:assert'
// import _iso15924 from './iso15924.json'
import _udhr from './udhr.json'
import { bcp47Normalize } from './utilities/bcp47-normalize'

export { bcp47Normalize, type BCP47Options } from './utilities/bcp47-normalize'

export type UDHR = Array<{
  bcp47: string
  code: string
  codePointFrequencies: Array<[number, number]>
  direction: 'ltr' | 'rtl' | 'ttb' | null
  exemplarCodePoints: number[]
  iso6393: string | null
  latitude: number
  longitude: number
  name: string
  ohchr: string | null
  // script: string
  stage: 1 | 2 | 3 | 4 | 5
}>

export const udhr = _udhr as UDHR

function normalizeFrequencies(data: Array<[number, number]>, weight = 1): Array<[number, number]> {
  const total = data.reduce((accumulator, [, freq]) => accumulator + freq, 0)
  return data.map(([codePoint, freq]) => [codePoint, (freq / total) * weight])
}

function combineCodepointFrequencies(
  frequencyArrays: Array<Array<[number, number]>>,
  weight = 1,
): Array<[number, number]> {
  assert(weight !== 0)
  assert(!some(frequencyArrays, (value) => value.length === 0))

  if (weight === 0) {
    return []
  }

  const frequencyMap = new Map<number, number[]>()

  // Collect frequencies for each codepoint
  frequencyArrays.forEach((array, index) => {
    array.forEach(([codePoint, frequency]) => {
      if (!frequencyMap.has(codePoint)) {
        frequencyMap.set(codePoint, fill(new Array(frequencyArrays.length), 0))
      }

      // eslint-disable-next-line typescript/no-non-null-assertion
      frequencyMap.get(codePoint)![index] = frequency
    })
  })

  // Calculate mean frequency for each codepoint
  const result: Array<[number, number]> = []

  frequencyMap.forEach((frequencies, codepoint) => {
    assert(frequencies !== undefined)
    assert(frequencies.length !== 0)

    const meanFrequency =
      (frequencies.reduce((sum, freq) => sum + freq, 0) / frequencies.length) * weight
    result.push([codepoint, meanFrequency])
  })

  return orderBy(result, (value) => value[1], 'desc')
}

export const codePointFrequencies = (codePoints: number[], locales: string[] = []) => {
  const tags = locales
    .map((value) => bcp47Normalize(value, { forgiving: false }))
    .filter((value) => value !== undefined)

  return normalizeFrequencies(
    combineCodepointFrequencies(
      udhr
        .map((document) => {
          if (tags.length !== 0 && basicFilter(tags, [document.bcp47]).length === 0) {
            return undefined
          }

          const exemplarCodePoints = document.exemplarCodePoints

          const codePointFrequencies = document.codePointFrequencies.filter(([codePoint]) =>
            codePoints.includes(codePoint),
          )

          if (exemplarCodePoints.length === 0) {
            return undefined
          }

          if (codePointFrequencies.length === 0) {
            return undefined
          }

          const exemplarCodePointsIncluded = exemplarCodePoints.filter((value) =>
            codePoints.includes(value),
          ).length

          const exemplarCodePointsWeight = exemplarCodePointsIncluded / exemplarCodePoints.length

          if (exemplarCodePointsWeight === 0) {
            return undefined
          }

          return {
            ...document,
            codePointFrequencies,
            exemplarCodePointsWeight,
          }
        })
        .filter((value) => value !== undefined)
        .map((document) =>
          combineCodepointFrequencies(
            [document.codePointFrequencies],
            document.exemplarCodePointsWeight,
          ),
        ),
    ),
  )
}

// const testData = `
// A aB bC cD dE eF fG gH hI iJ jK kL lM mN nO oP pQ qR rS sT tU uV vW wX xY yZ z
// `
//
// // eslint-disable-next-line typescript/no-non-null-assertion
// const testCodepoints = Array.from(testData, (char) => char.codePointAt(0)!)
//
// const test = codePointFrequencies(testCodepoints, ['en'])
//
// console.log(
//   JSON.stringify(
//     test.map(([key, value]) => [String.fromCodePoint(key), value]),
//     null,
//     2,
//   ),
// )
