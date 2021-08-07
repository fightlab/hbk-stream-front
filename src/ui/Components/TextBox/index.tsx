import * as React from "react";
import withStyles from "react-jss";
import theme, { IThemeBorder } from "~/theme";

interface ITextBoxProps {
  children?: any;
  position?: string;
  marginLeft?: string | number;
  marginRight?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  top?: string | number;
  width?: string | number;
  minWidth?: string;
  zIndex?: string | number;
  textAlign?: string;
  backgroundColor?: string;
  padding?: string | number;
  border?: IThemeBorder;
  boxShadow?: string;
  classes: {
    root: string;
  };
}

const styles = {
  root: (props: ITextBoxProps) => ({
    position: props.position,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    top: props.top,
    width: props.width,
    minWidth: props.minWidth,
    zIndex: props.zIndex,
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    padding: props.padding,
    borderRadius: props.border.borderRadius,
    boxShadow: props.boxShadow,
  }),
};

class TextBox extends React.PureComponent<ITextBoxProps> {
  static defaultProps: ITextBoxProps = {
    classes: { root: "" },
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
    minWidth: "30px",
    backgroundColor: "rgba(66, 66, 66, 0.6)",
    padding: "0px 10px 0px 10px",
    children: "",
    textAlign: "center",
    border: theme.border,
    zIndex: "1",
  };

  render() {
    const { children, classes } = this.props;
    return <span className={classes.root}>{children}</span>;
  }
}

export default withStyles(styles)(TextBox);
