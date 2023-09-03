import { getInitialBoard, search } from '../../util/board'

import { type BoardState, type GameState } from './state'

import type { GameAction } from './action'

/**
 * Reducer
 */
export const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MOVE': {
      const { board } = { ...state }
      const { x, y } = action.payload

      let turned = false

      // 石を置く
      const results = search(board, state.first, x, y)
      if (results.length) {
        turned = true

        // 自分の石
        const current = board[y][x]
        current.disc = state.first ? 1 : -1
        current.place = false

        // 挟んだ石
        results
          .flatMap((result) => result)
          .forEach(([x, y]) => {
            board[y][x].disc = current.disc
          })
      }

      // すべて埋まったら勝敗を決める
      const complete =
        board.flatMap((row) => row).filter((square) => square.disc !== 0).length === 8 * 8
      const white = board.flatMap((row) => row).filter((square) => square.disc === -1).length
      const black = board.flatMap((row) => row).filter((square) => square.disc === 1).length

      // 全部同じ色だったら勝ち
      const win =
        complete ||
        board
          .flatMap((row) => row)
          .filter((square) => square.disc !== 0)
          .every((square) => square.disc === board[y][x].disc)

      // 攻守交代？
      const first = complete ? black > white : !win && turned ? !state.first : state.first

      // 置ける場所を更新
      board.forEach((row, uy) =>
        row.forEach((square, ux) => {
          const results = search(board, first, ux, uy)
          board[uy][ux].place = board[uy][ux].disc === 0 && results.length > 0
        }),
      )

      // パスするか
      const pass =
        !complete &&
        board
          .flatMap((row) => row)
          .filter((square) => square.disc === 0)
          .every((square) => !square.place)

      return {
        board,
        first,
        win,
        pass,
      }
    }
    case 'PASS': {
      // 置ける場所を更新
      const board = JSON.parse(JSON.stringify(state.board)) as BoardState
      const first = !state.first
      board.forEach((row, uy) =>
        row.forEach((square, ux) => {
          const results = search(board, first, ux, uy)
          board[uy][ux].place = board[uy][ux].disc === 0 && results.length > 0
        }),
      )
      return { ...state, board, first, pass: false }
    }
    case 'RESET': {
      return {
        board: getInitialBoard(),
        first: true,
        win: false,
        pass: false,
      }
    }
  }
}
