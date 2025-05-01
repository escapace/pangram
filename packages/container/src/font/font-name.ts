import path from 'node:path'
import { FontType, type Configuration, type LocalFont, type UserFont } from '../types'
import { fontNames } from './font-names'

export const fontName = (font: LocalFont | UserFont, configuration: Configuration) =>
  font.type === FontType.Local
    ? fontNames(font.configuration, true)[0]
    : path.relative(configuration.configurationDirectory, font.configuration.source)
