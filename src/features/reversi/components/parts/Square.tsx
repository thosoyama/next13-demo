import { useReducer, type Dispatch, useContext } from 'react'

import styles from '../../styles/square.module.scss'
import { GameContext } from '../store/context'

import { Disc } from './Disc'

import type { GameAction } from '../store/action'
import type { SquareState } from '../store/state'

type SquareProps = {
  state: SquareState
  dispatch: Dispatch<GameAction>
}

/**
 * マス目
 */
export function Square({ state, dispatch }: SquareProps) {
  const { x, y } = state
  const place = state.disc === 0 && state.place

  const [hasVirtualDisc, toggleVirtualDisc] = useReducer((s: boolean) => !s, false)
  const { first } = useContext(GameContext)

  const bgColor = state.place ? 'bg-green-600' : 'bg-green-700'
  const cursor = place ? 'cursor-pointer' : ''
  const animation = place ? styles.animation : ''

  return (
    <div
      className={`relative flex h-full w-full  items-center justify-center  border border-black ${bgColor} ${cursor} ${animation}`}
      onClick={() => place && dispatch({ type: 'MOVE', payload: { x, y } })}
      onMouseOver={toggleVirtualDisc}
      onMouseOut={toggleVirtualDisc}
    >
      {state.disc !== 0 && <Disc state={state.disc} />}
      {state.place && hasVirtualDisc && <Disc state={first ? 1 : -1} opacity />}
    </div>
  )
}
