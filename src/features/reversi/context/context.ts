import { createContext } from 'react'

import { getInitialState, type GameState } from './state'

export const GameContext = createContext<GameState>(getInitialState())
