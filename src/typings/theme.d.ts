interface ITheme {
  container: IThemeContainer
  white: string
  transparent: string
  orange: string
  grey: string
  darkGrey: string
  rawline: IThemeFont
  raleway: IThemeFont
  rawlineBold: IThemeFont
  ralewayBold: IThemeFont
  border: IThemeBorder
  borderTop: IThemeBorder
  borderBottom: IThemeBorder
  borderRight: IThemeBorder
  borderLeft: IThemeBorder
  cabin: IThemeFont
}

interface IThemeContainer {
  position: string
  height: number|string
  width: number|string
  top: number
  left: number
}

interface IThemeFont {
  fontFamily?: string
  fontWeight?: number
  fontStyle?: string
  fontSize?: string
  fontVariant?: string
}

interface IThemeBorder {
  borderRadius: number|string
}
