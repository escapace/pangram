import { string } from 'css-tree'

export const fontFamilyQuote = (name: string): string => {
  const quotedMatch = /^["'](?<name>.*)["']$/.exec(name)

  let value = name

  if (typeof quotedMatch?.groups?.name === 'string') {
    value = quotedMatch?.groups?.name
  }

  if (/[^\p{L}\d_-]/u.test(value)) {
    return string.encode(value)
  }

  return name
}
