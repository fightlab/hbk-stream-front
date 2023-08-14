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

const countries = [
  "Afghanistan|AF",
  "Åland Islands|AX",
  "Albania|AL",
  "Algeria|DZ",
  "American Samoa|AS",
  "AndorrA|AD",
  "Angola|AO",
  "Anguilla|AI",
  "Antarctica|AQ",
  "Antigua and Barbuda|AG",
  "Argentina|AR",
  "Armenia|AM",
  "Aruba|AW",
  "Australia|AU",
  "Austria|AT",
  "Azerbaijan|AZ",
  "Bahamas|BS",
  "Bahrain|BH",
  "Bangladesh|BD",
  "Barbados|BB",
  "Belarus|BY",
  "Belgium|BE",
  "Belize|BZ",
  "Benin|BJ",
  "Bermuda|BM",
  "Bhutan|BT",
  "Bolivia|BO",
  "Bosnia and Herzegovina|BA",
  "Botswana|BW",
  "Bouvet Island|BV",
  "Brazil|BR",
  "British Indian Ocean Territory|IO",
  "Brunei Darussalam|BN",
  "Bulgaria|BG",
  "Burkina Faso|BF",
  "Burundi|BI",
  "Cambodia|KH",
  "Cameroon|CM",
  "Canada|CA",
  "Cape Verde|CV",
  "Cayman Islands|KY",
  "Central African Republic|CF",
  "Chad|TD",
  "Chile|CL",
  "China|CN",
  "Christmas Island|CX",
  "Cocos (Keeling) Islands|CC",
  "Colombia|CO",
  "Comoros|KM",
  "Congo|CG",
  "Congo, The Democratic Republic of the|CD",
  "Cook Islands|CK",
  "Costa Rica|CR",
  "Cote D'Ivoire|CI",
  "Croatia|HR",
  "Cuba|CU",
  "Cyprus|CY",
  "Czech Republic|CZ",
  "Denmark|DK",
  "Djibouti|DJ",
  "Dominica|DM",
  "Dominican Republic|DO",
  "Ecuador|EC",
  "Egypt|EG",
  "El Salvador|SV",
  "Equatorial Guinea|GQ",
  "Eritrea|ER",
  "Estonia|EE",
  "Ethiopia|ET",
  "Falkland Islands (Malvinas)|FK",
  "Faroe Islands|FO",
  "Fiji|FJ",
  "Finland|FI",
  "France|FR",
  "French Guiana|GF",
  "French Polynesia|PF",
  "French Southern Territories|TF",
  "Gabon|GA",
  "Gambia|GM",
  "Georgia|GE",
  "Germany|DE",
  "Ghana|GH",
  "Gibraltar|GI",
  "Greece|GR",
  "Greenland|GL",
  "Grenada|GD",
  "Guadeloupe|GP",
  "Guam|GU",
  "Guatemala|GT",
  "Guernsey|GG",
  "Guinea|GN",
  "Guinea-Bissau|GW",
  "Guyana|GY",
  "Haiti|HT",
  "Heard Island and Mcdonald Islands|HM",
  "Holy See (Vatican City State)|VA",
  "Honduras|HN",
  "Hong Kong|HK",
  "Hungary|HU",
  "Iceland|IS",
  "India|IN",
  "Indonesia|ID",
  "Iran, Islamic Republic Of|IR",
  "Iraq|IQ",
  "Ireland|IE",
  "Isle of Man|IM",
  "Israel|IL",
  "Italy|IT",
  "Jamaica|JM",
  "Japan|JP",
  "Jersey|JE",
  "Jordan|JO",
  "Kazakhstan|KZ",
  "Kenya|KE",
  "Kiribati|KI",
  "Korea, Democratic People's Republic of|KP",
  "Korea, Republic of|KR",
  "Kuwait|KW",
  "Kyrgyzstan|KG",
  "Lao People's Democratic Republic|LA",
  "Latvia|LV",
  "Lebanon|LB",
  "Lesotho|LS",
  "Liberia|LR",
  "Libyan Arab Jamahiriya|LY",
  "Liechtenstein|LI",
  "Lithuania|LT",
  "Luxembourg|LU",
  "Macao|MO",
  "Macedonia, The Former Yugoslav Republic of|MK",
  "Madagascar|MG",
  "Malawi|MW",
  "Malaysia|MY",
  "Maldives|MV",
  "Mali|ML",
  "Malta|MT",
  "Marshall Islands|MH",
  "Martinique|MQ",
  "Mauritania|MR",
  "Mauritius|MU",
  "Mayotte|YT",
  "Mexico|MX",
  "Micronesia, Federated States of|FM",
  "Moldova, Republic of|MD",
  "Monaco|MC",
  "Mongolia|MN",
  "Montserrat|MS",
  "Morocco|MA",
  "Mozambique|MZ",
  "Myanmar|MM",
  "Namibia|NA",
  "Nauru|NR",
  "Nepal|NP",
  "Netherlands|NL",
  "Netherlands Antilles|AN",
  "New Caledonia|NC",
  "New Zealand|NZ",
  "Nicaragua|NI",
  "Niger|NE",
  "Nigeria|NG",
  "Niue|NU",
  "Norfolk Island|NF",
  "Northern Mariana Islands|MP",
  "Norway|NO",
  "Oman|OM",
  "Pakistan|PK",
  "Palau|PW",
  "Palestinian Territory, Occupied|PS",
  "Panama|PA",
  "Papua New Guinea|PG",
  "Paraguay|PY",
  "Peru|PE",
  "Philippines|PH",
  "Pitcairn|PN",
  "Poland|PL",
  "Portugal|PT",
  "Puerto Rico|PR",
  "Qatar|QA",
  "Reunion|RE",
  "Romania|RO",
  "Russian Federation|RU",
  "RWANDA|RW",
  "Saint Helena|SH",
  "Saint Kitts and Nevis|KN",
  "Saint Lucia|LC",
  "Saint Pierre and Miquelon|PM",
  "Saint Vincent and the Grenadines|VC",
  "Samoa|WS",
  "San Marino|SM",
  "Sao Tome and Principe|ST",
  "Saudi Arabia|SA",
  "Senegal|SN",
  "Serbia and Montenegro|CS",
  "Seychelles|SC",
  "Sierra Leone|SL",
  "Singapore|SG",
  "Slovakia|SK",
  "Slovenia|SI",
  "Solomon Islands|SB",
  "Somalia|SO",
  "South Africa|ZA",
  "South Georgia and the South Sandwich Islands|GS",
  "Spain|ES",
  "Sri Lanka|LK",
  "Sudan|SD",
  "Surilabel|SR",
  "Svalbard and Jan Mayen|SJ",
  "Swaziland|SZ",
  "Sweden|SE",
  "Switzerland|CH",
  "Syrian Arab Republic|SY",
  "Taiwan|TW",
  "Tajikistan|TJ",
  "Tanzania, United Republic of|TZ",
  "Thailand|TH",
  "Timor-Leste|TL",
  "Togo|TG",
  "Tokelau|TK",
  "Tonga|TO",
  "Trinidad and Tobago|TT",
  "Tunisia|TN",
  "Turkey|TR",
  "Turkmenistan|TM",
  "Turks and Caicos Islands|TC",
  "Tuvalu|TV",
  "Uganda|UG",
  "Ukraine|UA",
  "United Arab Emirates|AE",
  "United Kingdom|GB",
  "United States|US",
  "United States Minor Outlying Islands|UM",
  "Uruguay|UY",
  "Uzbekistan|UZ",
  "Vanuatu|VU",
  "Venezuela|VE",
  "Viet Nam|VN",
  "Virgin Islands, British|VG",
  "Virgin Islands, U.S.|VI",
  "Wallis and Futuna|WF",
  "Western Sahara|EH",
  "Yemen|YE",
  "Zambia|ZM",
  "Zimbabwe|ZW",
];

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
              <Autocomplete
                freeSolo
                multiple={false}
                options={countries}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 1 Flag"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={scoreboard.bl}
                onInputChange={(_, value) => change(toolKey, "bl", value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                freeSolo
                multiple={false}
                options={countries}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Player 2 Flag"
                    margin="normal"
                    fullWidth
                  />
                )}
                value={scoreboard.br}
                onInputChange={(_, value) => change(toolKey, "br", value)}
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
