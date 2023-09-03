import { createContext } from 'react'

import type { GameState } from './state'

export const GameContext = createContext<GameState>({
  board: [],
  first: true,
  win: false,
  pass: false,
})
