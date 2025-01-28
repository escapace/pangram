export type {
  InputFont as Font,
  FontInformation,
  InputLocale as Locale,
  InputLocales as Locales,
  ResourceHint,
  WebFont,
  WebFontLocale,
  WebFontsJson,
} from './types'

import type { FontInformation } from './types'
import type { WebFont } from './types'

export type WebFontLoaderSubscribe = (callback: (webFonts: WebFont[]) => void) => () => void

export type WebFontLoader = (locale: string) => Promise<WebFont[]>

export declare const webFontLoaderSubscribe: WebFontLoaderSubscribe
export declare const webFontLoader: WebFontLoader

declare global {
  interface Window {
    webFontLoader: WebFontLoader
    webFontLoaderSubscribe: WebFontLoaderSubscribe
  }
}

const names = [
  'arial-black.json',
  'arial-bold-italic.json',
  'arial-bold.json',
  'arial-italic.json',
  'arial-nova-bold-italic.json',
  'arial-nova-bold.json',
  'arial-nova-italic.json',
  'arial-nova-light-italic.json',
  'arial-nova-light.json',
  'arial-nova-regular.json',
  'arial-regular.json',
  'arial-rounded-mt-bold.json',
  'bodoni-mt-std-black-italic.json',
  'bodoni-mt-std-black.json',
  'bodoni-mt-std-bold-cond-italic.json',
  'bodoni-mt-std-bold-cond.json',
  'bodoni-mt-std-bold-italic.json',
  'bodoni-mt-std-bold.json',
  'bodoni-mt-std-book-italic.json',
  'bodoni-mt-std-book.json',
  'bodoni-mt-std-italic.json',
  'bodoni-mt-std-regular.json',
  'bodoni-mt-std-ultra-bold-italic.json',
  'bodoni-mt-std-ultra-bold.json',
  'bradley-hand.json',
  'brush-script-mt.json',
  'calibri-bold-italic.json',
  'calibri-bold.json',
  'calibri-italic.json',
  'calibri-light-italic.json',
  'calibri-light.json',
  'calibri-regular.json',
  'cambria-bold-italic.json',
  'cambria-bold.json',
  'cambria-italic.json',
  'candara-bold-italic.json',
  'candara-bold.json',
  'candara-italic.json',
  'candara-light-italic.json',
  'candara-light.json',
  'candara-regular.json',
  'cascadia-code-bold-italic.json',
  'cascadia-code-bold.json',
  'cascadia-code-extra-light-italic.json',
  'cascadia-code-extra-light.json',
  'cascadia-code-italic.json',
  'cascadia-code-light-italic.json',
  'cascadia-code-light.json',
  'cascadia-code-regular.json',
  'cascadia-code-semi-bold-italic.json',
  'cascadia-code-semi-bold.json',
  'cascadia-code-semi-light-italic.json',
  'cascadia-code-semi-light.json',
  'cascadia-mono-bold-italic.json',
  'cascadia-mono-bold.json',
  'cascadia-mono-extra-light-italic.json',
  'cascadia-mono-extra-light.json',
  'cascadia-mono-italic.json',
  'cascadia-mono-light-italic.json',
  'cascadia-mono-light.json',
  'cascadia-mono-regular.json',
  'cascadia-mono-semi-bold-italic.json',
  'cascadia-mono-semi-bold.json',
  'cascadia-mono-semi-light-italic.json',
  'cascadia-mono-semi-light.json',
  'comic-sans-ms-bold-italic.json',
  'comic-sans-ms-bold.json',
  'comic-sans-ms-italic.json',
  'comic-sans-ms-regular.json',
  'consolas-bold-italic.json',
  'consolas-bold.json',
  'consolas-italic.json',
  'consolas-regular.json',
  'corbel-bold-italic.json',
  'corbel-bold.json',
  'corbel-italic.json',
  'corbel-light-italic.json',
  'corbel-light.json',
  'corbel-regular.json',
  'courier-new-bold-italic.json',
  'courier-new-bold.json',
  'courier-new-italic.json',
  'courier-new-regular.json',
  'deja-vu-sans-bold-oblique.json',
  'deja-vu-sans-bold.json',
  'deja-vu-sans-book.json',
  'deja-vu-sans-condensed-bold-oblique.json',
  'deja-vu-sans-condensed-bold.json',
  'deja-vu-sans-condensed-book.json',
  'deja-vu-sans-condensed-oblique.json',
  'deja-vu-sans-extra-light.json',
  'deja-vu-sans-mono-bold-oblique.json',
  'deja-vu-sans-mono-bold.json',
  'deja-vu-sans-mono-book.json',
  'deja-vu-sans-mono-oblique.json',
  'deja-vu-sans-oblique.json',
  'deja-vu-serif-bold-italic.json',
  'deja-vu-serif-bold.json',
  'deja-vu-serif-book.json',
  'deja-vu-serif-condensed-bold-italic.json',
  'deja-vu-serif-condensed-bold.json',
  'deja-vu-serif-condensed-book.json',
  'deja-vu-serif-condensed-italic.json',
  'deja-vu-serif-italic.json',
  'din-alternate.json',
  'droid-sans-mono.json',
  'franklin-gothic-medium-italic.json',
  'franklin-gothic-medium-regular.json',
  'geneva.json',
  'georgia-bold-italic.json',
  'georgia-bold.json',
  'georgia-italic.json',
  'georgia-pro-black-italic.json',
  'georgia-pro-black.json',
  'georgia-pro-bold-italic.json',
  'georgia-pro-bold.json',
  'georgia-pro-cond-black-italic.json',
  'georgia-pro-cond-black.json',
  'georgia-pro-cond-bold-italic.json',
  'georgia-pro-cond-bold.json',
  'georgia-pro-cond-italic.json',
  'georgia-pro-cond-light-italic.json',
  'georgia-pro-cond-light.json',
  'georgia-pro-cond-regular.json',
  'georgia-pro-cond-semibold-italic.json',
  'georgia-pro-cond-semibold.json',
  'georgia-pro-italic.json',
  'georgia-pro-light-italic.json',
  'georgia-pro-light.json',
  'georgia-pro-regular.json',
  'georgia-pro-semibold-italic.json',
  'georgia-pro-semibold.json',
  'georgia-regular.json',
  'gill-sans-nova-bold-italic.json',
  'gill-sans-nova-bold.json',
  'gill-sans-nova-cond-bold-italic.json',
  'gill-sans-nova-cond-bold.json',
  'gill-sans-nova-cond-italic.json',
  'gill-sans-nova-cond-lt-italic.json',
  'gill-sans-nova-cond-lt.json',
  'gill-sans-nova-cond-regular.json',
  'gill-sans-nova-cond-ultra-bold.json',
  'gill-sans-nova-cond-x-bd-italic.json',
  'gill-sans-nova-cond-x-bd.json',
  'gill-sans-nova-italic.json',
  'gill-sans-nova-light-italic.json',
  'gill-sans-nova-light.json',
  'gill-sans-nova-regular.json',
  'gill-sans-nova-ultra-bold.json',
  'impact.json',
  'monaco.json',
  'san-francisco-display-black.json',
  'san-francisco-display-bold.json',
  'san-francisco-display-heavy.json',
  'san-francisco-display-light.json',
  'san-francisco-display-medium.json',
  'san-francisco-display-regular.json',
  'san-francisco-display-semibold.json',
  'san-francisco-display-thin.json',
  'san-francisco-display-ultralight.json',
  'san-francisco-text-bold-italic.json',
  'san-francisco-text-bold.json',
  'san-francisco-text-heavy-italic.json',
  'san-francisco-text-heavy.json',
  'san-francisco-text-italic.json',
  'san-francisco-text-light-italic.json',
  'san-francisco-text-light.json',
  'san-francisco-text-medium-italic.json',
  'san-francisco-text-medium.json',
  'san-francisco-text-regular.json',
  'san-francisco-text-semibold-italic.json',
  'san-francisco-text-semibold.json',
  'segoe-print-bold.json',
  'segoe-print-regular.json',
  'segoe-ui-black-italic.json',
  'segoe-ui-black.json',
  'segoe-ui-bold-italic.json',
  'segoe-ui-bold.json',
  'segoe-ui-italic.json',
  'segoe-ui-light-italic.json',
  'segoe-ui-light.json',
  'segoe-ui-regular.json',
  'segoe-ui-semibold-italic.json',
  'segoe-ui-semibold.json',
  'segoe-ui-semilight-italic.json',
  'segoe-ui-semilight.json',
  'sf-mono-bold-italic.json',
  'sf-mono-bold.json',
  'sf-mono-heavy-italic.json',
  'sf-mono-heavy.json',
  'sf-mono-italic.json',
  'sf-mono-light-italic.json',
  'sf-mono-light.json',
  'sf-mono-medium-italic.json',
  'sf-mono-medium.json',
  'sf-mono-regular.json',
  'sf-mono-semibold-italic.json',
  'sf-mono-semibold.json',
  'sf-pro-display-black-italic.json',
  'sf-pro-display-black.json',
  'sf-pro-display-bold-italic.json',
  'sf-pro-display-bold.json',
  'sf-pro-display-heavy-italic.json',
  'sf-pro-display-heavy.json',
  'sf-pro-display-italic.json',
  'sf-pro-display-light-italic.json',
  'sf-pro-display-light.json',
  'sf-pro-display-medium-italic.json',
  'sf-pro-display-medium.json',
  'sf-pro-display-regular.json',
  'sf-pro-display-semibold-italic.json',
  'sf-pro-display-semibold.json',
  'sf-pro-display-thin-italic.json',
  'sf-pro-display-thin.json',
  'sf-pro-display-ultralight-italic.json',
  'sf-pro-display-ultralight.json',
  'sf-pro-rounded-black.json',
  'sf-pro-rounded-bold.json',
  'sf-pro-rounded-heavy.json',
  'sf-pro-rounded-light.json',
  'sf-pro-rounded-medium.json',
  'sf-pro-rounded-regular.json',
  'sf-pro-rounded-semibold.json',
  'sf-pro-rounded-thin.json',
  'sf-pro-rounded-ultralight.json',
  'sf-pro-text-black-italic.json',
  'sf-pro-text-black.json',
  'sf-pro-text-bold-italic.json',
  'sf-pro-text-bold.json',
  'sf-pro-text-heavy-italic.json',
  'sf-pro-text-heavy.json',
  'sf-pro-text-italic.json',
  'sf-pro-text-light-italic.json',
  'sf-pro-text-light.json',
  'sf-pro-text-medium-italic.json',
  'sf-pro-text-medium.json',
  'sf-pro-text-regular.json',
  'sf-pro-text-semibold-italic.json',
  'sf-pro-text-semibold.json',
  'sf-pro-text-thin-italic.json',
  'sf-pro-text-thin.json',
  'sf-pro-text-ultralight-italic.json',
  'sf-pro-text-ultralight.json',
  'sylfaen.json',
  'tahoma-bold.json',
  'tahoma-regular.json',
  'times-new-roman-bold-italic.json',
  'times-new-roman-bold.json',
  'times-new-roman-italic.json',
  'times-new-roman-regular.json',
  'trebuchet-ms-bold-italic.json',
  'trebuchet-ms-bold.json',
  'trebuchet-ms-italic.json',
  'trebuchet-ms-regular.json',
  'verdana-bold-italic.json',
  'verdana-bold.json',
  'verdana-italic.json',
  'verdana-regular.json',
] as const

export const fallback = async (
  ...values: Array<
    (typeof names extends ReadonlyArray<infer U> ? U : never) extends `${infer Prefix}.json`
      ? Prefix
      : never
  >
) => {
  const result: FontInformation[] = []

  for (const name of values) {
    const file = `${name}.json`
    if (names.includes(file as typeof names extends ReadonlyArray<infer U> ? U : never)) {
      result.push(
        (await import(`./fonts/${file}`, {
          with: { type: 'json' },
        })) as FontInformation,
      )
    }
  }

  return result
}
