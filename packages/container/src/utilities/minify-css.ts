import { type Targets, transform } from 'lightningcss'

// export const minifyCss = (value: string, targets: Targets) => {
//   const { code } = transform({
//     targets,
//     filename: 'style.css',
//     code: Buffer.from(value),
//     minify: true
//   })
//
//   return code.toString('utf8')
// }

// export const minifyCss = (
//   value: string,
//   targets: LightningCSSTargets,
//   pass = 0
// ): string => {
//   const { code } = transform({
//     targets,
//     filename: 'style.css',
//     code: Buffer.from(value),
//     minify: true
//   })
//
//   return pass === 0
//     ? minifyCss(code.toString('utf8'), targets, 1)
//     : code.toString('utf8')
// }

import CleanCSS from 'clean-css'
export const minifyCss = (value: string, targets: Targets) => {
  const { code } = transform({
    code: Buffer.from(
      new CleanCSS({
        level: {
          1: {
            all: true,
            cleanupCharsets: false, // controls `@charset` moving to the front of a stylesheet; defaults to `true`
            normalizeUrls: true, // controls URL normalization; defaults to `true`
            optimizeBackground: false, // controls `background` property optimizations; defaults to `true`
            optimizeBorderRadius: false, // controls `border-radius` property optimizations; defaults to `true`
            optimizeFilter: false, // controls `filter` property optimizations; defaults to `true`
            optimizeFont: false, // controls `font` property optimizations; defaults to `true`
            optimizeFontWeight: false, // controls `font-weight` property optimizations; defaults to `true`
            optimizeOutline: false, // controls `outline` property optimizations; defaults to `true`
            removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
            removeNegativePaddings: false, // controls removing negative paddings; defaults to `true`
            removeQuotes: true, // controls removing quotes when unnecessary; defaults to `true`
            removeWhitespace: true, // controls removing unused whitespace; defaults to `true`
            replaceMultipleZeros: true, // controls removing redundant zeros; defaults to `true`
            replaceTimeUnits: false, // controls replacing time units with shorter values; defaults to `true`
            replaceZeroUnits: false, // controls replacing zero values with units; defaults to `true`
            roundingPrecision: false, // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
            selectorsSortingMethod: 'standard', // denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two since 4.1.0); defaults to `'standard'`
            specialComments: undefined, // denotes a number of /*! ... */ comments preserved; defaults to `all`
            tidyAtRules: true, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
            tidyBlockScopes: true, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
            tidySelectors: true, // controls selectors optimizing; defaults to `true`,
          },
          2: {
            all: true,
            mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
            mergeIntoShorthands: false, // controls merging properties into shorthands; defaults to true
            mergeMedia: true, // controls `@media` merging; defaults to true
            mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
            mergeSemantically: true, // controls semantic merging; defaults to false
            overrideProperties: false, // controls property overriding based on understandability; defaults to true
            reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
            removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
            removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
            removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
            removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
            removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
            restructureRules: true, // controls rule restructuring; defaults to false
          },
        },
      }).minify(value).styles,
    ),
    filename: 'style.css',
    minify: true,
    targets,
  })

  return code.toString()
}
