import * as React from 'react';
import withStyles from 'react-jss';

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
  maskImage?: string
}

const styles = {
  root: (props: IImageProps) => ({
    position: props.position,
    top: props.top,
    left: props.left,
    zIndex: props.zIndex,
    maskImage: `url('${props.maskImage}')`,
  }),
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
   maskImage: null,
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
