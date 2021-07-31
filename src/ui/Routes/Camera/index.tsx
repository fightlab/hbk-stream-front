import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import Icon from "@mdi/react";
import { mdiWeb, mdiTwitter, mdiFacebook } from "@mdi/js";
import { merge } from "lodash";

import Socket from "~/ui/Services/socket";
import theme from "~/theme";
import Text from "~/ui/Components/Text";
import TextBox from "~/ui/Components/TextBox";
import GlassImage from "~/ui/Components/GlassImage";
import MaskImage from "./mask.png";

const styles: Styles = {
  root: theme.container,
  iconFacebook: {
    position: "absolute",
    bottom: "105px",
    right: "5px",
    zIndex: "1",
  },
  iconTwitter: {
    position: "absolute",
    bottom: "55px",
    right: "5px",
    zIndex: "1",
  },
  iconWeb: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    zIndex: "1",
  },
};

export interface ISocial {
  web: string;
  facebook: string;
  twitter: string;
}

export interface ICamera {
  hbk: string;
  brewdog: string;
  fgc: string;
  date: string;
  game: string;
  bg: string;
}

interface ICameraProps extends WithStylesProps<typeof styles> {}

interface ICameraState {
  camera: ICamera;
  social: ISocial;
}

class Camera extends React.Component<ICameraProps, ICameraState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      camera: {
        hbk: "Habrewken #000",
        brewdog: "Brewdog Brighton",
        fgc: "Brighton Fighting Game Community",
        date: "Wednesday XXth MONTH 20XX",
        game: "Street Fighter V",
        bg: "hbk",
      },
      social: {
        web: "hbk.gg",
        facebook: "fightlabbrighton",
        twitter: "fight_lab",
      },
    };

    this.io.on("camera", (camera) => {
      this.setState({ camera });
    });

    this.io.on("social", (social) => {
      this.setState({ social });
    });
  }

  componentDidMount() {
    this.io.emit("camera-get");
    this.io.emit("social-get");
  }

  render() {
    const { classes } = this.props;
    const { camera, social } = this.state;
    const { hbk, brewdog, fgc, date, game, bg } = camera;
    const { web, twitter, facebook } = social;

    const { transparent, orange, cabin, rawline, rawlineBold } = theme;

    return (
      <div className={classes.root}>
        <GlassImage
          src={`https://res.cloudinary.com/mkn-sh/image/upload/c_fill,e_blur:2500,g_center,h_1080,w_1920/v1539443572/fgc/${bg}.jpg`}
          maskImage={MaskImage}
        />
        <TextBox
          // hbk text
          top={5}
          left={5}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, rawlineBold, {
              fontSize: "72pt",
            })}
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
            font={merge({}, rawlineBold, {
              fontSize: "72pt",
            })}
          >
            {game}
          </Text>
        </TextBox>
        <TextBox
          // venue text
          bottom={`${30 + 50 * 2}px`}
          left={"5px"}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            font={merge({}, rawlineBold, {
              fontSize: "56pt",
            })}
          >
            {brewdog}
          </Text>
        </TextBox>
        <TextBox
          // date text
          bottom={`${50 * 1}px`}
          left={"5px"}
          textAlign="left"
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={merge({}, cabin, {
              fontSize: "42pt",
            })}
          >
            {date}
          </Text>
        </TextBox>
        <TextBox
          // facebook text
          bottom={`${5 + 50 * 2}px`}
          right={`${50 * 1}px`}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={merge(
              {},
              {
                fontVariant: "small-caps",
                fontSize: "36pt",
              },
              cabin
            )}
          >
            {facebook}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconFacebook}
          path={mdiFacebook}
          size="36pt"
          color={orange}
        />
        <TextBox
          // twitter text
          bottom={`${5 + 50 * 1}px`}
          right={`${50 * 1}px`}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={merge(
              {},
              {
                fontVariant: "small-caps",
                fontSize: "36pt",
              },
              cabin
            )}
          >
            {twitter}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconTwitter}
          path={mdiTwitter}
          size="36pt"
          color={orange}
        />
        <TextBox
          // web text
          bottom={`${5 + 50 * 0}px`}
          right={`${50 * 1}px`}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            lowerCase
            font={merge(
              {},
              {
                fontVariant: "small-caps",
                fontSize: "36pt",
              },
              cabin
            )}
          >
            {web}
          </Text>
        </TextBox>
        <Icon
          className={classes.iconWeb}
          path={mdiWeb}
          size="36pt"
          color={orange}
        />
        <TextBox
          // fgc text
          bottom={`${5 + 50 * 3}px`}
          right={`5px`}
          textAlign="right"
          backgroundColor={transparent}
        >
          <Text
            color={orange}
            font={merge({}, rawline, {
              fontSize: "42pt",
            })}
          >
            {fgc}
          </Text>
        </TextBox>
      </div>
    );
  }
}

export default withStyles(styles)(Camera);
