/* eslint-disable typescript/no-non-null-assertion */
import type { Font } from '@pangram/font-loader'
import fse from 'fs-extra'
import {
  cloneDeep,
  compact,
  find,
  first,
  forEach,
  last,
  map,
  mapValues,
  omit,
  pickBy,
  reduce,
  uniq,
} from 'lodash-es'
import assert from 'node:assert'
import path from 'node:path'
import stringify from 'safe-stable-stringify'
import type { ValuesType } from 'utility-types'
import { createConfiguration } from './configuration/create-configuration'
import {
  selectorFontFaces,
  selectorFontLocales,
  selectorFontVariationSettings,
  selectorGenericFontFamilies,
  selectorLocalFontFamilies,
  selectorPropertiesLocal,
  selectorPropertiesMetrics,
  selectorPropertiesNoScript,
  selectorUserFontFamilies,
} from './configuration/selectors'
import type { Locale, Manifest } from './configuration/user-schema'
import { fontAdjust, xWidthAverage, type RequiredFontInformation } from './font/font-adjust'
import { fontFace } from './font/font-face'
import { fontFaceChecks } from './font/font-face-checks'
import { fontFaceCompactMap } from './font/font-face-compact'
import { fontFaceToString } from './font/font-face-to-string'
import { fontFamilyJoin } from './font/font-family-join'
import { fontInspect } from './font/font-inspect'
import { fontLoaderScript } from './font/font-loader-script'
import { fontName } from './font/font-name'
import { fontNames } from './font/font-names'
import { fontResourceHints } from './font/font-resource-hints'
import { fontSort } from './font/font-sort'
import { fontTestString } from './font/font-test-string'
import { fontWrite } from './font/font-write'
import { FontType, type Configuration, type Style, type UserFontComplete } from './types'
import { atRule, context, decl, styleRule, toCss, type AstNode, type AtRule } from './utilities/ast'
import { createCombinations } from './utilities/combinations'
import { minifyCss } from './utilities/minify-css'
import { optimizeAst } from './utilities/optimize-ast'
import { reduceGraph } from './utilities/reduce-graph'
import { round } from './utilities/round'
import { toposort } from './utilities/toposort'

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

const toLang = (locale: string, configuration: Configuration): string => {
  const value = uniq([locale, ...(configuration.state.localeToAlias.get(locale) ?? [])])
    .sort((a, b) => a.localeCompare(b))
    .map((value) => `"${value}"`)
    .join(', ')

  return `:is(:where(&:lang(${value})), & [lang]:lang(${value}))`
}

