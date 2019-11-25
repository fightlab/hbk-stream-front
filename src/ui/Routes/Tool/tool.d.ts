interface IToolPlayer {
  displayName: string
  handle: string
}

interface IToolProps {
  classes: {
    form: string
  }
}

interface IToolState {
  scoreboard: IScoreboardState
  camera: ICameraState
  bracket: string
  participants: Array<IToolPlayer>
}
