import { fizzBuzz } from './fizz-buzz'

describe('fizz-buzz', () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  let spyLog: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>

  beforeAll(() => {
    spyLog = jest.spyOn(console, 'log')
    spyLog.mockImplementation((x) => x)
  })

  afterAll(() => {
    spyLog.mockReset()
    spyLog.mockRestore()
  })

  it('FizzBuzzを実行', () => {
    fizzBuzz()
    expect(console.log).toBeCalledTimes(100)
    Array.from(Array(100), (_, i) => {
      const num = i + 1
      expect(spyLog.mock.calls[i][0]).toEqual(
        num % 3 === 0 && num % 5 === 0
          ? 'FizzBuzz'
          : num % 5 === 0
          ? 'Buzz'
          : num % 3 === 0
          ? 'Fizz'
          : `${num}`,
      )
    })
  })
})
