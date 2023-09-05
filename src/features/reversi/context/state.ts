import { getInitialBoard } from '../util/board'

// 0:なし 1:表 -1:裏
export type DiscState = 0 | 1 | -1

export type SquareState = {
  readonly x: number
  readonly y: number
  disc: DiscState
  place: boolean
}

export type BoardState = SquareState[][]

export type GameState = {
  board: BoardState
  first: boolean
  winner: DiscState
  pass: boolean
  count: {
    first: number
    second: number
  }
}

export function getInitialState() {
  const board = getInitialBoard()
  return {
    board,
    first: true,
    winner: 0,
    pass: false,
    count: {
      first: board.flatMap((squares) => squares).filter((square) => square.disc === 1).length,
      second: board.flatMap((squares) => squares).filter((square) => square.disc === -1).length,
    },
  } as GameState
}

export const initialState: GameState = getInitialState()
