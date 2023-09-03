import type { Board, Disc } from '../context/state'

/**
 * 初期盤面
 */
export function getInitialBoard() {
  // 8 x 8
  const board: Board = Array.from({ length: 8 }, (_, y) =>
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
  return update(board, true)
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
export function search(board: Board, first: boolean, cx: number, cy: number) {
  const currentDisc = first ? 1 : -1

  // 裏返せる座標を取得
  const results: { x: number; y: number }[] = directions.flatMap(([dx, dy]) => {
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
    let revs: { x: number; y: number }[] = []
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
        revs.push({ x: wx, y: wy })
      }
    }

    return revs.length ? revs : []
  })

  return results
}

/**
 * 置ける場所を更新
 */
export function update(board: Board, first: boolean) {
  return board.map((squares) =>
    squares.map((square) => ({
      ...square,
      place: square.disc === 0 && search(board, first, square.x, square.y).length > 0,
    })),
  )
}

/**
 * 石を打つ
 */
export function move(board: Board, positions: { x: number; y: number }[], disc: Disc) {
  return board.map((squares) =>
    squares.map((square) => ({
      ...square,
      disc: positions.some(({ x, y }) => x === square.x && y === square.y) ? disc : square.disc,
    })),
  )
}

/**
 * 集計
 */
export function aggregate(board: Board) {
  const fulfilled =
    board.flatMap((squares) => squares).filter((square) => square.disc === 0).length === 0
  const completed = complete(board, 1) || complete(board, -1)
  const first = board.flatMap((row) => row).filter((square) => square.disc === 1).length
  const second = board.flatMap((row) => row).filter((square) => square.disc === -1).length
  const winner: Disc = !fulfilled && !completed ? 0 : first > second ? 1 : second > first ? -1 : 0

  return {
    fulfilled,
    completed,
    winner,
    count: {
      first,
      second,
    },
  }
}

/**
 * 終わったか
 */
export function complete(board: Board, disc: Disc) {
  return board
    .flatMap((squares) => squares)
    .filter((square) => square.disc !== 0)
    .every((square) => square.disc === disc)
}

/**
 * 置く場所がない
 */
export function noPlace(board: Board) {
  return board
    .flatMap((squares) => squares)
    .filter((square) => square.disc === 0)
    .every((square) => !square.place)
}
