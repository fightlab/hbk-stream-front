import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const CameraExpansionPanel = (props: IToolCameraExpansionPanelProps) => {
  const {
    classes,
    camera,
    update,
    change,
    toolKey,
  } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Camera</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form
          onSubmit={(e) => update(e, toolKey)}
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
                onChange={(e) => change(toolKey, 'hbk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Game Name (Top Right)"
                fullWidth
                value={camera.game}
                onChange={(e) => change(toolKey, 'game', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Venue Name (Bottom Left)"
                fullWidth
                value={camera.brewdog}
                onChange={(e) => change(toolKey, 'brewdog', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Date (Bottom Left)"
                fullWidth
                value={camera.date}
                onChange={(e) => change(toolKey, 'date', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="FGC Name (Bottom Right)"
                fullWidth
                value={camera.fgc}
                onChange={(e) => change(toolKey, 'fgc', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Background"
                fullWidth
                value={camera.bg}
                onChange={(e) => change(toolKey, 'bg', e.target.value)}
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
  );
};

export default CameraExpansionPanel;
