import * as React from 'react';
import withStyles from 'react-jss';
import { merge } from 'lodash';
import theme from '~theme';

interface ITextProps {
  children?: string|number
  color?: string
  font?: IThemeFont
  lowerCase?: boolean
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
    zIndex: 1,
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
    lowerCase: false,
  }

  render() {
    const { children, classes, lowerCase } = this.props;
    return (
      <span className={classes.root}>
        {
          lowerCase
            ? children.toString().toLowerCase()
            : children
        }
      </span>
    );
  }
}

export default withStyles(styles)(Text);
