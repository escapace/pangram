import { BigNumber } from 'bignumber.js'

export const round = (value: number, precision = 4): number =>
  Number.isFinite(precision) ? parseFloat(new BigNumber(value).toPrecision(precision)) : value
