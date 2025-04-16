/* eslint-disable typescript/no-non-null-assertion */

import FontFaceObserver from 'fontfaceobserver'

export type FontState =
  | 'error'
  | 'font-already-loaded'
  | 'font-loaded'
  | 'font-not-supported'
  | 'font-unknown'

export interface ResourceHint {
  as: 'font'
  crossorigin: 'anonymous'
  href: string
  rel: 'prefetch' | 'preload'
  type: string
}

export interface Font {
  slug: string
  fontFaces?: Array<{
    fontFamily: string
    fontStretch?: number | [number, number]
    fontStyle?: 'italic'
    fontWeight?: number | [number, number]
  }>
  prefer?: string[]
  resourceHints?: ResourceHint[]
  state?: FontState
  tech?: string[]
  testString?: string
}

interface FontWithState extends Omit<Font, 'state'> {
  state?: Promise<FontState>
}

declare const __DATA_LOCALES__: Array<readonly [string, string | string[]]>
declare const __DATA_FONTS__: FontWithState[]

type Callback = (fonts: Font[]) => unknown

declare global {
  interface Window {
    FontFaceObserver: typeof FontFaceObserver
    fontLoader: (locale: string) => Promise<Font[]>
    fontLoaderSubscribe: (callback: Callback) => () => void
  }
}

const LOCALE_INDEX = new Map(__DATA_LOCALES__)
const FONTS = new Map(__DATA_FONTS__.map((value) => [value.slug, value] as const))
const SUBSCRIBERS = new Set<Callback>()

const fontStretchMapping = new Map([
  [100, 'normal'],
  [112.5, 'semi-expanded'],
  [125, 'expanded'],
  [150, 'extra-expanded'],
  [200, 'ultra-expanded'],
  [50, 'ultra-condensed'],
  [62.5, 'extra-condensed'],
  [75, 'condensed'],
  [87.5, 'semi-condensed'],
])

const fontStretchMappingKeys = Array.from(fontStretchMapping.keys())

const closest = (array: number[], value: number): number =>
  array.reduce(function (previous, current) {
    return Math.abs(current - value) < Math.abs(previous - value) ? current : previous
  })

const getDataFontsLoaded = () =>
  (document.documentElement.getAttribute('data-fonts-loaded')?.split(' ') ?? [])
    .filter((value) => FONTS.has(value))
    .sort()

const updateDataFontsLoaded = (value: string) => {
  const dataFontsLoaded = getDataFontsLoaded()

  if (!dataFontsLoaded.includes(value)) {
    document.documentElement.setAttribute(
      'data-fonts-loaded',
      [...dataFontsLoaded, value]
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
        .join(' '),
    )
  }
}

const createPromise = async (slug: string): Promise<FontState> => {
  const font = FONTS.get(slug)

  if (font?.fontFaces === undefined) {
    return 'font-unknown'
  }

  if (font.state !== undefined) {
    return await font.state
  }

  font.state = (async (): Promise<FontState> => {
    if (getDataFontsLoaded().includes(slug)) {
      updateDataFontsLoaded(slug)

      return 'font-already-loaded'
    } else if (
      font.tech?.includes('variations') === true &&
      !CSS.supports('(font-variation-settings: normal)')
    ) {
      return 'font-not-supported'
    } else {
      try {
        await Promise.any(
          font.fontFaces!.map(async (fontFace) => {
            const weight =
              fontFace.fontWeight === undefined
                ? undefined
                : (Array.isArray(fontFace.fontWeight)
                    ? fontFace.fontWeight[0]
                    : fontFace.fontWeight
                  ).toString()

            const stretch =
              fontFace.fontStretch === undefined
                ? undefined
                : fontStretchMapping.get(
                    closest(
                      fontStretchMappingKeys,
                      Array.isArray(fontFace.fontStretch)
                        ? (fontFace.fontStretch[0] + fontFace.fontStretch[1]) / 2
                        : fontFace.fontStretch,
                    ),
                  )

            const style = fontFace.fontStyle ?? undefined

            await new FontFaceObserver(fontFace.fontFamily, {
              stretch,
              style,
              weight,
            }).load(
              typeof font.testString === 'string' ? font.testString : null,
              // TODO: custom timeout
              10_000,
            )
          }),
        )

        updateDataFontsLoaded(slug)
        return 'font-loaded'
      } catch {
        return 'error'
      }
    }
  })()

  return await font.state
}

const iterateFonts = async (): Promise<FontWithState[]> =>
  (
    await Promise.all(
      Array.from(FONTS.values()).map(async (font) => {
        if (font.state !== undefined) {
          const state = await font.state

          return state === 'font-loaded' || state === 'font-already-loaded' ? font : undefined
        }

        return
      }),
    )
  ).filter((value): value is FontWithState => value !== undefined)

const normalize = async (fonts: FontWithState[]): Promise<Font[]> =>
  await Promise.all(
    fonts.map(async (value): Promise<Font> => {
      const state = await value.state

      return { ...value, state }
    }),
  )

const updateSubscribers = async () => {
  const fonts = await normalize(await iterateFonts())

  if (fonts.length > 0) {
    SUBSCRIBERS.forEach((callback) => callback(fonts))
  }

  return fonts
}

export const fontLoaderSubscribe = (callback: Callback): (() => void) => {
  if (!SUBSCRIBERS.has(callback)) {
    SUBSCRIBERS.add(callback)

    void iterateFonts().then(async (fonts) => {
      if (fonts.length !== 0) {
        callback(await normalize(fonts))
      }
    })
  }

  return () => {
    SUBSCRIBERS.delete(callback)
  }
}

const next = async (slug: string): Promise<FontState> => {
  const font = FONTS.get(slug)!

  for (const preference of font.prefer ?? []) {
    const state = await next(preference)

    if (state === 'font-loaded' || state === 'font-already-loaded') {
      return state
    }
  }

  return await createPromise(slug)
}

export const fontLoader = async (locale: string): Promise<Font[]> => {
  if (locale === undefined || !LOCALE_INDEX.has(locale)) {
    throw new Error('Font Loader: No locale')
  }

  const value = LOCALE_INDEX.get(locale)!

  const slugs = typeof value === 'string' ? (LOCALE_INDEX.get(value)! as string[]) : value

  await Promise.all(slugs.map(async (slug) => await next(slug)))

  return await updateSubscribers()
}

window.FontFaceObserver = FontFaceObserver
window.fontLoader = fontLoader
window.fontLoaderSubscribe = fontLoaderSubscribe
