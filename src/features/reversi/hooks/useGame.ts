import type { Dispatch } from 'react'
import { useEffect, useReducer } from 'react'

import { reducer } from '../context/reducer'
import { initialState } from '../context/state'

import type { GameAction, GameState } from '../context'

type UseGameOption = {
  passDelay: number
}

const defaultOption = {
  passDelay: 3000,
}

/**
 * ゲーム
 */
export const useGame = (option: UseGameOption = defaultOption) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.pass || state.winner !== 0) {
      return
    }
    setTimeout(() => dispatch({ type: 'PASS' }), option.passDelay)
  }, [option.passDelay, state])

  return [state, dispatch] as [GameState, Dispatch<GameAction>]
}
