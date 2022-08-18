import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withStyles from "react-jss";

import Socket from "~/ui/Services/socket";
import ScoreboardAccordion from "./scoreboard";
import CameraAccordion from "./camera";
import SettingsAccordion from "./settings";
import NightbotAccordion from "./nightbot";
import PreStreamAccordion from "./prestream";
import SocialAccordion from "./social";
import CommentatorAccordion from "./commentator";

import { ICamera, ISocial } from "~/ui/Routes/Camera";
import { IScoreboardState } from "../Scoreboard";
import { IMatch } from "../DET8";
import { IPreStreamState } from "../PreStream";
import { ICommentatorState } from "../Commentator";

const styles = {
  form: {
    width: "100%",
  },
};

export interface IToolUpdate {
  (e: React.FormEvent<HTMLFormElement>, key: string): void;
}

export interface IToolChange {
  (key: string, name: string, value: any): void;
}

interface IToolUnsaved {
  scoreboard: boolean;
  camera: boolean;
  prestream: boolean;
  social: boolean;
  nightbot: boolean;
  commentator: boolean;
}

export interface IToolPlayer {
  displayName: string;
  handle: string;
}

interface IToolProps {
  classes: {
    form: string;
  };
  setDarkMode: Function;
}

export interface IToolNightbot {
  bracket: string;
  social: string;
}

interface IToolState {
  scoreboard: IScoreboardState;
  camera: ICamera;
  bracket: string;
  participants: Array<IToolPlayer>;
  nightbot: IToolNightbot;
  prestream: IPreStreamState;
  social: ISocial;
  unsaved: IToolUnsaved;
  matches: Array<IMatch>;
  commentator: ICommentatorState;
  [key: string]: any;
}

interface IToolScoreboardResetParam {
  names?: boolean;
  scores?: boolean;
}
export interface IToolScoreboardReset {
  (param: IToolScoreboardResetParam): void;
}

interface IToolScoreboardSwapParam {
  names?: boolean;
  scores?: boolean;
}
export interface IToolScoreboardSwap {
  (param: IToolScoreboardSwapParam): void;
}

class Tool extends React.Component<IToolProps, IToolState> {
  private io = new Socket();

  private importFileReader = new FileReader();

  constructor(props) {
    super(props);

    this.state = {
      bracket: "",
      scoreboard: {
        p1n: "",
        p2n: "",
        p1s: 0,
        p2s: 0,
        p1l: false,
        p2l: false,
        tl: "HBK",
        tr: "#000",
        bl: "Brewdog",
        br: "Brighton",
        lTag: "[L]",
      },
      camera: {
        hbk: "Habrewken #000",
        brewdog: "Brewdog Brighton",
        fgc: "Brighton Fighting Game Community",
        date: "Wednesday XXth MONTH 20XX",
        game: "Street Fighter V",
        bg: "hbk",
      },
      participants: [],
      nightbot: {
        bracket: "https://hbk.challonge.com",
        social:
          "• FOLLOW US ON • WEB: https://hbk.gg • FACEBOOK: https://www.facebook.com/FightLabBrighton/ • TWITTER: https://twitter.com/fight_lab • DISCORD: https://discord.gg/rjpDJdz •",
      },
      prestream: {
        event: "Habrewken #000",
        game: "Game Fighter Name",
        bg: "hbk",
        countdown: 70000,
        venue: "BrewDog Brighton",
        showTimer: true,
        startText: "Starts",
      },
      social: {
        facebook: "fightlabbrighton",
        twitter: "fight_lab",
        web: "hbk.gg",
      },
      commentator: {
        cl: '',
        cr: '',
        clTwitter: '',
        crTwitter: '',
      },
      unsaved: {
        camera: false,
        nightbot: false,
        prestream: false,
        scoreboard: false,
        social: false,
        commentator: false,
      },
      matches: [],
    };

    this.io.on("scoreboard", (scoreboard) => {
      const { unsaved } = this.state;
      unsaved.scoreboard = false;
      this.setState({ scoreboard, unsaved });
    });

    this.io.on("camera", (camera) => {
      const { unsaved } = this.state;
      unsaved.camera = false;
      this.setState({ camera, unsaved });
    });

    this.io.on("nightbot", (nightbot) => {
      const { unsaved } = this.state;
      unsaved.nightbot = false;
      this.setState({ nightbot, unsaved });
    });

    this.io.on("prestream", (prestream) => {
      const { unsaved } = this.state;
      unsaved.prestream = false;
      this.setState({ prestream, unsaved });
    });

    this.io.on("social", (social) => {
      const { unsaved } = this.state;
      unsaved.social = false;
      this.setState({ social, unsaved });
    });

    this.io.on("participants", ({ bracket, participants }) => {
      this.setState({ bracket, participants });
    });

    this.io.on("matches", ({ bracket, matches }) => {
      this.setState({ bracket, matches });
    });
    
    this.io.on("commentator", (commentator) => {
      const { unsaved } = this.state;
      unsaved.commentator = false;
      this.setState({ commentator, unsaved })
    });

    this.importFileReader.onload = (event) => {
      const json = event.target.result;
      const parsed = JSON.parse(json.toString());
      this.setState(parsed);
    };
  }

