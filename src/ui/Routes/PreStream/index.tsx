import * as React from 'react';
import withStyles from 'react-jss';
import { merge } from 'lodash';

import Countdown from 'react-countdown-now';
import theme from '~theme';
import Socket from '~ui/Services/socket';
import GlassImage from '~ui/Components/GlassImage';
import TextBox from '~ui/Components/TextBox';
import Text from '~ui/Components/Text';


const styles = {
  root: theme.container,
};

const TimerComplete: any = (text = '...', color = theme.orange, font = theme.cabin, fontSize = '50px') => (
  <TextBox
    bottom={5}
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

const countdownRenderer = (color = theme.white, font = theme.cabin, fontSize = '50px') => ({
  hours, minutes, seconds, completed,
}): JSX.Element => {
  if (completed) {
    return <TimerComplete />;
  }
  return (
    <TextBox
      bottom={5}
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
        {`${minutes}:${seconds}`}
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
      countdown: 3600000,
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
                rawlineBold,
                {
                  fontSize: '70px',
                },
              )
            }
          >
            {venue}
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
