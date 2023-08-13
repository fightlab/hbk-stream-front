import * as React from "react";
import withStyles, { Styles, WithStylesProps } from "react-jss";
import { merge } from "lodash";

import Socket from "~/ui/Services/socket";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";
import PlayerFlag from "~/ui/Components/PlayerFlag";
import theme, { IThemeFont } from "~/theme";

const styles: Styles = {
  root: theme.container,
};

interface IScoreboardProps extends WithStylesProps<typeof styles> {}

export interface IScoreboardState {
  p1n: string;
  p2n: string;
  p1s: number;
  p2s: number;
  p1l: boolean;
  p2l: boolean;
  tl: string;
  tr: string;
  bl: string;
  br: string;
  lTag: string;
}

interface MainTextProps {
  color?: string;
  children?: string | number;
}
const defaultPropsMainText: MainTextProps = {
  children: "",
  color: undefined,
};
const MainText: React.FunctionComponent<MainTextProps> = (
  props: MainTextProps
) => {
  const { children, color } = props;

  return (
    <Text position="relative" color={color} font={theme.dinCondensedRegular}>
      {children}
    </Text>
  );
};
MainText.defaultProps = defaultPropsMainText;

const smallText: IThemeFont = merge({}, theme.dinCondensedRegular, {
  fontSize: "20pt",
});

const scoreText: IThemeFont = merge({}, theme.dinCondensedRegular, {
  fontSize: "38pt",
});

class Scoreboard extends React.Component<IScoreboardProps, IScoreboardState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      p1n: "PLAYER 1",
      p2n: "PLAYER 2",
      p1s: 0,
      p2s: 0,
      p1l: false,
      p2l: false,
      tl: "WINNERS ",
      tr: "SEMIS",
      bl: "GB",
      br: "GB",
      lTag: "[L]",
    };

    this.io.on("scoreboard", (scoreboard) => {
      this.setState(scoreboard);
    });
  }

  componentDidMount() {
    this.io.emit("scoreboard-get");
  }

  render() {
    const { classes } = this.props;
    const { p1n, p2n, p1s, p2s, tl, tr, p1l, p2l, lTag, bl, br } = this.state;

    const { transparent } = theme;

    return (
      <div className={classes.root}>
        <TextBox
          // hbk text
          left={0}
          right={0}
          top={5}
          backgroundColor={transparent}
        >
          <Text font={smallText} position="relative">
            {tl}
          </Text>
          <Text font={smallText} position="relative">
            {tr}
          </Text>
        </TextBox>
        <TextBox
          // player 1 name
          right={1226}
          top={6}
          textAlign="right"
          backgroundColor={transparent}
        >
          <MainText>{`${p1n}${p1l ? ` ${lTag}` : ""}`}</MainText>
        </TextBox>
        <TextBox
          // player 1 score
          left={770}
          top={2}
          backgroundColor={transparent}
        >
          <Text font={scoreText}>{p1s}</Text>
        </TextBox>
        <PlayerFlag
          // player 1 flag
          left={698}
          code={bl}
        />
        <TextBox
          // player 2 name
          left={1228}
          top={6}
          textAlign="left"
          backgroundColor={transparent}
        >
          <MainText>{`${p2n}${p2l ? ` ${lTag}` : ""}`}</MainText>
        </TextBox>
        <TextBox
          // player 2 score
          right={769}
          top={2}
          backgroundColor={transparent}
        >
          <Text font={scoreText}>{p2s}</Text>
        </TextBox>
        <PlayerFlag
          // player 2 flag
          left={1152}
          code={br}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Scoreboard);
