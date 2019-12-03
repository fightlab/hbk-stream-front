import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import withStyles from 'react-jss';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Files from 'react-files';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Socket from '~/ui/Services/socket';

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
      matches: [],
      match: {},
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
      ({ bracket, participants, matches }) => {
        this.setState({ bracket, participants, matches });
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

  private updateParticipants() {
    const { bracket } = this.state;
    this.io.emit('bracket-get', bracket);
  }

  private updateScoreboard(e) {
    e.preventDefault();
    const { scoreboard } = this.state;
    this.io.emit('scoreboard-update', scoreboard);
  }

  private updateCamera(e) {
    e.preventDefault();
    const { camera } = this.state;
    this.io.emit('camera-update', camera);
  }

  private updateNightbot(e) {
    e.preventDefault();
    const { nightbot } = this.state;
    this.io.emit('nightbot-update', nightbot);
  }

  private changeScoreboardValue(name, value) {
    const { scoreboard } = this.state;
    scoreboard[name] = value;
    this.setState({ scoreboard });
  }

  private changeMatch(e) {
    console.log(e);
    e.preventDefault();
    const { matches } = this.state;
    const match = matches.find((m) => m.id === e.target.value);
    console.log(match);
    this.setState({ match });
  }

  private changeCameraValue(name, value) {
    const { camera } = this.state;
    camera[name] = value;
    this.setState({ camera });
  }

  private changeNightbotValue(name, value) {
    const { nightbot } = this.state;
    nightbot[name] = value;
    this.setState({ nightbot });
  }

  private changeBracketValue(bracket) {
    this.setState({ bracket });
  }

  private importFilesChange(files) {
    const [file = {}] = files;
    this.importFileReader.readAsText(file);
  }

  private export() {
    const state = JSON.stringify(this.state);
    const blob = new Blob([state], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'export.json';
    link.href = url;
    link.click();
  }

  private reset({ names = false, scores = false }) {
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

  private swap({ names = false, scores = false }) {
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
      scoreboard,
      camera,
      bracket,
      participants,
      nightbot,
      matches,
      match,
    } = this.state;

    const { id: matchId = '' } = match;

    console.log(matches);

    return (
      <>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              HBK Stream Tool
            </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Scoreboard</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form
                  onSubmit={(e) => this.updateScoreboard(e)}
                  className={classes.form}
                  noValidate
                >
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel>Match From Challonge</InputLabel>
                        <Select
                          value={matchId}
                          onChange={(e) => this.changeMatch(e)}
                        >
                          {
                            matches.map((m) => (
                              <MenuItem key={m.id} value={m.id}>{`${m.id}: ${participants.find((player) => player.id === m.player1Id).displayName || 'Player'} vs ${participants.find((player) => player.id === m.player2Id).displayName || 'Player'}`}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={5}>
                      <Autocomplete
                        freeSolo
                        options={participants.map((player) => player.displayName)}
                        renderInput={(params) => (
                          <TextField {...params} label="Player 1" margin="normal" fullWidth />
                        )}
                        value={scoreboard.p1n}
                        onInputChange={(_, value) => this.changeScoreboardValue('p1n', value)}
                      />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <TextField
                        label="P1S"
                        type="number"
                        margin="normal"
                        fullWidth
                        value={scoreboard.p1s}
                        onChange={(e) => this.changeScoreboardValue('p1s', +e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <TextField
                        label="P2S"
                        type="number"
                        margin="normal"
                        fullWidth
                        value={scoreboard.p2s}
                        onChange={(e) => this.changeScoreboardValue('p2s', +e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={10} sm={5}>
                      <Autocomplete
                        freeSolo
                        options={participants.map((player) => player.displayName)}
                        renderInput={(params) => (
                          <TextField {...params} label="Player 2" margin="normal" fullWidth />
                        )}
                        value={scoreboard.p2n}
                        onInputChange={(_, value) => this.changeScoreboardValue('p2n', value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Reset - Be sure to hit &quot;Update Scoreboard&quot;
                      </Typography>
                      <ButtonGroup
                        color="secondary"
                      >
                        <Button
                          onClick={() => this.reset({ names: true, scores: true })}
                        >
                          Both
                        </Button>
                        <Button
                          onClick={() => this.reset({ names: true })}
                        >
                          Names
                        </Button>
                        <Button
                          onClick={() => this.reset({ scores: true })}
                        >
                          Scores
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Swap
                      </Typography>
                      <ButtonGroup>
                        <Button
                          onClick={() => this.swap({ names: true, scores: true })}
                        >
                          Both
                        </Button>
                        <Button
                          onClick={() => this.swap({ names: true })}
                        >
                          Names
                        </Button>
                        <Button
                          onClick={() => this.swap({ scores: true })}
                        >
                          Scores
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Top (White/Left)"
                        fullWidth
                        value={scoreboard.tl}
                        onChange={(e) => this.changeScoreboardValue('tl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Top (Orange/Right)"
                        fullWidth
                        value={scoreboard.tr}
                        onChange={(e) => this.changeScoreboardValue('tr', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Bottom (Orange/Left)"
                        fullWidth
                        value={scoreboard.bl}
                        onChange={(e) => this.changeScoreboardValue('bl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Bottom (White/Right)"
                        fullWidth
                        value={scoreboard.br}
                        onChange={(e) => this.changeScoreboardValue('br', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Update Scoreboard
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Camera</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form
                  onSubmit={(e) => this.updateCamera(e)}
                  className={classes.form}
                  noValidate
                >
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Event Name (Top Left)"
                        fullWidth
                        value={camera.hbk}
                        onChange={(e) => this.changeCameraValue('hbk', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Game Name (Top Right)"
                        fullWidth
                        value={camera.game}
                        onChange={(e) => this.changeCameraValue('game', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Venue Name (Bottom Left)"
                        fullWidth
                        value={camera.brewdog}
                        onChange={(e) => this.changeCameraValue('brewdog', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Date (Bottom Left)"
                        fullWidth
                        value={camera.date}
                        onChange={(e) => this.changeCameraValue('date', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="FGC Name (Bottom Right)"
                        fullWidth
                        value={camera.fgc}
                        onChange={(e) => this.changeCameraValue('fgc', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Facebook"
                        fullWidth
                        value={camera.facebook}
                        onChange={(e) => this.changeCameraValue('facebook', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Twitter"
                        fullWidth
                        value={camera.twitter}
                        onChange={(e) => this.changeCameraValue('twitter', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Website"
                        fullWidth
                        value={camera.web}
                        onChange={(e) => this.changeCameraValue('web', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Update Camera
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Settings</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid
                  container
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="overline" display="block" gutterBottom>
                      Get Players from Challonge/Smash.gg Tournament
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Tournament URL"
                      fullWidth
                      value={bracket}
                      onChange={(e) => this.changeBracketValue(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => this.updateParticipants()}
                    >
                      Get Participants
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Import/Export Values
                    </Typography>
                    <ButtonGroup>
                      <Button>
                        <Files
                          onChange={(file) => this.importFilesChange(file)}
                          multiple={false}
                          accepts={['application/json', '.json']}
                          clickable
                        >
                          Import
                        </Files>
                      </Button>
                      <Button
                        onClick={() => this.export()}
                      >
                        Export
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Nightbot</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form
                  onSubmit={(e) => this.updateNightbot(e)}
                  className={classes.form}
                  noValidate
                >
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Bracket - Command: '!bracket' or '!brackets'"
                        fullWidth
                        value={nightbot.bracket}
                        onChange={(e) => this.changeNightbotValue('bracket', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Social Media Info - Command: '!social' or '!follow'"
                        fullWidth
                        value={nightbot.social}
                        onChange={(e) => this.changeNightbotValue('social', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Update Nightbot
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Tool);
