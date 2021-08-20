import * as React from "react";
import withStyles, { Styles, WithStylesProps } from "react-jss";
import { merge } from "lodash";

import Socket from "~/ui/Services/socket";
import TextBox from "~/ui/Components/TextBox";
import Text, { ITextProps } from "~/ui/Components/Text";
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
    <Text position="relative" top="-3px" color={color}>
      {children}
    </Text>
  );
};
MainText.defaultProps = defaultPropsMainText;

class Scoreboard extends React.Component<IScoreboardProps, IScoreboardState> {
  private io = new Socket();

  constructor(props) {
    super(props);

    this.state = {
      p1n: "",
      p2n: "",
      p1s: 0,
      p2s: 0,
      p1l: false,
      p2l: false,
      tl: "HBK",
      tr: "#000",
      bl: "Brewdog",
      br: "Brighton",
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
    const { p1n, p2n, p1s, p2s, tl, tr, bl, br, p1l, p2l, lTag } = this.state;

    const smallText: IThemeFont = merge({}, theme.rawlineBold, {
      fontSize: "24pt",
    });

    return (
      <div className={classes.root}>
        <TextBox
          // hbk text
          left={0}
          right={0}
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <Text font={smallText} position="relative" top="-2px">
            {tl}
          </Text>
          <Text
            font={smallText}
            position="relative"
            top="-2px"
            color={theme.orange}
          >
            {tr}
          </Text>
        </TextBox>
        <TextBox
          // player 1 name
          right={1216}
          textAlign="right"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText>{`${p1n}${p1l ? ` ${lTag}` : ""}`}</MainText>
        </TextBox>
        <TextBox
          // player 1 score
          left={714}
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText color={p1s > p2s ? theme.orange : theme.white}>
            {p1s}
          </MainText>
        </TextBox>
        <TextBox
          // player 2 name
          left={1216}
          textAlign="left"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText>{`${p2n}${p2l ? ` ${lTag}` : ""}`}</MainText>
        </TextBox>
        <TextBox
          // player 2 score
          right={714}
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText color={p2s > p1s ? theme.orange : theme.white}>
            {p2s}
          </MainText>
        </TextBox>
        <TextBox
          // bottom text
          left={0}
          right={0}
          bottom={0}
          border={theme.borderTop}
          boxShadow={theme.boxShadow}
        >
          <MainText>{bl}</MainText>
          <MainText color={theme.orange}>{br}</MainText>
        </TextBox>
      </div>
    );
  }
}

export default withStyles(styles)(Scoreboard);
