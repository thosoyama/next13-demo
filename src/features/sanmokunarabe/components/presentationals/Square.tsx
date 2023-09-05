type SquareProps = {
  value: string
  onSquareClick: () => void
}

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button type="button" className="square" onClick={onSquareClick} data-testid="square">
      {value}
    </button>
  )
}
