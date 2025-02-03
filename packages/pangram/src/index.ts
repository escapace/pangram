export type {
  InputFont as Font,
  FontInformation,
  InputLocale as Locale,
  InputLocales as Locales,
  WebFontLocale,
  WebFontsJson,
} from './types'
import type { FontInformation } from './types'

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
  'arial-nova.json',
  'arial-rounded-mt-bold.json',
  'arial.json',
  'avenir-black-oblique.json',
  'avenir-black.json',
  'avenir-book-oblique.json',
  'avenir-book.json',
  'avenir-heavy-oblique.json',
  'avenir-heavy.json',
  'avenir-light-oblique.json',
  'avenir-light.json',
  'avenir-medium-oblique.json',
  'avenir-medium.json',
  'avenir-oblique.json',
  'avenir.json',
  'bahnschrift-bold-condensed.json',
  'bahnschrift-bold-semi-condensed.json',
  'bahnschrift-bold.json',
  'bahnschrift-condensed.json',
  'bahnschrift-light-condensed.json',
  'bahnschrift-light-semi-condensed.json',
  'bahnschrift-light.json',
  'bahnschrift-regular.json',
  'bahnschrift-semi-bold-condensed.json',
  'bahnschrift-semi-bold-semi-condensed.json',
  'bahnschrift-semi-bold.json',
  'bahnschrift-semi-condensed.json',
  'bahnschrift-semi-light-condensed.json',
  'bahnschrift-semi-light-semi-condensed.json',
  'bahnschrift-semi-light.json',
  'bodoni-mt-std-black-italic.json',
  'bodoni-mt-std-black.json',
  'bodoni-mt-std-bold-cond-italic.json',
  'bodoni-mt-std-bold-cond.json',
  'bodoni-mt-std-bold-italic.json',
  'bodoni-mt-std-bold.json',
  'bodoni-mt-std-book-italic.json',
  'bodoni-mt-std-book.json',
  'bodoni-mt-std-italic.json',
  'bodoni-mt-std-ultra-bold-italic.json',
  'bodoni-mt-std-ultra-bold.json',
  'bodoni-mt-std.json',
  'bradley-hand-bold.json',
  'brush-script-mt-italic.json',
  'calibri-bold-italic.json',
  'calibri-bold.json',
  'calibri-italic.json',
  'calibri-light-italic.json',
  'calibri-light.json',
  'calibri.json',
  'cambria-bold-italic.json',
  'cambria-bold.json',
  'cambria-italic.json',
  'cambria.json',
  'candara-bold-italic.json',
  'candara-bold.json',
  'candara-italic.json',
  'candara-light-italic.json',
  'candara-light.json',
  'candara.json',
  'cascadia-code-bold-italic.json',
  'cascadia-code-bold.json',
  'cascadia-code-extra-light-italic.json',
  'cascadia-code-extra-light.json',
  'cascadia-code-italic.json',
  'cascadia-code-light-italic.json',
  'cascadia-code-light.json',
  'cascadia-code-semi-bold-italic.json',
  'cascadia-code-semi-bold.json',
  'cascadia-code-semi-light-italic.json',
  'cascadia-code-semi-light.json',
  'cascadia-code.json',
  'cascadia-mono-bold-italic.json',
  'cascadia-mono-bold.json',
  'cascadia-mono-extra-light-italic.json',
  'cascadia-mono-extra-light.json',
  'cascadia-mono-italic.json',
  'cascadia-mono-light-italic.json',
  'cascadia-mono-light.json',
  'cascadia-mono-semi-bold-italic.json',
  'cascadia-mono-semi-bold.json',
  'cascadia-mono-semi-light-italic.json',
  'cascadia-mono-semi-light.json',
  'cascadia-mono.json',
  'charter-black-italic.json',
  'charter-black.json',
  'charter-bold-italic.json',
  'charter-bold.json',
  'charter-italic.json',
  'charter-roman.json',
  'comic-sans-ms-bold-italic.json',
  'comic-sans-ms-bold.json',
  'comic-sans-ms-italic.json',
  'comic-sans-ms.json',
  'consolas-bold-italic.json',
  'consolas-bold.json',
  'consolas-italic.json',
  'consolas.json',
  'corbel-bold-italic.json',
  'corbel-bold.json',
  'corbel-italic.json',
  'corbel-light-italic.json',
  'corbel-light.json',
  'corbel.json',
  'courier-new-bold-italic.json',
  'courier-new-bold.json',
  'courier-new-italic.json',
  'courier-new.json',
  'deja-vu-sans-bold-oblique.json',
  'deja-vu-sans-bold.json',
  'deja-vu-sans-book.json',
  'deja-vu-sans-condensed-bold-oblique.json',
  'deja-vu-sans-condensed-bold.json',
  'deja-vu-sans-condensed-book.json',
  'deja-vu-sans-condensed-oblique.json',
  'deja-vu-sans-light-extra-light.json',
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
  'didot-bold.json',
  'didot-italic.json',
  'didot.json',
  'din-alternate-bold.json',
  'droid-sans-mono.json',
  'franklin-gothic-medium-italic.json',
  'franklin-gothic-medium.json',
  'futura-bold.json',
  'futura-condensed-extra-bold.json',
  'futura-condensed-medium.json',
  'futura-medium-italic.json',
  'futura-medium.json',
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
  'georgia-pro-cond-semibold-italic.json',
  'georgia-pro-cond-semibold.json',
  'georgia-pro-cond.json',
  'georgia-pro-italic.json',
  'georgia-pro-light-italic.json',
  'georgia-pro-light.json',
  'georgia-pro-semibold-italic.json',
  'georgia-pro-semibold.json',
  'georgia-pro.json',
  'georgia.json',
  'gill-sans-nova-bold-italic.json',
  'gill-sans-nova-bold.json',
  'gill-sans-nova-cond-bold-italic.json',
  'gill-sans-nova-cond-bold.json',
  'gill-sans-nova-cond-italic.json',
  'gill-sans-nova-cond-lt-italic.json',
  'gill-sans-nova-cond-lt.json',
  'gill-sans-nova-cond-ultra-bold.json',
  'gill-sans-nova-cond-x-bd-italic.json',
  'gill-sans-nova-cond-x-bd.json',
  'gill-sans-nova-cond.json',
  'gill-sans-nova-italic.json',
  'gill-sans-nova-light-italic.json',
  'gill-sans-nova-light.json',
  'gill-sans-nova-ultra-bold.json',
  'gill-sans-nova.json',
  'helvetica-bold-oblique.json',
  'helvetica-bold.json',
  'helvetica-light-oblique.json',
  'helvetica-light.json',
  'helvetica-neue-bold-italic.json',
  'helvetica-neue-bold.json',
  'helvetica-neue-condensed-black.json',
  'helvetica-neue-condensed-bold.json',
  'helvetica-neue-italic.json',
  'helvetica-neue-light-italic.json',
  'helvetica-neue-light.json',
  'helvetica-neue-medium-italic.json',
  'helvetica-neue-medium.json',
  'helvetica-neue-thin-italic.json',
  'helvetica-neue-thin.json',
  'helvetica-neue-ultra-light-italic.json',
  'helvetica-neue-ultra-light.json',
  'helvetica-neue.json',
  'helvetica-oblique.json',
  'helvetica.json',
  'hiragino-maru-gothic-pro-n-w-4.json',
  'hiragino-maru-gothic-pro-w-4.json',
  'impact.json',
  'lucida-grande-bold.json',
  'lucida-grande-ui-bold.json',
  'lucida-grande-ui.json',
  'lucida-grande.json',
  'menlo-bold-italic.json',
  'menlo-bold.json',
  'menlo-italic.json',
  'menlo.json',
  'monaco.json',
  'optima-bold-italic.json',
  'optima-bold.json',
  'optima-extra-black.json',
  'optima-italic.json',
  'optima.json',
  'palatino-bold-italic.json',
  'palatino-bold.json',
  'palatino-italic.json',
  'palatino.json',
  'rockwell-bold-italic.json',
  'rockwell-bold.json',
  'rockwell-italic.json',
  'rockwell.json',
  'san-francisco-display-black.json',
  'san-francisco-display-bold.json',
  'san-francisco-display-heavy.json',
  'san-francisco-display-light.json',
  'san-francisco-display-medium.json',
  'san-francisco-display-semibold.json',
  'san-francisco-display-thin.json',
  'san-francisco-display-ultralight.json',
  'san-francisco-display.json',
  'san-francisco-text-bold-italic.json',
  'san-francisco-text-bold.json',
  'san-francisco-text-heavy-italic.json',
  'san-francisco-text-heavy.json',
  'san-francisco-text-italic.json',
  'san-francisco-text-light-italic.json',
  'san-francisco-text-light.json',
  'san-francisco-text-medium-italic.json',
  'san-francisco-text-medium.json',
  'san-francisco-text-semibold-italic.json',
  'san-francisco-text-semibold.json',
  'san-francisco-text.json',
  'segoe-print-bold.json',
  'segoe-print.json',
  'segoe-ui-black-italic.json',
  'segoe-ui-black.json',
  'segoe-ui-bold-italic.json',
  'segoe-ui-bold.json',
  'segoe-ui-italic.json',
  'segoe-ui-light-italic.json',
  'segoe-ui-light.json',
  'segoe-ui-semibold-italic.json',
  'segoe-ui-semibold.json',
  'segoe-ui-semilight-italic.json',
  'segoe-ui-semilight.json',
  'segoe-ui.json',
  'sf-mono-bold-italic.json',
  'sf-mono-bold.json',
  'sf-mono-heavy-italic.json',
  'sf-mono-heavy.json',
  'sf-mono-light-italic.json',
  'sf-mono-light.json',
  'sf-mono-medium-italic.json',
  'sf-mono-medium.json',
  'sf-mono-regular-italic.json',
  'sf-mono-semibold-italic.json',
  'sf-mono-semibold.json',
  'sf-mono.json',
  'sf-pro-black-italic.json',
  'sf-pro-black.json',
  'sf-pro-bold-italic.json',
  'sf-pro-bold.json',
  'sf-pro-compressed-black.json',
  'sf-pro-compressed-bold.json',
  'sf-pro-compressed-heavy.json',
  'sf-pro-compressed-light.json',
  'sf-pro-compressed-medium.json',
  'sf-pro-compressed-regular.json',
  'sf-pro-compressed-semibold.json',
  'sf-pro-compressed-thin.json',
  'sf-pro-compressed-ultralight.json',
  'sf-pro-condensed-black.json',
  'sf-pro-condensed-bold.json',
  'sf-pro-condensed-heavy.json',
  'sf-pro-condensed-light.json',
  'sf-pro-condensed-medium.json',
  'sf-pro-condensed-regular.json',
  'sf-pro-condensed-semibold.json',
  'sf-pro-condensed-thin.json',
  'sf-pro-condensed-ultralight.json',
  'sf-pro-display-black-italic.json',
  'sf-pro-display-black.json',
  'sf-pro-display-bold-italic.json',
  'sf-pro-display-bold.json',
  'sf-pro-display-heavy-italic.json',
  'sf-pro-display-heavy.json',
  'sf-pro-display-light-italic.json',
  'sf-pro-display-light.json',
  'sf-pro-display-medium-italic.json',
  'sf-pro-display-medium.json',
  'sf-pro-display-regular-italic.json',
  'sf-pro-display-semibold-italic.json',
  'sf-pro-display-semibold.json',
  'sf-pro-display-thin-italic.json',
  'sf-pro-display-thin.json',
  'sf-pro-display-ultralight-italic.json',
  'sf-pro-display-ultralight.json',
  'sf-pro-display.json',
  'sf-pro-expanded-black.json',
  'sf-pro-expanded-bold.json',
  'sf-pro-expanded-heavy.json',
  'sf-pro-expanded-light.json',
  'sf-pro-expanded-medium.json',
  'sf-pro-expanded-regular.json',
  'sf-pro-expanded-semibold.json',
  'sf-pro-expanded-thin.json',
  'sf-pro-expanded-ultralight.json',
  'sf-pro-heavy-italic.json',
  'sf-pro-heavy.json',
  'sf-pro-light-italic.json',
  'sf-pro-light.json',
  'sf-pro-medium-italic.json',
  'sf-pro-medium.json',
  'sf-pro-regular-italic.json',
  'sf-pro-regular.json',
  'sf-pro-rounded-black.json',
  'sf-pro-rounded-bold.json',
  'sf-pro-rounded-heavy.json',
  'sf-pro-rounded-light.json',
  'sf-pro-rounded-medium.json',
  'sf-pro-rounded-semibold.json',
  'sf-pro-rounded-thin.json',
  'sf-pro-rounded-ultralight.json',
  'sf-pro-rounded.json',
  'sf-pro-semibold-italic.json',
  'sf-pro-semibold.json',
  'sf-pro-text-black-italic.json',
  'sf-pro-text-black.json',
  'sf-pro-text-bold-italic.json',
  'sf-pro-text-bold.json',
  'sf-pro-text-heavy-italic.json',
  'sf-pro-text-heavy.json',
  'sf-pro-text-light-italic.json',
  'sf-pro-text-light.json',
  'sf-pro-text-medium-italic.json',
  'sf-pro-text-medium.json',
  'sf-pro-text-regular-italic.json',
  'sf-pro-text-semibold-italic.json',
  'sf-pro-text-semibold.json',
  'sf-pro-text-thin-italic.json',
  'sf-pro-text-thin.json',
  'sf-pro-text-ultralight-italic.json',
  'sf-pro-text-ultralight.json',
  'sf-pro-text.json',
  'sf-pro-thin-italic.json',
  'sf-pro-thin.json',
  'sf-pro-ultralight-italic.json',
  'sf-pro-ultralight.json',
  'sitka-banner-bold-italic.json',
  'sitka-banner-bold.json',
  'sitka-banner-italic.json',
  'sitka-banner-semibold-italic.json',
  'sitka-banner-semibold.json',
  'sitka-banner.json',
  'sitka-display-bold-italic.json',
  'sitka-display-bold.json',
  'sitka-display-italic.json',
  'sitka-display-semibold-italic.json',
  'sitka-display-semibold.json',
  'sitka-display.json',
  'sitka-heading-bold-italic.json',
  'sitka-heading-bold.json',
  'sitka-heading-italic.json',
  'sitka-heading-semibold-italic.json',
  'sitka-heading-semibold.json',
  'sitka-heading.json',
  'sitka-small-bold-italic.json',
  'sitka-small-bold.json',
  'sitka-small-italic.json',
  'sitka-small-semibold-italic.json',
  'sitka-small-semibold.json',
  'sitka-small.json',
  'sitka-subheading-bold-italic.json',
  'sitka-subheading-bold.json',
  'sitka-subheading-italic.json',
  'sitka-subheading-semibold-italic.json',
  'sitka-subheading-semibold.json',
  'sitka-subheading.json',
  'sitka-text-bold-italic.json',
  'sitka-text-bold.json',
  'sitka-text-italic.json',
  'sitka-text-semibold-italic.json',
  'sitka-text-semibold.json',
  'sitka-text.json',
  'sylfaen.json',
  'tahoma-bold.json',
  'tahoma.json',
  'times-new-roman-bold-italic.json',
  'times-new-roman-bold.json',
  'times-new-roman-italic.json',
  'times-new-roman.json',
  'trebuchet-ms-bold-italic.json',
  'trebuchet-ms-bold.json',
  'trebuchet-ms-italic.json',
  'trebuchet-ms.json',
  'verdana-bold-italic.json',
  'verdana-bold.json',
  'verdana-italic.json',
  'verdana.json',
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
      // eslint-disable-next-line typescript/no-unsafe-assignment
      const _module = await import(`./fonts/${file}`, {
        with: { type: 'json' },
      })

      // eslint-disable-next-line typescript/no-unsafe-member-access
      result.push((_module?.default ?? _module) as FontInformation)
    }
  }

  return result
}
