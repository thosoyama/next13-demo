import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Game from './Game'

describe('Game', () => {
  it('renders a square', () => {
    render(<Game />)

    const squares: HTMLElement[] = screen.getAllByTestId('square')
    expect(squares.length).toBe(9)
    squares.forEach((square) => {
      expect(square).toBeInTheDocument()
      expect(square).toBeEmptyDOMElement()
    })
  })

  it('renders a square', () => {
    render(<Game />)

    const squares: HTMLElement[] = screen.getAllByTestId('square')

    fireEvent.click(squares[0])
    const actual1 = squares.map((square) => square.textContent)
    expect(actual1).toStrictEqual(['X', '', '', '', '', '', '', '', ''])

    fireEvent.click(squares[3])
    const actual2 = squares.map((square) => square.textContent)
    expect(actual2).toStrictEqual(['X', '', '', 'O', '', '', '', '', ''])

    fireEvent.click(squares[1])
    const actual3 = squares.map((square) => square.textContent)
    expect(actual3).toStrictEqual(['X', 'X', '', 'O', '', '', '', '', ''])

    fireEvent.click(squares[4])
    const actual4 = squares.map((square) => square.textContent)
    expect(actual4).toStrictEqual(['X', 'X', '', 'O', 'O', '', '', '', ''])

    fireEvent.click(squares[2])
    const actual5 = squares.map((square) => square.textContent)
    expect(actual5).toStrictEqual(['X', 'X', 'X', 'O', 'O', '', '', '', ''])
  })

  it('renders game unchanged', () => {
    const { container } = render(<Game />)
    expect(container).toMatchSnapshot()
  })
})
