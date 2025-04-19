import { BigNumber } from 'bignumber.js'
import assert from 'node:assert'

export const round = (value: number, precision = 10): string => {
  assert(Number.isFinite(precision))
  assert(!Number.isNaN(precision))

  assert(Number.isFinite(value))
  assert(!Number.isNaN(value))

  return new BigNumber(value).toPrecision(precision).toString()
}
