/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import { merge } from "lodash";
import theme, { IThemeFont } from "~/theme";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";
import Socket from "~/ui/Services/socket";

const styles: Styles = {
  root: theme.container,
};

interface ICommentatorProps extends WithStylesProps<typeof styles> { }

export interface ICommentatorState {
  cl: string;
  clTwitter: string;
  cr: string;
  crTwitter: string;
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

const smallText: IThemeFont = merge({}, theme.rawlineBold, {
  fontSize: "24pt",
});

const Commentator: React.FunctionComponent<ICommentatorProps> = (
  props: ICommentatorProps
) => {
  const { classes } = props;
  const [state, setState] = React.useState<ICommentatorState>({
    cl: 'CommentatorLeft',
    clTwitter: '@LeftTwitter',
    cr: 'CommentatorRight',
    crTwitter: '@RightTwitter',
  })
  
  const { cl, clTwitter, cr, crTwitter } = state;
  
  React.useEffect(() => {
    const io = new Socket()
    io.on("commentator", (commentator) => {
      setState(commentator);
    })
    io.emit("commentator-get");
  }, []);

  return (
    <div className={classes.root}>
      {
        cl &&
        <TextBox
          // comm 1 name
          right={1216}
          bottom={0}
          textAlign="right"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText>{cl}</MainText>
        </TextBox>
      }
      {
        clTwitter &&
        <TextBox
          // comm 1 twitter
          right={1216}
          bottom={52}
          textAlign="right"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <Text font={smallText} position="relative" top="-2px">
            {clTwitter}
          </Text>
        </TextBox>
      }
      {
        cr &&
        <TextBox
          // comm 2 name
          left={1216}
          bottom={0}
          textAlign="left"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <MainText>{cr}</MainText>
        </TextBox>
      }
      {
        crTwitter &&
        <TextBox
          // comm 2 twitter
          left={1216}
          bottom={52}
          textAlign="left"
          border={theme.borderBottom}
          boxShadow={theme.boxShadow}
        >
          <Text font={smallText} position="relative" top="-2px">
            {crTwitter}
          </Text>
        </TextBox>
      }
    </div>
  );
};

export default withStyles(styles)(Commentator);
