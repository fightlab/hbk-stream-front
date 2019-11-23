import * as React from 'react';
import withStyles from 'react-jss';
import { merge } from 'lodash';
import theme from '~theme';

interface ITextProps {
  children?: any
  color?: string
  font?: IThemeFont
  classes: {
    root: string
  }
}

const styles = {
  root: (props: ITextProps) => ({
    color: props.color,
    fontFamily: props.font.fontFamily,
    fontWeight: props.font.fontWeight,
    fontStyle: props.font.fontStyle,
    fontSize: props.font.fontSize,
    fontVariant: props.font.fontVariant,
  }),
};

const defaultFont: IThemeFont = merge({}, theme.rawlineBold, {
  fontSize: '36pt',
  fontVariant: 'small-caps',
});

class Text extends React.PureComponent<ITextProps> {
  static defaultProps: ITextProps = {
    children: '',
    classes: { root: '' },
    color: theme.white,
    font: defaultFont,
  }

  render() {
    const { children, classes } = this.props;
    return (
      <span className={classes.root}>{children}</span>
    );
  }
}

export default withStyles(styles)(Text);
