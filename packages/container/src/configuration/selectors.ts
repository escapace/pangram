import { compact, find, isEqual, pickBy, sortBy, uniq, uniqBy } from 'lodash-es'
import assert from 'node:assert'
import {
  FontType,
  type Configuration,
  type FontFace,
  type LocalFont,
  type Style,
  type UserFont,
  type UserFontComplete,
} from '../types'
import { decl } from '../utilities/ast'
import { createHash } from '../utilities/create-hash'
import { fontFaceCompact } from '../font/font-face-compact'

const selectorParent = (style: Style, configuration: Configuration): Style | undefined =>
  style.parent === undefined
    ? undefined
    : find(configuration.state.styles, (value) => value.id === style.parent)

const createPropertiesSelector =
  (type: 'propertiesLocal' | 'propertiesMetrics' | 'propertiesNoScript') =>
  (style: Style, configuration: Configuration) => {
    const parent = selectorParent(style, configuration)

    const value = pickBy(style[type], (value, key) => {
      if (parent !== undefined) {
        const parentValue = parent[type] === undefined ? undefined : parent[type][key]

        if (isEqual(value, parentValue)) {
          return false
        }
      }

      return true
    })

    return Object.entries(value).map(([key, value]) => decl(key, `${value}`))
  }

export const selectorPropertiesLocal = createPropertiesSelector('propertiesLocal')
export const selectorPropertiesMetrics = createPropertiesSelector('propertiesMetrics')
export const selectorPropertiesNoScript = createPropertiesSelector('propertiesNoScript')

export const selectorFontVariationSettings = (style: Style): string | undefined => {
  const propertiesUser = style.properties

  return propertiesUser?.fontVariationSettings === undefined
    ? undefined
    : propertiesUser.fontVariationSettings === 'normal'
      ? 'normal'
      : sortBy(
          uniqBy(Object.entries(propertiesUser.fontVariationSettings), ([key]) => key),
          ([key]) => key,
        )
          .map(([key, value]) => `"${key}" ${value}`)
          .join(', ')
}

export const selectorUserFontFamilies = (
  style: Style,
  configuration: Configuration,
): Array<{
  fontFamily: string
  slug: string
}> =>
  compact(
    style.properties?.fontFamily?.user.map((slug) => {
      const value = configuration.state.userFonts.get(slug)?.fontFaces.get(style.id)

      if (value !== undefined) {
        return { fontFamily: value.fontFamily, slug }
      }

      return
    }),
  )

export const selectorLocalFontFamilies = (style: Style, configuration: Configuration): string[] => {
  const propertiesUser = style.properties

  return compact(
    propertiesUser?.fontFamily?.local.map((slug) =>
      configuration.state.localFonts.get(slug)?.fontFaces.get(style.id),
    ),
  ).map((value) => value.fontFamily)
}

export const selectorGenericFontFamilies = (style: Style): string[] => {
  const propertiesUser = style.properties

  return compact(propertiesUser?.fontFamily?.generic)
}

const selectorUserFonts = (style: Style, configuration: Configuration): UserFont[] | undefined => {
  const reference = style.properties?.fontFamily

  if (reference === undefined) {
    return undefined
  }

  const userFonts = reference.user
    .map((slug) => configuration.state.userFonts.get(slug))
    .filter((value) => value !== undefined)

  if (userFonts.length === undefined) {
    return undefined
  }

  return userFonts
}

const selectorLocalFonts = (
  style: Style,
  configuration: Configuration,
): LocalFont[] | undefined => {
  const reference = style.properties?.fontFamily

  if (reference === undefined) {
    return undefined
  }

  const localFonts = reference.local
    .map((id) => configuration.state.localFonts.get(id))
    .filter((value) => value !== undefined)

  if (localFonts.length === undefined) {
    return undefined
  }

  return localFonts
}

export const selectorFontFaces = (
  styles: Style[],
  configuration: Configuration,
): {
  fontFaces: Array<[LocalFont | UserFontComplete, FontFace]>
  localFonts: LocalFont[]
  userFonts: UserFontComplete[]
} => {
  const userFonts = uniqBy(
    compact(styles.flatMap((style) => selectorUserFonts(style, configuration))),
    (value) => value.slug,
  ) as UserFontComplete[]

  assert(userFonts.every(({ type }) => type === FontType.UserComplete))

  const localFonts = uniqBy(
    compact(styles.flatMap((style) => selectorLocalFonts(style, configuration))),
    (value) => value.configuration.id,
  )

  const fontFaces: Array<[LocalFont | UserFontComplete, FontFace]> = uniqBy(
    fontFaceCompact(
      compact(
        [...userFonts, ...localFonts].flatMap((font) =>
          styles.map(({ id }): [LocalFont | UserFontComplete, FontFace] | undefined => {
            const value = font.fontFaces.get(id)

            if (value === undefined) {
              return undefined
            }

            return [font, value]
          }),
        ),
      ),
    ),
    ([_, fontFace]) => createHash(fontFace),
  ).sort(([_, a], [__, b]) =>
    a.fontFamily.localeCompare(b.fontFamily, 'en-us', {
      sensitivity: 'variant',
      usage: 'sort',
    }),
  )

  return {
    fontFaces,
    localFonts: uniqBy(
      fontFaces
        .map(([font]) => font)
        .filter((value): value is LocalFont => value.type === FontType.Local),
      (value) => value.configuration.id,
    ),
    userFonts: uniqBy(
      fontFaces
        .map(([font]) => font)
        .filter((value): value is UserFontComplete => value.type === FontType.UserComplete),
      (value) => value.slug,
    ),
  }
}

export const selectorFontLocales = (font: UserFont, configuration: Configuration) =>
  uniq(
    Object.entries(configuration.state.locales)
      .map(([key, styles]) =>
        styles.flatMap((style) => Array.from(style.graph?.keys() ?? [])).includes(font.slug)
          ? key
          : undefined,
      )
      .filter((value): value is string => value !== undefined),
  )
