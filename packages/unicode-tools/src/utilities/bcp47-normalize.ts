import { bcp47Normalize as _bcp47Normalize } from 'bcp-47-normalize'

export interface BCP47Options {
  forgiving?: boolean
  warning?: (reason: string, code: number, offset: number) => void
}

export function bcp47Normalize(tag: string, options?: BCP47Options): string | undefined {
  if (tag.startsWith('und-') || tag === 'und') {
    return undefined
  }

  return _bcp47Normalize(tag, options)
}
