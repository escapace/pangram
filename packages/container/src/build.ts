/* eslint-disable typescript/no-non-null-assertion */
import type { Font } from '@pangram/font-loader'
import fse from 'fs-extra'
import {
  cloneDeep,
  compact,
  find,
  first,
  forEach,
  isEqual,
  last,
  map,
  mapValues,
  omit,
  omitBy,
  pick,
  pickBy,
  reduce,
  sortBy,
  uniq,
  uniqBy,
} from 'lodash-es'
import assert from 'node:assert'
import path from 'node:path'
import stringify from 'safe-stable-stringify'
import type { ValuesType } from 'utility-types'
import { createConfiguration } from './configuration/create-configuration'
import type { Locale, Manifest } from './configuration/user-schema'
import { fontAdjust, xWidthAverage, type RequiredFontInformation } from './font/font-adjust'
import { fontFace } from './font/font-face'
import { fontFaceChecks } from './font/font-face-checks'
import { fontFaceCompact } from './font/font-face-compact'
import { fontFaceToString } from './font/font-face-to-string'
import { fontFamilyJoin } from './font/font-family-join'
import { fontInspect } from './font/font-inspect'
import { fontLoaderScript } from './font/font-loader-script'
import { fontNames } from './font/font-names'
import { fontResourceHints } from './font/font-resource-hints'
import { fontSort } from './font/font-sort'
import { fontTestString } from './font/font-test-string'
import { fontWrite } from './font/font-write'
import {
  TypeFontState,
  type Configuration,
  type FontFace,
  type FontProperties,
  type FontStateWritten,
  type Style,
} from './types'
import { atRule, context, decl, styleRule, toCss, type AstNode, type AtRule } from './utilities/ast'
import { combinations } from './utilities/combinations'
import { createHash } from './utilities/create-hash'
import { minifyCss } from './utilities/minify-css'
import { optimizeAst } from './utilities/optimize-ast'
import { reduceGraph } from './utilities/reduce-graph'
import { round } from './utilities/round'
import { toposort } from './utilities/toposort'

// {
//   "kind": "at-rule",
//   "name": "@media",
//   "params": "(scripting: none)",
//   "nodes": []
// },

const findNode = (node: AstNode): AstNode[] => {
  assert(node.kind === 'at-rule')
  assert(node.nodes.length === 0 || node.nodes.length === 1)

  return node.nodes.length === 0 ? node.nodes : findNode(node.nodes[0])
}

const applyStyleAtRules = (style: Style, nodes: AstNode[]): AstNode[] => {
  if (style.atRules.length === 0) {
    return nodes
  }

  const atRules = cloneDeep(style.atRules).reduce((previous, current): AtRule => {
    findNode(previous).push(current)

    return previous
  })

  findNode(atRules).push(...nodes)

  return [atRules]
}

// const selectorFontLocales = (state: State, slug?: string) =>
//   slug === undefined
//     ? []
//     : Object.entries(state.configuration.locales)
//         .map(([key, value]) =>
//           value.flatMap((value) => Array.from(value.graph?.keys() ?? [])).includes(slug)
//             ? key
//             : undefined,
//         )
//         .filter((value): value is string => value !== undefined)

const toLang = (locale: string, configuration: Configuration): string => {
  const value = uniq([locale, ...(configuration.state.localeToAlias.get(locale) ?? [])])
    .sort((a, b) => a.localeCompare(b))
    .map((value) => `"${value}"`)
    .join(', ')

  return `:is(:where(&:lang(${value})), & [lang]:lang(${value}))`
}

const selectorParent = (style: Style, configuration: Configuration): Style | undefined =>
  style.parent === undefined
    ? undefined
    : find(configuration.state.styles, (value) => value.id === style.parent)

