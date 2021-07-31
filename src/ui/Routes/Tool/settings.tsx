import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Files from "react-files";
import { toggleDarkMode } from "~/ui/Services/helper";

interface IToolSettingsAccordionProps {
  bracket: string;
  changeBracketValue: Function;
  updateParticipants: Function;
  importFilesChange: Function;
  exportFiles: Function;
  setDarkMode: Function;
}

const SettingsAccordion = (props: IToolSettingsAccordionProps) => {
  const {
    bracket,
    changeBracketValue,
    updateParticipants,
    importFilesChange,
    exportFiles,
    setDarkMode,
  } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="overline" display="block" gutterBottom>
              Get Players from Challonge/Smash.gg Tournament
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Tournament URL"
              fullWidth
              value={bracket}
              onChange={(e) => changeBracketValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => updateParticipants()}
            >
              Get Participants
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="overline" display="block" gutterBottom>
              Import/Export Values
            </Typography>
            <ButtonGroup>
              <Button>
                <Files
                  onChange={(file) => importFilesChange(file)}
                  multiple={false}
                  accepts={["application/json", ".json"]}
                  clickable
                >
                  Import
                </Files>
              </Button>
              <Button onClick={() => exportFiles()}>Export</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="overline" display="block" gutterBottom>
              Light/Dark Mode
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setDarkMode(toggleDarkMode())}
            >
              Toggle
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SettingsAccordion;
