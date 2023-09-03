'use client'

import { GameContext } from '../../context'
import { useGame } from '../../hooks/useGame'
import { Board } from '../parts/Board'
import { Disc } from '../parts/Disc'

/**
 * ゲーム
 */
export default function Game() {
  const [state, dispatch] = useGame()

  return (
    <>
      <GameContext.Provider value={state}>
        <div className="m-auto flex aspect-square h-screen p-10">
          <Board state={state.board} dispatch={dispatch} />
          <div className="relative flex flex-col items-center">
            <div className="relative mx-5 box-border flex h-12 w-12 items-center justify-center border-2 border-black bg-green-700">
              <Disc state={state.winner !== 0 ? state.winner : state.first ? 1 : -1} />
            </div>
            <div className="flex w-12 justify-center font-bold">
              {state.winner !== 0 ? 'WIN' : state.pass ? 'PASS' : ''}
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET' })}
              className="absolute bottom-0 mt-2 rounded-sm border-2 border-black px-1 text-xs font-bold hover:bg-slate-200"
            >
              RESET
            </button>
          </div>
        </div>
      </GameContext.Provider>
    </>
  )
}
