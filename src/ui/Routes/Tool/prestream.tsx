import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PreStreamExpansionPanel = (props: IToolPreStreamExpansionPanelProps) => {
  const {
    changePrestreamValue,
    classes,
    prestream,
    updatePrestream,
  } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>PreStream</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form
          onSubmit={(e) => updatePrestream(e)}
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
                label="Event Name"
                fullWidth
                value={prestream.event}
                onChange={(e) => changePrestreamValue('event', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Venue Name"
                fullWidth
                value={prestream.venue}
                onChange={(e) => changePrestreamValue('venue', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Game/Tournament Name"
                fullWidth
                value={prestream.game}
                onChange={(e) => changePrestreamValue('game', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Background"
                fullWidth
                value={prestream.bg}
                onChange={(e) => changePrestreamValue('bg', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Countdown (Seconds)"
                fullWidth
                type="number"
                value={prestream.countdown}
                onChange={(e) => changePrestreamValue('countdown', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Prestream
              </Button>
            </Grid>
          </Grid>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default PreStreamExpansionPanel;
