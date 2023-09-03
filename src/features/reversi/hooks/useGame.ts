import type { Dispatch } from 'react'
import { useEffect, useReducer } from 'react'

import { reducer } from '../components/store/reducer'
import { initialState } from '../components/store/state'

import type { GameAction } from '../components/store/action'
import type { GameState } from '../components/store/state'

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
    if (!state.pass || state.win) {
      return
    }
    setTimeout(() => dispatch({ type: 'PASS' }), option.passDelay)
  }, [option.passDelay, state])

  return [state, dispatch] as [GameState, Dispatch<GameAction>]
}
