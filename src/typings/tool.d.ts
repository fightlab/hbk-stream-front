interface IToolUpdate {
  (e: React.FormEvent<HTMLFormElement>, key: string): void
}

interface IToolPlayer {
  displayName: string
  handle: string
}

interface IToolProps {
  classes: {
    form: string
  }
  setDarkMode: Function
}

interface IToolNightbot {
  bracket: string
  social: string
}

interface IToolState {
  scoreboard: IScoreboardState
  camera: ICamera
  bracket: string
  participants: Array<IToolPlayer>
  nightbot: IToolNightbot
  prestream: IPreStreamState
  social: ISocial
  [key: string]: any
}

interface IToolScoreboardExpansionPanelProps {
  classes: {
    form: string
  },
  participants: Array<IToolPlayer>
  scoreboard: IScoreboardState
  update: IToolUpdate
  changeScoreboardValue: Function
  reset: Function
  swap: Function
}

interface IToolCameraExpansionPanelProps {
  classes: {
    form: string
  }
  camera: ICamera
  update: IToolUpdate
  changeCameraValue: Function
}

interface IToolPreStreamExpansionPanelProps {
  classes: {
    form: string
  }
  prestream: IPreStreamState
  update: IToolUpdate
  changePrestreamValue: Function
}

interface IToolSettingsExpansionPanelProps {
  bracket: string
  changeBracketValue: Function
  updateParticipants: Function
  importFilesChange: Function
  exportFiles: Function
  setDarkMode: Function
}

interface IToolNightbotExpansionPanelProps {
  classes: {
    form: string
  }
  nightbot: IToolNightbot
  update: IToolUpdate
  changeNightbotValue: Function
}

interface IToolSocialExpansionPanelProps {
  classes: {
    form: string
  }
  social: ISocial,
  update: IToolUpdate
  changeSocialValue: Function
}
