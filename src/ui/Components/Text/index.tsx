import * as React from "react";
import withStyles from "react-jss";
import { merge } from "lodash";
import theme, { IThemeFont } from "~/theme";

export interface ITextProps {
  children?: string | number;
  color?: string;
  font?: IThemeFont;
  lowerCase?: boolean;
  position?: string;
  top?: string;
  bottom?: string;
  classes: {
    root: string;
  };
}

const styles = {
  root: (props: ITextProps) => ({
    color: props.color,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
    fontFamily: props.font.fontFamily,
    fontWeight: props.font.fontWeight,
    fontStyle: props.font.fontStyle,
    fontSize: props.font.fontSize,
    fontVariant: props.font.fontVariant,
    zIndex: 1,
  }),
};

const defaultFont: IThemeFont = merge({}, theme.rawlineBold, {
  fontSize: "28pt",
  fontVariant: "small-caps",
});

class Text extends React.PureComponent<ITextProps> {
  static defaultProps: ITextProps = {
    children: "",
    classes: { root: "" },
    color: theme.white,
    font: defaultFont,
    lowerCase: false,
  };

  render() {
    const { children, classes, lowerCase } = this.props;
    return (
      <span className={classes.root}>
        {lowerCase ? children.toString().toLowerCase() : children}
      </span>
    );
  }
}

export default withStyles(styles)(Text);
