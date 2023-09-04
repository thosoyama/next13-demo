'use client'

import { DispatchContext, GameContext } from '../../context'
import { useGame } from '../../hooks/useGame'
import { Board } from '../parts/Board'
import { Info } from '../parts/Info'

/**
 * ゲーム
 */
export default function Game() {
  const [state, dispatch] = useGame()

  return (
    <>
      <GameContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <div className="m-auto flex aspect-square h-screen p-10">
            <Board />
            <Info />
          </div>
        </DispatchContext.Provider>
      </GameContext.Provider>
    </>
  )
}
