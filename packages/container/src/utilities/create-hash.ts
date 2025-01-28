import fnv1a from '@sindresorhus/fnv1a'
import Hashids from 'hashids'
import { configure } from 'safe-stable-stringify'

const HASHS_LENGHT = 7
const HASH_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const stringify = configure({
  bigint: false,
  circularValue: Error,
  deterministic: true,
  strict: true,
})

export const createHash = (value: boolean | number | object | string | unknown[] | null): string =>
  new Hashids('', HASHS_LENGHT, HASH_ALPHABET).encodeHex(fnv1a(stringify(value), { size: 32 }))
