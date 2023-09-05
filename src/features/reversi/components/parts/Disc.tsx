import type { DiscState } from '../../context'

type SquareProps = {
  item: DiscState
  opacity?: boolean
  children?: React.ReactNode
}

/**
 * 石
 */
export function Disc({ item, children = null, opacity = false }: SquareProps) {
  const color = item === 1 ? 'text-gray-300' : 'text-gray-800'
  const bgColor = item === 1 ? 'bg-black' : 'bg-white'
  const borderColor = item === 1 ? 'border-gray-500' : 'border-gray-600'

  return (
    <div
      className={`absolute flex h-5/6 w-5/6 items-center justify-center rounded-full border text-xs shadow-sm shadow-black ${color} ${bgColor} ${borderColor} ${
        opacity ? 'opacity-70' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  )
}
