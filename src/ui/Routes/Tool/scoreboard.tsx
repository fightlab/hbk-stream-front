import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { IScoreboardState } from "../Scoreboard";
import {
  IToolChange,
  IToolPlayer,
  IToolScoreboardReset,
  IToolScoreboardSwap,
  IToolUpdate,
} from ".";

interface IToolScoreboardAccordionProps {
  classes: {
    form: string;
  };
  participants: Array<IToolPlayer>;
  scoreboard: IScoreboardState;
  update: IToolUpdate;
  change: IToolChange;
  reset: IToolScoreboardReset;
  swap: IToolScoreboardSwap;
  toolKey: string;
  unsaved: boolean;
}

const ScoreboardAccordion = (props: IToolScoreboardAccordionProps) => {
  const {
    classes,
    participants,
    scoreboard,
    update,
    change,
    reset,
    swap,
    toolKey,
    unsaved,
  } = props;

  const players = participants
    .map((player) => player.displayName)
    .sort((a, b) => {
      const x = a.toLowerCase();
      const y = b.toLowerCase();

      if (x > y) {
        return 1;
      }

      if (y > x) {
        return -1;
      }

      return 0;
    });

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Scoreboard</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          onSubmit={(e) => update(e, toolKey)}
          className={classes.form}
          noValidate
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={10} sm={5}>
              <Autocomplete
                freeSolo
                multiple={false}
                options={players}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 1"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={scoreboard.p1n}
                onInputChange={(_, value) => change(toolKey, "p1n", value)}
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                label="P1S"
                type="number"
                margin="normal"
                fullWidth
                value={scoreboard.p1s}
                onChange={(e) => change(toolKey, "p1s", e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                label="P2S"
                type="number"
                margin="normal"
                fullWidth
                value={scoreboard.p2s}
                onChange={(e) => change(toolKey, "p2s", e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <Autocomplete
                freeSolo
                multiple={false}
                options={players}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 2"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={scoreboard.p2n}
                onInputChange={(_, value) => change(toolKey, "p2n", value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Player 1 Flag"
                fullWidth
                value={scoreboard.bl}
                onChange={(e) => change(toolKey, "bl", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Player 2 Flag"
                fullWidth
                value={scoreboard.br}
                onChange={(e) => change(toolKey, "br", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={scoreboard.p1l}
                    onChange={(e) => change(toolKey, "p1l", e.target.checked)}
                    color="primary"
                  />
                }
                label={`Player 1 "${scoreboard.lTag}" Tag`}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={scoreboard.p2l}
                    onChange={(e) => change(toolKey, "p2l", e.target.checked)}
                    color="primary"
                  />
                }
                label={`Player 2 "${scoreboard.lTag}" Tag`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline" display="block" gutterBottom>
                Reset - Be sure to hit &quot;Update Scoreboard&quot;
              </Typography>
              <ButtonGroup color="secondary">
                <Button onClick={() => reset({ names: true, scores: true })}>
                  Both
                </Button>
                <Button onClick={() => reset({ names: true })}>Names</Button>
                <Button onClick={() => reset({ scores: true })}>Scores</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline" display="block" gutterBottom>
                Swap
              </Typography>
              <ButtonGroup>
                <Button onClick={() => swap({ names: true, scores: true })}>
                  Both
                </Button>
                <Button onClick={() => swap({ names: true })}>Names</Button>
                <Button onClick={() => swap({ scores: true })}>Scores</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Top (Left)"
                fullWidth
                value={scoreboard.tl}
                onChange={(e) => change(toolKey, "tl", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Top (Right)"
                fullWidth
                value={scoreboard.tr}
                onChange={(e) => change(toolKey, "tr", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="[L] Tag"
                fullWidth
                value={scoreboard.lTag}
                onChange={(e) => change(toolKey, "lTag", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Scoreboard
              </Button>
            </Grid>
            {unsaved && (
              <Grid item xs={12}>
                <Alert severity="warning">Unsaved Changes!</Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default ScoreboardAccordion;
