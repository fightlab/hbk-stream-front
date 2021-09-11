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
import { ICommentatorState } from "../Commentator";
import { IToolChange, IToolUpdate } from ".";

interface IToolCommentatorAccordionProps {
  classes: {
    form: string;
  };
  commentator: ICommentatorState;
  update: IToolUpdate;
  change: IToolChange;
  toolKey: string;
  unsaved: boolean;
}

const CommentatorAccordion = (props: IToolCommentatorAccordionProps) => {
  const { classes, commentator, update, change, toolKey, unsaved } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Commentator</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          onSubmit={(e) => update(e, toolKey)}
          className={classes.form}
          noValidate
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Commentator Left"
                fullWidth
                value={commentator.cl}
                onChange={(e) => change(toolKey, "cl", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Commentator Right"
                fullWidth
                value={commentator.cr}
                onChange={(e) => change(toolKey, "cr", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Commentator Left Twitter"
                fullWidth
                value={commentator.clTwitter}
                onChange={(e) => change(toolKey, "clTwitter", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Commentator Right Twitter"
                fullWidth
                value={commentator.crTwitter}
                onChange={(e) => change(toolKey, "crTwitter", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Commentators
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

export default CommentatorAccordion;
