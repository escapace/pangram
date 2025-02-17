import type { Targets } from 'lightningcss'
import type {
  CSSProperties,
  FontInformation,
  InferFont,
  InferFontProperties,
} from './state/user-schema'

export interface FontFallback {
  font: FontInformation
  fontFaces: Map<string, FontFace>
}

export interface FontFaceAdjustments {
  ascentOverride?: string
  descentOverride?: string
  lineGapOverride?: string
  sizeAdjust?: string
}

export interface FontFace extends FontFaceAdjustments {
  fontFamily: string
  fontStretch: number | [number, number]
  fontStyle: 'italic' | 'normal'
  fontWeight: number | [number, number]
  src: string
  fontDisplay?: InferFont['display']
  // fontNamedInstance?: string
  unicodeRange?: InferFont['unicodeRange']
}

export const enum TypeFontState {
  Initial,
  Written,
}

export interface FontStateInitial {
  font: InferFont
  fontFaces: Map<string, FontFace>
  slug: string
  type: TypeFontState.Initial
}

export interface FontStateWritten extends Omit<FontStateInitial, 'type'> {
  files: string[]
  testString: string
  type: TypeFontState.Written
}

export type FontState = FontStateInitial | FontStateWritten

export interface Options {
  base?: string
  cwd?: string
  manifest?: string
  output?: string
}

export interface AtRule {
  type: '@media' | '@supports'
  value: string
}

export interface FontProperties extends Omit<InferFontProperties, 'fontFamily'> {
  fontFamily:
    | {
        fallbacks: string[]
        fallbacksGeneric: string[]
        fonts: string[]
      }
    | undefined
}

export interface Style {
  atRules: AtRule[]
  classname: string
  id: string
  locale: string
  properties: CSSProperties<{}>
  variables: Record<string, number | string>
  fallbackStyle?: string
  fallbackStyleProperties?: CSSProperties<{}>
  fontProperties?: string
  graph?: Map<string, string[]>
  noScriptStyle?: string
  noScriptStyleProperties?: CSSProperties<{}>
  parent?: string
  style?: string
}

export interface Configuration {
  fallbackFonts: Map<string, FontFallback>
  fontProperties: Map<string, Required<FontProperties>>
  fonts: Map<string, FontState>
  localeFromAlias: Map<string, string[]>
  locales: Record<string, Style[]>
  localeToAlias: Map<string, string[]>
  styles: Style[]
}

export interface State {
  configuration: Configuration
  configurationDirectory: string
  configurationFile: string
  jsonFile: string
  outputDir: string
  processDirectory: string
  publicPath: string
  runtimeDirectory: string
  runtimeFontInspectPath: string
  runtimeFontStripPath: string
  targets: {
    browserslist: string[]
    esbuild: string[]
    lightningcss: Targets
  }
}

export type StatePartial = Pick<Configuration, 'fallbackFonts' | 'fontProperties' | 'fonts'>

// eslint-disable-next-line typescript/no-explicit-any
export type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]
