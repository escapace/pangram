import fnv1a from '@sindresorhus/fnv1a'
import Hashids from 'hashids'
import stringify from 'safe-stable-stringify'
import { HASHS_LENGHT, HASH_ALPHABET } from '../constants'

export const createHash = (value: boolean | number | object | string | unknown[] | null) =>
  new Hashids('', HASHS_LENGHT, HASH_ALPHABET).encodeHex(fnv1a(stringify(value), { size: 32 }))
