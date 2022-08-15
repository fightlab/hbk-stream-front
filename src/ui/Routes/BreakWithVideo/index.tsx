import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";

import Countdown from "react-countdown";
import theme from "~/theme";
import Socket from "~/ui/Services/socket";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";

const styles: Styles = {
  root: theme.container,
};

interface IBreakWithVideoProps extends WithStylesProps<typeof styles> {}

export interface IBreakWithVideoState {
  event: string;
  game: string;
  countdown: number;
  venue: string;
  showTimer: boolean;
  startText: string;
}

const formatTime = ({ hours = 0, minutes = 0, seconds = 0 }): string =>
  `in ${hours ? `${hours}h` : ""} ${
    minutes ? `${minutes}m` : ""
  } ${seconds ? `${seconds}s` : ""}`;

const TimerComplete: any = (
  text = "soon",
  color = theme.white,
  font = theme.engschrift,
  fontSize = "50px"
) => (
  <TextBox
    top={133}
    left={313}
    textAlign="left"
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
  (color = theme.white, font = theme.engschrift, fontSize = "50px") =>
  ({ hours, minutes, seconds, completed }): JSX.Element => {
    if (completed) {
      return TimerComplete();
    }
    return (
      <TextBox
        top={133}
        left={313}
        textAlign="left"
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

class BreakWithVideo extends React.Component<IBreakWithVideoProps, IBreakWithVideoState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      event: "Habrewken #000",
      game: "Game Fighter Name",
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
    const { event, countdown, venue, showTimer, startText } =
      this.state;

    const { transparent, engschrift } = theme;

    return (
      <div className={classes.root}>
        <TextBox
          // event text
          top={65}
          left={1195}
          textAlign="left"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, engschrift, {
              fontSize: "60px",
            })}
          >
            {event}
          </Text>
        </TextBox>
        <TextBox
          // venue text
          top={133}
          left={1195}
          textAlign="left"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, engschrift, {
              fontSize: "50px",
            })}
          >
            {venue}
          </Text>
        </TextBox>
        <TextBox
          top={65}
          left={313}
          textAlign="left"
          width="100%"
          padding={0}
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, engschrift, {
              fontSize: "60px",
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

export default withStyles(styles)(BreakWithVideo);
