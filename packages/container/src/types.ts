import type { Targets } from 'lightningcss'
import type {
  ConfigurationFont,
  ConfigurationFontProperties as ConfigurationProperties,
  UserConfiguration,
  UserConfigurationFontInformation,
} from './configuration/user-schema'
import type { AstNode, AtRule } from './utilities/ast'

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

export const enum FontType {
  UserPending,
  UserComplete,
  Local,
}

export interface UserFontPending {
  configuration: ConfigurationFont
  fontFaces: Map<string, FontFace>
  slug: string
  type: FontType.UserPending
}

export interface UserFontComplete extends Omit<UserFontPending, 'type'> {
  codePoints: number[]
  files: string[]
  testString: string
  type: FontType.UserComplete
}

export type UserFont = UserFontComplete | UserFontPending

export interface LocalFont {
  configuration: UserConfigurationFontInformation
  fontFaces: Map<string, FontFace>
  type: FontType.Local
}

export interface Properties extends Omit<ConfigurationProperties, 'fontFamily'> {
  fontFamily:
    | {
        generic: string[]
        local: string[]
        user: string[]
      }
    | undefined
}

export interface Style {
  ast: AstNode[]
  atRules: AtRule[]
  id: string
  locale: string
  stack: string
  graph?: Map<string, string[]>
  parent?: string
  properties?: Required<Properties>

  propertiesLocal?: Record<string, number | string>
  propertiesMetrics?: Record<string, number | string>
  propertiesNoScript?: Record<string, number | string>
}

export interface State {
  localFonts: Map<string, LocalFont>
  userFonts: Map<string, UserFont>

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
    browsers: string[]
    esbuild: string[]
    lightningcss: Targets
  }
  lightningcss?: UserConfiguration['lightningcss']
}

export type StatePartial = { properties: Map<string, Required<Properties>> } & Pick<
  State,
  'localFonts' | 'userFonts'
>

// eslint-disable-next-line typescript/no-explicit-any
export type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]
