import type { DiscState } from '../store/state'

type SquareProps = {
  state: DiscState
  opacity?: boolean
}

/**
 * 石
 */
export function Disc({ state, opacity = false }: SquareProps) {
  const color = state === 1 ? 'bg-black' : 'bg-white'
  const borderColor = state === 1 ? 'border-gray-500' : 'border-gray-600'

  return (
    <div
      className={`absolute h-5/6 w-5/6 rounded-full border shadow-sm shadow-black ${color} ${borderColor} ${
        opacity ? 'opacity-70' : 'opacity-100'
      }`}
    />
  )
}
