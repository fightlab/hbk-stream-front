import { Styles } from "react-jss";

interface ITheme extends Styles {
  container: IThemeContainer;
  white: string;
  transparent: string;
  orange: string;
  grey: string;
  darkGrey: string;
  rawline: IThemeFont;
  raleway: IThemeFont;
  rawlineBold: IThemeFont;
  ralewayBold: IThemeFont;
  border: IThemeBorder;
  borderTop: IThemeBorder;
  borderBottom: IThemeBorder;
  borderRight: IThemeBorder;
  borderLeft: IThemeBorder;
  cabin: IThemeFont;
}

interface IThemeContainer extends Styles {
  position: string;
  height: string;
  width: string;
  top: string;
  left: string;
}

export interface IThemeFont extends Styles {
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontSize?: string;
  fontVariant?: string;
}

export interface IThemeBorder extends Styles {
  borderRadius: string;
}

const theme: ITheme = {
  container: {
    position: "absolute",
    height: "1080px",
    width: "1920px",
    top: "0",
    left: "0",
  },
  white: "#FFFFFF",
  orange: "#FF5722",
  grey: "#424242",
  darkGrey: "#303030",
  transparent: "rgba(0,0,0,0)",
  rawline: {
    fontFamily: "'rawline', sans-serif",
    fontVariant: "small-caps",
  },
  raleway: {
    fontFamily: "'Raleway', sans-serif",
    fontVariant: "small-caps",
  },
  rawlineBold: {
    fontFamily: "'rawline', sans-serif",
    fontWeight: "700",
    fontStyle: "normal",
    fontVariant: "small-caps",
  },
  ralewayBold: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "700",
    fontStyle: "normal",
    fontVariant: "small-caps",
  },
  border: {
    borderRadius: "3px",
  },
  borderTop: {
    borderRadius: "3px 3px 0px 0px",
  },
  borderBottom: {
    borderRadius: "0px 0px 3px 3px",
  },
  borderRight: {
    borderRadius: "0px 3px 0px 3px",
  },
  borderLeft: {
    borderRadius: "3px 0px 3px 0px",
  },
  cabin: {
    fontFamily: "'Cabin', sans-serif",
  },
};

export default theme;
