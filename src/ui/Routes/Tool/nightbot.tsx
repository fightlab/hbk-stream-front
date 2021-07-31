import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { IToolChange, IToolNightbot, IToolUpdate } from ".";

interface IToolNightbotAccordionProps {
  classes: {
    form: string;
  };
  nightbot: IToolNightbot;
  update: IToolUpdate;
  change: IToolChange;
  toolKey: string;
  unsaved: boolean;
}

const NightbotAccordion = (props: IToolNightbotAccordionProps) => {
  const { classes, nightbot, update, change, toolKey, unsaved } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Nightbot</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          onSubmit={(e) => update(e, toolKey)}
          className={classes.form}
          noValidate
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Bracket - Command: '!bracket' or '!brackets'"
                fullWidth
                value={nightbot.bracket}
                onChange={(e) => change(toolKey, "bracket", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Social Media Info - Command: '!social' or '!follow'"
                fullWidth
                value={nightbot.social}
                onChange={(e) => change(toolKey, "social", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Nightbot
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

export default NightbotAccordion;
