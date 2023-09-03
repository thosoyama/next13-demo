type Amulet = {
  fortune: '大吉' | '吉' | '中吉' | '小吉' | '凶'
  rate: number
}

const amulets: Amulet[] = [
  { fortune: '大吉', rate: 5 },
  { fortune: '吉', rate: 25 },
  { fortune: '中吉', rate: 40 },
  { fortune: '小吉', rate: 25 },
  { fortune: '凶', rate: 5 },
]

class Omikuji {
  draw() {
    return amulets.find(
      (_, index) =>
        Math.floor(Math.random() * 100) + 1 <=
        amulets.reduce((t, j, i) => (index >= i ? t + j.rate : t), 0),
    )?.fortune as string
  }
}

const omikuji = new Omikuji()

export default omikuji
