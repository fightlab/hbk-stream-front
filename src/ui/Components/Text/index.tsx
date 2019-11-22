import * as React from 'react';
import withStyles from 'react-jss';

interface ITextProps {
  children?: any
  color?: string
  fontFamily?: string
  fontWeight?: number
  fontStyle?: string
  fontSize?: string|number
  fontVariant?: string
  classes: {
    root: string
  }
}

const styles = {
  root: (props: ITextProps) => ({
    color: props.color,
    fontFamily: props.fontFamily,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
    fontSize: props.fontSize,
    fontVariant: props.fontVariant,
  }),
};

class Text extends React.PureComponent<ITextProps> {
  static defaultProps: ITextProps = {
    children: '',
    classes: { root: '' },
    color: '#FFFFFF',
    fontFamily: "'rawline', sans-serif",
    fontSize: '36pt',
    fontVariant: 'small-caps',
  }

  render() {
    const { children, classes } = this.props;
    return (
      <span className={classes.root}>{children}</span>
    );
  }
}

export default withStyles(styles)(Text);
