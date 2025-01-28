import { execa } from 'execa'
import { pathExists } from 'fs-extra'
import { compact, isEmpty, omit } from 'lodash-es'
import assert from 'node:assert'
import memoize from 'p-memoize'
import {
  schemaFontInformation,
  type FontInformation,
  type FontInformationStatic,
} from '../state/user-schema'
import { TypeFontState, type FontProperties, type State } from '../types'
import { createHash } from '../utilities/create-hash'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

// "wght" font-weight
// "wdth" font-stretch
// "slnt" (slant) font-style: oblique + angle
// "ital" font-style: italic
// "opsz" font-optical-sizing

// const schemaPropertiesVariationAxes = z.record(schemaFontInspectVariationAxis)

function createVariationSettings(
  selectedFont: FontInformationStatic,
  computedStyle: Omit<FontProperties, 'fontFamily'>,
): Record<string, number> {
  // Initialize final axis map from the font's default axis values.
  const finalAxes = new Map<string, number>()

  // 1. Start with the font’s default axis settings.
  // selectedFont.variationAxes.forEach((axis) => {
  //   finalAxes.set(axis.name, axis.default)
  // })

  // 2. Apply variations implied by computedStyle.fontWeight & fontStretch.
  if (typeof computedStyle.fontWeight === 'number') {
    const weightAxis = selectedFont.variationAxes.find((a) => a.name === 'wght')

    if (weightAxis !== undefined) {
      finalAxes.set('wght', clamp(computedStyle.fontWeight, weightAxis.min, weightAxis.max))
    }
  }

  if (typeof computedStyle.fontStretch === 'number') {
    const widthAxis = selectedFont.variationAxes.find((a) => a.name === 'wdth')
    if (widthAxis !== undefined) {
      finalAxes.set('wdth', clamp(computedStyle.fontStretch, widthAxis.min, widthAxis.max))
    }
  }

  // 2c. font-style -> either ital=1
  //    "normal" => do nothing special (upright).
  if (computedStyle.fontStyle === 'italic') {
    const italAxis = selectedFont.variationAxes.find((a) => a.name === 'ital')

    if (italAxis !== undefined) {
      finalAxes.set('ital', italAxis.max)
    }
  }

  // 2d. @font-face clamp (skipped as requested)
  // if (selectedFont.faceDescriptor?.weightRange) {
  //   ...
  // }

  // 2e. clamp to the font's own internal support range (already covered by clampAxis above).
  // This might be repeated if you want to be extra certain after merges.

  // 3. Language, 4. font-language-override from @font-face: (skipped, about features not axes)

  // 5. Named instance from @font-face, if any (skipped, but here's where it would happen):
  // if (selectedFont.namedInstance) {
  //   for (const [axisName, axisValue] of Object.entries(selectedFont.namedInstance.variationSettings)) {
  //     const axis = selectedFont.variationAxes.find(a => a.name === axisName);
  //     if (axis) {
  //       mergeAxis(finalAxes, axisName, clampAxis(axisValue, axis));
  //     }
  //   }
  // }

  // 6. font-variation-settings from @font-face descriptor (skipped)
  // 7. font-feature-settings from @font-face descriptor (skipped)

  // 8. font-language-override from property (skipped, feature toggles not numeric axes)

  // 9. Apply font-optical-sizing if "auto".
  // if (computedStyle.fontOpticalSizing === 'auto') {
  //   const opszAxis = selectedFont.variationAxes.find((a) => a.name === 'opsz')
  //   if (opszAxis) {
  //     let opszValue = deriveOpticalSize(computedStyle)
  //     opszValue = clampAxis(opszValue, opszAxis)
  //     mergeAxis(finalAxes, 'opsz', opszValue)
  //   }
  // }
  // if (computedStyle.fontOpticalSizing === "none") {
  //   // typically do nothing
  // }

  // 10, 11. font-variant, letter-spacing, etc. (feature toggles, skipped)

  // 12. Finally, apply the computedStyle.fontVariationSettings from the element.
  if (
    computedStyle.fontVariationSettings !== undefined &&
    computedStyle.fontVariationSettings !== 'normal'
  ) {
    for (const [name, value] of Object.entries(computedStyle.fontVariationSettings)) {
      const axis = selectedFont.variationAxes.find((a) => a.name === name)

      if (axis !== undefined) {
        finalAxes.set(name, clamp(value, axis.min, axis.max))
      }
    }
  }

  // 13. font-feature-settings property => skip (feature toggles, not numeric axes)

  // Convert our final axes map to the desired array output format.

  return Object.fromEntries(finalAxes)
}

export const fontInspectCommand = memoize(
  async (
    runtimeFontInspectPath: string,
    file: string,
    properties: Omit<FontProperties, 'fontFamily'> = {},
  ) => {
    const data = schemaFontInformation.parse(
      JSON.parse(
        (
          await execa('python3', [
            runtimeFontInspectPath,
            '--no-named-instances',
            '--no-codepoints',
            '-f',
            file,
          ])
        ).stdout,
      ),
    )

    const variationSettings = data.variable ? createVariationSettings(data, properties) : undefined

    const arguments_: string[] = compact([
      runtimeFontInspectPath,
      '--no-named-instances',
      ...[
        isEmpty(variationSettings)
          ? []
          : ['--variation-settings', JSON.stringify([variationSettings])],
      ].flat(),
      '-f',
      file,
    ])

    const result = schemaFontInformation.parse(
      JSON.parse((await execa('python3', arguments_)).stdout),
    )

    return result
  },
  { cacheKey: (value) => createHash(value.slice(1)) },
)

export const fontInspect = async (
  slug: string,
  state: State,
  properties: Omit<FontProperties, 'fontFamily'> = {},
): Promise<FontInformation> => {
  // eslint-disable-next-line typescript/no-non-null-assertion
  const fontState = state.configuration.fonts.get(slug)!
  // const font = fontState
  assert(fontState.type === TypeFontState.Written)

  const file = fontState.font.format.includes('woff2')
    ? fontState.files.find((value) => value.endsWith('.woff2'))
    : fontState.files.find((value) => value.endsWith('.woff'))

  assert(typeof file === 'string' && (await pathExists(file)), `${file}: no such file`)

  const result = await fontInspectCommand(
    state.runtimeFontInspectPath,
    file,
    omit(properties, ['fontFamily']),
  )

  assert((fontState.font.tech?.includes('variations') === true) === result.variable)

  if (result.variable) {
    assert(result.variations.length === 1)

    return result.variations[0]
  } else {
    return result
  }
}
