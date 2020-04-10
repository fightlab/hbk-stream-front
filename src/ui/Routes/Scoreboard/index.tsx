import * as React from 'react';
import withStyles from 'react-jss';
import { merge } from 'lodash';

import Socket from '~/ui/Services/socket';
import TextBox from '~/ui/Components/TextBox';
import Text from '~/ui/Components/Text';
import theme from '~/theme';

const styles = {
  root: theme.container,
};

class Scoreboard extends React.Component<IScoreboardProps, IScoreboardState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      p1n: 'Player 1',
      p2n: 'Player 2',
      p1s: 0,
      p2s: 0,
      tl: 'HBK',
      tr: '#000',
      bl: 'Brewdog',
      br: 'Brighton',
    };

    this.io.on(
      'scoreboard',
      (scoreboard) => {
        this.setState(scoreboard);
      },
    );
  }

  componentDidMount() {
    this.io.emit('scoreboard-get');
  }

  render() {
    const { classes } = this.props;
    const {
      p1n, p2n, p1s, p2s, tl, tr, bl, br,
    } = this.state;

    const smallText: IThemeFont = merge({}, theme.rawlineBold, {
      fontSize: '30pt',
    });

    return (
      <div className={classes.root}>
        <TextBox
          // hbk text
          left={0}
          right={0}
          border={theme.borderBottom}
        >
          <Text
            font={smallText}
          >
            {tl}
          </Text>
          <Text
            font={smallText}
            color={theme.orange}
          >
            {tr}
          </Text>
        </TextBox>
        <TextBox
          // player 1 name
          right={1216}
          textAlign="right"
          border={theme.borderBottom}
        >
          <Text>{p1n}</Text>
        </TextBox>
        <TextBox
          // player 1 score
          left={714}
          width={50}
          border={theme.borderBottom}
        >
          <Text>{p1s}</Text>
        </TextBox>
        <TextBox
          // player 2 name
          left={1216}
          textAlign="left"
          border={theme.borderBottom}
        >
          <Text>{p2n}</Text>
        </TextBox>
        <TextBox
          // player 2 score
          right={714}
          width={50}
          border={theme.borderBottom}
        >
          <Text>{p2s}</Text>
        </TextBox>
        <TextBox
          // bottom text
          left={0}
          right={0}
          bottom={0}
          border={theme.borderTop}
        >
          <Text>
            {bl}
          </Text>
          <Text
            color={theme.orange}
          >
            {br}
          </Text>
        </TextBox>
      </div>
    );
  }
}

export default withStyles(styles)(Scoreboard);
