import * as React from 'react';
import withStyles from 'react-jss';

interface IScoreboardTextProps {
  children?: any
  position: string
  marginLeft: string|number
  marginRight: string|number
  left?: string|number
  right?: string|number
  bottom?: string|number
  top?: string|number
  width: string|number
  fontSize: string|number
  zIndex: number
  textAlign: string
  fontVariant: string
  backgroundColor: string
  padding: string|number
  fontFamily: string
  fontWeight?: number
  fontStyle?: string
  classes: {
    root: string
  }
}

const styles = {
  root: (props: IScoreboardTextProps) => ({
    position: props.position,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    top: props.top,
    width: props.width,
    fontSize: props.fontSize,
    zIndex: props.zIndex,
    textAlign: props.textAlign,
    fontVariant: props.fontVariant,
    backgroundColor: props.backgroundColor,
    padding: props.padding,
    fontFamily: props.fontFamily,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
  }),
};

class ScoreboardText extends React.Component<IScoreboardTextProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: IScoreboardTextProps = {
    classes: { root: '' },
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content',
    fontSize: '36pt',
    fontVariant: 'small-caps',
    backgroundColor: '#424242',
    padding: '0px 10px 0px 10px',
    children: '',
    textAlign: 'center',
    zIndex: 1,
    fontFamily: "'rawline', sans-serif",
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { children, classes } = this.props;
    return (
      <span className={classes.root}>{children}</span>
    );
  }
}

export default withStyles(styles)(ScoreboardText);
