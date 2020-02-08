import * as React from 'react';
import GlassImage from '../../Components/GlassImage';
import Mask from '../Camera/mask.png';

const Playground = () => (
  <GlassImage src="https://res.cloudinary.com/mkn-sh/image/upload/c_fill,g_center,h_1080,w_1920/v1539443572/fgc/bbcf-bg.jpg" maskImage={Mask} />
);

export default Playground;
