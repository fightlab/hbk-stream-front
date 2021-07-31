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
import { ICamera } from "../Camera";
import { IToolChange, IToolUpdate } from ".";

interface IToolCameraAccordionProps {
  classes: {
    form: string;
  };
  camera: ICamera;
  update: IToolUpdate;
  change: IToolChange;
  toolKey: string;
  unsaved: boolean;
}

const CameraAccordion = (props: IToolCameraAccordionProps) => {
  const { classes, camera, update, change, toolKey, unsaved } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Camera</Typography>
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
                label="Event Name (Top Left)"
                fullWidth
                value={camera.hbk}
                onChange={(e) => change(toolKey, "hbk", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Game Name (Top Right)"
                fullWidth
                value={camera.game}
                onChange={(e) => change(toolKey, "game", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Venue Name (Bottom Left)"
                fullWidth
                value={camera.brewdog}
                onChange={(e) => change(toolKey, "brewdog", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Date (Bottom Left)"
                fullWidth
                value={camera.date}
                onChange={(e) => change(toolKey, "date", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="FGC Name (Bottom Right)"
                fullWidth
                value={camera.fgc}
                onChange={(e) => change(toolKey, "fgc", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Background"
                fullWidth
                value={camera.bg}
                onChange={(e) => change(toolKey, "bg", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Camera
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

export default CameraAccordion;