const selectorStyleProperties = (
  style: Style,
  type: 'fallbackStyleProperties' | 'metrics' | 'scriptingNoneStyleProperties',
  configuration: Configuration,
) => {
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

const selectorFontProperties = (
  style: Style,
  configuration: Configuration,
): Required<FontProperties> | undefined =>
  style.fontProperties === undefined
    ? undefined
    : configuration.state.fontProperties.get(style.fontProperties)!

const selectorFontVariationSettings = (
  style: Style,
  configuration: Configuration,
): string | undefined => {
  const fontProperties = selectorFontProperties(style, configuration)

  return fontProperties?.fontVariationSettings === undefined
    ? undefined
    : fontProperties.fontVariationSettings === 'normal'
      ? 'normal'
      : sortBy(
          uniqBy(Object.entries(fontProperties.fontVariationSettings), ([key]) => key),
          ([key]) => key,
        )
          .map(([key, value]) => `"${key}" ${value}`)
          .join(', ')
}

const selectorFontFamilies = (
  style: Style,
  configuration: Configuration,
): Array<{
  fontFamily: string
  slug: string
}> =>
  compact(
    selectorFontProperties(style, configuration)?.fontFamily?.fonts.map((slug) => {
      const value = configuration.state.fonts.get(slug)?.fontFaces.get(style.id)

      if (value !== undefined) {
        return { fontFamily: value.fontFamily, slug }
      }

      return
    }),
  )

const selectorFallbackFontFamilies = (style: Style, configuration: Configuration): string[] => {
  const fontProperties = selectorFontProperties(style, configuration)

  return compact(
    fontProperties?.fontFamily?.fallbacks.map((slug) =>
      configuration.state.fallbackFonts.get(slug)?.fontFaces.get(style.id),
    ),
  ).map((value) => value.fontFamily)
}

const selectorGenericFontFamilies = (style: Style, configuration: Configuration): string[] => {
  const fontProperties = selectorFontProperties(style, configuration)

  return compact(fontProperties?.fontFamily?.fallbacksGeneric)
}

const selectorFontFaces = (styles: Style[], configuration: Configuration) => {
  const lookup = compact(
    styles.flatMap((style) => {
      const reference =
        style.fontProperties === undefined
          ? undefined
          : configuration.state.fontProperties.get(style.fontProperties)?.fontFamily

      const fonts = reference?.fonts.map(
        (slug) => configuration.state.fonts.get(slug)! as FontStateWritten,
      )

      const fallbackFonts = reference?.fallbacks.map(
        (id) => configuration.state.fallbackFonts.get(id)!,
      )

      if (fonts === undefined && fallbackFonts === undefined) {
        return
      }

      return { fallbackFonts, fonts }
    }),
  )

  const fonts = uniqBy(compact(lookup.flatMap((value) => value.fonts)), (value) => value.slug)

  const fallbackFonts = uniqBy(
    compact(lookup.flatMap((value) => value.fallbackFonts)),
    (value) => value.configuration.id,
  )

  const fontFaces = uniqBy(
    compact([
      ...fonts.flatMap((font) =>
        styles.map(({ id }): ({ codePoints?: number[] } & FontFace) | undefined => {
          const value = font.fontFaces.get(id)
          if (value === undefined) {
            return undefined
          }

          return { codePoints: font.codePoints, ...value }
        }),
      ),
      ...fallbackFonts.flatMap((font) => styles.map(({ id }) => font.fontFaces.get(id))),
    ]) as Array<{ codePoints?: number[] } & FontFace>,
    (value) =>
      createHash(omitBy(value, (value, key) => key === 'codePoinst' || value === undefined)),
  )

  fontFaceChecks(fontFaces)

  return {
    fallbackFonts,
    fontFaces: fontFaces.map((value): FontFace => omit(value, 'codePoints')),
    fonts,
  }
}

const toWebFontLocale = (styles: Style[], configuration: Configuration): Locale => {
  const prefixes = uniq(styles.map((value) => value.prefix))

  const style = minifyCss(
    toCss(
      optimizeAst([
        styleRule(
          configuration.selector,
          styles.flatMap((value) => value.ast),
        ),
      ]),
    ),
    configuration,
  )

  const { fontFaces, fonts } = selectorFontFaces(styles, configuration)

  const fontFace = minifyCss(
    fontFaces
      .sort((a, b) =>
        a.fontFamily.localeCompare(b.fontFamily, 'en-us', {
          sensitivity: 'variant',
          usage: 'sort',
        }),
      )
      .map((value) => fontFaceToString(value))
      .join('\n\n'),
    configuration,
  )

  const order = last(
    toposort(
      reduce(
        compact(styles.map((value) => value.graph)),
        (a, b) => reduceGraph(a, b),
        new Map<string, string[]>(),
      ),
    ).map((value) => Array.from(value)),
  )

  const outputFont = fonts.map((font): Font => {
    const fontFaces = uniqBy(
      compact(styles.map(({ id }) => font.fontFaces.get(id))).map((value) =>
        pick(value, ['fontWeight', 'fontStyle', 'fontStretch', 'fontFamily']),
      ),
      (value) => createHash(value),
    )

    const output: Font = {
      fontFaces:
        fontFaces.length === 0
          ? undefined
          : fontFaces.map(
              (value) =>
                pickBy(
                  {
                    fontFamily: value.fontFamily,
                    fontStretch: value.fontStretch === 100 ? undefined : value.fontStretch,
                    fontStyle: value.fontStyle === 'normal' ? undefined : value.fontStyle,
                    fontWeight: value.fontWeight === 400 ? undefined : value.fontWeight,
                  },
                  (value) => value !== undefined,
                ) as ValuesType<Required<Font>['fontFaces']>,
            ),
      prefer: Array.isArray(font.configuration.prefer)
        ? uniq(fontSort(font.configuration.prefer).fonts.map((value) => value.slug))
        : undefined,
      resourceHints: fontResourceHints(font.slug, configuration),
      slug: font.slug,
      tech: font.configuration.tech,
      testString: font.testString,
    }

    return pickBy(output, (value) => value !== undefined) as Font
  })

  const output: Locale = {
    fontFace,
    fonts: outputFont,
    order,
    prefixes,
    style,
  }

  return pickBy(output, (value) => value !== undefined) as Locale
}

const toManifest = async (configuration: Configuration): Promise<Manifest> => {
  const locale = mapValues(configuration.state.locales, (style) =>
    toWebFontLocale(style, configuration),
  )

  const aliasPartial = map(locale, (_, locale) =>
    (configuration.state.localeToAlias.get(locale) ?? []).map((alias) => [alias, locale] as const),
  ).flat()

  const locales = [
    ...map(locale, (value, locale) => [locale, value.fonts.map((value) => value.slug)] as const),
    ...aliasPartial,
  ]

  const alias = [...aliasPartial]

  forEach(locale, (_, locale) => alias.push([locale, locale]))

  const wildcard = toWebFontLocale(configuration.state.styles, configuration)

  Object.assign(locale, { '*': wildcard })

  return {
    aliases: Object.fromEntries(alias),
    locales: locale,
    script: await fontLoaderScript(
      configuration,
      locales,
      // resourceHint is not useful for the font loader
      wildcard.fonts.map((value) => omit(value, ['resourceHints'])),
    ),
  }
}

export const build = async () => {
  const configuration = await createConfiguration()

  for (const slug of configuration.state.fonts.keys()) {
    const { codePoints, files } = await fontWrite(slug, configuration)
    const testString = fontTestString(codePoints)
    const fontState = configuration.state.fonts.get(slug)!

    configuration.state.fonts.set(slug, {
      ...fontState,
      codePoints,
      files,
      testString,
      type: TypeFontState.Written,
    })
  }

  for (const style of configuration.state.styles) {
    const seen = new Set<string>()

    if (style.fontProperties === undefined || seen.has(style.fontProperties)) {
      continue
    }

    seen.add(style.fontProperties)

    const fontProperties = configuration.state.fontProperties.get(style.fontProperties)!

    if (fontProperties.fontFamily === undefined) {
      continue
    }

    const fonts = fontProperties.fontFamily.fonts.map(
      (slug) => configuration.state.fonts.get(slug)!,
    ) as FontStateWritten[]

    const fallbackFonts = fontProperties.fontFamily.fallbacks.map(
      (slug) => configuration.state.fallbackFonts.get(slug)!,
    )

    const primaryFont = first(fonts)
    const secondaryFonts = fonts.slice(1)

    const primaryFontInformation =
      (primaryFont === undefined
        ? undefined
        : await fontInspect(primaryFont.slug, configuration, fontProperties)) ??
      fallbackFonts[0].configuration

    const locales = uniq([
      style.locale,
      ...(configuration.state.localeToAlias.get(style.locale) ?? []),
      // ...(state.configuration.localeFromAlias.get(style.locale) ?? []),
    ])

    if (!primaryFontInformation.consistentMetrics) {
      const name =
        primaryFont === undefined
          ? fontNames(primaryFontInformation, true).join(', ')
          : path.relative(configuration.configurationDirectory, primaryFont.configuration.source)

      configuration.state.warnings.add(`Inconsistent font metrics for ${name}.`)
    }

    primaryFont?.fontFaces.set(
      style.id,
      fontFace({
        font: primaryFont,
        fontProperties,
        publicPath: configuration.publicPath,
        type: 'font',
      }),
    )

    const requiredFontInformation: RequiredFontInformation[] = [primaryFontInformation]

    for (const secondaryFont of secondaryFonts) {
      assert(primaryFont !== undefined)

      const secondaryFontInformation = await fontInspect(
        secondaryFont.slug,
        configuration,
        fontProperties,
      )

      if (!secondaryFontInformation.consistentMetrics) {
        configuration.state.warnings.add(
          `Inconsistent font metrics for ${path.relative(configuration.configurationDirectory, secondaryFont.configuration.source)}.`,
        )
      }

      requiredFontInformation.push(secondaryFontInformation)

      secondaryFont.fontFaces.set(
        style.id,
        fontFace({
          adjustments: configuration.adjustFontMetrics
            ? fontAdjust(primaryFontInformation, secondaryFontInformation, locales)
            : undefined,
          font: secondaryFont,
          fontProperties,
          primaryFont,
          publicPath: configuration.publicPath,
          type: 'font',
        }),
      )
    }

    for (const fallbackFont of fallbackFonts) {
      if (!fallbackFont.configuration.consistentMetrics) {
        configuration.state.warnings.add(
          `Inconsistent font metrics for ${fontNames(fallbackFont.configuration, true).join(', ')}.`,
        )
      }

      requiredFontInformation.push(fallbackFont.configuration)

      fallbackFont.fontFaces.set(
        style.id,
        fontFace({
          adjustments: configuration.adjustFontMetrics
            ? fontAdjust(primaryFontInformation, fallbackFont.configuration, locales)
            : undefined,
          font: fallbackFont,
          fontProperties,
          type: 'fallback',
        }),
      )
    }

    Object.assign(style.metrics, {
      [`--${style.prefix}-ascent`]: round(
        primaryFontInformation.ascent / primaryFontInformation.unitsPerEm,
      ),
      [`--${style.prefix}-cap-height`]: round(
        primaryFontInformation.capHeight / primaryFontInformation.unitsPerEm,
      ),
      [`--${style.prefix}-descent`]: round(
        Math.abs(primaryFontInformation.descent / primaryFontInformation.unitsPerEm),
      ),
      [`--${style.prefix}-line-gap`]: round(
        primaryFontInformation.lineGap / primaryFontInformation.unitsPerEm,
      ),
      [`--${style.prefix}-x-height`]: round(
        Math.abs(primaryFontInformation.xHeight / primaryFontInformation.unitsPerEm),
      ),
      [`--${style.prefix}-x-width-average`]: round(
        xWidthAverage(locales, ...requiredFontInformation),
      ),
    })
  }

  for (const slug of configuration.state.fonts.keys()) {
    const fontState = configuration.state.fonts.get(slug) as FontStateWritten

    fontState.fontFaces = new Map(
      fontFaceCompact(cloneDeep(Object.fromEntries(fontState.fontFaces.entries())), {
        codePoints: fontState.codePoints,
        fontFamily: fontState.configuration.family,
        isFallback: false,
      }),
    )
  }

  for (const slug of configuration.state.fallbackFonts.keys()) {
    const fontState = configuration.state.fallbackFonts.get(slug)!

    fontState.fontFaces = new Map(
      fontFaceCompact(cloneDeep(Object.fromEntries(fontState.fontFaces.entries())), {
        isFallback: true,
      }),
    )
  }

  for (const style of configuration.state.styles) {
    const fontProperties = selectorFontProperties(style, configuration)
    const fontFamilies = selectorFontFamilies(style, configuration)
    const fallbackFontFamilies = selectorFallbackFontFamilies(style, configuration)
    const fallbackGenericFontFamilies = selectorGenericFontFamilies(style, configuration)

    style.scriptingNoneStyleProperties = pickBy(
      {
        [`--${style.prefix}-font-family`]: fontFamilyJoin([
          ...fontFamilies.map((value) => value.fontFamily),
          ...fallbackFontFamilies,
          ...fallbackGenericFontFamilies,
        ]),
      },
      (value) => value !== undefined,
    )

    style.fallbackStyleProperties = pickBy(
      {
        [`--${style.prefix}-font-family`]: fontFamilyJoin([
          ...fallbackFontFamilies,
          ...fallbackGenericFontFamilies,
        ]),
        [`--${style.prefix}-font-stretch`]:
          fontProperties?.fontStretch === undefined ? undefined : `${fontProperties.fontStretch}%`,
        [`--${style.prefix}-font-style`]: fontProperties?.fontStyle,
        [`--${style.prefix}-font-variation-settings`]: selectorFontVariationSettings(
          style,
          configuration,
        ),
        [`--${style.prefix}-font-weight`]: fontProperties?.fontWeight,
      },
      (value) => value !== undefined,
    )
  }

  for (const style of configuration.state.styles) {
    const metrics = selectorStyleProperties(style, 'metrics', configuration)

    if (metrics.length !== 0) {
      style.ast.push(
        context({ order: '0' }, [
          styleRule(toLang(style.locale, configuration), applyStyleAtRules(style, metrics)),
        ]),
      )
    }

    const fallbackStyleProperties = selectorStyleProperties(
      style,
      'fallbackStyleProperties',
      configuration,
    )

    if (fallbackStyleProperties.length !== 0) {
      style.ast.push(
        context({ order: '0' }, [
          styleRule(
            toLang(style.locale, configuration),
            applyStyleAtRules(style, fallbackStyleProperties),
          ),
        ]),
      )
    }

    const fontFamilies = selectorFontFamilies(style, configuration)
    const fontFamilyCombinations = map(
      combinations(fontFamilies.map((value) => value.slug)),
      (value) => map(value, (value) => find(fontFamilies, ({ slug }) => slug === value)!),
    )

    if (fontFamilyCombinations.length !== 0) {
      const fallbackFontFamilies = selectorFallbackFontFamilies(style, configuration)
      const fallbackGenericFontFamilies = selectorGenericFontFamilies(style, configuration)

      const rules = compact(
        fontFamilyCombinations.map((fonts) => {
          const selector = `&${map(fonts, ({ slug }) => `[data-fonts-loaded~="${slug}"]`).join('')}`

          const fontFamily = fontFamilyJoin([
            ...fonts.map((value) => value.fontFamily),
            ...fallbackFontFamilies,
            ...fallbackGenericFontFamilies,
          ])

          if (fontFamily === undefined) {
            return
          }

          return styleRule(selector, [
            styleRule(
              toLang(style.locale, configuration),
              applyStyleAtRules(style, [decl(`--${style.prefix}-font-family`, fontFamily)]),
            ),
          ])
        }),
      )

      if (rules.length !== 0) {
        style.ast.push(context({ order: '1' }, rules))
      }
    }

    const scriptingNoneStyleProperties = selectorStyleProperties(
      style,
      'scriptingNoneStyleProperties',
      configuration,
    )

    if (scriptingNoneStyleProperties.length !== 0) {
      style.ast.push(
        context({ order: '2' }, [
          styleRule(toLang(style.locale, configuration), [
            atRule(
              '@media',
              '(scripting: none)',
              applyStyleAtRules(style, scriptingNoneStyleProperties),
            ),
          ]),
        ]),
      )
    }
  }

  const result = await toManifest(configuration)

  if (typeof configuration.manifest === 'string') {
    await fse.mkdirp(path.dirname(configuration.manifest))
    await fse.writeFile(configuration.manifest, stringify(result, null, 2))
  } else {
    await configuration.manifest(result)
  }

  for (const warning of configuration.state.warnings) {
    console.warn(warning)
  }

  return result
}
