import * as React from 'react';
import withStyles from 'react-jss';
import Icon from '@mdi/react';
import { mdiFacebookBox, mdiTwitterBox, mdiWebBox } from '@mdi/js';
import { merge } from 'lodash';

import cameraImage from './hbk_camera.png';
import Socket from '~/ui/Services/socket';
import Image from '~/ui/Components/Image';
import theme from '~theme';
import Text from '~ui/Components/Text';
import TextBox from '~ui/Components/TextBox';

interface ICameraProps {
  classes: {
    root: string
    iconFacebook: string
    iconTwitter: string
    iconWeb: string
  }
}

interface ICameraState {
  io: Socket
  hbk: string
  brewdog: string
  fgc: string
  date: string
  facebook: string
  twitter: string
  web: string
  game: string
}

const styles = {
  root: theme.container,
  iconFacebook: {
    position: 'absolute',
    bottom: '105px',
    right: '5px',
    zIndex: 1,
  },
  iconTwitter: {
    position: 'absolute',
    bottom: '55px',
    right: '5px',
    zIndex: 1,
  },
  iconWeb: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    zIndex: 1,
  },
};

class Camera extends React.Component<ICameraProps, ICameraState> {
  constructor(props) {
    super(props);

    this.state = {
      io: new Socket(),
      hbk: 'Habrewken #000',
      brewdog: 'Brewdog Brighton',
      fgc: 'Brighton Fighting Game Community',
      date: 'Wednesday XXth MONTH 20XX',
      facebook: 'fightlabbrighton',
      twitter: 'fight_lab',
      web: 'hbk.gg',
      game: 'Street Fighter V',
    };
  }

  render() {
    const { classes } = this.props;
    const {
      hbk, brewdog, fgc, date, facebook, twitter, web, game,
    } = this.state;

    const { transparent, orange, cabin, rawline, rawlineBold } = theme;

    return (
      <div className={classes.root}>
        <Image
          src={cameraImage}
          alt="camera"
        />
        <TextBox
          // hbk text
          top={5}
          left={5}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            font={
              merge(
                {},
                rawlineBold,
                {
                  fontSize: '72pt',
                },
              )
            }
          >
            {hbk}
          </Text>
        </TextBox>
        <TextBox
          // game text
          top={5}
          right={5}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={
              merge(
                {},
                rawlineBold,
                {
                  fontSize: '72pt',
                },
              )
            }
          >
            {game}
          </Text>
        </TextBox>
        <TextBox
          // venue text
          bottom={30 + 50 * 2}
          left={5}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            font={
              merge(
                {},
                rawlineBold,
                {
                  fontSize: '56pt',
                },
              )
            }
          >
            {brewdog}
          </Text>
        </TextBox>
        <TextBox
          // date text
          bottom={50 * 1}
          left={5}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={
              merge(
                {},
                cabin,
                {
                  fontSize: '42pt',
                },
              )
            }
          >
            {date}
          </Text>
        </TextBox>
        <TextBox
          // facebook text
          bottom={5 + 50 * 2}
          right={50 * 1}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={
              merge(
                {},
                {
                  fontVariant: 'small-caps',
                  fontSize: '36pt',
                },
                cabin,
              )
            }
          >
            {facebook}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconFacebook}
          path={mdiFacebookBox}
          size="36pt"
          color={orange}
        />
        <TextBox
          // twitter text
          bottom={5 + 50 * 1}
          right={50 * 1}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={
              merge(
                {},
                {
                  fontVariant: 'small-caps',
                  fontSize: '36pt',
                },
                cabin,
              )
            }
          >
            {twitter}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconTwitter}
          path={mdiTwitterBox}
          size="36pt"
          color={orange}
        />
        <TextBox
          // web text
          bottom={5 + 50 * 0}
          right={50 * 1}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={
              merge(
                {},
                {
                  fontVariant: 'small-caps',
                  fontSize: '36pt',
                },
                cabin,
              )
            }
          >
            {web}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconWeb}
          path={mdiWebBox}
          size="36pt"
          color={orange}
        />
        <TextBox
          // fgc text
          bottom={5 + 50 * 3}
          right={5}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={
              merge(
                {},
                rawline,
                {
                  fontSize: '42pt',
                },
              )
            }
          >
            {fgc}
          </Text>
        </TextBox>
      </div>
    );
  }
}

export default withStyles(styles)(Camera);
