import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SocialExpansionPanel = (props: IToolSocialExpansionPanelProps) => {
  const {
    change,
    classes,
    social,
    update,
    toolKey,
  } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Social</Typography>
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
            <Grid item xs={12} sm={4}>
              <TextField
                label="Web"
                fullWidth
                value={social.web}
                onChange={(e) => change(toolKey, 'web', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Facebook"
                fullWidth
                value={social.facebook}
                onChange={(e) => change(toolKey, 'facebook', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Twitter"
                fullWidth
                value={social.twitter}
                onChange={(e) => change(toolKey, 'twitter', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Social
              </Button>
            </Grid>
          </Grid>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SocialExpansionPanel;
