import * as React from 'react';
import withStyles from 'react-jss';
import Icon from '@mdi/react';
import { mdiFacebookBox, mdiTwitterBox, mdiWebBox } from '@mdi/js';

import cameraImage from './hbk_camera.png';
import Socket from '~/ui/Services/socket';
import Image from '~/ui/Components/Image';
import theme from '~theme';
import Text from '~ui/Components/Text';

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
      fgc: 'Brighton FGC',
      date: new Date().toLocaleDateString(),
      facebook: 'fightlabbrighton',
      twitter: 'fight_lab',
      web: 'hbk.gg',
      game: 'GAME NAME',
    };
  }

  render() {
    const { classes } = this.props;
    const {
      hbk, brewdog, fgc, date, facebook, twitter, web, game,
    } = this.state;

    return (
      <div className={classes.root}>
        <Image
          src={cameraImage}
          alt="camera"
        />
        <Text>{facebook}</Text>
        <Icon
          className={classes.iconFacebook}
          path={mdiFacebookBox}
          size="36pt"
          color={theme.orange}
        />
        <Icon
          className={classes.iconTwitter}
          path={mdiTwitterBox}
          size="36pt"
          color={theme.orange}
        />
        <Icon
          className={classes.iconWeb}
          path={mdiWebBox}
          size="36pt"
          color={theme.orange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Camera);
