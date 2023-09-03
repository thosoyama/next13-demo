import omikuji from './omikuji'

describe('omikuji', () => {
  it('draw', () => {
    Array.from(Array(100)).forEach(() => {
      const fortune = omikuji.draw()
      expect(fortune).toMatch(/(?:[大中小]?吉|凶)/)
    })
  })
})
