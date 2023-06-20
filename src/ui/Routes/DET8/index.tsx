/* eslint-disable react/require-default-props */
// eslint-disable-next-line no-use-before-define
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";
import QRCode from "qrcode.react";
import Socket from "~/ui/Services/socket";
import theme, { IThemeFont } from "~/theme";
import Camera from "../Camera";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";

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
};

const { transparent, cabin, orange, lightGrey, white } = theme;

const smallText: IThemeFont = merge({}, theme.rawlineBold, {
  fontSize: "20pt",
});

const identifierText: IThemeFont = merge(
  {},
  {
    fontVariant: "small-caps",
    fontSize: "24pt",
  },
  cabin
);

interface MatchProps {
  top: number;
  right?: number;
  hideScores?: boolean;
  match: IMatch;
  identifierShift?: boolean;
  identifierColor?: string;
  isReset?: boolean;
}

const getColor = (name: string, ps: number, os: number) => {
  if (name === "N/A" || name.includes("From")) return lightGrey;
  if (ps > os) return orange;
  return white;
};

const Match = ({
  top,
  right,
  hideScores = false,
  match,
  identifierShift = true,
  identifierColor,
  isReset = false,
}: MatchProps) => {
  const p1Color = getColor(
    match.player1DisplayName,
    match.player1Score,
    match.player2Score
  );
  const p2Color = getColor(
    match.player2DisplayName,
    match.player2Score,
    match.player1Score
  );

  return (
    <>
      {match.identifier && (
        <TextBox
          top={top - 40}
          right={right - (identifierShift ? 56 : 0)}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text color={identifierColor} font={identifierText}>
            {match.identifier + (isReset ? " Reset" : "")}
          </Text>
        </TextBox>
      )}
      <TextBox
        top={top}
        right={right}
        textAlign="right"
        border={theme.borderBottom}
        boxShadow={theme.boxShadow}
        maxWidth="270px"
        width="270px"
        backgroundColor={theme.greyTranslucent}
        truncate
      >
        <Text position="relative" top="-5px" font={smallText} color={p1Color}>
          {match.player1DisplayName}
        </Text>
        <br />
        <Text position="relative" top="-5px" font={smallText} color={p2Color}>
          {match.player2DisplayName}
        </Text>
      </TextBox>
      {!hideScores && (
        <TextBox
          top={top}
          right={right && right - 52}
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
          backgroundColor={theme.greyTranslucent}
        >
          <Text position="relative" top="-5px" font={smallText} color={p1Color}>
            {match.player1Score}
          </Text>
          <br />
          <Text position="relative" top="-5px" font={smallText} color={p2Color}>
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
  hasReset: boolean;
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
      hasReset: false,
    };

    this.io.on("matches", ({ bracket, matches }) => {
      console.log("received matches");
      let hasReset = false;
      if (
        matches[10] &&
        matches[10].player1DisplayName !== "N/A" &&
        matches[10].player2DisplayName !== "N/A"
      ) {
        hasReset = true;
      }
      this.setState({ matches, bracket, hasReset });
    });
  }

  componentDidMount() {
    this.io.emit("matches-get");
    const { bracket } = this.state;
    if (bracket) {
      console.log("get bracket matches", bracket);
      this.io.emit("bracket-get-matches", bracket);
    }
  }

  render() {
    const { matches, bracket, hasReset } = this.state;
    const { classes } = this.props;
    return (
      <Camera>
        <QRCode
          className={classes.qr}
          value={bracket}
          size={256}
          includeMargin
          bgColor={theme.greyTranslucent}
          fgColor={theme.white}
        />
        {/* Losers Top 8 1 */}
        <Match top={531} right={1585} match={matches[0]} />
        {/* Losers Top 8 2 */}
        <Match top={708} right={1585} match={matches[1]} />
        {/* Losers QF 1 */}
        <Match top={570} right={1200} match={matches[2]} />
        {/* Losers QF 2 */}
        <Match top={747} right={1200} match={matches[3]} />
        {/* Losers Semi Final */}
        <Match top={658} right={810} match={matches[4]} />
        {/* Losers Final */}
        <Match top={617} right={420} match={matches[5]} />
        {/* Winners Semi Final 1 */}
        <Match top={177} right={810} match={matches[6]} />
        {/* Winners Semi Final 2 */}
        <Match top={354} right={810} match={matches[7]} />
        {/* Winners Final */}
        <Match top={265} right={420} match={matches[8]} />
        {/* Grand Final */}
        <Match
          top={hasReset ? 400 : 440}
          right={hasReset ? 150 : 100}
          match={matches[9]}
          identifierColor={orange}
        />
        {/* Reset Grand Final */}
        {hasReset && (
          <Match
            top={520}
            right={75}
            match={matches[10]}
            identifierColor={orange}
            isReset={hasReset}
          />
        )}
      </Camera>
    );
  }
}

export default withStyles(styles)(DET8);
