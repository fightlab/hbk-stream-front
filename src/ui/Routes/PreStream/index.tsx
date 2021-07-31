import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";

import Countdown from "react-countdown";
import theme from "~/theme";
import Socket from "~/ui/Services/socket";
import GlassImage from "~/ui/Components/GlassImage";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";

const styles: Styles = {
  root: theme.container,
};

interface IPreStreamProps extends WithStylesProps<typeof styles> {}

export interface IPreStreamState {
  event: string;
  game: string;
  bg: string;
  countdown: number;
  venue: string;
  showTimer: boolean;
  startText: string;
}

const formatTime = ({ hours = 0, minutes = 0, seconds = 0 }): string =>
  `in ${hours ? `${hours} hour${hours === 1 ? "" : "s"}` : ""} ${
    minutes ? `${minutes} minute${minutes === 1 ? "" : "s"}` : ""
  } ${seconds ? `${seconds} second${seconds === 1 ? "" : "s"}` : ""}`;

const TimerComplete: any = (
  text = "now",
  color = theme.white,
  font = theme.rawline,
  fontSize = "70px"
) => (
  <TextBox
    bottom={55}
    left={0}
    textAlign="center"
    width="100%"
    padding={0}
    backgroundColor={theme.transparent}
  >
    <Text
      color={color}
      font={merge({}, font, {
        fontSize,
      })}
    >
      {text}
    </Text>
  </TextBox>
);

const countdownRenderer =
  (color = theme.white, font = theme.rawline, fontSize = "70px") =>
  ({ hours, minutes, seconds, completed }): JSX.Element => {
    if (completed) {
      return TimerComplete();
    }
    return (
      <TextBox
        bottom={55}
        left={0}
        textAlign="center"
        width="100%"
        padding={0}
        backgroundColor={theme.transparent}
      >
        <Text
          color={color}
          font={merge({}, font, {
            fontSize,
          })}
        >
          {`${formatTime({ hours, minutes, seconds })}`}
        </Text>
      </TextBox>
    );
  };

class PreStream extends React.Component<IPreStreamProps, IPreStreamState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      event: "Habrewken #000",
      game: "Game Fighter Name",
      bg: "hbk",
      countdown: 300,
      venue: "BrewDog Brighton",
      showTimer: false,
      startText: "Starts",
    };

    this.io.on("prestream", (prestream) => {
      this.setState(prestream);
    });
  }

  componentDidMount() {
    this.io.emit("prestream-get");
  }

  render() {
    const { classes } = this.props;
    const { event, game, bg, countdown, venue, showTimer, startText } =
      this.state;

    const { transparent, orange, rawline, rawlineBold } = theme;

    return (
      <div className={classes.root}>
        <GlassImage
          src={`https://res.cloudinary.com/mkn-sh/image/upload/c_fill,e_blur:2000,g_center,h_1080,w_1920/v1539443572/fgc/${bg}.jpg`}
        />
        <TextBox
          // event text
          top={5}
          left={0}
          textAlign="center"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, rawlineBold, {
              fontSize: "100px",
            })}
          >
            {event}
          </Text>
        </TextBox>
        <TextBox
          // venue text
          top={135}
          left={0}
          textAlign="center"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={merge({}, rawline, {
              fontSize: "70px",
            })}
          >
            {venue}
          </Text>
        </TextBox>
        <TextBox
          // game text
          top={235}
          left={0}
          textAlign="center"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, rawlineBold, {
              fontSize: "64px",
            })}
          >
            {game}
          </Text>
        </TextBox>
        <TextBox
          bottom={125}
          left={0}
          textAlign="center"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, rawline, {
              fontSize: "70px",
            })}
          >
            {startText}
          </Text>
        </TextBox>
        {showTimer && (
          <Countdown
            date={Date.now() + countdown * 1000}
            renderer={countdownRenderer()}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PreStream);
