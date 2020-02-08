import * as React from 'react';
import withStyles from 'react-jss';
import Image from '../Image';

interface IGlassImageProps {
  src: string,
  classes: {
    container: string
  }
  width?: number
  height?: number
  top?: number,
  left?: number,
  bgCol?: string,
  maskImage?: string,
}

const styles = {
  container: (props: IGlassImageProps) => ({
    width: props.width,
    height: props.height,
    position: 'absolute',
    top: props.top,
    left: props.left,
    backgroundColor: props.bgCol,
    maskImage: props.maskImage ? `url('${props.maskImage}')` : null,
  }),
};

class GlassImage extends React.PureComponent<IGlassImageProps> {
  static defaultProps: IGlassImageProps = {
    src: '',
    classes: {
      container: '',
    },
    width: 1920,
    height: 1080,
    top: 0,
    left: 0,
    bgCol: 'rgba(0,0,0,0.5)',
    maskImage: null,
  }

  render() {
    const { classes, maskImage, src } = this.props;
    return (
      <>
        <div className={classes.container} />
        <Image src={src} maskImage={maskImage} />
      </>
    );
  }
}

export default withStyles(styles)(GlassImage);
