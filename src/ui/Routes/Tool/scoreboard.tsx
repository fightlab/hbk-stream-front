import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const ScoreboardExpansionPanel = (props: IToolScoreboardExpansionPanelProps) => {
  const {
    classes,
    participants,
    scoreboard,
    updateScoreboard,
    changeScoreboardValue,
    reset,
    swap,
  } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Scoreboard</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form
          onSubmit={(e) => updateScoreboard(e)}
          className={classes.form}
          noValidate
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={10} sm={5}>
              <Autocomplete
                freeSolo
                options={participants.map((player) => player.displayName)}
                renderInput={(params) => (
                  <TextField {...params} label="Player 1" margin="normal" fullWidth />
                )}
                value={scoreboard.p1n}
                onInputChange={(_, value) => changeScoreboardValue('p1n', value)}
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                label="P1S"
                type="number"
                margin="normal"
                fullWidth
                value={scoreboard.p1s}
                onChange={(e) => changeScoreboardValue('p1s', +e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                label="P2S"
                type="number"
                margin="normal"
                fullWidth
                value={scoreboard.p2s}
                onChange={(e) => changeScoreboardValue('p2s', +e.target.value)}
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
                onInputChange={(_, value) => changeScoreboardValue('p2n', value)}
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
                  onClick={() => reset({ names: true, scores: true })}
                >
                  Both
                </Button>
                <Button
                  onClick={() => reset({ names: true })}
                >
                  Names
                </Button>
                <Button
                  onClick={() => reset({ scores: true })}
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
                  onClick={() => swap({ names: true, scores: true })}
                >
                  Both
                </Button>
                <Button
                  onClick={() => swap({ names: true })}
                >
                  Names
                </Button>
                <Button
                  onClick={() => swap({ scores: true })}
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
                onChange={(e) => changeScoreboardValue('tl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Top (Orange/Right)"
                fullWidth
                value={scoreboard.tr}
                onChange={(e) => changeScoreboardValue('tr', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Bottom (Orange/Left)"
                fullWidth
                value={scoreboard.bl}
                onChange={(e) => changeScoreboardValue('bl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Bottom (White/Right)"
                fullWidth
                value={scoreboard.br}
                onChange={(e) => changeScoreboardValue('br', e.target.value)}
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
  );
};


export default ScoreboardExpansionPanel;
