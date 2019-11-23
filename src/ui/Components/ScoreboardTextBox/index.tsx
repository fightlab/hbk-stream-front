import * as React from 'react';
import withStyles from 'react-jss';
import theme from '~theme';

interface IScoreboardTextBoxProps {
  children?: any
  position?: string
  marginLeft?: string|number
  marginRight?: string|number
  left?: string|number
  right?: string|number
  bottom?: string|number
  top?: string|number
  width?: string|number
  zIndex?: number
  textAlign?: string
  backgroundColor?: string
  padding?: string|number
  border?: IThemeBorder
  classes: {
    root: string
  }
}

const styles = {
  root: (props: IScoreboardTextBoxProps) => ({
    position: props.position,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    padding: props.padding,
    borderRadius: props.border.borderRadius,
  }),
};

class ScoreboardTextBox extends React.PureComponent<IScoreboardTextBoxProps> {
  static defaultProps: IScoreboardTextBoxProps = {
    classes: { root: '' },
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content',
    backgroundColor: '#424242',
    padding: '0px 10px 0px 10px',
    children: '',
    textAlign: 'center',
    border: theme.border,
    zIndex: 1,
  }

  render() {
    const { children, classes } = this.props;
    return (
      <span className={classes.root}>{children}</span>
    );
  }
}

export default withStyles(styles)(ScoreboardTextBox);
