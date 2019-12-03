import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from 'react-jss';

import Socket from '~/ui/Services/socket';
import ScoreboardExpansionPanel from './scoreboard';
import CameraExpansionPanel from './camera';
import SettingsExpansionPanel from './settings';
import NightbotExpansionPanel from './nightbot';

const styles = {
  form: {
    width: '100%',
  },
};


class Tool extends React.Component<IToolProps, IToolState> {
  private io = new Socket();

  private importFileReader = new FileReader();

  constructor(props) {
    super(props);

    this.state = {
      bracket: '',
      scoreboard: {
        p1n: 'Player 1',
        p2n: 'Player 2',
        p1s: 0,
        p2s: 0,
        tl: 'HBK',
        tr: '#000',
        bl: 'Brewdog',
        br: 'Brighton',
      },
      camera: {
        hbk: 'Habrewken #000',
        brewdog: 'Brewdog Brighton',
        fgc: 'Brighton Fighting Game Community',
        date: 'Wednesday XXth MONTH 20XX',
        facebook: 'fightlabbrighton',
        twitter: 'fight_lab',
        web: 'hbk.gg',
        game: 'Street Fighter V',
      },
      participants: [],
      nightbot: {
        bracket: 'https://hbk.challonge.com',
        social: '• FOLLOW US ON • WEB: https://hbk.gg • FACEBOOK: https://www.facebook.com/FightLabBrighton/ • TWITTER: https://twitter.com/fight_lab • DISCORD: https://discord.gg/rjpDJdz •',
      },
    };

    this.io.on(
      'scoreboard',
      (scoreboard) => {
        this.setState({ scoreboard });
      },
    );

    this.io.on(
      'camera',
      (camera) => {
        this.setState({ camera });
      },
    );

    this.io.on(
      'participants',
      ({ bracket, participants }) => {
        this.setState({ bracket, participants });
      },
    );

    this.io.on(
      'nightbot',
      (nightbot) => {
        this.setState({ nightbot });
      },
    );

    this.importFileReader.onload = (event) => {
      const json = event.target.result;
      const parsed = JSON.parse(json.toString());
      this.setState(parsed);
    };
  }

  componentDidMount() {
    this.io.emit('scoreboard-get');
    this.io.emit('camera-get');
    this.io.emit('participants-get');
    this.io.emit('nightbot-get');
  }

  private updateParticipants = () => {
    const { bracket } = this.state;
    this.io.emit('bracket-get', bracket);
  }

  private updateScoreboard = (e) => {
    e.preventDefault();
    const { scoreboard } = this.state;
    this.io.emit('scoreboard-update', scoreboard);
  }

  private updateCamera = (e) => {
    e.preventDefault();
    const { camera } = this.state;
    this.io.emit('camera-update', camera);
  }

  private updateNightbot = (e) => {
    e.preventDefault();
    const { nightbot } = this.state;
    this.io.emit('nightbot-update', nightbot);
  }

  private changeScoreboardValue = (name, value) => {
    const { scoreboard } = this.state;
    scoreboard[name] = value;
    this.setState({ scoreboard });
  }

  private changeCameraValue = (name, value) => {
    const { camera } = this.state;
    camera[name] = value;
    this.setState({ camera });
  }

  private changeNightbotValue = (name, value) => {
    const { nightbot } = this.state;
    nightbot[name] = value;
    this.setState({ nightbot });
  }

  private changeBracketValue = (bracket) => {
    this.setState({ bracket });
  }

  private importFilesChange = (files) => {
    const [file = {}] = files;
    this.importFileReader.readAsText(file);
  }

  private exportFiles = () => {
    const state = JSON.stringify(this.state);
    const blob = new Blob([state], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'export.json';
    link.href = url;
    link.click();
  }

  private reset = ({ names = false, scores = false }) => {
    const { scoreboard } = this.state;
    if (names) {
      scoreboard.p1n = '';
      scoreboard.p2n = '';
    }
    if (scores) {
      scoreboard.p1s = 0;
      scoreboard.p2s = 0;
    }
    this.setState({ scoreboard });
  }

  private swap = ({ names = false, scores = false }) => {
    const { scoreboard } = this.state;

    if (names) {
      [scoreboard.p1n, scoreboard.p2n] = [scoreboard.p2n, scoreboard.p1n];
    }

    if (scores) {
      [scoreboard.p1s, scoreboard.p2s] = [scoreboard.p2s, scoreboard.p1s];
    }

    this.setState({ scoreboard }, () => this.io.emit('scoreboard-update', scoreboard));
  }

  render() {
    const { classes } = this.props;
    const {
      scoreboard, camera, bracket, participants, nightbot,
    } = this.state;

    return (
      <>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              HBK Stream Tool
            </Typography>
            <ScoreboardExpansionPanel
              classes={classes}
              participants={participants}
              scoreboard={scoreboard}
              updateScoreboard={this.updateScoreboard}
              changeScoreboardValue={this.changeScoreboardValue}
              reset={this.reset}
              swap={this.swap}
            />
            <CameraExpansionPanel
              classes={classes}
              camera={camera}
              updateCamera={this.updateCamera}
              changeCameraValue={this.changeCameraValue}
            />
            <SettingsExpansionPanel
              bracket={bracket}
              changeBracketValue={this.changeBracketValue}
              updateParticipants={this.updateParticipants}
              importFilesChange={this.importFilesChange}
              exportFiles={this.exportFiles}
            />
            <NightbotExpansionPanel
              classes={classes}
              nightbot={nightbot}
              updateNightbot={this.updateNightbot}
              changeNightbotValue={this.changeNightbotValue}
            />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Tool);
