import * as React from 'react';
import withStyles from 'react-jss';
import Mask from './mask.png';

interface IImageProps {
  src: any
  alt?: string
  position?: string
  top?: number|string
  left?: number|string
  zIndex?: number
  classes: {
    root: string
  }
  mask?: boolean
}

const styles = {
  root: (props: IImageProps) => {
    const style = {
      position: props.position,
      top: props.top,
      left: props.left,
      zIndex: props.zIndex,
      maskImage: null,
      // maskType: null,
    };

    if (props.mask) {
      style.maskImage = `url(${Mask})`;
      // style.maskType = 'luminance';
    }

    return style;
  },
};

class Image extends React.PureComponent<IImageProps> {
 static defaultProps: IImageProps = {
   src: '',
   alt: '',
   position: 'absolute',
   top: 0,
   left: 0,
   zIndex: -1,
   classes: { root: '' },
   mask: false,
 }

 render() {
   const { classes, src, alt } = this.props;
   return (
     <div>
       <img className={classes.root} src={src} alt={alt} />
     </div>
   );
 }
}

export default withStyles(styles)(Image);
