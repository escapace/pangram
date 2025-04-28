import type { Targets } from 'lightningcss'
import type {
  ConfigurationFont,
  ConfigurationFontProperties,
  UserConfiguration,
  UserConfigurationFontInformation,
} from './configuration/user-schema'
import type { AstNode, AtRule } from './utilities/ast'

export interface FontFallback {
  configuration: UserConfigurationFontInformation
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
  unicodeRange?: ConfigurationFont['unicodeRange']
  // fontNamedInstance?: string
}

export const enum TypeFontState {
  Initial,
  Written,
}

export interface FontStateInitial {
  configuration: ConfigurationFont
  fontFaces: Map<string, FontFace>
  slug: string
  type: TypeFontState.Initial
}

export interface FontStateWritten extends Omit<FontStateInitial, 'type'> {
  codePoints: number[]
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
  ast: AstNode[]
  atRules: AtRule[]
  id: string
  locale: string
  metrics: Record<string, number | string>
  prefix: string
  fallbackStyleProperties?: Record<string, number | string>
  fontProperties?: string
  graph?: Map<string, string[]>
  parent?: string
  scriptingNoneStyleProperties?: Record<string, number | string>
}

export interface State {
  fallbackFonts: Map<string, FontFallback>
  fontProperties: Map<string, Required<FontProperties>>
  fonts: Map<string, FontState>
  localeFromAlias: Map<string, string[]>
  locales: Record<string, Style[]>
  localeToAlias: Map<string, string[]>
  styles: Style[]
  warnings: Set<string>
}

export interface Configuration
  extends Partial<Pick<UserConfiguration, 'lightningcss'>>,
    Required<
      Pick<
        UserConfiguration,
        'adjustFontMetrics' | 'manifest' | 'outputDirectory' | 'publicPath' | 'selector'
      >
    > {
  configurationDirectory: string
  configurationFile: string
  processDirectory: string
  runtimeDirectory: string
  runtimeFontInspectPath: string
  runtimeFontStripPath: string
  state: State
  targets: {
    browserslist: string[]
    esbuild: string[]
    lightningcss: Targets
  }
  lightningcss?: UserConfiguration['lightningcss']
}

export type StatePartial = Pick<State, 'fallbackFonts' | 'fontProperties' | 'fonts'>

// eslint-disable-next-line typescript/no-explicit-any
export type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]
