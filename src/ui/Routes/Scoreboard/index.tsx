import * as React from 'react';
import withStyles from 'react-jss';

import Socket from '~/ui/Services/socket';
import ScoreboardTextBox from '~ui/Components/ScoreboardTextBox';
import Text from '~ui/Components/Text';
import theme from '../../../theme';

interface IScoreboardProps {
  classes: {
    root: string
  }
}
interface IScoreboardState {
  io: Socket
}

const styles = {
  root: theme.container,
};

class Scoreboard extends React.Component<IScoreboardProps, IScoreboardState> {
  constructor(props) {
    super(props);

    this.state = {
      io: new Socket(),
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScoreboardTextBox
          left={0}
          right={0}
        >
          <Text>HBK</Text>
        </ScoreboardTextBox>
      </div>
    );
  }
}

export default withStyles(styles)(Scoreboard);
