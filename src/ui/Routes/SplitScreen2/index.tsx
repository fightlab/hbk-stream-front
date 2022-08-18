/* eslint-disable react/require-default-props */
// eslint-disable-next-line no-use-before-define
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";
import Socket from "~/ui/Services/socket";
import theme from "~/theme";
import Text from "~/ui/Components/Text";
import TextBox from "~/ui/Components/TextBox";
import { IBreakWithVideoState } from "../BreakWithVideo";

const styles: Styles = {
  root: theme.container,
};

interface ISplitScreen2Props extends WithStylesProps<typeof styles> {}

interface ISplitScreen2State {
  info: IBreakWithVideoState;
}

class SplitScreen2 extends React.Component<ISplitScreen2Props, ISplitScreen2State> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      info: {
        event: "SoulCalibur VI",
        game: "Game Fighter Name",
        countdown: 300,
        venue: "BrewDog Brighton",
        showTimer: false,
        startText: "Starts",
      }
    };
    
    this.io.on("prestream", (prestream) => {
      this.setState({ info: prestream });
    });
  }

  componentDidMount() {
    this.io.emit("prestream-get");
  }

  render() {
    const { info } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* Game info */}
        <TextBox
          // event text
          top={247}
          left={1430}
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

export default withStyles(styles)(SplitScreen2);
