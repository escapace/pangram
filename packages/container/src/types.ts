import type { Targets } from 'lightningcss'
import type {
  ConfigurationFont,
  ConfigurationFontProperties,
  Manifest,
  UserConfigurationFontInformation,
} from './state/user-schema'
import type { AstNode, AtRule } from './utilities/ast'

export interface FontFallback {
  font: UserConfigurationFontInformation
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
  fontDisplay?: ConfigurationFont['display']
  // fontNamedInstance?: string
  unicodeRange?: ConfigurationFont['unicodeRange']
}

export const enum TypeFontState {
  Initial,
  Written,
}

export interface FontStateInitial {
  font: ConfigurationFont
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

// export interface AtRule {
//   type: '@media' | '@supports'
//   value: string
// }

export interface FontProperties extends Omit<ConfigurationFontProperties, 'fontFamily'> {
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
  // classname: string
  id: string
  locale: string
  prefix: string
  // properties: CSSProperties
  ast: AstNode[]
  metrics: Record<string, number | string>
  fallbackStyleProperties?: Record<string, number | string>
  fontProperties?: string
  graph?: Map<string, string[]>
  parent?: string
  scriptingNoneStyleProperties?: Record<string, number | string>
}

export interface Configuration {
  fallbackFonts: Map<string, FontFallback>
  fontProperties: Map<string, Required<FontProperties>>
  fonts: Map<string, FontState>
  localeFromAlias: Map<string, string[]>
  locales: Record<string, Style[]>
  localeToAlias: Map<string, string[]>
  manifest: ((value: Manifest) => Promise<void>) | string
  outputDirectory: string
  publicPath: string
  selector: string
  styles: Style[]
}

export interface State {
  configuration: Configuration
  configurationDirectory: string
  configurationFile: string
  processDirectory: string
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
