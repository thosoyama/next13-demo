import type { Dispatch } from 'react'
import { createContext } from 'react'

import { type GameState, getInitialState } from './state'

import type { GameAction } from './action'

export const GameContext = createContext<GameState>(getInitialState())

export const DispatchContext = createContext<Dispatch<GameAction>>(() => {
  // init
})
