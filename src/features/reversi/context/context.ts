import type { Dispatch } from 'react'
import { createContext } from 'react'

import { getInitialState, type GameState } from './state'

import type { GameAction } from './action'

export const GameContext = createContext<GameState>(getInitialState())

export const DispatchContext = createContext<Dispatch<GameAction>>(() => {
  // init
})
