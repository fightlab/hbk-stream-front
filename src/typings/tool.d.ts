interface IToolUpdate {
  (e: React.FormEvent<HTMLFormElement>, key: string): void
}

interface IToolChange {
  (key: string, name: string, value: any): void
}

interface IToolUnsaved {
  scoreboard: boolean
  camera: boolean
  prestream: boolean
  social: boolean
  nightbot: boolean
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
  unsaved: IToolUnsaved
  [key: string]: any
}

interface IToolScoreboardResetParam {
  names?: boolean, scores?: boolean
}
interface IToolScoreboardReset {
  (param: IToolScoreboardResetParam): void
}

interface IToolScoreboardSwapParam {
  names?: boolean, scores?: boolean
}
interface IToolScoreboardSwap {
  (param: IToolScoreboardSwapParam): void
}

interface IToolScoreboardExpansionPanelProps {
  classes: {
    form: string
  },
  participants: Array<IToolPlayer>
  scoreboard: IScoreboardState
  update: IToolUpdate
  change: IToolChange
  reset: IToolScoreboardReset
  swap: IToolScoreboardSwap
  toolKey: string
  unsaved: boolean
}

interface IToolCameraExpansionPanelProps {
  classes: {
    form: string
  }
  camera: ICamera
  update: IToolUpdate
  change: IToolChange
  toolKey: string
  unsaved: boolean
}

interface IToolPreStreamExpansionPanelProps {
  classes: {
    form: string
  }
  prestream: IPreStreamState
  update: IToolUpdate
  change: IToolChange
  toolKey: string
  unsaved: boolean
}

interface IToolNightbotExpansionPanelProps {
  classes: {
    form: string
  }
  nightbot: IToolNightbot
  update: IToolUpdate
  change: IToolChange
  toolKey: string
  unsaved: boolean
}

interface IToolSocialExpansionPanelProps {
  classes: {
    form: string
  }
  social: ISocial,
  update: IToolUpdate
  change: IToolChange
  toolKey: string
  unsaved: boolean
}

interface IToolSettingsExpansionPanelProps {
  bracket: string
  changeBracketValue: Function
  updateParticipants: Function
  importFilesChange: Function
  exportFiles: Function
  setDarkMode: Function
}
