import { sum } from './sum'

describe('sum', () => {
  it('整数同士の加算の結果が正しいこと', () => {
    expect(sum(1, 2)).toBe(3)
  })

  it('浮動小数点演算で丸め誤差が発生しないこと', () => {
    expect(sum(0.1, 0.2)).toBe(0.3)
  })
})
