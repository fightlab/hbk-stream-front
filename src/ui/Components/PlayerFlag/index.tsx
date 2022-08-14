import * as React from "react";
import withStyles from "react-jss";
import Flag from 'react-world-flags'

interface IPlayerFlagProps {
  width?: number | string;
  height?: number | string;
  code?: string;
  alt?: string;
  position?: string;
  top?: number | string;
  left?: number | string;
  zIndex?: number;
  classes: {
    root: string;
  };
}

const styles = {
  root: (props: IPlayerFlagProps) => ({
    position: props.position,
    top: props.top,
    left: props.left,
    zIndex: props.zIndex,
    width: props.width,
    height: props.height,
  }),
};

class PlayerFlag extends React.PureComponent<IPlayerFlagProps> {
  static defaultProps: IPlayerFlagProps = {
    code: "",
    alt: "",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    classes: { root: "" },
    width: 66,
    height: 48
  };

  render() {
    const { classes, code } = this.props;
    return <Flag className={classes.root} code={code} />;
  }
}

export default withStyles(styles)(PlayerFlag);
