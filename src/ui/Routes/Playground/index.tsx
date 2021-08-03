/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import theme from "~/theme";
import TextBox from "~/ui/Components/TextBox";
import Text from "~/ui/Components/Text";

const styles: Styles = {
  root: theme.container,
};

interface IPlaygroundProps extends WithStylesProps<typeof styles> {}

const Playground: React.FunctionComponent<IPlaygroundProps> = (
  props: IPlaygroundProps
) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <TextBox
        // player 1 name
        right={1216}
        textAlign="right"
        border={theme.borderBottom}
        backgroundColor="rgba(66, 66, 66, 0.5)"
        boxShadow={theme.boxShadow}
      >
        <Text>HBK | Coldlink Sensei</Text>
      </TextBox>
      <TextBox
        // player 1 score
        left={714}
        width={50}
        border={theme.borderBottom}
        backgroundColor="rgba(66, 66, 66, 0.5)"
        boxShadow={theme.boxShadow}
      >
        <Text color={theme.orange}>0</Text>
      </TextBox>
      <TextBox
        // player 2 name
        left={1216}
        textAlign="left"
        border={theme.borderBottom}
        backgroundColor="rgba(66, 66, 66, 0.5)"
        boxShadow={theme.boxShadow}
      >
        <Text>A stupidly long name</Text>
      </TextBox>
      <TextBox
        // player 2 score
        right={714}
        width={50}
        border={theme.borderBottom}
        backgroundColor="rgba(66, 66, 66, 0.5)"
        boxShadow={theme.boxShadow}
      >
        <Text color={theme.orange}>1</Text>
      </TextBox>
    </div>
  );
};

export default withStyles(styles)(Playground);
