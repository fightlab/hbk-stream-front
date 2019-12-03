interface IToolPlayer {
  id: number,
  displayName: string
  handle: string
}

interface IToolProps {
  classes: {
    form: string
  }
}

interface IToolNightbot {
  bracket: string
  social: string
}

interface IToolMatch {
  id?: number
  player1Id?: number
  player2Id?: number
  winnerId?: number
  tournamentId?: number
  p1s?: number
  p2s?: number
}

interface IToolState {
  scoreboard: IScoreboardState
  camera: ICameraState
  bracket: string
  participants: Array<IToolPlayer>
  nightbot: IToolNightbot,
  matches: Array<IToolMatch>
  match: IToolMatch
}
