import type { BoardState } from '../components/store/state'

/**
 * 初期盤面
 */
export function getInitialBoard() {
  const board: BoardState = Array.from({ length: 8 }, (_, y) =>
    Array.from({ length: 8 }, (_, x) => ({
      x,
      y,
      disc: 0,
      place: false,
    })),
  )

  // 初期石を置く
  board[3][3].disc = -1
  board[3][4].disc = 1
  board[4][3].disc = 1
  board[4][4].disc = -1

  // 置ける場所を更新
  board.forEach((row, y) =>
    row.forEach((square, x) => {
      square.place = square.disc === 0 && search(board, true, x, y).length > 0
    }),
  )

  return board
}

// 現在座標からの相対方向
const directions = [
  [-1, 0], // 左
  [-1, 1], // 左下
  [0, 1], // 下
  [1, 1], // 右下
  [1, 0], // 右
  [1, -1], // 右上
  [0, -1], // 上
  [-1, -1], // 左上
] as const

/**
 * 指定したマスに石が置けるか調べる
 */
export function search(board: BoardState, first: boolean, cx: number, cy: number) {
  const currentDisc = first ? 1 : -1

  // 裏返せる座標を取得
  const results: number[][][] = directions.flatMap(([dx, dy]) => {
    // 隣が自分と違う石を探索
    const ny = cy + dy
    const nx = cx + dx
    if (0 > ny || ny >= 8 || 0 > nx || nx >= 8) {
      return []
    }
    const near = board[ny][nx]
    if (near.disc === 0 || near.disc === currentDisc) {
      return []
    }

    // 更にその延長のマスを探索
    let i = 0
    let revs = []
    while (true) {
      i++

      const wy = cy + dy * i
      const wx = cx + dx * i

      // フチまで探索したら裏返えせない
      if (0 > wy || wy >= 8 || 0 > wx || wx >= 8) {
        revs = []
        break
      }

      // 探索先には石がなかったら裏返えせない
      if (board[wy][wx].disc === 0) {
        revs = []
        break
      }

      // 探索先に自分と同じ色の石があったら裏返せる
      const target = board[wy][wx]
      if (target.disc === currentDisc) {
        break
      }

      // 自分と違う石が続いていれば裏返す対象としてマーク
      if (target.disc !== currentDisc) {
        revs.push([wx, wy])
      }
    }

    return revs.length ? [revs] : []
  })

  return results
}
