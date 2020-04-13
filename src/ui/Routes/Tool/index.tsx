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
import PreStreamExpansionPanel from './prestream';
import SocialExpansionPanel from './social';

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
        p1n: '',
        p2n: '',
        p1s: 0,
        p2s: 0,
        p1l: false,
        p2l: false,
        tl: 'HBK',
        tr: '#000',
        bl: 'Brewdog',
        br: 'Brighton',
        lTag: '[L]',
      },
      camera: {
        hbk: 'Habrewken #000',
        brewdog: 'Brewdog Brighton',
        fgc: 'Brighton Fighting Game Community',
        date: 'Wednesday XXth MONTH 20XX',
        game: 'Street Fighter V',
        bg: 'hbk',
      },
      participants: [],
      nightbot: {
        bracket: 'https://hbk.challonge.com',
        social: '• FOLLOW US ON • WEB: https://hbk.gg • FACEBOOK: https://www.facebook.com/FightLabBrighton/ • TWITTER: https://twitter.com/fight_lab • DISCORD: https://discord.gg/rjpDJdz •',
      },
      prestream: {
        event: 'Habrewken #000',
        game: 'Game Fighter Name',
        bg: 'hbk',
        countdown: 70000,
        venue: 'BrewDog Brighton',
        showTimer: true,
        startText: 'Starts',
      },
      social: {
        facebook: 'fightlabbrighton',
        twitter: 'fight_lab',
        web: 'hbk.gg',
      },
      unsaved: {
        camera: false,
        nightbot: false,
        prestream: false,
        scoreboard: false,
        social: false,
      },
    };

    this.io.on(
      'scoreboard',
      (scoreboard) => {
        const { unsaved } = this.state;
        unsaved.scoreboard = false;
        this.setState({ scoreboard, unsaved });
      },
    );

    this.io.on(
      'camera',
      (camera) => {
        const { unsaved } = this.state;
        unsaved.camera = false;
        this.setState({ camera, unsaved });
      },
    );

    this.io.on(
      'nightbot',
      (nightbot) => {
        const { unsaved } = this.state;
        unsaved.nightbot = false;
        this.setState({ nightbot, unsaved });
      },
    );

    this.io.on(
      'prestream',
      (prestream) => {
        const { unsaved } = this.state;
        unsaved.prestream = false;
        this.setState({ prestream, unsaved });
      },
    );

    this.io.on(
      'social',
      (social) => {
        const { unsaved } = this.state;
        unsaved.social = false;
        this.setState({ social, unsaved });
      },
    );

    this.io.on(
      'participants',
      ({ bracket, participants }) => {
        this.setState({ bracket, participants });
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
    this.io.emit('prestream-get');
    this.io.emit('social-get');
  }

  private update: IToolUpdate = (e, key) => {
    e.preventDefault();
    const { [key]: data } = this.state;
    this.io.emit(`${key}-update`, data);
  }

  private updateParticipants = () => {
    const { bracket } = this.state;
    this.io.emit('bracket-get', bracket);
  }

  private change: (key: string, name: string, value: any) => void = (key, name, value) => {
    const { [key]: data, unsaved } = this.state;
    if (value !== data[name]) {
      data[name] = value;
      unsaved[key] = true;
      this.setState({ [key]: data, unsaved });
    }
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

  private reset: IToolScoreboardReset = ({ names = false, scores = false }) => {
    const { scoreboard, unsaved } = this.state;
    if (names) {
      scoreboard.p1n = '';
      scoreboard.p2n = '';
      scoreboard.p1l = false;
      scoreboard.p2l = false;
    }
    if (scores) {
      scoreboard.p1s = 0;
      scoreboard.p2s = 0;
    }
    unsaved.scoreboard = true;
    this.setState({ scoreboard, unsaved });
  }

  private swap: IToolScoreboardSwap = ({ names = false, scores = false }) => {
    const { scoreboard } = this.state;

    if (names) {
      [scoreboard.p1n, scoreboard.p2n] = [scoreboard.p2n, scoreboard.p1n];
      [scoreboard.p1l, scoreboard.p2l] = [scoreboard.p2l, scoreboard.p1l];
    }

    if (scores) {
      [scoreboard.p1s, scoreboard.p2s] = [scoreboard.p2s, scoreboard.p1s];
    }

    this.setState({ scoreboard }, () => this.io.emit('scoreboard-update', scoreboard));
  }

  render() {
    const { classes, setDarkMode } = this.props;
    const {
      scoreboard, camera, bracket, participants, nightbot, prestream, social, unsaved,
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
              update={this.update}
              change={this.change}
              reset={this.reset}
              swap={this.swap}
              toolKey="scoreboard"
              unsaved={unsaved.scoreboard}
            />
            <CameraExpansionPanel
              classes={classes}
              camera={camera}
              update={this.update}
              change={this.change}
              toolKey="camera"
              unsaved={unsaved.camera}
            />
            <PreStreamExpansionPanel
              classes={classes}
              prestream={prestream}
              change={this.change}
              update={this.update}
              toolKey="prestream"
              unsaved={unsaved.prestream}
            />
            <SocialExpansionPanel
              classes={classes}
              social={social}
              change={this.change}
              update={this.update}
              toolKey="social"
              unsaved={unsaved.social}
            />
            <NightbotExpansionPanel
              classes={classes}
              nightbot={nightbot}
              update={this.update}
              change={this.change}
              toolKey="nightbot"
              unsaved={unsaved.nightbot}
            />
            <SettingsExpansionPanel
              bracket={bracket}
              changeBracketValue={this.changeBracketValue}
              updateParticipants={this.updateParticipants}
              importFilesChange={this.importFilesChange}
              exportFiles={this.exportFiles}
              setDarkMode={setDarkMode}
            />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Tool);