  componentDidMount() {
    this.io.emit("scoreboard-get");
    this.io.emit("camera-get");
    this.io.emit("participants-get");
    this.io.emit("matches-get");
    this.io.emit("nightbot-get");
    this.io.emit("prestream-get");
    this.io.emit("social-get");
    this.io.emit("commentator-get");
  }

  private update: IToolUpdate = (e, key) => {
    e.preventDefault();
    const { [key]: data } = this.state;
    this.io.emit(`${key}-update`, data);
  };

  private updateParticipants = () => {
    const { bracket } = this.state;
    this.io.emit("bracket-get", bracket);
  };

  private updateMatches = () => {
    const { bracket } = this.state;
    this.io.emit("bracket-get-matches", bracket);
  };

  private change: (key: string, name: string, value: any) => void = (
    key,
    name,
    value
  ) => {
    const { [key]: data, unsaved } = this.state;
    if (value !== data[name]) {
      data[name] = value;
      unsaved[key] = true;
      this.setState({ [key]: data, unsaved });
    }
  };

  private changeBracketValue = (bracket) => {
    this.setState({ bracket });
  };

  private importFilesChange = (files) => {
    const [file = {}] = files;
    this.importFileReader.readAsText(file);
  };

  private exportFiles = () => {
    const state = JSON.stringify(this.state);
    const blob = new Blob([state], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "export.json";
    link.href = url;
    link.click();
  };

  private reset: IToolScoreboardReset = ({ names = false, scores = false }) => {
    const { scoreboard, unsaved } = this.state;
    if (names) {
      scoreboard.p1n = "";
      scoreboard.p2n = "";
      scoreboard.p1l = false;
      scoreboard.p2l = false;
      scoreboard.bl = "";
      scoreboard.br = "";
    }
    if (scores) {
      scoreboard.p1s = 0;
      scoreboard.p2s = 0;
    }
    unsaved.scoreboard = true;
    this.setState({ scoreboard, unsaved });
  };

  private swap: IToolScoreboardSwap = ({ names = false, scores = false }) => {
    const { scoreboard } = this.state;

    if (names) {
      [scoreboard.p1n, scoreboard.p2n] = [scoreboard.p2n, scoreboard.p1n];
      [scoreboard.p1l, scoreboard.p2l] = [scoreboard.p2l, scoreboard.p1l];
      [scoreboard.bl, scoreboard.br] = [scoreboard.br, scoreboard.bl];
    }

    if (scores) {
      [scoreboard.p1s, scoreboard.p2s] = [scoreboard.p2s, scoreboard.p1s];
    }

    this.setState({ scoreboard }, () =>
      this.io.emit("scoreboard-update", scoreboard)
    );
  };

  render() {
    const { classes, setDarkMode } = this.props;
    const {
      scoreboard,
      camera,
      bracket,
      participants,
      nightbot,
      prestream,
      social,
      unsaved,
      commentator,
    } = this.state;

    return (
      <>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              HBK Stream Tool
            </Typography>
            <ScoreboardAccordion
              classes={classes}
              participants={participants}
              scoreboard={scoreboard}
              update={this.update}
              change={this.change}
              reset={this.reset}
              swap={this.swap}
              toolKey="scoreboard"
              unsaved={unsaved.scoreboard}
            />
            <CommentatorAccordion
              classes={classes}
              commentator={commentator}
              update={this.update}
              change={this.change}
              toolKey="commentator"
              unsaved={unsaved.commentator}
            />
            {/* <CameraAccordion
              classes={classes}
              camera={camera}
              update={this.update}
              change={this.change}
              toolKey="camera"
              unsaved={unsaved.camera}
            /> */}
            <PreStreamAccordion
              classes={classes}
              prestream={prestream}
              change={this.change}
              update={this.update}
              toolKey="prestream"
              unsaved={unsaved.prestream}
            />
            <SocialAccordion
              classes={classes}
              social={social}
              change={this.change}
              update={this.update}
              toolKey="social"
              unsaved={unsaved.social}
            />
            <NightbotAccordion
              classes={classes}
              nightbot={nightbot}
              update={this.update}
              change={this.change}
              toolKey="nightbot"
              unsaved={unsaved.nightbot}
            />
            <SettingsAccordion
              bracket={bracket}
              changeBracketValue={this.changeBracketValue}
              updateParticipants={this.updateParticipants}
              importFilesChange={this.importFilesChange}
              exportFiles={this.exportFiles}
              setDarkMode={setDarkMode}
              updateMatches={this.updateMatches}
            />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Tool);
