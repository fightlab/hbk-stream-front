interface ICamera {
  hbk: string
  brewdog: string
  fgc: string
  date: string
  game: string
  bg: string
}

interface ICameraProps {
  classes: {
    root: string
    iconFacebook: string
    iconTwitter: string
    iconWeb: string
  }
}

interface ICameraState {
  camera: ICamera
  social: ISocial
}
