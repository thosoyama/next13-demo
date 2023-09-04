import { aggregate, move, noPlace, search, update } from '../util/board'

import { getInitialState, type GameState } from './state'

import type { GameAction } from './action'

/**
 * Reducer
 */
export const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'RESET': {
      return getInitialState()
    }
    case 'MOVE': {
      const { x, y } = action.payload
      const currentDisc = state.first ? 1 : -1

      // 指定位置に石を置いた時に裏返せる座標を取得
      const positions = search(state.board, state.first, x, y)

      // 石を置いて裏返す
      const movedBoard = move(state.board, [action.payload, ...positions], currentDisc)

      // 集計
      const { fulfilled, completed, count, winner } = aggregate(movedBoard)

      // 攻守交代？
      const first = winner === 0 ? !state.first : state.first

      // 置ける場所を更新
      const nextBoard = update(movedBoard, first)

      // パスするか
      const pass = !fulfilled && !completed && noPlace(nextBoard)

      return {
        board: nextBoard,
        first,
        winner,
        pass,
        count,
      }
    }
    case 'PASS': {
      // 置ける場所を更新
      const nextBoard = update(state.board, !state.first)

      // 集計（置ける場所がなければ勝敗が決定する）
      const { winner } = aggregate(nextBoard)

      return {
        ...state,
        board: nextBoard,
        winner,
        first: winner === 0 ? !state.first : state.first,
        pass: false,
      }
    }
  }
}
