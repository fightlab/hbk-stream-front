import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const NightbotExpansionPanel = (props: IToolNightbotExpansionPanelProps) => {
  const {
    classes,
    nightbot,
    update,
    changeNightbotValue,
  } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Nightbot</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form
          onSubmit={(e) => update(e, 'nightbot')}
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
                onChange={(e) => changeNightbotValue('bracket', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Social Media Info - Command: '!social' or '!follow'"
                fullWidth
                value={nightbot.social}
                onChange={(e) => changeNightbotValue('social', e.target.value)}
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
  );
};

export default NightbotExpansionPanel;
