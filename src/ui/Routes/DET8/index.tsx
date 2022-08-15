/* eslint-disable react/require-default-props */
// eslint-disable-next-line no-use-before-define
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";
import Socket from "~/ui/Services/socket";
import theme, { IThemeFont } from "~/theme";
import Text from "~/ui/Components/Text";
import TextBox from "~/ui/Components/TextBox";
import { IBreakWithVideoState } from "../BreakWithVideo";

export interface IMatch {
  identifier: string;
  player1DisplayName: string;
  player2DisplayName: string;
  player1Score: number;
  player2Score: number;
}

const styles: Styles = {
  qr: {
    position: "absolute",
    top: "177px",
    left: "300px",
    zIndex: "1",
    boxShadow: theme.boxShadow,
  },
  root: theme.container,
  match: {
    padding: "4px 0",
  }
};

const { white } = theme;

const smallText: IThemeFont = merge({}, theme.engschrift, {
  fontSize: "24pt",
});

interface MatchProps {
  top: number;
  right?: number;
  hideScores?: boolean;
  match: IMatch;
  identifierShift?: boolean;
  identifierColor?: string;
  padding: string;
}

const Match = ({
  top,
  right,
  hideScores = false,
  match,
  padding,
}: MatchProps) => {
  return (
    <>
      <TextBox
        top={top}
        right={right}
        textAlign="right"
        maxWidth="235px"
        width="235px"
        backgroundColor={theme.transparent}
        truncate
      >
        <Text position="relative" font={smallText} color={white}>
          {match.player1DisplayName}
        </Text>
        <div className={padding}></div>
        <Text position="relative" font={smallText} color={white}>
          {match.player2DisplayName}
        </Text>
      </TextBox>
      {!hideScores && (
        <TextBox
          top={top}
          right={right && right - 52}
          backgroundColor={theme.transparent}
        >
          <Text position="relative" font={smallText} color={white}>
            {match.player1Score}
          </Text>
          <div className={padding}></div>
          <Text position="relative" font={smallText} color={white}>
            {match.player2Score}
          </Text>
        </TextBox>
      )}
    </>
  );
};

interface IDEWT8Props extends WithStylesProps<typeof styles> {}

interface IDEWT8State {
  matches: IMatch[];
  bracket: string;
  info: IBreakWithVideoState;
}

class DET8 extends React.Component<IDEWT8Props, IDEWT8State> {
  private io = new Socket();

  constructor(props) {
    super(props);

    const defaultMatch: IMatch = {
      identifier: "N/A",
      player1DisplayName: "N/A",
      player2DisplayName: "N/A",
      player1Score: 0,
      player2Score: 0,
    };

    this.state = {
      bracket: "",
      matches: Array(10).fill(defaultMatch),
      info: {
        event: "SoulCalibur VI",
        game: "Game Fighter Name",
        countdown: 300,
        venue: "BrewDog Brighton",
        showTimer: false,
        startText: "Starts",
      }
    };

    this.io.on("matches", ({ bracket, matches }) => {
      console.log("received matches");
      this.setState({ matches, bracket });
    });
    
    this.io.on("prestream", (prestream) => {
      this.setState({ info: prestream });
    });
  }

  componentDidMount() {
    this.io.emit("matches-get");
    this.io.emit("prestream-get");
    setInterval(() => {
      const { bracket } = this.state;
      if (bracket) {
        console.log('get bracket matches', bracket);
        this.io.emit("bracket-get-matches", bracket);
      }
    }, 60 * 1000)
  }

  render() {
    const { matches, info } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* Losers Top 8 1 */}
        <Match padding={classes.match} top={667} right={1553} match={matches[0]} />
        {/* Losers Top 8 2 */}
        <Match padding={classes.match} top={883} right={1553} match={matches[1]} />
        {/* Losers QF 1 */}
        <Match padding={classes.match} top={651} right={1185} match={matches[2]} />
        {/* Losers QF 2 */}
        <Match padding={classes.match} top={865} right={1185} match={matches[3]} />
        {/* Losers Semi Final */}
        <Match padding={classes.match} top={757} right={813} match={matches[4]} />
        {/* Losers Final */}
        <Match padding={classes.match} top={741} right={453} match={matches[5]} />
        {/* Winners Semi Final 1 */}
        <Match padding={classes.match} top={98} right={1553} match={matches[6]} />
        {/* Winners Semi Final 2 */}
        <Match padding={classes.match} top={444} right={1553} match={matches[7]} />
        {/* Winners Final */}
        <Match padding={classes.match} top={271} right={1185} match={matches[8]} />
        {/* Grand Final */}
        <Match padding={classes.match}
          top={269}
          right={660}
          match={matches[9]}
          identifierShift={false}
        />
        {/* Game info */}
        <TextBox
          // event text
          top={247}
          left={1450}
          textAlign="left"
          width="100%"
          padding={0}
          backgroundColor={theme.transparent}
        >
          <Text
            font={merge({}, theme.engschrift, {
              fontSize: "52px",
            })}
          >
            {info.event}
          </Text>
        </TextBox>
      </div>
    );
  }
}

export default withStyles(styles)(DET8);
