/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import withStyles, { WithStylesProps, Styles } from "react-jss";
import theme from "~/theme";

const styles: Styles = {
  root: theme.container,
  video: {
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: 0,
  },
  frosted: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 1080,
    width: 1920,
    zIndex: 1,
    backdropFilter: "blur(15px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
};

interface IPlaygroundProps extends WithStylesProps<typeof styles> {}

const Playground: React.FunctionComponent<IPlaygroundProps> = (props) => {
  const { classes } = props;
  const videoRef = React.useRef(null);

  const getVideo = () => {
    console.log(navigator.mediaDevices);
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
          deviceId:
            "2727e380fb479fd31a6bbc5a10f4b1cff99089b9d61555fa11da46a1be8ced44",
        },
      })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  React.useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className={classes.root}>
      <div className={classes.frosted}></div>
      <video className={classes.video} ref={videoRef} />
    </div>
  );
};

export default withStyles(styles)(Playground);
