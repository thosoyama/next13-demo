import { getInitialBoard } from '../../util/board'

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
  win: boolean
  pass: boolean
}

export const initialState: GameState = {
  board: getInitialBoard(),
  first: true,
  win: false,
  pass: false,
}
