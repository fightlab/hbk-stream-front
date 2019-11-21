import * as React from 'react';
import withStyles from 'react-jss';

import Socket from '~/ui/Services/socket';
import ScoreboardText from '~/ui/Components/ScoreboardText';

interface IScoreboardProps {
  classes: {
    root: string
  }
}
interface IScoreboardState {
  io: Socket
}

const styles = {
  root: {
    position: 'absolute',
    height: 1080,
    width: 1920,
    top: 0,
    left: 0,
  },
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
        <ScoreboardText
          left={0}
          right={0}
        >
          <span>HBK</span>
        </ScoreboardText>
      </div>
    );
  }
}

export default withStyles(styles)(Scoreboard);
