import { fontFamilyQuote } from './font-family-quote'

export const fontFamilyJoin = (value: string[] = []): string | undefined =>
  value.length === 0 ? undefined : value.map((value) => fontFamilyQuote(value)).join(', ')
