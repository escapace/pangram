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

// const testData = ` e
// Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ
// U+054x Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ
// U+055x Ր Ց Ւ Փ Ք Օ Ֆ ՙ ՚ ՛ ՜ ՝ ՞ ՟
// U+056x ՠ ա բ գ դ ե զ է ը թ ժ ի լ խ ծ կ
// U+057x հ ձ ղ ճ մ յ ն շ ո չ պ ջ ռ ս վ տ
// U+058x ր ց ւ փ ք օ ֆ և ֈ ։ ֊ ֍ ֎ ֏
// U+040x Ѐ Ё Ђ Ѓ Є Ѕ І Ї Ј Љ Њ Ћ Ќ Ѝ Ў Џ
// U+041x А Б В Г Д Е Ж З И Й К Л М Н О П
// U+042x Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я
// U+043x а б в г д е ж з и й к л м н о п
// U+044x р с т у ф х ц ч ш щ ъ ы ь э ю я
// U+045x ѐ ё ђ ѓ є ѕ і ї ј љ њ ћ ќ ѝ ў џ
// U+046x Ѡ ѡ Ѣ ѣ Ѥ ѥ Ѧ ѧ Ѩ ѩ Ѫ ѫ Ѭ ѭ Ѯ ѯ
// U+047x Ѱ ѱ Ѳ ѳ Ѵ ѵ Ѷ ѷ Ѹ ѹ Ѻ ѻ Ѽ ѽ Ѿ ѿ
// U+048x Ҁ ҁ ҂ ◌҃ ◌҄ ◌҅ ◌҆ ◌҇ ◌҈ ◌҉ Ҋ ҋ Ҍ ҍ Ҏ ҏ
// U+049x Ґ ґ Ғ ғ Ҕ ҕ Җ җ Ҙ ҙ Қ қ Ҝ ҝ Ҟ ҟ
// U+04Ax Ҡ ҡ Ң ң Ҥ ҥ Ҧ ҧ Ҩ ҩ Ҫ ҫ Ҭ ҭ Ү ү
// U+04Bx Ұ ұ Ҳ ҳ Ҵ ҵ Ҷ ҷ Ҹ ҹ Һ һ Ҽ ҽ Ҿ ҿ
// U+04Cx Ӏ Ӂ ӂ Ӄ ӄ Ӆ ӆ Ӈ ӈ Ӊ ӊ Ӌ ӌ Ӎ ӎ ӏ
// U+04Dx Ӑ ӑ Ӓ ӓ Ӕ ӕ Ӗ ӗ Ә ә Ӛ ӛ Ӝ ӝ Ӟ ӟ
// U+04Ex Ӡ ӡ Ӣ ӣ Ӥ ӥ Ӧ ӧ Ө ө Ӫ ӫ Ӭ ӭ Ӯ ӯ
// U+04Fx Ӱ ӱ Ӳ ӳ Ӵ ӵ Ӷ ӷ Ӹ ӹ Ӻ ӻ Ӽ ӽ Ӿ ӿ
// `
//
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
