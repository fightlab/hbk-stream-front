import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { ISocial } from "../Camera";
import { IToolChange, IToolUpdate } from ".";

interface IToolSocialAccordionProps {
  classes: {
    form: string;
  };
  social: ISocial;
  update: IToolUpdate;
  change: IToolChange;
  toolKey: string;
  unsaved: boolean;
}

const SocialAccordion = (props: IToolSocialAccordionProps) => {
  const { change, classes, social, update, toolKey, unsaved } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Social</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          onSubmit={(e) => update(e, toolKey)}
          className={classes.form}
          noValidate
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Web"
                fullWidth
                value={social.web}
                onChange={(e) => change(toolKey, "web", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Facebook"
                fullWidth
                value={social.facebook}
                onChange={(e) => change(toolKey, "facebook", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Twitter"
                fullWidth
                value={social.twitter}
                onChange={(e) => change(toolKey, "twitter", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Social
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

export default SocialAccordion;
