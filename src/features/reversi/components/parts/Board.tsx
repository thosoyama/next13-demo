import { type Board } from '../../context'

import { Square } from './Square'

type BoardProps = {
  state: Board
}

/**
 * 盤面
 */
export function Board({ state }: BoardProps) {
  return (
    <div className="relative grid aspect-square h-full grid-cols-8 grid-rows-8 items-center justify-center border border-black">
      {state
        .flatMap((squares) => squares)
        .map((square) => (
          <Square key={`${square.x}-${square.y}-${square.disc}-${square.place}`} state={square} />
        ))}
      <div className="absolute left-1/4 top-1/4 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-black"></div>
      <div className="absolute left-3/4 top-1/4 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-black"></div>
      <div className="absolute left-1/4 top-3/4 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-black"></div>
      <div className="absolute left-3/4 top-3/4 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-black"></div>
    </div>
  )
}
