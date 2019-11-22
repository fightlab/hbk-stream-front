interface ITheme {
  container: IThemeContainer
  white: string
  transparent: string
  orange: string
  grey: string
  darkGrey: string
  rawlineBold: IThemeFont
  border: IThemeBorder
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
  fontFamily: string
  fontWeight?: number
  fontStyle?: string
}

interface IThemeBorder {
  borderRadius: number|string
}

const theme: ITheme = {
  container: {
    position: 'absolute',
    height: 1080,
    width: 1920,
    top: 0,
    left: 0,
  },
  white: '#FFFFFF',
  orange: '#FF5722',
  grey: '#424242',
  darkGrey: '#303030',
  transparent: 'rgba(0,0,0,0)',
  rawlineBold: {
    fontFamily: "'rawline', sans-serif",
    fontWeight: 700,
    fontStyle: 'normal',
  },
  border: {
    borderRadius: '3px',
  },
  cabin: {
    fontFamily: "'Cabin', sans-serif",
  },
};

export default theme;
