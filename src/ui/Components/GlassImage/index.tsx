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
  backdropFilter?: string,
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
    backdropFilter: props.backdropFilter,
    maskImage: `url('${props.maskImage}'`,
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
    backdropFilter: 'blur(25px)',
    maskImage: null,
  }

  render() {
    const { classes, maskImage, src } = this.props;
    return (
      <>
        <img
          // style={{
          //   '-webkit-mask-image': `url('${maskImage}')`,
          // }}
          className={classes.container}
          alt=""
        />
        <Image src={src} maskImage={maskImage} />
      </>
    );
  }
}

export default withStyles(styles)(GlassImage);
