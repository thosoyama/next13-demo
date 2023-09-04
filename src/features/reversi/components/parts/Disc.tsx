import type { Disc } from '../../context'

type SquareProps = {
  item: Disc
  opacity?: boolean
}

/**
 * 石
 */
export function Disc({ item, opacity = false }: SquareProps) {
  const color = item === 1 ? 'bg-black' : 'bg-white'
  const borderColor = item === 1 ? 'border-gray-500' : 'border-gray-600'

  return (
    <div
      className={`absolute h-5/6 w-5/6 rounded-full border shadow-sm shadow-black ${color} ${borderColor} ${
        opacity ? 'opacity-70' : 'opacity-100'
      }`}
    />
  )
}
