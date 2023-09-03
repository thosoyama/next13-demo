const rule = (n: number, s: 'Fizz' | 'Buzz') => {
  return (i: number) => {
    return i % n === 0 ? s : null
  }
}

export function fizzBuzz() {
  Array.from(Array(100), (_, index) => {
    const num = index + 1
    const str = [rule(3, 'Fizz')(num), rule(5, 'Buzz')(num)].join('') || `${num}`
    console.log(str)
  })
}
