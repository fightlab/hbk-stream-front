import * as React from 'react';
import withStyles from 'react-jss';
import { merge } from 'lodash';
import moment from 'moment';

import Countdown from 'react-countdown-now';
import theme from '~theme';
import Socket from '~ui/Services/socket';
import GlassImage from '~ui/Components/GlassImage';
import TextBox from '~ui/Components/TextBox';
import Text from '~ui/Components/Text';

const styles = {
  root: theme.container,
};

const formatTime = ({ hours = 0, minutes = 0, seconds = 0 }): string => {
  const now = moment();
  const timer = moment(now).add(hours, 'hour').add(minutes, 'minute').add(seconds, 'second');

  return timer.fromNow();
};

const TimerComplete: any = (text = 'now', color = theme.white, font = theme.rawline, fontSize = '70px') => (
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
      font={
    merge(
      {},
      font,
      {
        fontSize,
      },
    )
  }
    >
      {text}
    </Text>
  </TextBox>
);

const countdownRenderer = (color = theme.white, font = theme.rawline, fontSize = '70px') => ({
  hours, minutes, seconds, completed,
}): JSX.Element => {
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
        font={
          merge(
            {},
            font,
            {
              fontSize,
            },
          )
        }
      >
        {`${formatTime({ hours, minutes, seconds })}`}
      </Text>
    </TextBox>
  );
};

class PreStream extends React.Component<IPreStreamProps, IPreStreamState> {
  private io = new Socket()

  constructor(props) {
    super(props);

    this.state = {
      event: 'Habrewken #000',
      game: 'Game Fighter Name',
      bg: 'hbk',
      countdown: 3000,
      venue: 'BrewDog Brighton',
    };
  }

  render() {
    const { classes } = this.props;
    const {
      event, game, bg, countdown, venue,
    } = this.state;

    const {
      transparent, orange, cabin, rawline, rawlineBold,
    } = theme;

    return (
      <div className={classes.root}>
        <GlassImage
          src={`https://res.cloudinary.com/mkn-sh/image/upload/c_lfill,e_blur:2000,g_center,h_1080,w_1920/v1539443572/fgc/${bg}.jpg`}
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
            font={
              merge(
                {},
                rawlineBold,
                {
                  fontSize: '100px',
                },
              )
            }
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
            font={
              merge(
                {},
                rawline,
                {
                  fontSize: '70px',
                },
              )
            }
          >
            {venue}
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
            font={
              merge(
                {},
                rawline,
                {
                  fontSize: '70px',
                },
              )
            }
          >
            Stream starts
          </Text>
        </TextBox>
        <Countdown
          date={Date.now() + countdown}
          renderer={countdownRenderer()}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PreStream);
