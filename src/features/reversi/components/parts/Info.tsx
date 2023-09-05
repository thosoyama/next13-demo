import { useContext } from 'react'

import { DispatchContext, GameContext } from '../../context'

import { Disc } from './Disc'

export function Info() {
  const state = useContext(GameContext)
  const dispatch = useContext(DispatchContext)

  return (
    <>
      <div className="relative flex flex-col">
        <div className="flex">
          <div className="flex flex-col items-center">
            <div className="relative ml-2 box-border flex h-12 w-12 items-center justify-center border-2 border-black bg-green-700">
              <Disc item={1}>{state.count.first}</Disc>
            </div>
            <div className="ml-2 flex w-12 justify-center font-bold">
              {state.first && state.winner === 1
                ? 'WIN'
                : state.first && state.pass
                ? 'PASS'
                : state.first && state.winner === 0
                ? '↑'
                : ''}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative ml-2 box-border flex h-12 w-12 items-center justify-center border-2 border-black bg-green-700">
              <Disc item={-1}>{state.count.second}</Disc>
            </div>
            <div className="ml-2 flex  w-12 justify-center font-bold">
              {!state.first && state.winner === -1
                ? 'WIN'
                : !state.first && state.pass
                ? 'PASS'
                : !state.first && state.winner === 0
                ? '↑'
                : ''}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
          className="absolute bottom-0 ml-2 mt-2 rounded-sm border-2 border-black px-1 text-xs font-bold hover:bg-slate-200"
        >
          RESET
        </button>
      </div>
    </>
  )
}
