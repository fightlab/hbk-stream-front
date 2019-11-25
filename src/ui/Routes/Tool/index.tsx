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

import Socket from '~/ui/Services/socket'

interface IToolProps {
  classes: {
    form: string
  }
}

interface IToolState {
  io: Socket
}

const styles = {
  form: {
    width: '100%',
  },
};


class Tool extends React.Component<IToolProps, IToolState> {
  constructor(props) {
    super(props);

    this.state = {
      io: new Socket()
    };
  }

  render() {
    const { classes } = this.props;

    const names = [
      {
        handle: 'ColdLink',
      },
      {
        handle: 'Abra',
      },
      {
        handle: 'Kadabra',
      },
    ];
    return (
      <>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Tool
            </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Scoreboard</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form className={classes.form} noValidate>
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item xs={10} sm={5}>
                      <Autocomplete
                        freeSolo
                        options={names.map((option) => option.handle)}
                        renderInput={(params) => (
                          <TextField {...params} label="Player 1" margin="normal" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <TextField
                        label="P1S"
                        type="number"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <TextField
                        label="P2S"
                        type="number"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10} sm={5}>
                      <Autocomplete
                        freeSolo
                        options={names.map((option) => option.handle)}
                        renderInput={(params) => (
                          <TextField {...params} label="Player 2" margin="normal" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Reset
                      </Typography>
                      <ButtonGroup
                        color="secondary"
                      >
                        <Button>Both</Button>
                        <Button>Names</Button>
                        <Button>Scores</Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Swap
                      </Typography>
                      <ButtonGroup>
                        <Button>Both</Button>
                        <Button>Names</Button>
                        <Button>Scores</Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Top (White/Left)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Top (Orange/Right)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Bottom (Orange/Left)"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Bottom (White/Right)"
                        fullWidth
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
                <Typography>
                  Hello World!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Settings</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Hello World!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Tool);
