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

class SplitScreen2 extends React.Component<
  ISplitScreen2Props,
  ISplitScreen2State
> {
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
      },
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
          top={255}
          left={1435}
          textAlign="middle"
          width="100%"
          padding={0}
          backgroundColor={theme.transparent}
        >
          <Text
            font={merge({}, theme.dinCondensedRegular, {
              fontSize: "50px",
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