const toWebFontLocale = (styles: Style[], configuration: Configuration): Locale => {
  const stacks = uniq(styles.map((value) => value.stack))

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

  const { fontFaces, userFonts } = selectorFontFaces(styles, configuration)

  fontFaceChecks(fontFaces, configuration)

  const fontFace = minifyCss(
    fontFaces.map(([_, fontFace]) => fontFaceToString(fontFace)).join('\n\n'),
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

  const outputFont = userFonts.map((font): Font => {
    const output: Font = {
      fontFaces: fontFaces
        .filter(([value]) => value === font)
        .map(([_, fontFace]) => fontFace)
        .map(
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

    for (const key of ['fontFaces', 'prefer', 'resourceHints', 'tech'] as const) {
      if (output[key]?.length === 0) {
        output[key] = undefined
      }
    }

    return pickBy(output, (value) => value !== undefined) as Font
  })

  const output: Locale = {
    fontFace,
    fonts: outputFont,
    order,
    stacks,
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

  for (const key of configuration.state.userFonts.keys()) {
    const userFont = configuration.state.userFonts.get(key)!
    const { codePoints, files } = await fontWrite(key, configuration)

    const locales = selectorFontLocales(userFont, configuration)

    const testString = fontTestString(
      codePoints,
      uniq([
        ...locales,
        ...locales.flatMap((locale) => configuration.state.localeToAlias.get(locale) ?? []),
      ]),
    )

    configuration.state.userFonts.set(key, {
      ...userFont,
      codePoints,
      files,
      testString,
      type: FontType.UserComplete,
    })
  }

  for (const style of configuration.state.styles) {
    const properties = style.properties

    if (properties?.fontFamily === undefined) {
      continue
    }

    const userFonts = properties.fontFamily.user.map(
      (slug) => configuration.state.userFonts.get(slug)!,
    ) as UserFontComplete[]

    const localFonts = properties.fontFamily.local.map(
      (slug) => configuration.state.localFonts.get(slug)!,
    )

    const primaryFont = first(userFonts) ?? first(localFonts)

    if (primaryFont === undefined) {
      continue
    }

    const locales = uniq([
      style.locale,
      ...(configuration.state.localeToAlias.get(style.locale) ?? []),
      // ...(state.configuration.localeFromAlias.get(style.locale) ?? []),
    ])

    if (primaryFont.type === FontType.Local) {
      localFonts.shift()
    } else {
      userFonts.shift()
    }

    const fontPrimaryInformation =
      primaryFont.type === FontType.Local
        ? primaryFont.configuration
        : await fontInspect(primaryFont.slug, configuration, properties)

    if (!fontPrimaryInformation.consistentMetrics) {
      const name =
        primaryFont.type === FontType.Local
          ? fontNames(fontPrimaryInformation, true).join(', ')
          : path.relative(configuration.configurationDirectory, primaryFont.configuration.source)

      configuration.state.warnings.add(`Inconsistent font metrics for ${name}.`)
    }

    primaryFont.fontFaces.set(
      style.id,
      fontFace(
        {
          font: primaryFont,
          properties,
        },
        configuration,
      ),
    )

    const requiredFontInformation: RequiredFontInformation[] = [fontPrimaryInformation]

    for (const font of userFonts) {
      const secondaryFontInformation = await fontInspect(font.slug, configuration, properties)

      if (!secondaryFontInformation.consistentMetrics) {
        configuration.state.warnings.add(
          `Inconsistent font metrics for ${fontName(font, configuration)}.`,
        )
      }

      requiredFontInformation.push(secondaryFontInformation)

      font.fontFaces.set(
        style.id,
        fontFace(
          {
            adjustments: configuration.adjustFontMetrics
              ? fontAdjust(fontPrimaryInformation, secondaryFontInformation, locales)
              : undefined,
            font,
            primaryFont,
            properties,
          },
          configuration,
        ),
      )
    }

    for (const font of localFonts) {
      if (!font.configuration.consistentMetrics) {
        configuration.state.warnings.add(
          `Inconsistent font metrics for ${fontName(font, configuration)}.`,
        )
      }

      requiredFontInformation.push(font.configuration)

      font.fontFaces.set(
        style.id,
        fontFace(
          {
            adjustments: configuration.adjustFontMetrics
              ? fontAdjust(fontPrimaryInformation, font.configuration, locales)
              : undefined,
            font,
            primaryFont,
            properties,
          },
          configuration,
        ),
      )
    }

    style.propertiesMetrics = {
      [`--${style.stack}-ascent`]: round(
        fontPrimaryInformation.ascent / fontPrimaryInformation.unitsPerEm,
      ),
      [`--${style.stack}-cap-height`]: round(
        fontPrimaryInformation.capHeight / fontPrimaryInformation.unitsPerEm,
      ),
      [`--${style.stack}-descent`]: round(
        Math.abs(fontPrimaryInformation.descent / fontPrimaryInformation.unitsPerEm),
      ),
      [`--${style.stack}-line-gap`]: round(
        fontPrimaryInformation.lineGap / fontPrimaryInformation.unitsPerEm,
      ),
      [`--${style.stack}-x-height`]: round(
        Math.abs(fontPrimaryInformation.xHeight / fontPrimaryInformation.unitsPerEm),
      ),
      [`--${style.stack}-x-width-average`]: round(
        xWidthAverage(locales, ...requiredFontInformation),
      ),
    }
  }

  for (const slug of configuration.state.userFonts.keys()) {
    const userFont = configuration.state.userFonts.get(slug) as UserFontComplete
    userFont.fontFaces = fontFaceCompactMap(userFont, userFont.fontFaces)
  }

  for (const slug of configuration.state.localFonts.keys()) {
    const localFont = configuration.state.localFonts.get(slug)!
    localFont.fontFaces = fontFaceCompactMap(localFont, localFont.fontFaces)
  }

  for (const style of configuration.state.styles) {
    const propertiesUser = style.properties

    const userFontFamilies = selectorUserFontFamilies(style, configuration)
    const localFontFamilies = selectorLocalFontFamilies(style, configuration)
    const genericFontFamilies = selectorGenericFontFamilies(style)

    style.propertiesNoScript = pickBy(
      {
        [`--${style.stack}-font-family`]: fontFamilyJoin([
          ...userFontFamilies.map((value) => value.fontFamily),
          ...localFontFamilies,
          ...genericFontFamilies,
        ]),
      },
      (value) => value !== undefined,
    )

    style.propertiesLocal = pickBy(
      {
        [`--${style.stack}-font-family`]: fontFamilyJoin([
          ...localFontFamilies,
          ...genericFontFamilies,
        ]),
        [`--${style.stack}-font-stretch`]:
          propertiesUser?.fontStretch === undefined ? undefined : `${propertiesUser.fontStretch}%`,
        [`--${style.stack}-font-style`]: propertiesUser?.fontStyle,
        [`--${style.stack}-font-variation-settings`]: selectorFontVariationSettings(style),
        [`--${style.stack}-font-weight`]: propertiesUser?.fontWeight,
      },
      (value) => value !== undefined,
    )
  }

  for (const style of configuration.state.styles) {
    const propertiesMetrics = selectorPropertiesMetrics(style, configuration)

    if (propertiesMetrics.length !== 0) {
      style.ast.push(
        context({ order: '0' }, [
          styleRule(
            toLang(style.locale, configuration),
            applyStyleAtRules(style, propertiesMetrics),
          ),
        ]),
      )
    }

    const propertiesLocal = selectorPropertiesLocal(style, configuration)

    if (propertiesLocal.length !== 0) {
      style.ast.push(
        context({ order: '0' }, [
          styleRule(toLang(style.locale, configuration), applyStyleAtRules(style, propertiesLocal)),
        ]),
      )
    }

    const userFontFamilies = selectorUserFontFamilies(style, configuration)

    const combinations = map(
      createCombinations(userFontFamilies.map((value) => value.slug)),
      (value) => map(value, (value) => find(userFontFamilies, ({ slug }) => slug === value)!),
    )

    if (combinations.length !== 0) {
      const localFontFamilies = selectorLocalFontFamilies(style, configuration)
      const genericFontFamilies = selectorGenericFontFamilies(style)

      const rules = compact(
        combinations.map((fonts) => {
          const selector = `&${map(fonts, ({ slug }) => `[data-fonts-loaded~="${slug}"]`).join('')}`

          const fontFamily = fontFamilyJoin([
            ...fonts.map((value) => value.fontFamily),
            ...localFontFamilies,
            ...genericFontFamilies,
          ])

          if (fontFamily === undefined) {
            return
          }

          return styleRule(selector, [
            styleRule(
              toLang(style.locale, configuration),
              applyStyleAtRules(style, [decl(`--${style.stack}-font-family`, fontFamily)]),
            ),
          ])
        }),
      )

      if (rules.length !== 0) {
        style.ast.push(context({ order: '1' }, rules))
      }
    }

    const propertiesNoScript = selectorPropertiesNoScript(style, configuration)

    if (propertiesNoScript.length !== 0) {
      style.ast.push(
        context({ order: '2' }, [
          styleRule(toLang(style.locale, configuration), [
            atRule('@media', '(scripting: none)', applyStyleAtRules(style, propertiesNoScript)),
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
