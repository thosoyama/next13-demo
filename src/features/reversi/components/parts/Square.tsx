import { useReducer, useContext } from 'react'

import { DispatchContext, GameContext } from '../../context'
import styles from '../../styles/square.module.scss'

import { Disc } from './Disc'

import type { Square } from '../../context'

type SquareProps = {
  item: Square
}

/**
 * マス目
 */
export function Square({ item }: SquareProps) {
  const { x, y } = item
  const place = item.disc === 0 && item.place

  const [hasVirtualDisc, toggleVirtualDisc] = useReducer((s: boolean) => !s, false)
  const { first } = useContext(GameContext)
  const dispatch = useContext(DispatchContext)

  const bgColor = item.place ? 'bg-green-600' : 'bg-green-700'
  const cursor = place ? 'cursor-pointer' : ''
  const animation = place ? styles.animation : ''

  return (
    <div
      className={`relative flex h-full w-full  items-center justify-center  border border-black ${bgColor} ${cursor} ${animation}`}
      onClick={() => place && dispatch({ type: 'MOVE', payload: { x, y } })}
      onMouseOver={toggleVirtualDisc}
      onMouseOut={toggleVirtualDisc}
    >
      {item.disc !== 0 && <Disc item={item.disc} />}
      {item.place && hasVirtualDisc && <Disc item={first ? 1 : -1} opacity />}
    </div>
  )
}
