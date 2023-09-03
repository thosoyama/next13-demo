import BigNumber from 'bignumber.js'

/**
 * 加算
 */
export function sum(a: number, b: number) {
  return new BigNumber(a).plus(b).toNumber()
}
