type MoveAction = {
  type: 'MOVE'
  payload: {
    x: number
    y: number
  }
}

type PassAction = {
  type: 'PASS'
}

type ResetAction = {
  type: 'RESET'
}

export type GameAction = MoveAction | PassAction | ResetAction
